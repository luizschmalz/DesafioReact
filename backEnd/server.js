require('dotenv').config(); 
const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const moment = require('moment');
const app = express();
const PORT = 8081;

app.use(cors());

const apiKEY = process.env.API_KEY; 
const url = `https://newsapi.org/v2/top-headlines?country=br&apiKey=${apiKEY}`;
const dataAtual = moment().format('YYYY-MM-DD').toString();

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.get('/news', async (req, res) => {
  try {
    const response = await fetch(url);
    if (!response.ok) { 
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching news:', error);
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});


app.get('/especificnews', async (req, res) => {
  const searchQuery = req.query.q;
  if (!searchQuery) {
    return res.status(400).json({ error: 'Missing query parameter `q`' });
  }
  
  try {
    const response = await fetch(`https://newsapi.org/v2/everything?q=${encodeURIComponent(searchQuery)}&from=${dataAtual}&sortBy=popularity&apiKey=${apiKEY}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching news:', error);
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});

