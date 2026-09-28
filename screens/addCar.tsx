import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';

import { styles } from '../styles/styles';

type AddCarProps = {
  navigation: { navigate: (screen: string, params?: any) => void; goBack: () => void };
};

export default function AddCarScreen({ navigation }: AddCarProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [mileage, setMileage] = useState('');
  const [nextService, setNextService] = useState('');

  const handleSave = () => {
    if (!name.trim() || !mileage.trim() || !nextService.trim()) {
      Alert.alert('Missing fields', 'Please fill in the name and mileage fields.');
      return;
    }

    const mileageValue = Number(mileage);
    const nextServiceValue = Number(nextService);

    if (!Number.isInteger(mileageValue) || !Number.isInteger(nextServiceValue) || mileageValue < 0 || nextServiceValue < 0) {
      Alert.alert('Validation error', 'Mileage and Next Service must be non-negative whole numbers.');
      return;
    }

    const newCar = {
      id: Date.now().toString(),
      name,
      description,
      mileage: mileageValue,
      nextService: nextServiceValue,
    };

    console.log('Saved car:', newCar);

    navigation.navigate('Garage', newCar);
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Add a New Vehicle</Text>

        <Text style={styles.label}>Vehicle Name</Text>
        <TextInput style={styles.input} placeholder="e.g. Kawasaki KLR650" value={name} onChangeText={setName} />

        <Text style={styles.label}>Description (Optional)</Text>
        <TextInput style={[styles.input, styles.textArea]} placeholder="Optional details" value={description} onChangeText={setDescription} multiline numberOfLines={3} />

        <Text style={styles.label}>Current Mileage (km)</Text>
        <TextInput style={styles.input} placeholder="e.g. 45000" value={mileage} onChangeText={setMileage} keyboardType="numeric" />

        <Text style={styles.label}>Next Service Due (km)</Text>
        <TextInput style={styles.input} placeholder="e.g. 50000" value={nextService} onChangeText={setNextService} keyboardType="numeric" />

        <View style={styles.buttonContainer}>
          <Button title="Save Vehicle" onPress={handleSave} color="#28a745" />
        </View>

        <View style={styles.cancelContainer}>
          <Button title="Cancel" onPress={() => navigation.goBack()} color="#dc3545" />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}