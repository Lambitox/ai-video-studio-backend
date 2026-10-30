const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(helmet());
app.use(cors());
app.use(express.json());

const limiter = rateLimit({ windowMs: 15*60*1000, max: 100 });
app.use(limiter);

app.get('/', (req,res) => {
  res.json({ status: 'AI Video Studio Backend Running', version: '1.0.0' });
});

app.get('/health', (req,res) => {
  res.json({ ok: true, timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
