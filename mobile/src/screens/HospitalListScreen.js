import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const DUMMY_HOSPITALS = [
  {
    id: '1',
    name: 'City General Hospital',
    address: '123 Main St, City',
    rating: 4.5,
    specialties: ['Cardiology', 'Orthopedics'],
    emergencyServices: true,
  },
  {
    id: '2',
    name: 'Community Medical Center',
    address: '456 Health Ave, Town',
    rating: 4.2,
    specialties: ['Pediatrics', 'Internal Medicine'],
    emergencyServices: true,
  },
  {
    id: '3',
    name: 'Metro Healthcare',
    address: '789 Care Blvd, Metro',
    rating: 4.8,
    specialties: ['Neurology', 'Oncology'],
    emergencyServices: false,
  },
];

const HospitalListScreen = ({ navigation }) => {
  const renderHospitalItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.hospitalCard}
      onPress={() => navigation.navigate('HospitalDetail', { hospital: item })}
    >
      <View style={styles.hospitalHeader}>
        <Text style={styles.hospitalName}>{item.name}</Text>
        <Text style={styles.rating}>★ {item.rating}</Text>
      </View>

      <Text style={styles.address}>{item.address}</Text>

      <View style={styles.specialtiesContainer}>
        {item.specialties.map((specialty, index) => (
          <View key={index} style={styles.specialtyTag}>
            <Text style={styles.specialtyText}>{specialty}</Text>
          </View>
        ))}
      </View>

      {item.emergencyServices && (
        <View style={styles.emergencyBadge}>
          <Text style={styles.emergencyText}>24/7 Emergency Services</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={DUMMY_HOSPITALS}
        renderItem={renderHospitalItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  listContainer: {
    padding: 16,
  },
  hospitalCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  hospitalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  hospitalName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  rating: {
    fontSize: 16,
    color: '#f4511e',
    fontWeight: 'bold',
  },
  address: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  specialtiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 12,
  },
  specialtyTag: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  specialtyText: {
    fontSize: 14,
    color: '#666',
  },
  emergencyBadge: {
    backgroundColor: '#ffebee',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    alignSelf: 'flex-start',
  },
  emergencyText: {
    fontSize: 12,
    color: '#f44336',
    fontWeight: 'bold',
  },
});

export default HospitalListScreen; 