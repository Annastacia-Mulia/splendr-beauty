import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, View, Text, FlatList, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Rating } from 'react-native-ratings';
import Config from '../Server/config'; // Adjust path as per your project structure

const MyCompletedAppointmentsScreen = ({ navigation }) => {
  const [completedAppointments, setCompletedAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [ratings, setRatings] = useState({});

  useEffect(() => {
    fetchCompletedAppointments();
  }, []);

  const fetchCompletedAppointments = async () => {
    try {
      const userId = await AsyncStorage.getItem('userID');
      if (!userId) {
        console.error('User ID not found in AsyncStorage');
        return;
      }

      const response = await axios.get(`${Config.API_URL}/api/appointments-client/completed/${userId}`);
      setCompletedAppointments(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching completed appointments:', error);
      setIsLoading(false);
    }
  };

  const handleRatingCompleted = (rating, appointmentId, type) => {
    setRatings((prevRatings) => {
      const updatedRatings = { ...prevRatings };
      if (!updatedRatings[appointmentId]) {
        updatedRatings[appointmentId] = {};
      }
      updatedRatings[appointmentId][type] = rating;
      return updatedRatings;
    });
  };

  const handleSubmit = (appointmentId) => {
    Alert.alert('Success', 'Ratings submitted successfully!', [{ text: 'OK' }]);
  };

  const renderAppointmentItem = ({ item }) => (
    <View style={styles.appointmentItem}>
      <View style={styles.labelValueContainer}>
        <View>
          <Text style={styles.label}>Beautician:</Text>
          <Text style={styles.value}>{`${item.beauticianFirstName} ${item.beauticianLastName}`}</Text>
        </View>
        <Rating
          type="star"
          ratingCount={5}
          imageSize={16}
          showRating={false}
          onFinishRating={() => {}}
          style={styles.rating}
        />
      </View>

      <View style={styles.labelValueContainer}>
        <View>
          <Text style={styles.label}>Business:</Text>
          <Text style={styles.value}>{item.businessName}</Text>
        </View>
        <Rating
          type="star"
          ratingCount={5}
          imageSize={16}
          showRating={false}
          onFinishRating={() => {}}
          style={styles.rating}
        />
      </View>

      <View style={styles.labelValueContainer}>
        <View>
          <Text style={styles.label}>Service:</Text>
          <Text style={styles.value}>{item.serviceName}</Text>
        </View>
        <Rating
          type="star"
          ratingCount={5}
          imageSize={16}
          showRating={false}
          onFinishRating={() => {}}
          style={styles.rating}
        />
      </View>

      <Text style={styles.label}>Date:</Text>
      <Text style={styles.value}>{new Date(item.date).toLocaleDateString()}</Text>
      <Text style={styles.label}>Time:</Text>
      <Text style={styles.value}>{item.time}</Text>

      <TouchableOpacity
        style={styles.submitButton}
        onPress={() => handleSubmit(item.id)}
      >
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.buttonGroup}>
        <TouchableOpacity
          style={styles.navigationButton}
          onPress={() => navigation.navigate("MyAppointmentsScreen")}
        >
          <Text style={styles.navigationButtonText}>Upcoming</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navigationButton}
          onPress={() => navigation.navigate("MyCompletedAppointmentsScreen")}
        >
          <Text style={styles.navigationButtonText}>Completed</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.header}>
        <Text style={styles.title}>Completed Appointments</Text>
      </View>

      {isLoading ? (
        <ActivityIndicator size="large" color="#075eec" />
      ) : completedAppointments.length === 0 ? (
        <Text style={styles.noAppointments}>No completed appointments</Text>
      ) : (
        <FlatList
          data={completedAppointments}
          renderItem={renderAppointmentItem}
          keyExtractor={(item) => item.id.toString()}
        />
      )}

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.footerIcon}
          onPress={() => navigation.navigate('ClientHomeScreen')}
        >
          <Icon name="home" size={24} color="#075eec" />
          <Text style={styles.footerIconText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.footerIcon}
          onPress={() => navigation.navigate('MyAppointmentsScreen')}
        >
          <Icon name="calendar" size={24} color="#075eec" />
          <Text style={styles.footerIconText}>Appointments</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.footerIcon}
          onPress={() => navigation.navigate('Profile')}
        >
          <Icon name="user" size={24} color="#075eec" />
          <Text style={styles.footerIconText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default MyCompletedAppointmentsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8ecf4',
    padding: 16
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#075eec',
  },
  appointmentItem: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  labelValueContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0096FF',
  },
  value: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
    marginBottom: 8,
  },
  rating: {
    marginBottom: 8,
  },
  noAppointments: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#929292',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#e8ecf4',
  },
  footerIcon: {
    alignItems: 'center',
  },
  footerIconText: {
    fontSize: 12,
    color: '#075eec',
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e8ecf4",
  },
  navigationButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: "#075eec",
  },
  navigationButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  submitButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
