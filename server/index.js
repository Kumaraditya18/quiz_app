const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());

app.get('/api/questions', async (req, res) => {
  const { difficulty = 'easy', category = 9, amount = 15 } = req.query;
  const url = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&category=${category}`;

  try {
    console.log(`Requesting: ${url}`);
    const response = await axios.get(url);
    console.log(`Received ${response.data.results.length} questions from OpenTrivia`);
    res.json(response.data);
  } catch (error) {
    if (error.response && error.response.status === 429) {
      console.warn("⚠️ Rate limited by OpenTrivia. Returning fallback questions...");
      const fallback = await axios.get('https://opentdb.com/api.php?amount=15');
      res.json(fallback.data);
    } else {
      console.error("Failed to fetch questions:", error.message);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
});

app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});
