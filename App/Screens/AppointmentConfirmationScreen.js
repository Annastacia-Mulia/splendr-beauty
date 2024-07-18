import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios"; // Import Axios for making HTTP requests
import Config from "../Server/config";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage

const AppointmentConfirmationScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [clientId, setClientId] = useState(null); // State to store the client ID

  const {
    beautician = {},
    business = {},
    service = {},
    date,
    time,
  } = route.params;
  const appointmentDate = date ? new Date(date) : null;

  useEffect(() => {
    const getClientId = async () => {
      try {
        const userId = await AsyncStorage.getItem("userID");
        setClientId(userId);
      } catch (error) {
        console.error("Failed to fetch client ID from AsyncStorage:", error);
      }
    };

    getClientId();
  }, []);

  const handleConfirm = async () => {
    if (!clientId) {
      Alert.alert("Error", "Failed to retrieve client ID. Please try again.");
      return;
    }

    try {
      const response = await axios.post(`${Config.API_URL}/api/appointments`, {
        beauticianId: beautician.userID,
        businessId: business.businessID,
        serviceId: service.id,
        clientId, // Include the client ID
        date,
        time,
      });

      Alert.alert("Success", "Appointment successfully booked!", [
        {
          text: "OK",
          onPress: () =>
            navigation.navigate("ClientHomeScreen"),
        },
      ]);
    } catch (error) {
      console.error("Error booking appointment:", error);
      Alert.alert(
        "Error",
        "Failed to book appointment. Please try again later."
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Appointment Details</Text>
        <View style={styles.detailItem}>
          <Text style={styles.label}>Beautician:</Text>
          <Text style={styles.value}>
            {beautician.firstName && beautician.lastName
              ? `${beautician.firstName} ${beautician.lastName}`
              : "Unknown Beautician"}
          </Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.label}>Business:</Text>
          <Text style={styles.value}>{business.name || "Unknown"}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.label}>Service:</Text>
          <View>
            <Text style={styles.value}>
              {service.name || "Unknown Service"}
            </Text>
            {service.cost && (
              <Text style={styles.value}>Cost: {service.cost}ksh</Text>
            )}
            {service.duration && (
              <Text style={styles.value}>Duration: {service.duration}</Text>
            )}
          </View>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.label}>Date:</Text>
          <Text style={styles.value}>
            {appointmentDate
              ? appointmentDate.toLocaleDateString()
              : "Date not available"}
          </Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.label}>Time:</Text>
          <Text style={styles.value}>{time || "Time not available"}</Text>
        </View>
        <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
          <Text style={styles.confirmButtonText}>Confirm Appointment</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default AppointmentConfirmationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e8ecf4",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#075eec",
    marginBottom: 20,
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  label: {
    fontSize: 18,
    fontWeight: "600",
    color: "#555",
    width: 100,
  },
  value: {
    fontSize: 18,
    fontWeight: "500",
    color: "#333",
  },
  confirmButton: {
    backgroundColor: "#075eec",
    borderRadius: 8,
    padding: 15,
    marginVertical: 20,
    alignItems: "center",
  },
  confirmButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});
