import AsyncStorage from '@react-native-async-storage/async-storage';

export const registerUser = async (email, password) => {
    try {
        const existingUsers = await AsyncStorage.getItem('users');
        let users = existingUsers ? JSON.parse(existingUsers) : [];
        const userExists = users.find(user => user.email === email);
        
        if (userExists) {
            throw new Error('User already exists.');
        }

        users.push({ email, password });
        await AsyncStorage.setItem('users', JSON.stringify(users));
        return true;
    } catch (error) {
        throw error;
    }
};

export const authenticateUser = async (email, password) => {
    try {
        const existingUsers = await AsyncStorage.getItem('users');
        if (!existingUsers) return false;

        const users = JSON.parse(existingUsers);
        return users.some(user => user.email === email && user.password === password);
    } catch (error) {
        throw error;
    }
};