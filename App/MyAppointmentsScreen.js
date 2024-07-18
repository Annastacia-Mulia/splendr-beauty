import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import axios from "axios";
import Config from "./Server/config";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MyAppointmentsScreen = () => {
  const [appointments, setAppointments] = useState([]);
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    fetchAppointments();
  }, [isFocused]);

  const fetchAppointments = async () => {
    try {
      const clientID = await AsyncStorage.getItem("userID"); // Fetch client ID from AsyncStorage
      const response = await axios.get(
        `${Config.API_URL}/api/client-appointments-view`,
        {
          params: { clientID },
        }
      );
      setAppointments(response.data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
      // Handle error fetching appointments
      Alert.alert(
        "Error",
        "Failed to fetch appointments. Please try again later."
      );
    }
  };

  const deleteAppointment = async (appointmentId) => {
    try {
      await axios.delete(`${Config.API_URL}/api/appointments/${appointmentId}`);
      setAppointments((prevAppointments) =>
        prevAppointments.filter(
          (appointment) => appointment.id !== appointmentId
        )
      );
      Alert.alert("Success", "Appointment deleted successfully.");
    } catch (error) {
      console.error("Error deleting appointment:", error);
      // Handle error deleting appointment
      Alert.alert(
        "Error",
        "Failed to delete appointment. Please try again later."
      );
    }
  };

  const renderAppointmentItem = ({ item }) => (
    <View style={styles.appointmentItem}>
      <Text style={styles.label}>Beautician:</Text>
      <Text
        style={styles.value}
      >{`${item.beauticianFirstName} ${item.beauticianLastName}`}</Text>
      <Text style={styles.label}>Business:</Text>
      <Text style={styles.value}>{item.businessName}</Text>
      <Text style={styles.label}>Service:</Text>
      <Text style={styles.value}>{item.serviceName}</Text>
      <Text style={styles.label}>Date:</Text>
      <Text style={styles.value}>
        {new Date(item.date).toLocaleDateString()}
      </Text>
      <Text style={styles.label}>Time:</Text>
      <Text style={styles.value}>{item.time}</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.cancelButton]}
          onPress={() => deleteAppointment(item.id)}
        >
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.rescheduleButton]}
          onPress={() =>
            navigation.navigate("RescheduleAppointmentScreen", {
              appointmentId: item.id,
            })
          }
        >
          <Text style={styles.buttonText}>Reschedule</Text>
        </TouchableOpacity>
      </View>
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
      <View style={styles.content}>
        <Text style={styles.title}>My Appointments</Text>
        <FlatList
          data={appointments}
          renderItem={renderAppointmentItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </View>

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

export default MyAppointmentsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e8ecf4",
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
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#075eec",
    marginBottom: 20,
  },
  appointmentItem: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  label: {
    fontSize: 18,
    fontWeight: "600",
    color: "#0096FF",
  },
  value: {
    fontSize: 18,
    fontWeight: "500",
    color: "#333",
    marginBottom: 8,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  cancelButton: {
    backgroundColor: "#ff6347",
  },
  rescheduleButton: {
    backgroundColor: "#87ceeb",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
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
});
