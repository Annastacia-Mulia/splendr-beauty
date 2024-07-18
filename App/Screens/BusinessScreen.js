// BusinessScreen.js
import React from 'react';
import { StyleSheet, SafeAreaView, View, Text, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const BusinessScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { service } = route.params; // Retrieve the service type from navigation params

  const businesses = [
    {
      id: 1,
      name: 'Beauty Parlour Salon',
      services: ['Hair', 'Nails'],
      location: '123 Main Street',
      openHours: '9:00 AM - 6:00 PM',
      hairServices: [
        { name: 'Haircut', price: '$50', duration: '1 hour' },
        { name: 'Hair Coloring', price: '$80', duration: '2 hours' },
        // Add more hair services as needed
      ],
      nailsServices: [
        { name: 'Manicure', price: '$30', duration: '45 mins' },
        { name: 'Pedicure', price: '$40', duration: '1 hour' },
        // Add more nails services as needed
      ],
      barberingServices: [
        { name: 'Men\'s Haircut', price: '$40', duration: '45 mins' },
        { name: 'Beard Trim', price: '$20', duration: '30 mins' },
        // Add more barbering services as needed
      ],
    },
    // Add more businesses with similar details
  ];

  const handlePressBusiness = (business) => {
    navigation.navigate('BusinessDetailScreen', { business });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{service} Services</Text>
        <Text style={styles.subtitle}>Available Businesses</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.buttonContainer}>
          {businesses.filter(b => b.services.includes(service)).map(business => (
            <TouchableOpacity
              key={business.id}
              style={styles.boxButton}
              onPress={() => handlePressBusiness(business)}
            >
              <Text style={styles.boxButtonText}>{business.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default BusinessScreen;

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
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  boxButton: {
    width: width * 0.85, // Adjusted width to fit the screen
    height: width * 0.20, // Adjust height as needed
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row', // Added flexDirection to arrange content horizontally
    elevation: 2, // Add shadow for Android
    shadowColor: '#000', // Add shadow for iOS
    shadowOffset: { width: 0, height: 2 }, // Add shadow for iOS
    shadowOpacity: 0.25, // Add shadow for iOS
    shadowRadius: 3.84, // Add shadow for iOS
  },
  boxButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1D2A32',
    textAlign: 'center',
    flex: 1, // Allow text to take remaining space
  },
});
