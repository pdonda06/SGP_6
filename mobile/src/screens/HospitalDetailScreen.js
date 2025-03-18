import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const HospitalDetailScreen = ({ route, navigation }) => {
  const { hospital } = route.params;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.name}>{hospital.name}</Text>
        <Text style={styles.rating}>★ {hospital.rating}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Address</Text>
        <Text style={styles.address}>{hospital.address}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Specialties</Text>
        <View style={styles.specialtiesContainer}>
          {hospital.specialties.map((specialty, index) => (
            <View key={index} style={styles.specialtyTag}>
              <Text style={styles.specialtyText}>{specialty}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Services</Text>
        <View style={styles.servicesList}>
          <View style={styles.serviceItem}>
            <Text style={styles.serviceText}>Emergency Services</Text>
            <Text style={[
              styles.serviceStatus,
              { color: hospital.emergencyServices ? '#4CAF50' : '#f44336' }
            ]}>
              {hospital.emergencyServices ? 'Available' : 'Not Available'}
            </Text>
          </View>
          <View style={styles.serviceItem}>
            <Text style={styles.serviceText}>24/7 Operation</Text>
            <Text style={styles.serviceStatus}>Available</Text>
          </View>
          <View style={styles.serviceItem}>
            <Text style={styles.serviceText}>Ambulance Service</Text>
            <Text style={styles.serviceStatus}>Available</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contact</Text>
        <TouchableOpacity style={styles.contactButton}>
          <Text style={styles.contactButtonText}>Call Hospital</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.contactButton}>
          <Text style={styles.contactButtonText}>Get Directions</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#f4511e',
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    flex: 1,
  },
  rating: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  section: {
    backgroundColor: '#fff',
    padding: 20,
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  address: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  specialtiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  specialtyTag: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  specialtyText: {
    fontSize: 14,
    color: '#666',
  },
  servicesList: {
    gap: 15,
  },
  serviceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  serviceText: {
    fontSize: 16,
    color: '#333',
  },
  serviceStatus: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  contactButton: {
    backgroundColor: '#f4511e',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  contactButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HospitalDetailScreen; 