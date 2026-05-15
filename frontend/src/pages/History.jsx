import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Card from '../components/Card';

const History = () => {
  const [history, setHistory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem('workoutHistory') || '[]');
    // Sort by most recent first
    savedHistory.sort((a, b) => new Date(b.date) - new Date(a.date));
    setHistory(savedHistory);
  }, []);

  const clearHistory = () => {
    if (window.confirm("Are you sure you want to clear your entire workout history?")) {
      localStorage.removeItem('workoutHistory');
      setHistory([]);
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2>Personal History</h2>
        <Button variant="secondary" onClick={() => navigate('/')}>Home</Button>
      </div>

      {history.length === 0 ? (
        <Card style={{ textAlign: 'center', padding: '3rem 1rem' }}>
          <h3 style={{ marginBottom: '1rem', color: 'var(--text-muted)' }}>No workouts completed yet</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
            Time to get moving! Complete a session to see it here.
          </p>
          <Button variant="primary" onClick={() => navigate('/focus-area')}>Start a Workout</Button>
        </Card>
      ) : (
        <>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>
            <span>Total Sessions: {history.length}</span>
            <span style={{ cursor: 'pointer', color: 'var(--danger)', textDecoration: 'underline', fontSize: 'var(--text-sm)' }} onClick={clearHistory}>
              Clear History
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {history.map(session => (
              <Card key={session.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ margin: '0 0 0.5rem 0', color: 'var(--text-primary)' }}>{session.focusArea}</h3>
                  <div style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>
                    {new Date(session.date).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 'bold', color: 'var(--success)' }}>
                    {session.exercisesCompleted}
                  </div>
                  <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Exercises</div>
                </div>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default History;
