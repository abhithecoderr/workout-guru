import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Card from '../components/Card';

const SessionPreview = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const initialExercises = location.state?.exercises || [];
  const focusArea = location.state?.focusArea || 'Custom Session';

  const [sessionExercises, setSessionExercises] = useState(
    initialExercises.map(ex => ({
      ...ex,
      adjustedReps: ex.defaultReps,
      adjustedSets: ex.defaultSets,
      adjustedDuration: ex.durationSeconds
    }))
  );

  if (sessionExercises.length === 0) {
    return <div style={{ padding: '2rem' }}>No exercises selected. <Button onClick={() => navigate(-1)}>Go Back</Button></div>;
  }

  const handleUpdate = (id, field, value) => {
    setSessionExercises(prev => prev.map(ex => 
      ex._id === id ? { ...ex, [field]: Number(value) } : ex
    ));
  };

  const handleStartSession = () => {
    // In phase 5 we will build the /active-session page
    navigate('/active-session', { state: { exercises: sessionExercises, focusArea } });
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2>Session Preview: {focusArea}</h2>
        <Button variant="secondary" onClick={() => navigate(-1)}>Back</Button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
        {sessionExercises.map((ex, idx) => (
          <Card key={ex._id} title={`${idx + 1}. ${ex.name}`}>
            <p style={{ color: 'var(--text-muted)', fontSize: 'var(--text-sm)', marginBottom: '1rem' }}>
              {ex.description}
            </p>
            <div style={{ display: 'flex', gap: '1.5rem' }}>
              <label style={{ display: 'flex', flexDirection: 'column', fontSize: 'var(--text-sm)' }}>
                Sets
                <input 
                  type="number" 
                  value={ex.adjustedSets} 
                  onChange={(e) => handleUpdate(ex._id, 'adjustedSets', e.target.value)}
                  style={{ padding: '0.5rem', background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', color: '#fff', borderRadius: '4px', marginTop: '0.25rem', width: '70px' }}
                />
              </label>
              <label style={{ display: 'flex', flexDirection: 'column', fontSize: 'var(--text-sm)' }}>
                Reps
                <input 
                  type="number" 
                  value={ex.adjustedReps} 
                  onChange={(e) => handleUpdate(ex._id, 'adjustedReps', e.target.value)}
                  style={{ padding: '0.5rem', background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', color: '#fff', borderRadius: '4px', marginTop: '0.25rem', width: '70px' }}
                />
              </label>
              <label style={{ display: 'flex', flexDirection: 'column', fontSize: 'var(--text-sm)' }}>
                Time (s)
                <input 
                  type="number" 
                  value={ex.adjustedDuration} 
                  onChange={(e) => handleUpdate(ex._id, 'adjustedDuration', e.target.value)}
                  style={{ padding: '0.5rem', background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', color: '#fff', borderRadius: '4px', marginTop: '0.25rem', width: '70px' }}
                />
              </label>
            </div>
          </Card>
        ))}
      </div>

      <Button variant="primary" onClick={handleStartSession} style={{ width: '100%', fontSize: 'var(--text-xl)', padding: '1rem' }}>
        Start Workout Session!
      </Button>
    </div>
  );
};

export default SessionPreview;
