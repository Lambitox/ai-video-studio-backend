const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(helmet());
app.use(cors({ origin: '*' })); // Allow frontend to connect
app.use(express.json());

const limiter = rateLimit({ windowMs: 15*60*1000, max: 200 });
app.use(limiter);

// ROOT - This makes your link work!
app.get('/', (req,res) => {
  res.json({ 
    status: 'AI Video Studio Backend Running 🚀', 
    version: '1.0.0',
    endpoints: ['/health', '/api/generate', '/api/videos'],
    frontend: 'Connect your frontend to this URL'
  });
});

app.get('/health', (req,res) => {
  res.json({ ok: true, timestamp: new Date().toISOString(), uptime: process.uptime() });
});

// MAIN VIDEO GENERATION ENDPOINT
app.post('/api/generate', (req,res) => {
  const { prompt, style } = req.body;
  console.log('Generating video for:', prompt);
  
  // Mock response - you will connect real AI later
  res.json({
    success: true,
    message: 'Video generation started',
    prompt: prompt || 'No prompt',
    videoUrl: 'https://example.com/sample-video.mp4',
    id: Date.now().toString()
  });
});

app.get('/api/videos', (req,res) => {
  res.json({ videos: [], count: 0, message: 'Add your video database here' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server running on port ${PORT}`);
});
