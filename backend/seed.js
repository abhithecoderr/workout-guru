require('dotenv').config();
const mongoose = require('mongoose');
const Exercise = require('./src/models/Exercise');
const Session = require('./src/models/Session');
const Routine = require('./src/models/Routine');
const connectDB = require('./src/config/db');

const mockExercises = [
  {
    "name": "Burpees",
    "slug": "burpees",
    "description": "A great exercise focusing on Full Body & Cardio.",
    "focusArea": "Full Body & Cardio",
    "mediaUrl": "",
    "audioUrl": "",
    "defaultReps": 11,
    "defaultSets": 3,
    "durationSeconds": 58,
    "isTimeBased": false
  },
  {
    "name": "Mountain Climbers",
    "slug": "mountain-climbers",
    "description": "A great exercise focusing on Full Body & Cardio.",
    "focusArea": "Full Body & Cardio",
    "mediaUrl": "",
    "audioUrl": "",
    "defaultReps": 0,
    "defaultSets": 3,
    "durationSeconds": 50,
    "isTimeBased": true
  },
  {
    "name": "Jumping Jacks",
    "slug": "jumping-jacks",
    "description": "A great exercise focusing on Full Body & Cardio.",
    "focusArea": "Full Body & Cardio",
    "mediaUrl": "",
    "audioUrl": "",
    "defaultReps": 0,
    "defaultSets": 3,
    "durationSeconds": 56,
    "isTimeBased": true
  },
  {
    "name": "Bear Crawls",
    "slug": "bear-crawls",
    "description": "A great exercise focusing on Full Body & Cardio.",
    "focusArea": "Full Body & Cardio",
    "mediaUrl": "",
    "audioUrl": "",
    "defaultReps": 0,
    "defaultSets": 3,
    "durationSeconds": 44,
    "isTimeBased": true
  },
  {
    "name": "Inchworms",
    "slug": "inchworms",
    "description": "A great exercise focusing on Full Body & Cardio.",
    "focusArea": "Full Body & Cardio",
    "mediaUrl": "",
    "audioUrl": "",
    "defaultReps": 11,
    "defaultSets": 3,
    "durationSeconds": 48,
    "isTimeBased": false
  },
  {
    "name": "High Knees",
    "slug": "high-knees",
    "description": "A great exercise focusing on Full Body & Cardio.",
    "focusArea": "Full Body & Cardio",
    "mediaUrl": "",
    "audioUrl": "",
    "defaultReps": 0,
    "defaultSets": 3,
    "durationSeconds": 40,
    "isTimeBased": true
  },
  {
    "name": "Jump Rope",
    "slug": "jump-rope",
    "description": "A great exercise focusing on Full Body & Cardio.",
    "focusArea": "Full Body & Cardio",
    "mediaUrl": "",
    "audioUrl": "",
    "defaultReps": 0,
    "defaultSets": 3,
    "durationSeconds": 50,
    "isTimeBased": true
  },
  {
    "name": "Box Jumps",
    "slug": "box-jumps",
    "description": "A great exercise focusing on Full Body & Cardio.",
    "focusArea": "Full Body & Cardio",
    "mediaUrl": "",
    "audioUrl": "",
    "defaultReps": 8,
    "defaultSets": 3,
    "durationSeconds": 59,
    "isTimeBased": false
  },
  {
    "name": "Kettlebell Swings",
    "slug": "kettlebell-swings",
    "description": "A great exercise focusing on Full Body & Cardio.",
    "focusArea": "Full Body & Cardio",
    "mediaUrl": "",
    "audioUrl": "",
    "defaultReps": 17,
    "defaultSets": 3,
    "durationSeconds": 59,
    "isTimeBased": false
  },
  {
    "name": "Rowing",
    "slug": "rowing",
    "description": "A great exercise focusing on Full Body & Cardio.",
    "focusArea": "Full Body & Cardio",
    "mediaUrl": "",
    "audioUrl": "",
    "defaultReps": 0,
    "defaultSets": 3,
    "durationSeconds": 55,
    "isTimeBased": true
  },
  {
    "name": "Shadow Boxing",
    "slug": "shadow-boxing",
    "description": "A great exercise focusing on Full Body & Cardio.",
    "focusArea": "Full Body & Cardio",
    "mediaUrl": "",
    "audioUrl": "",
    "defaultReps": 0,
    "defaultSets": 3,
    "durationSeconds": 46,
    "isTimeBased": true
  },
  {
    "name": "Sprint Intervals",
    "slug": "sprint-intervals",
    "description": "A great exercise focusing on Full Body & Cardio.",
    "focusArea": "Full Body & Cardio",
    "mediaUrl": "",
    "audioUrl": "",
    "defaultReps": 0,
    "defaultSets": 3,
    "durationSeconds": 43,
    "isTimeBased": true
  },
  {
    "name": "Skaters",
    "slug": "skaters",
    "description": "A great exercise focusing on Full Body & Cardio.",
    "focusArea": "Full Body & Cardio",
    "mediaUrl": "",
    "audioUrl": "",
    "defaultReps": 17,
    "defaultSets": 3,
    "durationSeconds": 58,
    "isTimeBased": false
  },
  {
    "name": "Tuck Jumps",
    "slug": "tuck-jumps",
    "description": "A great exercise focusing on Full Body & Cardio.",
    "focusArea": "Full Body & Cardio",
    "mediaUrl": "",
    "audioUrl": "",
    "defaultReps": 8,
    "defaultSets": 3,
    "durationSeconds": 52,
    "isTimeBased": false
  },
  {
    "name": "Broad Jumps",
    "slug": "broad-jumps",
    "description": "A great exercise focusing on Full Body & Cardio.",
    "focusArea": "Full Body & Cardio",
    "mediaUrl": "",
    "audioUrl": "",
    "defaultReps": 8,
    "defaultSets": 3,
    "durationSeconds": 46,
    "isTimeBased": false
  },
  {
    "name": "Air Squats",
    "slug": "air-squats",
    "description": "A great exercise focusing on Lower Body (Legs & Glutes).",
    "focusArea": "Lower Body (Legs & Glutes)",
    "mediaUrl": "",
    "audioUrl": "",
    "defaultReps": 10,
    "defaultSets": 3,
    "durationSeconds": 45,
    "isTimeBased": false
  },
  {
    "name": "Reverse Lunges",
    "slug": "reverse-lunges",
    "description": "A great exercise focusing on Lower Body (Legs & Glutes).",
    "focusArea": "Lower Body (Legs & Glutes)",
    "mediaUrl": "",
    "audioUrl": "",
    "defaultReps": 12,
    "defaultSets": 3,
    "durationSeconds": 45,
    "isTimeBased": false
  },
  {
    "name": "Glute Bridges",
    "slug": "glute-bridges",
    "description": "A great exercise focusing on Lower Body (Legs & Glutes).",
    "focusArea": "Lower Body (Legs & Glutes)",
    "mediaUrl": "",
    "audioUrl": "",
    "defaultReps": 10,
    "defaultSets": 3,
    "durationSeconds": 43,
    "isTimeBased": false
  },
  {
    "name": "Bulgarian Split Squats",
    "slug": "bulgarian-split-squats",
    "description": "A great exercise focusing on Lower Body (Legs & Glutes).",
    "focusArea": "Lower Body (Legs & Glutes)",
    "mediaUrl": "",
    "audioUrl": "",
    "defaultReps": 13,
    "defaultSets": 3,
    "durationSeconds": 48,
    "isTimeBased": false
  },
  {
    "name": "Calf Raises",
    "slug": "calf-raises",
    "description": "A great exercise focusing on Lower Body (Legs & Glutes).",
    "focusArea": "Lower Body (Legs & Glutes)",
    "mediaUrl": "",
    "audioUrl": "",
    "defaultReps": 12,
    "defaultSets": 3,
    "durationSeconds": 42,
    "isTimeBased": false
  },
  {
    "name": "Forward Lunges",
    "slug": "forward-lunges",
    "description": "A great exercise focusing on Lower Body (Legs & Glutes).",
    "focusArea": "Lower Body (Legs & Glutes)",
    "mediaUrl": "",
    "audioUrl": "",
    "defaultReps": 16,
    "defaultSets": 3,
    "durationSeconds": 57,
    "isTimeBased": false
  },
  {
    "name": "Sumo Squats",
    "slug": "sumo-squats",
    "description": "A great exercise focusing on Lower Body (Legs & Glutes).",
    "focusArea": "Lower Body (Legs & Glutes)",
    "mediaUrl": "",
    "audioUrl": "",
    "defaultReps": 10,
    "defaultSets": 3,
    "durationSeconds": 58,
    "isTimeBased": false
  },
  {
    "name": "Walking Lunges",
    "slug": "walking-lunges",
    "description": "A great exercise focusing on Lower Body (Legs & Glutes).",
    "focusArea": "Lower Body (Legs & Glutes)",
    "mediaUrl": "",
    "audioUrl": "",
    "defaultReps": 9,
    "defaultSets": 3,
    "durationSeconds": 42,
    "isTimeBased": false
  },
  {
    "name": "Romanian Deadlifts",
    "slug": "romanian-deadlifts",
    "description": "A great exercise focusing on Lower Body (Legs & Glutes).",
    "focusArea": "Lower Body (Legs & Glutes)",
    "mediaUrl": "",
    "audioUrl": "",
    "defaultReps": 12,
    "defaultSets": 3,
    "durationSeconds": 33,
    "isTimeBased": false
  },
  {
    "name": "Step-ups",
    "slug": "step-ups",
    "description": "A great exercise focusing on Lower Body (Legs & Glutes).",
    "focusArea": "Lower Body (Legs & Glutes)",
    "mediaUrl": "",
    "audioUrl": "",
    "defaultReps": 8,
    "defaultSets": 3,
    "durationSeconds": 32,
    "isTimeBased": false
  },
  {
    "name": "Goblet Squats",
    "slug": "goblet-squats",
    "description": "A great exercise focusing on Lower Body (Legs & Glutes).",
    "focusArea": "Lower Body (Legs & Glutes)",
    "mediaUrl": "",
    "audioUrl": "",
    "defaultReps": 11,
    "defaultSets": 3,
    "durationSeconds": 32,
    "isTimeBased": false
  },
  {
    "name": "Leg Press",
    "slug": "leg-press",
    "description": "A great exercise focusing on Lower Body (Legs & Glutes).",
    "focusArea": "Lower Body (Legs & Glutes)",
    "mediaUrl": "",
    "audioUrl": "",
    "defaultReps": 17,
    "defaultSets": 3,
    "durationSeconds": 42,
    "isTimeBased": false
  },
  {
    "name": "Hamstring Curls",
    "slug": "hamstring-curls",
    "description": "A great exercise focusing on Lower Body (Legs & Glutes).",
    "focusArea": "Lower Body (Legs & Glutes)",
    "mediaUrl": "",
    "audioUrl": "",
    "defaultReps": 12,
    "defaultSets": 3,
    "durationSeconds": 35,
    "isTimeBased": false
  },
  {
    "name": "Donkey Kicks",
    "slug": "donkey-kicks",
    "description": "A great exercise focusing on Lower Body (Legs & Glutes).",
    "focusArea": "Lower Body (Legs & Glutes)",
    "mediaUrl": "",
    "audioUrl": "",
    "defaultReps": 8,
    "defaultSets": 3,
    "durationSeconds": 58,
    "isTimeBased": false
  },
  {
    "name": "Pistol Squats",
    "slug": "pistol-squats",
    "description": "A great exercise focusing on Lower Body (Legs & Glutes).",
    "focusArea": "Lower Body (Legs & Glutes)",
    "mediaUrl": "",
    "audioUrl": "",
    "defaultReps": 15,
    "defaultSets": 3,
    "durationSeconds": 36,
    "isTimeBased": false
  },
  {
    "name": "Standard Push-ups",
    "slug": "standard-push-ups",
    "description": "A great exercise focusing on Upper Body (Push & Pull).",
    "focusArea": "Upper Body (Push & Pull)",
    "mediaUrl": "",
    "audioUrl": "",
    "defaultReps": 8,
    "defaultSets": 3,
    "durationSeconds": 45,
    "isTimeBased": false
  },
  {
    "name": "Pike Push-ups",
    "slug": "pike-push-ups",
    "description": "A great exercise focusing on Upper Body (Push & Pull).",
    "focusArea": "Upper Body (Push & Pull)",
    "mediaUrl": "",
    "audioUrl": "",
    "defaultReps": 16,
    "defaultSets": 3,
    "durationSeconds": 47,
    "isTimeBased": false
  },
  {
    "name": "Diamond Push-ups",
    "slug": "diamond-push-ups",
    "description": "A great exercise focusing on Upper Body (Push & Pull).",
    "focusArea": "Upper Body (Push & Pull)",
    "mediaUrl": "",
    "audioUrl": "",
    "defaultReps": 15,
    "defaultSets": 3,
    "durationSeconds": 47,
    "isTimeBased": false
  },
  {
    "name": "Tricep Dips",
    "slug": "tricep-dips",
    "description": "A great exercise focusing on Upper Body (Push & Pull).",
    "focusArea": "Upper Body (Push & Pull)",
    "mediaUrl": "",
    "audioUrl": "",
    "defaultReps": 13,
    "defaultSets": 3,
    "durationSeconds": 47,
    "isTimeBased": false
  },
  {
    "name": "Superman",
    "slug": "superman",
    "description": "A great exercise focusing on Upper Body (Push & Pull).",
    "focusArea": "Upper Body (Push & Pull)",
    "mediaUrl": "",
    "audioUrl": "",
    "defaultReps": 17,
    "defaultSets": 3,
    "durationSeconds": 59,
    "isTimeBased": false
  },
  {
    "name": "Pull-ups",
    "slug": "pull-ups",
    "description": "A great exercise focusing on Upper Body (Push & Pull).",
    "focusArea": "Upper Body (Push & Pull)",
    "mediaUrl": "",
    "audioUrl": "",
    "defaultReps": 14,
    "defaultSets": 3,
    "durationSeconds": 39,
    "isTimeBased": false
  },
  {
    "name": "Chin-ups",
    "slug": "chin-ups",
    "description": "A great exercise focusing on Upper Body (Push & Pull).",
    "focusArea": "Upper Body (Push & Pull)",
    "mediaUrl": "",
    "audioUrl": "",
    "defaultReps": 13,
    "defaultSets": 3,
    "durationSeconds": 38,
    "isTimeBased": false
  },
  {
    "name": "Dumbbell Rows",
    "slug": "dumbbell-rows",
    "description": "A great exercise focusing on Upper Body (Push & Pull).",
    "focusArea": "Upper Body (Push & Pull)",
    "mediaUrl": "",
    "audioUrl": "",
    "defaultReps": 12,
    "defaultSets": 3,
    "durationSeconds": 33,
    "isTimeBased": false
  },
  {
    "name": "Overhead Press",
    "slug": "overhead-press",
    "description": "A great exercise focusing on Upper Body (Push & Pull).",
    "focusArea": "Upper Body (Push & Pull)",
    "mediaUrl": "",
    "audioUrl": "",
    "defaultReps": 13,
    "defaultSets": 3,
    "durationSeconds": 30,
    "isTimeBased": false
  },
  {
    "name": "Lateral Raises",
    "slug": "lateral-raises",
    "description": "A great exercise focusing on Upper Body (Push & Pull).",
    "focusArea": "Upper Body (Push & Pull)",
    "mediaUrl": "",
    "audioUrl": "",
    "defaultReps": 16,
    "defaultSets": 3,
    "durationSeconds": 45,
    "isTimeBased": false
  },
  {
    "name": "Bicep Curls",
    "slug": "bicep-curls",
    "description": "A great exercise focusing on Upper Body (Push & Pull).",
    "focusArea": "Upper Body (Push & Pull)",
    "mediaUrl": "",
    "audioUrl": "",
    "defaultReps": 9,
    "defaultSets": 3,
    "durationSeconds": 43,
    "isTimeBased": false
  },
  {
    "name": "Tricep Extensions",
    "slug": "tricep-extensions",
    "description": "A great exercise focusing on Upper Body (Push & Pull).",
    "focusArea": "Upper Body (Push & Pull)",
    "mediaUrl": "",
    "audioUrl": "",
    "defaultReps": 14,
    "defaultSets": 3,
    "durationSeconds": 50,
    "isTimeBased": false
  },
  {
    "name": "Chest Press",
    "slug": "chest-press",
    "description": "A great exercise focusing on Upper Body (Push & Pull).",
    "focusArea": "Upper Body (Push & Pull)",
    "mediaUrl": "",
    "audioUrl": "",
    "defaultReps": 14,
    "defaultSets": 3,
    "durationSeconds": 36,
    "isTimeBased": false
  },
  {
    "name": "Front Raises",
    "slug": "front-raises",
    "description": "A great exercise focusing on Upper Body (Push & Pull).",
    "focusArea": "Upper Body (Push & Pull)",
    "mediaUrl": "",
    "audioUrl": "",
    "defaultReps": 16,
    "defaultSets": 3,
    "durationSeconds": 30,
    "isTimeBased": false
  },
  {
    "name": "Renegade Rows",
    "slug": "renegade-rows",
    "description": "A great exercise focusing on Upper Body (Push & Pull).",
    "focusArea": "Upper Body (Push & Pull)",
    "mediaUrl": "",
    "audioUrl": "",
    "defaultReps": 17,
    "defaultSets": 3,
    "durationSeconds": 35,
    "isTimeBased": false
  },
  {
    "name": "Forearm Plank",
    "slug": "forearm-plank",
    "description": "A great exercise focusing on Core & Abs.",
    "focusArea": "Core & Abs",
    "mediaUrl": "",
    "audioUrl": "",
    "defaultReps": 0,
    "defaultSets": 3,
    "durationSeconds": 34,
    "isTimeBased": true
  },
  {
    "name": "Bicycle Crunches",
    "slug": "bicycle-crunches",
    "description": "A great exercise focusing on Core & Abs.",
    "focusArea": "Core & Abs",
    "mediaUrl": "",
    "audioUrl": "",
    "defaultReps": 11,
    "defaultSets": 3,
    "durationSeconds": 47,
    "isTimeBased": false
  },
  {
    "name": "Hollow Body Hold",
    "slug": "hollow-body-hold",
    "description": "A great exercise focusing on Core & Abs.",
    "focusArea": "Core & Abs",
    "mediaUrl": "",
    "audioUrl": "",
    "defaultReps": 0,
    "defaultSets": 3,
    "durationSeconds": 51,
    "isTimeBased": true
  },
  {
    "name": "Leg Raises",
    "slug": "leg-raises",
    "description": "A great exercise focusing on Core & Abs.",
    "focusArea": "Core & Abs",
    "mediaUrl": "",
    "audioUrl": "",
    "defaultReps": 12,
    "defaultSets": 3,
    "durationSeconds": 50,
    "isTimeBased": false
  },
  {
    "name": "Russian Twists",
    "slug": "russian-twists",
    "description": "A great exercise focusing on Core & Abs.",
    "focusArea": "Core & Abs",
    "mediaUrl": "",
    "audioUrl": "",
    "defaultReps": 12,
    "defaultSets": 3,
    "durationSeconds": 46,
    "isTimeBased": false
  },
  {
    "name": "V-ups",
    "slug": "v-ups",
    "description": "A great exercise focusing on Core & Abs.",
    "focusArea": "Core & Abs",
    "mediaUrl": "",
    "audioUrl": "",
    "defaultReps": 15,
    "defaultSets": 3,
    "durationSeconds": 51,
    "isTimeBased": false
  },
  {
    "name": "Dead Bug",
    "slug": "dead-bug",
    "description": "A great exercise focusing on Core & Abs.",
    "focusArea": "Core & Abs",
    "mediaUrl": "",
    "audioUrl": "",
    "defaultReps": 13,
    "defaultSets": 3,
    "durationSeconds": 42,
    "isTimeBased": false
  },
  {
    "name": "Flutter Kicks",
    "slug": "flutter-kicks",
    "description": "A great exercise focusing on Core & Abs.",
    "focusArea": "Core & Abs",
    "mediaUrl": "",
    "audioUrl": "",
    "defaultReps": 10,
    "defaultSets": 3,
    "durationSeconds": 32,
    "isTimeBased": false
  },
  {
    "name": "Sit-ups",
    "slug": "sit-ups",
    "description": "A great exercise focusing on Core & Abs.",
    "focusArea": "Core & Abs",
    "mediaUrl": "",
    "audioUrl": "",
    "defaultReps": 17,
    "defaultSets": 3,
    "durationSeconds": 44,
    "isTimeBased": false
  },
  {
    "name": "Side Plank",
    "slug": "side-plank",
    "description": "A great exercise focusing on Core & Abs.",
    "focusArea": "Core & Abs",
    "mediaUrl": "",
    "audioUrl": "",
    "defaultReps": 0,
    "defaultSets": 3,
    "durationSeconds": 43,
    "isTimeBased": true
  },
  {
    "name": "Toe Touches",
    "slug": "toe-touches",
    "description": "A great exercise focusing on Core & Abs.",
    "focusArea": "Core & Abs",
    "mediaUrl": "",
    "audioUrl": "",
    "defaultReps": 9,
    "defaultSets": 3,
    "durationSeconds": 36,
    "isTimeBased": false
  },
  {
    "name": "Crunch Pulses",
    "slug": "crunch-pulses",
    "description": "A great exercise focusing on Core & Abs.",
    "focusArea": "Core & Abs",
    "mediaUrl": "",
    "audioUrl": "",
    "defaultReps": 17,
    "defaultSets": 3,
    "durationSeconds": 57,
    "isTimeBased": false
  },
  {
    "name": "Bird Dog",
    "slug": "bird-dog",
    "description": "A great exercise focusing on Core & Abs.",
    "focusArea": "Core & Abs",
    "mediaUrl": "",
    "audioUrl": "",
    "defaultReps": 10,
    "defaultSets": 3,
    "durationSeconds": 41,
    "isTimeBased": false
  },
  {
    "name": "Windshield Wipers",
    "slug": "windshield-wipers",
    "description": "A great exercise focusing on Core & Abs.",
    "focusArea": "Core & Abs",
    "mediaUrl": "",
    "audioUrl": "",
    "defaultReps": 16,
    "defaultSets": 3,
    "durationSeconds": 35,
    "isTimeBased": false
  },
  {
    "name": "Ab Wheel Rollouts",
    "slug": "ab-wheel-rollouts",
    "description": "A great exercise focusing on Core & Abs.",
    "focusArea": "Core & Abs",
    "mediaUrl": "",
    "audioUrl": "",
    "defaultReps": 12,
    "defaultSets": 3,
    "durationSeconds": 42,
    "isTimeBased": false
  }
];

