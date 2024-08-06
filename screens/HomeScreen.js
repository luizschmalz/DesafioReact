import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, ActivityIndicator, TouchableOpacity, Linking, TextInput} from 'react-native';
import { globalStyles } from '../styles/global';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = ({ navigation }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

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

  const handleSearch = () => {
    navigation.navigate('Resultado da Pesquisa', { searchQuery });
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return (
    <View style={globalStyles.container}>
      <View style={globalStyles.search}>
        <TextInput
          style={globalStyles.input}
          placeholder="Search for news..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity style={globalStyles.button} onPress={handleSearch}>
        <Text style={globalStyles.buttonText}>Search</Text>
        </TouchableOpacity>
      </View>
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
