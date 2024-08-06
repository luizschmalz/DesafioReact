import { FlatList, StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
  header: {
    fontWeight: '700',
    fontSize: 20,
  },
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
});