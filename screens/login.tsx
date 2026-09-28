import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, KeyboardAvoidingView, Platform } from 'react-native';

import { styles } from '../styles/styles';

type LoginProps = {
  navigation: {
    navigate: (screen: string) => void;
  };
};

export default function LoginScreen({ navigation }: LoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!username.trim() || !password.trim()) {
      Alert.alert('Missing fields', 'Please enter both username and password.');
      return;
    }

    if (username.toLowerCase() === 'admin' && password === '1234') {
      setUsername('');
      setPassword('');
      navigation.navigate('Garage');
    } else {
      Alert.alert('Access Denied', 'Invalid username or password.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.formContainer}>
        <Text style={styles.title}>Welcome</Text>
        <Text style={styles.subtitle}>Please log in to manage your garage</Text>

        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
          autoCorrect={false}
          accessibilityLabel="username"
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          accessibilityLabel="password"
        />

        <View style={styles.buttonContainer}>
          <Button title="Login" onPress={handleLogin} color="#ff6600" />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}