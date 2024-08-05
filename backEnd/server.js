require('dotenv').config(); // Carregar variáveis de ambiente do arquivo .env

const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
const PORT = 8081;

const apiKEY = process.env.API_KEY; 
const url = `https://newsapi.org/v2/top-headlines?country=br&apiKey=${apiKEY}`;

app.use(cors());

app.get('/news', async (req, res) => {
  try {
    // Fazer a requisição à API
    const response = await fetch(url);
    console.log(url)
    if (!response.ok) { // Verificar se a resposta da API é bem-sucedida
      throw new Error(`HTTP error! status: ${response.status}`);
    }
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