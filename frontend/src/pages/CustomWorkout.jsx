import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getExercises } from '../services/api';
import '../styles/pages/custom-workout.css';

const CustomWorkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialArea = queryParams.get('area') || '';

  const [exercises, setExercises] = useState([]);
  const [search, setSearch] = useState(initialArea);
  const [selectedExercises, setSelectedExercises] = useState([]);

  useEffect(() => {
    // Fetch all exercises
    getExercises()
      .then(data => setExercises(data))
      .catch(err => console.error(err));
  }, []);

  const handleAdd = (exercise) => {
    // Avoid exact duplicates in the builder for simplicity, or allow duplicates?
    // Let's allow duplicates but assign a unique id for the list
    setSelectedExercises([...selectedExercises, { ...exercise, uniqueId: Date.now() + Math.random() }]);
  };

  const handleRemove = (uniqueId) => {
    setSelectedExercises(selectedExercises.filter(ex => ex.uniqueId !== uniqueId));
  };

  const handleCreateSession = () => {
    // Pass to preview or direct to active session
    // For manual builder, passing to preview lets them confirm before starting
    navigate('/preview', { state: { exercises: selectedExercises, isCustomBuilder: true } });
  };

  const filteredExercises = exercises.filter(ex => 
    ex.name.toLowerCase().includes(search.toLowerCase()) || 
    ex.focusArea.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="custom-workout-container">
      <header className="custom-header">
        <h1 className="custom-title">Custom Workout Builder</h1>
        <p className="routine-description">Select from our database of exercises to build your perfect session.</p>
      </header>

      <div className="exercises-column">
        <input 
          type="text" 
          className="search-bar" 
          placeholder="Search for exercises or focus areas..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        
        <div className="exercises-pool">
          {filteredExercises.map(ex => (
            <div key={ex._id} className="exercise-item">
              <div className="exercise-info">
                <h4>{ex.name}</h4>
                <p>{ex.focusArea} • {ex.defaultSets} sets x {ex.defaultReps} reps</p>
              </div>
              <button className="btn-add" onClick={() => handleAdd(ex)}>+</button>
            </div>
          ))}
          {filteredExercises.length === 0 && (
            <p style={{ color: 'var(--text-muted)' }}>No exercises found matching your search.</p>
          )}
        </div>
      </div>

      <aside className="curated-sidebar">
        <h2 className="sidebar-title">Curated Session</h2>
        
        {selectedExercises.length === 0 ? (
          <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
            Your session is empty. Add exercises from the left.
          </p>
        ) : (
          <div className="selected-list">
            {selectedExercises.map((ex, idx) => (
              <div key={ex.uniqueId} className="selected-item">
                <div>
                  <div style={{ fontWeight: 500 }}>{idx + 1}. {ex.name}</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    {ex.defaultSets}x{ex.defaultReps}
                  </div>
                </div>
                <button className="btn-remove" onClick={() => handleRemove(ex.uniqueId)}>×</button>
              </div>
            ))}
          </div>
        )}

        <button 
          className="btn-create-session" 
          disabled={selectedExercises.length === 0}
          onClick={handleCreateSession}
        >
          Create Session ({selectedExercises.length})
        </button>
      </aside>
    </div>
  );
};

export default CustomWorkout;
