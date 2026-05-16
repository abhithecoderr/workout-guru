import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/pages/routine.css';
import '../styles/pages/session-preview.css'; // Reusing metric CSS

const Routine = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [routine, setRoutine] = useState(null);
  const [sessionExercises, setSessionExercises] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/api/routines/${id}`)
      .then(res => res.json())
      .then(data => {
        setRoutine(data);
        
        // Map into state so we can adjust it before starting
        const mapped = data.exercises.map(ex => ({
          ...ex.exerciseId,
          adjustedSets: ex.defaultSets || ex.exerciseId.defaultSets,
          adjustedReps: ex.defaultReps || ex.exerciseId.defaultReps,
          adjustedDuration: ex.durationSeconds || ex.exerciseId.durationSeconds
        }));
        setSessionExercises(mapped);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="routine-container">Loading...</div>;
  if (!routine) return <div className="routine-container">Routine not found.</div>;

  const totalDuration = sessionExercises.reduce((acc, ex) => {
    return acc + (ex.adjustedDuration * ex.adjustedSets);
  }, 0);
  const minutes = Math.ceil(totalDuration / 60);

  const updateMetric = (id, field, delta) => {
    setSessionExercises(prev => prev.map(ex => {
      if (ex._id === id) {
        const newValue = Math.max(0, Number(ex[field]) + delta);
        return { ...ex, [field]: newValue };
      }
      return ex;
    }));
  };

  const handleStartSession = () => {
    navigate('/active-session', { state: { exercises: sessionExercises, focusArea: routine.focusArea } });
  };

  return (
    <div className="routine-container">
      <header className="routine-header">
        <h1 className="routine-title">{routine.title}</h1>
        <p className="routine-description">{routine.description}</p>
        
        <div className="routine-stats">
          <div className="stat-item">
            <span className="stat-value">{minutes}</span>
            <span className="stat-label">Minutes</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">{sessionExercises.length}</span>
            <span className="stat-label">Exercises</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">{routine.focusArea}</span>
            <span className="stat-label">Focus</span>
          </div>
        </div>
      </header>

      <div className="session-list">
        {sessionExercises.map((ex, idx) => (
          <div key={idx} className="session-item">
            <div className="session-item-info">
              <h4>{idx + 1}. {ex.name}</h4>
              <p>{ex.focusArea}</p>
            </div>
            <div className="session-item-metrics">
              <div className="metric-column">
                <div className="metric-controls">
                  <button className="metric-btn" onClick={() => updateMetric(ex._id, 'adjustedSets', -1)}>-</button>
                  <span className="metric-value">{ex.adjustedSets}</span>
                  <button className="metric-btn" onClick={() => updateMetric(ex._id, 'adjustedSets', 1)}>+</button>
                </div>
                <span className="metric-label">Sets</span>
              </div>
              
              <div className="metric-column">
                <div className="metric-controls">
                  <button className="metric-btn" onClick={() => updateMetric(ex._id, ex.isTimeBased ? 'adjustedDuration' : 'adjustedReps', ex.isTimeBased ? -5 : -1)}>-</button>
                  <span className="metric-value">{ex.isTimeBased ? ex.adjustedDuration : ex.adjustedReps}</span>
                  <button className="metric-btn" onClick={() => updateMetric(ex._id, ex.isTimeBased ? 'adjustedDuration' : 'adjustedReps', ex.isTimeBased ? 5 : 1)}>+</button>
                </div>
                <span className="metric-label">{ex.isTimeBased ? 'Time (s)' : 'Reps'}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="routine-actions">
        <button className="btn-start" onClick={handleStartSession} style={{ width: '100%' }}>
          Start Session
        </button>
      </div>
    </div>
  );
};

export default Routine;
