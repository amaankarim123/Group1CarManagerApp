import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Button } from 'react-native';

import { styles } from '../styles/styles';

type Car = {
  id: string;
  name: string;
  description?: string;
  mileage: number;
  nextService: number;
};

const MOCK_CARS: Car[] = [
  {
    id: '1',
    name: 'Mahindra XUV300',
    description: 'Petrol daily driver.',
    mileage: 45000,
    nextService: 50000,
  },
  {
    id: '2',
    name: '2010 Chevrolet Spark',
    description: 'Compact city car.',
    mileage: 120000,
    nextService: 125000,
  },
  {
    id: '3',
    name: '2014 KTM Duke 200',
    description: 'Motorcycle for quick rides.',
    mileage: 32000,
    nextService: 35000,
  },
];

type GarageProps = {
  route: { params?: Partial<Car> };
  navigation: { navigate: (screen: string, params?: any) => void; setParams?: (p: any) => void };
};

export default function GarageScreen({ route, navigation }: GarageProps) {
  const [cars, setCars] = useState(MOCK_CARS);

  useEffect(() => {
    const newCar = route.params?.id ? (route.params as Car) : null;

    if (newCar) {
      setCars((currentCars) => (currentCars.some((car) => car.id === newCar.id) ? currentCars : [...currentCars, newCar]));
      if (navigation.setParams) navigation.setParams({ id: undefined });
    }
  }, [navigation, route.params]);

  const handleCarPress = (car: Car) => {
    console.log('Tapped on:', car.name);
  };

  const renderCarItem = ({ item }: { item: Car }) => (
    <TouchableOpacity style={styles.card} onPress={() => handleCarPress(item)} activeOpacity={0.7}>
      <Text style={styles.carName}>{item.name}</Text>
      {item.description ? <Text style={styles.description}>{item.description}</Text> : null}

      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Current Mileage</Text>
          <Text style={styles.statValue}>{item.mileage.toLocaleString()} km</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Next Service</Text>
          <Text style={styles.statValue}>{item.nextService.toLocaleString()} km</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Button title="Add a Car" onPress={() => navigation.navigate('Add a Car')} color="#007BFF" />
      </View>

      <FlatList data={cars} keyExtractor={(item) => item.id} renderItem={renderCarItem} contentContainerStyle={styles.listContainer} ListEmptyComponent={<Text style={styles.emptyText}>Your garage is empty. Add a vehicle.</Text>} />
    </View>
  );
}