const seedDB = async () => {
  try {
    await connectDB();

    // Clear existing data
    await Exercise.deleteMany({});
    await Session.deleteMany({});
    await Routine.deleteMany({});
    console.log('Cleared existing data.');

    // Insert exercises
    const insertedExercises = await Exercise.insertMany(mockExercises);
    console.log('Added 60 Mock Exercises.');

    // Create 3 Routines per focus area
    const routinesToInsert = [];
    const focusAreas = ["Full Body & Cardio", "Lower Body (Legs & Glutes)", "Upper Body (Push & Pull)", "Core & Abs"];
    
    focusAreas.forEach(area => {
      const areaExercises = insertedExercises.filter(ex => ex.focusArea === area);
      
      routinesToInsert.push({
        title: `Beginner ${area.split(' ')[0]} Routine`,
        description: `A gentle introduction to ${area} exercises.`,
        focusArea: area,
        isPremade: true,
        exercises: areaExercises.slice(0, 4).map(ex => ({
          exerciseId: ex._id,
          defaultReps: ex.defaultReps,
          defaultSets: 2,
          durationSeconds: ex.durationSeconds
        }))
      });

      routinesToInsert.push({
        title: `Intermediate ${area.split(' ')[0]} Blast`,
        description: `A solid workout pushing your ${area} limits.`,
        focusArea: area,
        isPremade: true,
        exercises: areaExercises.slice(4, 9).map(ex => ({
          exerciseId: ex._id,
          defaultReps: ex.defaultReps,
          defaultSets: 3,
          durationSeconds: ex.durationSeconds
        }))
      });

      routinesToInsert.push({
        title: `Advanced ${area.split(' ')[0]} Crusher`,
        description: `High intensity ${area} routine for maximum growth.`,
        focusArea: area,
        isPremade: true,
        exercises: areaExercises.slice(9, 15).map(ex => ({
          exerciseId: ex._id,
          defaultReps: ex.defaultReps,
          defaultSets: 4,
          durationSeconds: ex.durationSeconds
        }))
      });
    });

    await Routine.insertMany(routinesToInsert);
    console.log('Added 12 Premade Routines (3 per focus area).');

    console.log('Database Seeded Successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding Error:', error);
    process.exit(1);
  }
};

seedDB();
