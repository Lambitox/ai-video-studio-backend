import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;

app.get('/', (req, res) => {
  res.json({ status: 'Backend is running!' });
});

app.post('/api/generate', async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!GEMINI_API_KEY) {
      return res.status(500).json({ error: 'API Key not set' });
    }
    // Simple test response for now - will generate video later
    res.json({ 
      message: 'Backend connected!', 
      prompt: prompt,
      videoUrl: null 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default app;
