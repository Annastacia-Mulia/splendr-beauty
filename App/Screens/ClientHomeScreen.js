import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import axios from "axios";
import LogoutConfirmation from "./LogoutConfirmation"; // Import the modal component
import Config from "../Server/config"; // Import the config file
import { Image } from "react-native";



const { width } = Dimensions.get("window");
// remember to change
const ClientHomeScreen = () => {
  const navigation = useNavigation();
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const [businesses, setBusinesses] = useState([]);
  const [selectedService, setSelectedService] = useState("");

  useEffect(() => {
    if (selectedService) {
      axios
        .get(`${Config.API_URL}/api/businesses?service=${selectedService}`)
        .then((response) => {
          console.log("Fetched businesses:", response.data); // Log the response data
          navigation.navigate("BusinessListScreen", {
            businesses: response.data,
          });
        })
        .catch((error) => {
          if (error.response) {
            console.error(
              "Error fetching businesses (response):",
              error.response.data
            );
          } else if (error.request) {
            console.error(
              "Error fetching businesses (request):",
              error.request
            );
          } else {
            console.error(
              "Error fetching businesses (message):",
              error.message
            );
          }
        });
    }
  }, [selectedService]);

  const handleLogout = () => {
    setLogoutModalVisible(true);
  };

  const handlePressService = (service) => {
    setSelectedService(service);
  };

  const confirmLogout = () => {
    // Perform logout logic here (clear user data, tokens, etc.)
    // For example, navigate to Login screen after logout
    navigation.navigate("Login");
  };

  const cancelLogout = () => {
    setLogoutModalVisible(false);
  };

  const renderBusinessItem = ({ item }) => (
    <View style={styles.businessItem}>
      <Text style={styles.businessName}>{item.name}</Text>
      <Text style={styles.businessDetails}>{item.address}</Text>
      <Text style={styles.businessDetails}>{item.phone}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Welcome to Splendr</Text>
        <Text style={styles.subtitle}>
          The Ultimate Beauty Booking Application
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.boxButton}
            onPress={() => handlePressService("Hair")}
          ><Image source={require('../../assets/hair.png')} style={styles.buttonImage} />

            <Text style={styles.boxButtonText}>Hair</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.boxButton}
            onPress={() => handlePressService("Barbering")} >
            <Image source={require('../../assets/barbering.png')} style={styles.buttonImage} />
            <Text style={styles.boxButtonText}>Barbering</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.boxButton}
            onPress={() => handlePressService("Nails")} >
              <Image source={require('../../assets/nails.png')} style={styles.buttonImage} />
            <Text style={styles.boxButtonText}>Nails</Text>
          </TouchableOpacity>
        </View>

        {selectedService && (
          <FlatList
            data={businesses}
            keyExtractor={(item) =>
              item.id ? item.id.toString() : Math.random().toString()
            } // Add check for item.id
            renderItem={renderBusinessItem}
            contentContainerStyle={styles.businessList}
          />
        )}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.footerIcon}
          onPress={() => navigation.navigate("ClientHomeScreen")}
        >
          <Icon name="home" size={24} color="#075eec" />
          <Text style={styles.footerIconText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.footerIcon}
          onPress={() => navigation.navigate("MyAppointmentsScreen")}
        >
          <Icon name="calendar" size={24} color="#075eec" />
          <Text style={styles.footerIconText}>Appointments</Text>
        </TouchableOpacity>
       
        <TouchableOpacity
          style={styles.footerIcon}
          onPress={() => navigation.navigate("Profile")}
        >
          <Icon name="user" size={24} color="#075eec" />
          <Text style={styles.footerIconText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ClientHomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e8ecf4",
  },
  header: {
    alignItems: "center",
    marginVertical: 36,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#075eec",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "500",
    color: "#929292",
  },
  profileIcon: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  boxButton: {
    width: width * 0.85,
    height: width * 0.4,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  boxButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1D2A32",
    textAlign: "center",
    flex: 1,
  },
  content: {
    alignItems: "center",
    paddingBottom: 20,
  },
  button: {
    backgroundColor: "#075eec",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 25,
    marginVertical: 10,
  },
  profileButton: {
    backgroundColor: "#075eec",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 25,
    marginVertical: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
  },
  businessList: {
    paddingVertical: 20,
  },
  businessItem: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  businessName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#075eec",
    marginBottom: 6,
  },
  businessDetails: {
    fontSize: 14,
    color: "#929292",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#fff",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#e8ecf4",
  },
  footerIcon: {
    alignItems: "center",
  },
  footerIconText: {
    fontSize: 12,
    color: "#075eec",
  },
  buttonImage: {
    width: 150,
    height: 150,
    marginRight: 10, // Adjust as needed for spacing
  },
  
});
