import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getRoutines } from '../services/api';
import '../styles/pages/focus-area.css';

const FOCUS_AREAS = [
  { id: 'full-body', label: 'Full Body & Cardio' },
  { id: 'lower-body', label: 'Lower Body (Legs & Glutes)' },
  { id: 'upper-body', label: 'Upper Body (Push & Pull)' },
  { id: 'core-abs', label: 'Core & Abs' }
];

const FocusArea = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const targetId = queryParams.get('target');

  const initialArea = FOCUS_AREAS.find(a => a.id === targetId)?.label || FOCUS_AREAS[0].label;
  const [selectedArea, setSelectedArea] = useState(initialArea);
  const [routines, setRoutines] = useState([]);

  useEffect(() => {
    getRoutines(selectedArea)
      .then(data => setRoutines(data))
      .catch(err => console.error(err));
  }, [selectedArea]);

  return (
    <div className="focus-area-container">
      <header className="page-header">
        <h1 className="page-title">Routines</h1>
        <p className="page-subtitle">Select a focus area to browse premade routines</p>
      </header>

      <div className="tabs-container">
        {FOCUS_AREAS.map(area => (
          <button
            key={area.id}
            className={`tab-button ${selectedArea === area.label ? 'active' : ''}`}
            onClick={() => setSelectedArea(area.label)}
          >
            {area.label}
          </button>
        ))}
      </div>

      <div className="routines-grid">
        {routines.map(routine => (
          <div 
            key={routine._id} 
            className="routine-card"
            onClick={() => navigate(`/routine/${routine._id}`)}
          >
            <h3 className="routine-title">{routine.title}</h3>
            <p className="routine-desc">{routine.description || 'A great workout to target this specific muscle group.'}</p>
            <div className="routine-meta">
              <span>{routine.exercises.length} Exercises</span>
              <span>Premade</span>
            </div>
          </div>
        ))}
      </div>

      {routines.length === 0 && (
        <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '4rem' }}>
          No premade routines found for this category.
        </p>
      )}

      <div className="custom-workout-banner">
        <div className="custom-workout-info">
          <h3>Want full control?</h3>
          <p>Build your own custom workout from scratch, exactly how you like it.</p>
        </div>
        <button className="btn-custom" onClick={() => navigate(`/custom-workout?area=${encodeURIComponent(selectedArea)}`)}>
          Create Custom Workout
        </button>
      </div>
    </div>
  );
};

export default FocusArea;
