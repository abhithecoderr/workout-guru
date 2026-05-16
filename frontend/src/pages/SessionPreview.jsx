import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { generateAiSession } from '../services/api';
import '../styles/pages/session-preview.css';

const SessionPreview = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [sessionExercises, setSessionExercises] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const [showAdjust, setShowAdjust] = useState(false);
  const [adjustPrompt, setAdjustPrompt] = useState('');

  // Initial load logic
  useEffect(() => {
    const { prompt, exercises, isCustomBuilder, isAdjusting } = location.state || {};

    if (exercises && exercises.length > 0) {
      // If exercises were passed directly (e.g., from Custom Builder or Routine "Adjust" button)
      const mapped = exercises.map(ex => ({
        ...ex,
        adjustedReps: ex.adjustedReps || ex.defaultReps || ex.exerciseId?.defaultReps,
        adjustedSets: ex.adjustedSets || ex.defaultSets || ex.exerciseId?.defaultSets,
        adjustedDuration: ex.adjustedDuration || ex.durationSeconds || ex.exerciseId?.durationSeconds,
        name: ex.name || ex.exerciseId?.name,
        focusArea: ex.focusArea || ex.exerciseId?.focusArea,
        _id: ex._id || ex.exerciseId?._id
      }));
      setSessionExercises(mapped);
      
      if (isAdjusting) {
        setShowAdjust(true);
      }
    } else if (prompt) {
      // If a prompt was passed from Home page, trigger AI generation
      handleAIGeneration(prompt);
    } else {
      setError('No session data found.');
    }
  }, [location.state]);

  const handleAIGeneration = async (fullPrompt) => {
    setLoading(true);
    setError(null);
    try {
      const data = await generateAiSession(fullPrompt);
      if (data.sessionExercises) {
        setSessionExercises(data.sessionExercises);
      } else {
        setError('Failed to generate session.');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setShowAdjust(false);
      setAdjustPrompt('');
    }
  };

  const submitAdjustment = () => {
    if (!adjustPrompt.trim()) return;
    
    // Construct a context-aware prompt for the AI
    const currentContext = sessionExercises.map(ex => `${ex.name} (${ex.adjustedSets}x${ex.adjustedReps})`).join(', ');
    const compoundPrompt = `Current routine: [${currentContext}]. User wants to adjust it: "${adjustPrompt}". Modify the routine based on this request.`;
    
    handleAIGeneration(compoundPrompt);
  };

  const handleStartSession = () => {
    navigate('/active-session', { state: { exercises: sessionExercises, title: "Curated AI Session" } });
  };

  if (loading) {
    return (
      <div className="preview-container">
        <div className="loader-container">
          <div className="loader-spinner"></div>
          <h2>Curating your perfect session...</h2>
          <p style={{ color: 'var(--text-secondary)' }}>Our AI is analyzing the exercise database</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="preview-container" style={{ textAlign: 'center' }}>
        <h2 style={{ color: 'var(--danger)', marginBottom: '1rem' }}>Oops!</h2>
        <p>{error}</p>
        <button className="btn-adjust" onClick={() => navigate(-1)} style={{ marginTop: '2rem' }}>Go Back</button>
      </div>
    );
  }

  const updateMetric = (id, field, delta) => {
    setSessionExercises(prev => prev.map(ex => {
      if (ex._id === id) {
        const newValue = Math.max(0, Number(ex[field]) + delta);
        return { ...ex, [field]: newValue };
      }
      return ex;
    }));
  };

  if (sessionExercises.length === 0) return null;

  const isAiGenerated = !location.state?.isCustomBuilder && !location.state?.isAdjusting;

  return (
    <div className="preview-container">
      <header className="preview-header">
        <h1 className="preview-title">Your Curated Session</h1>
        <p className="preview-subtitle">Ready to go. Adjust it, or jump right in.</p>
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

      <div className="preview-actions">
        <div className="action-row">
          {isAiGenerated && (
            <button 
              className={`btn-adjust ${showAdjust ? 'active' : ''}`} 
              onClick={() => setShowAdjust(!showAdjust)}
            >
              Adjust Workout
            </button>
          )}
          <button className="btn-start" onClick={handleStartSession}>
            Start Session
          </button>
        </div>

        {showAdjust && isAiGenerated && (
          <div className="adjust-panel">
            <textarea 
              className="adjust-input"
              rows="2"
              placeholder="e.g., Make it shorter, swap squats for lunges, I want more core focus..."
              value={adjustPrompt}
              onChange={(e) => setAdjustPrompt(e.target.value)}
            ></textarea>
            <button className="btn-send-adjust" onClick={submitAdjustment}>
              Update
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SessionPreview;
