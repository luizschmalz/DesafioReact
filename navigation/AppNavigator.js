import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import { globalStyles } from '../styles/global';
import SearchScreen from '../screens/SearchScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="">
      <Stack.Screen name="NotiNet - Sua central de Notícias" component={HomeScreen}
      options={{headerTitleStyle: globalStyles.header,
        headerTitleAlign: 'center',
      }} />
      <Stack.Screen name="Resultado da Pesquisa" component={SearchScreen}
      options={{headerTitleStyle: globalStyles.header,
        headerTitleAlign: 'center',
      }} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppNavigator;