import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import { globalStyles } from '../styles/global';
import SearchScreen from '../screens/SearchScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import DashboardScreen from '../screens/DashBoardScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="">
      <Stack.Screen name="Login" component={LoginScreen}
      options={{headerTitleStyle: globalStyles.header,
        headerTitleAlign: 'center',
      }}/>
      <Stack.Screen name="Registro" component={RegisterScreen}
      options={{headerTitleStyle: globalStyles.header,
        headerTitleAlign: 'center',
      }}/>
      <Stack.Screen name="NotiNet - Sua central de Notícias" component={HomeScreen}
      options={{headerTitleStyle: globalStyles.header,
        headerTitleAlign: 'center',
      }} />
      <Stack.Screen name="Resultado da Pesquisa" component={SearchScreen}
      options={{headerTitleStyle: globalStyles.header,
        headerTitleAlign: 'center',
      }} />
      <Stack.Screen name="Dashboard" component={DashboardScreen}
      options={{headerTitleStyle: globalStyles.header,
        headerTitleAlign: 'center',
      }}/>
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppNavigator;