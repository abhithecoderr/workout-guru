import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/pages/home.css';

const Home = () => {
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState('');

  const handlePromptSubmit = (e) => {
    e.preventDefault();
    if (prompt.trim()) {
      // Navigate to the AI preview page, passing the prompt via state
      navigate('/preview', { state: { prompt } });
    }
  };

  const focusAreas = [
    { id: 'full-body', title: 'Full Body & Cardio', icon: '🏃' },
    { id: 'lower-body', title: 'Lower Body (Legs & Glutes)', icon: '🦵' },
    { id: 'upper-body', title: 'Upper Body (Push & Pull)', icon: '💪' },
    { id: 'core-abs', title: 'Core & Abs', icon: '🔥' },
  ];

  const historyStr = localStorage.getItem('workoutHistory');
  const allHistory = historyStr ? JSON.parse(historyStr) : [];
  const recentSessions = allHistory.sort((a, b) => b.id - a.id).slice(0, 4);

  return (
    <div className="home-container">
      {/* Hero / AI Curation Section */}
      <section className="hero-section">
        <h1 className="hero-title">What are we training today?</h1>
        <p className="hero-subtitle">Type your goals, and our AI will curate the perfect session.</p>
        
        <form onSubmit={handlePromptSubmit} className="prompt-bar-container">
          <input 
            type="text" 
            className="prompt-input" 
            placeholder="e.g., I have 20 minutes and want to destroy my core..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <button type="submit" className="prompt-submit">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </form>
      </section>

      {/* Focus Areas Grid */}
      <section>
        <div className="section-header">
          <h2 className="section-title">Focus Areas</h2>
          <Link to="/focus-area" className="view-all">View All</Link>
        </div>
        <div className="focus-grid">
          {focusAreas.map(area => (
            <div 
              key={area.id} 
              className="focus-card"
              onClick={() => navigate(`/focus-area?target=${area.id}`)}
            >
              <div className="focus-card-title">
                {area.icon} {area.title}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recent History Grid */}
      <section>
        <div className="section-header">
          <h2 className="section-title">Previous Sessions</h2>
          <Link to="/history" className="view-all">View History</Link>
        </div>
        <div className="history-grid">
          {recentSessions.length === 0 && <p style={{ color: 'var(--text-muted)' }}>No recent sessions found.</p>}
          {recentSessions.map(session => {
            const d = new Date(session.date);
            return (
              <div 
                key={session.id} 
                className="history-card" 
                onClick={() => navigate('/preview', { state: { exercises: session.sessionDetails, focusArea: session.focusArea } })}
              >
                <div className="history-date">{d.toLocaleDateString()}</div>
                <div className="history-title">{session.focusArea} Workout</div>
                <div className="history-meta">{session.exercisesCompleted} Exercises</div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Home;
