import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import Button from '../components/Button';
import { getExercises } from '../services/api';

const FOCUS_AREAS = [
  "Full Body & Cardio",
  "Lower Body (Legs & Glutes)",
  "Upper Body (Push & Pull)",
  "Core & Abs"
];

const FocusArea = () => {
  const [selectedArea, setSelectedArea] = useState('');
  const [exercises, setExercises] = useState([]);
  const [selectedExercises, setSelectedExercises] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedArea) {
      getExercises(selectedArea).then(data => {
        setExercises(data);
        setSelectedExercises(data); // Auto-select all by default
      }).catch(err => console.error(err));
    }
  }, [selectedArea]);

  const toggleExercise = (ex) => {
    if (selectedExercises.find(e => e._id === ex._id)) {
      setSelectedExercises(selectedExercises.filter(e => e._id !== ex._id));
    } else {
      setSelectedExercises([...selectedExercises, ex]);
    }
  };

  const handleCreateSession = () => {
    if (selectedExercises.length === 0) return;
    navigate('/preview', { state: { exercises: selectedExercises, focusArea: selectedArea } });
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2>Select a Focus Area</h2>
        <Button variant="secondary" onClick={() => navigate('/')}>Home</Button>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
        {FOCUS_AREAS.map(area => (
          <Card 
            key={area} 
            title={area} 
            onClick={() => setSelectedArea(area)}
            style={{ 
              cursor: 'pointer', 
              borderColor: selectedArea === area ? 'var(--accent-primary)' : 'var(--border-color)',
              boxShadow: selectedArea === area ? '0 0 10px var(--accent-glow)' : 'none'
            }}
          />
        ))}
      </div>

      {selectedArea && exercises.length > 0 && (
        <>
          <h3 style={{ marginBottom: '1rem' }}>Available Exercises</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem', marginBottom: '2rem' }}>
            {exercises.map(ex => {
              const isSelected = selectedExercises.some(e => e._id === ex._id);
              return (
                <div 
                  key={ex._id} 
                  onClick={() => toggleExercise(ex)}
                  style={{
                    padding: '1rem',
                    backgroundColor: 'var(--bg-secondary)',
                    border: `1px solid ${isSelected ? 'var(--accent-primary)' : 'var(--border-color)'}`,
                    borderRadius: '8px',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    transition: 'all 0.2s'
                  }}
                >
                  <div>
                    <h4 style={{ margin: '0 0 0.25rem 0', color: isSelected ? '#fff' : 'var(--text-secondary)' }}>
                      {ex.name}
                    </h4>
                    <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>
                      {ex.defaultSets} sets x {ex.defaultReps} reps • {ex.durationSeconds}s
                    </span>
                  </div>
                  <div style={{ 
                    width: '24px', height: '24px', 
                    borderRadius: '50%', 
                    backgroundColor: isSelected ? 'var(--accent-primary)' : 'transparent',
                    border: '1px solid var(--border-color)',
                    display: 'flex', justifyContent: 'center', alignItems: 'center'
                  }}>
                    {isSelected && <span style={{ color: '#fff', fontSize: '12px' }}>✓</span>}
                  </div>
                </div>
              );
            })}
          </div>

          <Button variant="primary" onClick={handleCreateSession} style={{ width: '100%', padding: '1rem', fontSize: 'var(--text-lg)' }}>
            Create Session ({selectedExercises.length} Exercises)
          </Button>
        </>
      )}
    </div>
  );
};

export default FocusArea;
