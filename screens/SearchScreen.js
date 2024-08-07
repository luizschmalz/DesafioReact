import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Linking } from 'react-native';
import { globalStyles } from '../styles/global';


const SearchScreen = ({ route }) => {
  const { searchQuery } = route.params;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const searchNews = async (searchQuery) => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:8081/especificnews?q=${encodeURIComponent(searchQuery)}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setArticles(data.articles);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    searchNews(searchQuery);
  }, []);

  const openUrl = (url) => {
    Linking.openURL(url).catch(err => console.error('An error occurred', err));
  };

  return (
    <View style={globalStyles.container}>
      <View>
      <Text style={globalStyles.resultsSearch}>Resultados da pesquisa para: <Text style={globalStyles.highlighted}>{searchQuery}</Text></Text>
      </View>
      <FlatList
        style={globalStyles.FlatList}
        data={articles}
        keyExtractor={(item) => item.url}
        renderItem={({ item }) => (
          <View style={globalStyles.articleContainer}>
            <Text style={globalStyles.title}>{item.title}</Text>
            <Text>{item.description}</Text>
            <Text>{new Date(item.publishedAt).toLocaleDateString()}</Text>
            <Text>{item.source.name}</Text>
            <TouchableOpacity onPress={() => openUrl(item.url)}>
              <Text style={globalStyles.linkText}>Leia mais</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
    
  );
};

export default SearchScreen;