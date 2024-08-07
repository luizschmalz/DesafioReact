import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, Linking, TextInput } from 'react-native';
import { globalStyles } from '../styles/global';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({ navigation }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState([]);
  const [isFocused, setIsFocused] = useState(false);

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

    const loadRecentSearches = async () => {
      const searches = await AsyncStorage.getItem('recentSearches');
      if (searches) {
        setRecentSearches(JSON.parse(searches));
      }
    };

    loadRecentSearches();
  }, []);

  const openUrl = (url) => {
    Linking.openURL(url).catch(err => console.error('An error occurred', err));
  };

  const handleSearch = async () => {
    if (searchQuery.trim() === '') return;

    const newSearches = [searchQuery, ...recentSearches.filter(item => item !== searchQuery)];
    setRecentSearches(newSearches);
    try {
      await AsyncStorage.setItem('recentSearches', JSON.stringify(newSearches));
    } catch (error) {
      console.error("Failed to save recent searches to AsyncStorage", error);
    }
    setIsFocused(false); 
    navigation.navigate('Resultado da Pesquisa', { searchQuery });
  };

  const handleRecentSearch = (query) => {
    navigation.navigate('Resultado da Pesquisa', { searchQuery: query });
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
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        <TouchableOpacity style={globalStyles.button} onPress={handleSearch}>
          <Text style={globalStyles.buttonText}>Search</Text>
        </TouchableOpacity>
      </View>
      {isFocused && (
        <View style={globalStyles.suggestionsContainer}>
          <FlatList
            data={recentSearches}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View>
                <Text style={globalStyles.recentSearches} onPress={() => handleRecentSearch(item)}>{item}</Text>
              </View>
            )}
          />
        </View>
      )}
      <View>
        <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
          <Text style={globalStyles.dashBoardbutton}>Dashboard</Text>
        </TouchableOpacity>
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
              <Text>Leia mais</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

export default HomeScreen;
