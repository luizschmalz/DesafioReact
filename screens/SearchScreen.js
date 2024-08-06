import React from 'react';
import { View, Text } from 'react-native';

const SearchScreen = ({ route }) => {
  const { searchQuery } = route.params;

  return (
    <View>
      <Text>Resultados da pesquisa para: {searchQuery}</Text>
    </View>
  );
};

export default SearchScreen;