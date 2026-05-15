require('dotenv').config();
const mongoose = require('mongoose');
const Exercise = require('./src/models/Exercise');
const Session = require('./src/models/Session');
const connectDB = require('./src/config/db');

const mockExercises = [
  // Full Body & Cardio
  { name: "Burpees", slug: "burpees", description: "The gold standard for full-body conditioning.", focusArea: "Full Body & Cardio", mediaUrl: "", audioUrl: "", defaultReps: 15, defaultSets: 3, durationSeconds: 60 },
  { name: "Mountain Climbers", slug: "mountain-climbers", description: "Great for core stability and cardiovascular endurance.", focusArea: "Full Body & Cardio", mediaUrl: "", audioUrl: "", defaultReps: 30, defaultSets: 3, durationSeconds: 45 },
  { name: "Jumping Jacks", slug: "jumping-jacks", description: "A classic plyometric move for warming up the entire body.", focusArea: "Full Body & Cardio", mediaUrl: "", audioUrl: "", defaultReps: 40, defaultSets: 3, durationSeconds: 60 },
  { name: "Bear Crawls", slug: "bear-crawls", description: "Excellent for shoulder stability, core, and coordination.", focusArea: "Full Body & Cardio", mediaUrl: "", audioUrl: "", defaultReps: 1, defaultSets: 3, durationSeconds: 45 },
  { name: "Inchworms", slug: "inchworms", description: "Stretches the hamstrings while engaging the arms and core.", focusArea: "Full Body & Cardio", mediaUrl: "", audioUrl: "", defaultReps: 10, defaultSets: 3, durationSeconds: 60 },

  // Lower Body (Legs & Glutes)
  { name: "Air Squats", slug: "air-squats", description: "Focus on keeping your weight in your heels and chest up.", focusArea: "Lower Body (Legs & Glutes)", mediaUrl: "", audioUrl: "", defaultReps: 20, defaultSets: 4, durationSeconds: 45 },
  { name: "Reverse Lunges", slug: "reverse-lunges", description: "Easier on the knees than forward lunges and great for glute activation.", focusArea: "Lower Body (Legs & Glutes)", mediaUrl: "", audioUrl: "", defaultReps: 12, defaultSets: 4, durationSeconds: 60 },
  { name: "Glute Bridges", slug: "glute-bridges", description: "Perfect for isolating the posterior chain while lying down.", focusArea: "Lower Body (Legs & Glutes)", mediaUrl: "", audioUrl: "", defaultReps: 15, defaultSets: 3, durationSeconds: 45 },
  { name: "Bulgarian Split Squats", slug: "bulgarian-split-squats", description: "Use a couch or chair to elevate your rear foot for an intense quad burn.", focusArea: "Lower Body (Legs & Glutes)", mediaUrl: "", audioUrl: "", defaultReps: 10, defaultSets: 3, durationSeconds: 60 },
  { name: "Calf Raises", slug: "calf-raises", description: "Can be done on flat ground or the edge of a step for more range of motion.", focusArea: "Lower Body (Legs & Glutes)", mediaUrl: "", audioUrl: "", defaultReps: 25, defaultSets: 3, durationSeconds: 45 },

  // Upper Body (Push & Pull)
  { name: "Standard Push-ups", slug: "standard-push-ups", description: "The foundational move for chest and triceps.", focusArea: "Upper Body (Push & Pull)", mediaUrl: "", audioUrl: "", defaultReps: 15, defaultSets: 3, durationSeconds: 45 },
  { name: "Pike Push-ups", slug: "pike-push-ups", description: "Shift your hips up into a \"V\" shape to target the shoulders.", focusArea: "Upper Body (Push & Pull)", mediaUrl: "", audioUrl: "", defaultReps: 10, defaultSets: 3, durationSeconds: 45 },
  { name: "Diamond Push-ups", slug: "diamond-push-ups", description: "Bring your hands together to emphasize the triceps.", focusArea: "Upper Body (Push & Pull)", mediaUrl: "", audioUrl: "", defaultReps: 10, defaultSets: 3, durationSeconds: 45 },
  { name: "Tricep Dips", slug: "tricep-dips", description: "Use a sturdy chair or the edge of a bed to work the back of the arms.", focusArea: "Upper Body (Push & Pull)", mediaUrl: "", audioUrl: "", defaultReps: 12, defaultSets: 3, durationSeconds: 45 },
  { name: "Superman", slug: "superman", description: "Lie on your stomach and lift your arms/legs to target the lower back and lats.", focusArea: "Upper Body (Push & Pull)", mediaUrl: "", audioUrl: "", defaultReps: 15, defaultSets: 3, durationSeconds: 60 },

  // Core & Abs
  { name: "Forearm Plank", slug: "forearm-plank", description: "A fundamental isometric hold for total core tension.", focusArea: "Core & Abs", mediaUrl: "", audioUrl: "", defaultReps: 1, defaultSets: 3, durationSeconds: 60 },
  { name: "Bicycle Crunches", slug: "bicycle-crunches", description: "Targets both the rectus abdominis and the obliques.", focusArea: "Core & Abs", mediaUrl: "", audioUrl: "", defaultReps: 30, defaultSets: 3, durationSeconds: 45 },
  { name: "Hollow Body Hold", slug: "hollow-body-hold", description: "A gymnastics-based move that creates incredible core strength.", focusArea: "Core & Abs", mediaUrl: "", audioUrl: "", defaultReps: 1, defaultSets: 3, durationSeconds: 45 },
  { name: "Leg Raises", slug: "leg-raises", description: "Focus on keeping your lower back pressed into the floor.", focusArea: "Core & Abs", mediaUrl: "", audioUrl: "", defaultReps: 15, defaultSets: 3, durationSeconds: 45 },
  { name: "Russian Twists", slug: "russian-twists", description: "Great for rotational strength and hitting the side abs.", focusArea: "Core & Abs", mediaUrl: "", audioUrl: "", defaultReps: 20, defaultSets: 3, durationSeconds: 45 }
];

const seedDB = async () => {
  try {
    await connectDB();

    // Clear existing data
    await Exercise.deleteMany({});
    await Session.deleteMany({});
    console.log('Cleared existing data.');

    // Insert exercises
    const insertedExercises = await Exercise.insertMany(mockExercises);
    console.log('Added Mock Exercises.');

    // Create a mock Session using the inserted exercises
    const sampleSession = new Session({
      title: "Beginner Full Body Blast",
      description: "A quick 15-minute full body starter workout.",
      focusArea: "Full Body & Cardio",
      isAiGenerated: false,
      exercises: [
        {
          exerciseId: insertedExercises[0]._id, // Burpees
          adjustedReps: 10,
          adjustedSets: 2,
          adjustedDuration: 30
        },
        {
          exerciseId: insertedExercises[5]._id, // Air Squats
          adjustedReps: 15,
          adjustedSets: 2,
          adjustedDuration: 45
        }
      ]
    });

    await sampleSession.save();
    console.log('Added Mock Session.');

    console.log('Database Seeded Successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding Error:', error);
    process.exit(1);
  }
};

seedDB();
