require('dotenv').config(); 
const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const moment = require('moment');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 8081;

app.use(cors());

const apiKEY = process.env.API_KEY; 
const url = `https://newsapi.org/v2/top-headlines?country=br&apiKey=${apiKEY}`;
const dataAtual = moment().format('YYYY-MM-DD').toString();

const dataPath = path.join(__dirname, 'dataNews.json');

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

app.get('/dashboardnews', (req, res) => {
  try {
    const data = fs.readFileSync(dataPath, 'utf8');
    const jsonData = JSON.parse(data);

    const keyword = req.query.keyword;
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;

    if (!keyword) {
      console.log('Parâmetro de palavra-chave ausente');
      return res.status(400).send('Parâmetro de palavra-chave ausente');
    }

    if (!startDate || !endDate) {
      console.log('Parâmetros de data ausentes');
      return res.status(400).send('Parâmetros de data ausentes');
    }

    const start = new Date(startDate).toISOString().split('T')[0];
    const end = new Date(endDate).toISOString().split('T')[0];

    console.log('Datas de início e fim:', start, end);

    const filteredData = jsonData.filter(item => item.category.toLowerCase() == keyword.toLowerCase());

    console.log('Dados filtrados por categoria:', filteredData);

    const filteredData2 = filteredData
      .filter(item => {
        const itemDate = new Date(item.date).toISOString().split('T')[0];
        return itemDate >= start && itemDate <= end;
      });
    

    console.log('Dados filtrados por palavra-chave e data:', filteredData2);

    console.log('Dados filtrados por palavra-chave e data:', filteredData);
    const counts = filteredData2.reduce((acc, item) => {
      const date = item.date.split('T')[0];
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {});

    const result = Object.entries(counts).map(([date, count]) => ({ date, count }));

    res.json(result);
  } catch (error) {
    console.error('Erro ao processar o JSON:', error);
    res.status(500).send('Erro ao processar os dados.');
  }
});