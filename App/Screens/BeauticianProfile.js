// BeauticianProfile.js
import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, View, Text, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LogoutConfirmation from './LogoutConfirmation'; // Import the modal component
import Icon from 'react-native-vector-icons/FontAwesome';


const { width } = Dimensions.get('window');

const BeauticianProfile = () => {
  const navigation = useNavigation();
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);

  const handleLogout = () => {
    setLogoutModalVisible(true);
  };

  const handlePressProfile = () => {
    navigation.navigate('ProfileScreen');
  };

  const handlePress = () => {
    navigation.navigate('AppointmentScreen');
  };

  const handleSearchBusiness = () => {
    navigation.navigate('SearchBusinessScreen');
  };

  const handleRatings = () => {
    navigation.navigate('RatingsScreen');
  };

  const confirmLogout = () => {
    // Perform logout logic here (clear user data, tokens, etc.)
    // For example, navigate to Login screen after logout
    navigation.navigate('Login');
  };

  const cancelLogout = () => {
    setLogoutModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}> Profile </Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.buttonContainer}>
         

          <TouchableOpacity style={styles.boxButton} onPress={handlePressProfile}>
            {/* <Image source={require('./assets/profile.png')} style={styles.buttonImage} /> */}
            <Text style={styles.boxButtonText}>View Profile</Text>
          </TouchableOpacity>

         

          <TouchableOpacity style={styles.boxButton} onPress={handleRatings}>
            {/* <Image source={require('./assets/ratings.png')} style={styles.buttonImage} /> */}
            <Text style={styles.boxButtonText}>Ratings</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={styles.content}>
        <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>

        <LogoutConfirmation
          visible={logoutModalVisible}
          onConfirm={confirmLogout}
          onCancel={cancelLogout}
        />
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerIcon} onPress={() => navigation.navigate('BeauticianHomeScreen')}>
          <Icon name="home" size={24} color="#075eec" />
          <Text style={styles.footerIconText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerIcon} onPress={() => navigation.navigate('AppointmentBookingScreen')}>
          <Icon name="calendar" size={24} color="#075eec" />
          <Text style={styles.footerIconText}>Appointments</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerIcon} onPress={() => navigation.navigate('BeauticianProfile')}>
          <Icon name="user" size={24} color="#075eec" />
          <Text style={styles.footerIconText}>Profile</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
};

export default BeauticianProfile;

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
    height: width * 0.20, // Make the height equal to the width for square buttons
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
  buttonImage: {
    width: 50,
    height: 50,
    marginRight: 10, // Added margin for image and text separation
  },
  boxButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1D2A32',
    textAlign: 'center',
    flex: 1, // Allow text to take remaining space
  },
  content: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  button: {
    backgroundColor: '#075eec',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 25,
    marginVertical: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
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


});
