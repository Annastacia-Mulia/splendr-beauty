// BusinessDetailScreen.js
import React from 'react';
import { StyleSheet, SafeAreaView, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

const BusinessDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { business } = route.params; // Retrieve the business details from navigation params

  const handleBookService = (serviceName) => {
    // Navigate to Beautician selection screen passing necessary params
    navigation.navigate('BeauticianSelectionScreen', { business, serviceName });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{business.name}</Text>
        <Text style={styles.subtitle}>{business.location}</Text>
        <Text style={styles.subtitle}>Open hours: {business.openHours}</Text>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.detailText}>Services offered:</Text>
        {business.services.includes('Hair') && (
          <View>
            <Text style={styles.serviceCategory}>Hair Services:</Text>
            {business.hairServices.map((service, index) => (
              <View key={index} style={styles.serviceItem}>
                <Text style={styles.serviceName}>{service.name}</Text>
                <Text style={styles.serviceDetails}>{service.price} | {service.duration}</Text>
                <TouchableOpacity
                  style={styles.bookButton}
                  onPress={() => handleBookService(service.name)}
                >
                  <Text style={styles.bookButtonText}>Book</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}
        {business.services.includes('Nails') && (
          <View>
            <Text style={styles.serviceCategory}>Nails Services:</Text>
            {business.nailsServices.map((service, index) => (
              <View key={index} style={styles.serviceItem}>
                <Text style={styles.serviceName}>{service.name}</Text>
                <Text style={styles.serviceDetails}>{service.price} | {service.duration}</Text>
                <TouchableOpacity
                  style={styles.bookButton}
                  onPress={() => handleBookService(service.name)}
                >
                  <Text style={styles.bookButtonText}>Book</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}
        {business.services.includes('Barbering') && (
          <View>
            <Text style={styles.serviceCategory}>Barbering Services:</Text>
            {business.barberingServices.map((service, index) => (
              <View key={index} style={styles.serviceItem}>
                <Text style={styles.serviceName}>{service.name}</Text>
                <Text style={styles.serviceDetails}>{service.price} | {service.duration}</Text>
                <TouchableOpacity
                  style={styles.bookButton}
                  onPress={() => handleBookService(service.name)}
                >
                  <Text style={styles.bookButtonText}>Book</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default BusinessDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8ecf4',
  },
  header: {
    alignItems: 'center',
    marginVertical: 36,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#075eec',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#929292',
  },
  content: {
    paddingHorizontal: 24,
  },
  detailText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1D2A32',
    marginBottom: 10,
  },
  serviceCategory: {
    fontSize: 20,
    fontWeight: '700',
    color: '#075eec',
    marginTop: 20,
    marginBottom: 10,
  },
  serviceItem: {
    marginBottom: 10,
  },
  serviceName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1D2A32',
  },
  serviceDetails: {
    fontSize: 16,
    fontWeight: '400',
    color: '#1D2A32',
    marginBottom: 5,
  },
  bookButton: {
    backgroundColor: '#075eec',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignSelf: 'flex-end',
  },
  bookButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});
