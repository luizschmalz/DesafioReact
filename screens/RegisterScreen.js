import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { registerUser } from '../authUtils';
import { globalStyles } from '../styles/global';

export default function RegisterScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');

    const handleRegister = async () => {
        try {
            await registerUser(email, password);
            navigation.navigate('Login');
        } catch (error) {
            console.error(error);
            setError(error.message);
            Alert.alert('Registration Error', error.message);
        }
    };

    return (
        <View style={globalStyles.loginScreen}>
            <TextInput
            placeholder="Nome"
            style = {globalStyles.loginText}
            value={name}
            onChangeText={setName}
            />
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
            <TouchableOpacity onPress={handleRegister}>
                <Text style={globalStyles.buttonLogin}>Registre-se</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text style={globalStyles.changePage} onPress={() => navigation.navigate('Login')}>Volte para o Login</Text>
            </TouchableOpacity>
        </View>
    );
}