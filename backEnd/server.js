require('dotenv').config();

const express = require('express');
const fetch = require('node-fetch');

const app = express();
const PORT = 8081;

const apiKey = process.env.API_KEY;
const NEWS_API_URL = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;

app.get('/news', async (req, res) => {
  try {
    const response = await fetch(NEWS_API_URL);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching news:', error);
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});