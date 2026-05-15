const API_URL = 'http://localhost:5000/api';

export const getExercises = async (focusArea = '') => {
  const url = focusArea ? `${API_URL}/exercises?focusArea=${encodeURIComponent(focusArea)}` : `${API_URL}/exercises`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch exercises');
  return res.json();
};

export const generateAiSession = async (prompt) => {
  const res = await fetch(`${API_URL}/ai/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt })
  });
  if (!res.ok) throw new Error('Failed to generate AI session');
  return res.json();
};
