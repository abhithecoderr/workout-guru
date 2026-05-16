const fs = require('fs');

const exercises = [];
const focusAreas = ["Full Body & Cardio", "Lower Body (Legs & Glutes)", "Upper Body (Push & Pull)", "Core & Abs"];

const baseExercises = {
  "Full Body & Cardio": [
    "Burpees", "Mountain Climbers", "Jumping Jacks", "Bear Crawls", "Inchworms",
    "High Knees", "Jump Rope", "Box Jumps", "Kettlebell Swings", "Rowing",
    "Shadow Boxing", "Sprint Intervals", "Skaters", "Tuck Jumps", "Broad Jumps"
  ],
  "Lower Body (Legs & Glutes)": [
    "Air Squats", "Reverse Lunges", "Glute Bridges", "Bulgarian Split Squats", "Calf Raises",
    "Forward Lunges", "Sumo Squats", "Walking Lunges", "Romanian Deadlifts", "Step-ups",
    "Goblet Squats", "Leg Press", "Hamstring Curls", "Donkey Kicks", "Pistol Squats"
  ],
  "Upper Body (Push & Pull)": [
    "Standard Push-ups", "Pike Push-ups", "Diamond Push-ups", "Tricep Dips", "Superman",
    "Pull-ups", "Chin-ups", "Dumbbell Rows", "Overhead Press", "Lateral Raises",
    "Bicep Curls", "Tricep Extensions", "Chest Press", "Front Raises", "Renegade Rows"
  ],
  "Core & Abs": [
    "Forearm Plank", "Bicycle Crunches", "Hollow Body Hold", "Leg Raises", "Russian Twists",
    "V-ups", "Dead Bug", "Flutter Kicks", "Sit-ups", "Side Plank",
    "Toe Touches", "Crunch Pulses", "Bird Dog", "Windshield Wipers", "Ab Wheel Rollouts"
  ]
};

const timeBasedNames = [
  "Mountain Climbers", "Jumping Jacks", "Bear Crawls", "High Knees", "Jump Rope", 
  "Rowing", "Shadow Boxing", "Sprint Intervals", "Forearm Plank", "Hollow Body Hold",
  "Side Plank", "Wall Sit"
];

for (const area of focusAreas) {
  baseExercises[area].forEach((name, i) => {
    const isTimeBased = timeBasedNames.includes(name);
    exercises.push({
      name,
      slug: name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]/g, ''),
      description: `A great exercise focusing on ${area}.`,
      focusArea: area,
      mediaUrl: "",
      audioUrl: "",
      defaultReps: isTimeBased ? 0 : Math.floor(Math.random() * 10) + 8,
      defaultSets: 3,
      durationSeconds: Math.floor(Math.random() * 30) + 30,
      isTimeBased
    });
  });
}

const seedFileContent = `require('dotenv').config();
const mongoose = require('mongoose');
const Exercise = require('./src/models/Exercise');
const Session = require('./src/models/Session');
const Routine = require('./src/models/Routine');
const connectDB = require('./src/config/db');

const mockExercises = ${JSON.stringify(exercises, null, 2)};

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
        title: \`Beginner \${area.split(' ')[0]} Routine\`,
        description: \`A gentle introduction to \${area} exercises.\`,
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
        title: \`Intermediate \${area.split(' ')[0]} Blast\`,
        description: \`A solid workout pushing your \${area} limits.\`,
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
        title: \`Advanced \${area.split(' ')[0]} Crusher\`,
        description: \`High intensity \${area} routine for maximum growth.\`,
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
`;

fs.writeFileSync('seed.js', seedFileContent);
console.log('seed.js generated successfully.');
