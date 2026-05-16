import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Card from '../components/Card';

const ActiveSession = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const exercises = location.state?.exercises || [];
  const focusArea = location.state?.focusArea || 'Workout';

  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [countdown, setCountdown] = useState(0); // For the 3..2..1 flash

  // Redirect to home if accessed directly without state
  useEffect(() => {
    if (exercises.length === 0) {
      navigate('/');
    }
  }, [exercises, navigate]);

  const currentExercise = exercises[currentIndex];

  useEffect(() => {
    if (currentExercise) {
      if (currentExercise.isTimeBased) {
        setTimeLeft(currentExercise.adjustedDuration || 0);
        setTimerActive(false);
        setCountdown(3); // Initiate countdown flash
      } else {
        setTimeLeft(0);
        setTimerActive(false);
        setCountdown(0);
      }
    }
  }, [currentIndex, currentExercise]);

  // Handle 3..2..1 countdown
  useEffect(() => {
    if (countdown > 0) {
      const id = setTimeout(() => setCountdown(c => c - 1), 1000);
      return () => clearTimeout(id);
    } else if (countdown === 0 && currentExercise?.isTimeBased && !timerActive && timeLeft > 0) {
      // Auto-start actual timer when countdown finishes
      setTimerActive(true);
    }
  }, [countdown, currentExercise, timerActive, timeLeft]);

  // Handle actual timer
  useEffect(() => {
    let interval;
    if (timerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setTimerActive(false);
    }
    return () => clearInterval(interval);
  }, [timerActive, timeLeft]);

  if (!currentExercise) return null;

  const handleNext = () => {
    if (currentIndex < exercises.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const handleComplete = () => {
    const history = JSON.parse(localStorage.getItem('workoutHistory') || '[]');
    const newEntry = {
      id: Date.now(),
      date: new Date().toISOString(),
      focusArea,
      exercisesCompleted: exercises.length,
      sessionDetails: exercises
    };
    localStorage.setItem('workoutHistory', JSON.stringify([...history, newEntry]));
    
    alert("Workout Completed! Saved to Personal History.");
    navigate('/');
  };

  return (
    <div style={{ padding: '1rem', maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <span style={{ color: 'var(--text-muted)' }}>{focusArea}</span>
        <span style={{ color: 'var(--accent-primary)', fontWeight: 'bold' }}>{currentIndex + 1} / {exercises.length}</span>
      </div>

      <h1 style={{ marginBottom: '0.5rem', fontSize: 'var(--text-3xl)' }}>{currentExercise.name}</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>{currentExercise.description}</p>

      {/* Media Placeholder */}
      <div style={{ 
        width: '100%', 
        height: '250px', 
        backgroundColor: 'var(--bg-tertiary)', 
        borderRadius: '12px', 
        marginBottom: '2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '1px solid var(--border-color)',
        overflow: 'hidden'
      }}>
        {currentExercise.mediaUrl ? (
          <video src={currentExercise.mediaUrl} autoPlay loop muted style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <span style={{ color: 'var(--text-muted)' }}>Video / GIF Placeholder</span>
        )}
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Sets</span>
          <span style={{ fontSize: 'var(--text-2xl)', fontWeight: 'bold' }}>{currentExercise.adjustedSets}</span>
        </div>
        
        {!currentExercise.isTimeBased && (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Reps</span>
            <span style={{ fontSize: 'var(--text-2xl)', fontWeight: 'bold' }}>{currentExercise.adjustedReps}</span>
          </div>
        )}
      </div>

      {currentExercise.isTimeBased && (
        <Card style={{ marginBottom: '2rem', textAlign: 'center', borderColor: timerActive ? 'var(--accent-primary)' : 'var(--border-color)', position: 'relative', overflow: 'hidden' }}>
          
          {/* Countdown Overlay */}
          {countdown > 0 && (
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
              backgroundColor: 'rgba(10, 10, 10, 0.9)', zIndex: 10,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '4rem', fontWeight: 'bold', color: 'var(--accent-primary)',
              animation: 'pulse 1s infinite'
            }}>
              {countdown}
            </div>
          )}

          <div style={{ fontSize: 'var(--text-4xl)', fontWeight: 'bold', fontFamily: 'monospace', color: timeLeft === 0 ? 'var(--success)' : 'var(--text-primary)' }}>
            {Math.floor(timeLeft / 60).toString().padStart(2, '0')}:{(timeLeft % 60).toString().padStart(2, '0')}
          </div>
          <Button 
            variant={timerActive ? 'secondary' : 'primary'} 
            style={{ marginTop: '1rem', width: '200px' }}
            onClick={() => {
              if (timeLeft === 0) {
                setTimeLeft(currentExercise.adjustedDuration);
                setCountdown(3); // restart full sequence
              } else {
                setTimerActive(!timerActive);
              }
            }}
          >
            {timerActive ? 'Pause Timer' : (timeLeft === 0 ? 'Reset Timer' : 'Start Timer')}
          </Button>
        </Card>
      )}

      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
        <Button variant="secondary" onClick={handlePrev} disabled={currentIndex === 0} style={{ flex: 1 }}>
          Previous
        </Button>

        {currentIndex === exercises.length - 1 ? (
          <Button variant="primary" onClick={handleComplete} style={{ flex: 2, backgroundColor: 'var(--success)', color: '#fff', border: 'none', boxShadow: '0 4px 14px 0 rgba(34, 197, 94, 0.4)' }}>
            Complete Workout
          </Button>
        ) : (
          <Button variant="primary" onClick={handleNext} style={{ flex: 2 }}>
            Next Exercise
          </Button>
        )}
      </div>
    </div>
  );
};

export default ActiveSession;
