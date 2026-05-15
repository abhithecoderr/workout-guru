const { GoogleGenAI } = require('@google/genai');
const Exercise = require('../models/Exercise');

exports.generateSession = async (req, reply) => {
  try {
    const { prompt } = req.body;
    if (!prompt) return reply.status(400).send({ error: 'Prompt is required' });
    if (!process.env.GEMINI_API_KEY) return reply.status(500).send({ error: 'GEMINI_API_KEY is not configured' });

    // Fetch all exercises to provide to the AI as context
    const allExercises = await Exercise.find({});
    
    // Create a simplified list to save context window tokens
    const contextList = allExercises.map(ex => ({
      id: ex._id,
      name: ex.name,
      focusArea: ex.focusArea,
      description: ex.description,
      defaultReps: ex.defaultReps,
      defaultSets: ex.defaultSets,
      durationSeconds: ex.durationSeconds
    }));

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    
    const systemPrompt = `You are a professional fitness trainer. You have a database of exercises available.
Database: ${JSON.stringify(contextList)}

The user request is: "${prompt}"

Your task is to select the best exercises from the database to fulfill the user's request, and adjust their sets, reps, and durations if necessary to fit the goal. 
Do NOT make up exercises that are not in the database.
Respond with ONLY a raw JSON array of objects (no markdown, no backticks, no markdown code blocks).
Each object MUST have:
- "exerciseId" (exact id from the database)
- "adjustedReps" (number)
- "adjustedSets" (number)
- "adjustedDuration" (number in seconds)`;

    const response = await ai.models.generateContent({
        model: 'gemma-4-26b-a4b-it',
        contents: systemPrompt,
        config: {
          temperature: 0.2
        }
    });
    
    let rawText = response.text;
    // Clean up potential markdown formatting
    if (rawText.startsWith('\`\`\`')) {
      rawText = rawText.replace(/\`\`\`json/g, '').replace(/\`\`\`/g, '').trim();
    }
    
    const aiSelectedList = JSON.parse(rawText);

    // Re-map the raw IDs to the full exercise objects so the frontend can display them
    const fullSessionExercises = aiSelectedList.map(selection => {
      const fullEx = allExercises.find(e => e._id.toString() === selection.exerciseId);
      if (!fullEx) return null;
      return {
        ...fullEx.toObject(),
        adjustedReps: selection.adjustedReps,
        adjustedSets: selection.adjustedSets,
        adjustedDuration: selection.adjustedDuration
      };
    }).filter(e => e !== null);

    return reply.status(200).send({ sessionExercises: fullSessionExercises });

  } catch (err) {
    console.error("AI Error:", err);
    reply.status(500).send({ error: 'Failed to generate AI session', message: err.message });
  }
};
