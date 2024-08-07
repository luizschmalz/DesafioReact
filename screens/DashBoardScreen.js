import React, { useState } from 'react';
import { TextInput, View, Text, TouchableOpacity } from 'react-native';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import { globalStyles } from '../styles/global';
import { glob } from 'fs';

const DashboardScreen = () => {
  const [keyword, setKeyword] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [chartData, setChartData] = useState([]);

  const fetchData = async (keyword, startDate, endDate) => {
    try {
      const response = await fetch(`http://localhost:8081/dashboardnews?keyword=${keyword}&startDate=${startDate}&endDate=${endDate}`);
      const data = await response.json();
      setChartData(data);
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData(keyword, startDate, endDate);
  };

  return (
    <View>
      <View style={globalStyles.dashboardContainer}>
      <Text style={globalStyles.dashboardTittle}>Dashboard de Notícias</Text>
      <Text style={globalStyles.dashboardSubTittle}>Escolha uma palavra chave entre essas opções: Politics, Wellness, Entertainment, Travel, Parenting, Business e Comedy</Text>
        <TextInput
          type="text"
          placeholder="Palavra-chave"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          required
          style={globalStyles.input}
        />
        <TextInput
          type="text"
          placeholder="Data no formato: YYYY-MM-DD"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
          style={globalStyles.input}
        />
        <TextInput
          type="text"
          placeholder="Data no formato: YYYY-MM-DD"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          required
          style={globalStyles.input}
        />
        <TouchableOpacity>
            <Text style={globalStyles.dashboardGen} onPress={handleSubmit}>Gerar Dashboard</Text>
        </TouchableOpacity>
      </View>

      <ResponsiveContainer width="100%" height={400}>
      <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
        <XAxis dataKey="date" />
        <YAxis />
        <Line 
          type="monotone" 
          dataKey="count" 
          stroke="#8884d8" 
          strokeWidth={2} 
          dot={{ r: 4 }} 
          activeDot={{ r: 8 }} 
        />
      </LineChart>
    </ResponsiveContainer>
    </View>
  );
};

export default DashboardScreen;