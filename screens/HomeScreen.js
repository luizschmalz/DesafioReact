import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, ActivityIndicator, TouchableOpacity, Linking } from 'react-native';
import { globalStyles } from '../styles/global';

const HomeScreen = ({ navigation }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('http://localhost:8081/news');
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

    fetchNews();
  }, []);

  const openUrl = (url) => {
    Linking.openURL(url).catch(err => console.error('An error occurred', err));
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return (
    <View style={globalStyles.container}>
      <FlatList style={globalStyles.FlatList}
        data={articles}
        keyExtractor={(item) => item.url}
        renderItem={({ item }) => (
          <View style={globalStyles.articleContainer}>
            {item.urlToImage && <Image source={{ uri: item.urlToImage }} style={globalStyles.image} />}
            <Text style={globalStyles.title}>{item.title}</Text>
            <Text>{item.description}</Text>
            <Text>{new Date(item.publishedAt).toLocaleDateString()}</Text>
            <TouchableOpacity onPress={() => openUrl(item.url)}>
              <Text style={globalStyles.linkText}>Leia mais</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

export default HomeScreen;
