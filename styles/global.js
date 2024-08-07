import {StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  FlatList: {
    flex: 1,
    width: '90%',
    margin: '5%',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  articleContainer: {
    padding: 10,
    backgroundColor: '#d5d5d5',
    marginBottom: 20,
    borderRadius: 8,
    boxshadow: '0 0 10px #333',
  },
  search: {
    width: '90%',
    marginLeft: '5%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  input: {
    width: '70%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  button: {
    width: '25%',
    marginLeft: '5%',
    backgroundColor: '#007BFF', 
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF', // Cor do texto do botão
    fontSize: 16,
  },
  suggestionsContainer: {
    zIndex: 3,
    width: '90%',  
    backgroundColor: '#dfdfdf',
    borderRadius: 10,
    zIndex: 3,
    padding: 10,
    marginLeft: '5%',
  },
  recentSearches: {
    fontFamily: 'Arial',
    fontSize: 14,
    marginTop: 10,
    textAlign: 'center',
  },
  resultsSearch: {
    width: '90%',
    marginLeft: '5%',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 500,
  },
  highlighted:{
    fontWeight: 'bold',
  }
  });