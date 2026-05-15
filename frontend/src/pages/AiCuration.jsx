import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Card from '../components/Card';
import { generateAiSession } from '../services/api';

const AiCuration = () => {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setIsLoading(true);
    setError('');
    
    try {
      const data = await generateAiSession(prompt);
      // Route to preview with the AI generated exercises
      navigate('/preview', { 
        state: { 
          exercises: data.sessionExercises, 
          focusArea: `AI: ${prompt}`
        } 
      });
    } catch (err) {
      setError('Failed to generate session. Ensure your backend has the GEMINI_API_KEY set.');
      setIsLoading(false);
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2>AI Workout Curation</h2>
        <Button variant="secondary" onClick={() => navigate('/')}>Home</Button>
      </div>

      <Card>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
          Tell the AI what kind of workout you want. It will search our database and curate the perfect session for you.
        </p>
        
        <textarea 
          placeholder="e.g. 'Give me a 15 minute intense session for skinny arms' or 'I need a light stretch and core workout'"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows={4}
          style={{ 
            width: '100%', 
            padding: '1rem', 
            borderRadius: '8px', 
            backgroundColor: 'var(--bg-primary)', 
            border: '1px solid var(--border-color)', 
            color: 'var(--text-primary)',
            fontFamily: 'var(--font-primary)',
            marginBottom: '1rem',
            resize: 'vertical'
          }}
        />

        {error && <p style={{ color: 'var(--danger)', marginBottom: '1rem', fontSize: 'var(--text-sm)' }}>{error}</p>}

        <Button 
          variant="primary" 
          onClick={handleGenerate} 
          disabled={isLoading || !prompt.trim()} 
          style={{ width: '100%' }}
        >
          {isLoading ? 'Curating Session... Please wait.' : 'Generate Custom Workout'}
        </Button>
      </Card>
    </div>
  );
};

export default AiCuration;
