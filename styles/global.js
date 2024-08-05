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
  titleText: {
    fontFamily: 'nunito-bold',
    fontSize: 18,
    color: '#333',
  },
  paragraph: {
    marginVertical: 8,
    lineHeight: 20,
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
  image: {
    width: '80%',
    height: 200,
    borderRadius: 8,
  },
});