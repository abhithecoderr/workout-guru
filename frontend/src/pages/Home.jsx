import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Card from '../components/Card';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '1rem' }}>Welcome to Workout Guru</h1>
      <p style={{ marginBottom: '2rem', color: 'var(--text-secondary)' }}>
        Your personal AI-powered fitness companion. Find workouts by focus area, build custom sessions, or let our AI curate one for you.
      </p>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
        <Card 
          title="Focus Area" 
          onClick={() => navigate('/focus-area')}
          style={{ cursor: 'pointer', borderColor: 'var(--border-color)' }}
        >
          Select a specific body part to target and see curated exercises.
        </Card>
        <Card 
          title="AI Curation"
          onClick={() => navigate('/ai-curation')}
          style={{ cursor: 'pointer', borderColor: 'var(--accent-primary)', boxShadow: '0 0 10px rgba(59, 130, 246, 0.2)' }}
        >
          Tell our AI your goals, and it will build a custom session instantly.
        </Card>
      </div>

      <div style={{ display: 'flex', gap: '1rem' }}>
        <Button variant="primary" onClick={() => navigate('/focus-area')}>Start Workout</Button>
        <Button variant="secondary" onClick={() => navigate('/history')}>View History</Button>
      </div>
    </div>
  );
};

export default Home;
