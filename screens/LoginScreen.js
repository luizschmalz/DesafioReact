import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity} from 'react-native';
import { authenticateUser } from '../authUtils';
import { globalStyles } from '../styles/global';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
        try {
            const isAuthenticated = await authenticateUser(email, password);
            if (isAuthenticated) {
                navigation.navigate('NotiNet - Sua central de Notícias');
            } else {
                setError('Invalid email or password.');
            }
        } catch (error) {
            console.error(error);
            setError('Login failed.');
        }
    };

  return (
    <View style={globalStyles.loginScreen}>
      <TextInput
        placeholder="Email"
        style = {globalStyles.loginText}
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Senha"
        style = {globalStyles.loginText}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity onPress={handleLogin}>
        <Text style={globalStyles.buttonLogin}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity >
        <Text style={globalStyles.changePage} onPress={() => navigation.navigate('Registro')}>Não tem uma conta? Registre-se</Text>
      </TouchableOpacity>
    </View>
  );
}