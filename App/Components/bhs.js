import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Alert,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import Config from "../Server/config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/FontAwesome";

export default function BeauticianHomeScreen({ navigation }) {
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchAppointments = async () => {
      setIsLoading(true);
      try {
        const beauticianID = await AsyncStorage.getItem("userID");
        const response = await axios.get(
          `${Config.API_URL}/api/appointments-view`,
          {
            params: { beauticianID },
          }
        );
        if (response.status === 200) {
          setAppointments(response.data);
        }
      } catch (error) {
        console.error("Error fetching appointments:", error);
        Alert.alert("Error", "Failed to load appointments.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const handleApprove = (appointmentId) => {
    // Logic to handle approval of appointment with ID `appointmentId`
    Alert.alert(
      "Appointment Approved",
      `Appointment ${appointmentId} has been approved.`
    );
  };

  // Inside BeauticianHomeScreen component

  const handleDone = (appointmentId) => {
    // Logic to handle marking appointment as done with ID `appointmentId`
    Alert.alert(
      "Appointment Completed",
      `Appointment ${appointmentId} has been marked as done.`
    );

    // Filter out the appointment with the given appointmentId
    const updatedAppointments = appointments.filter(
      (item) => item.id !== appointmentId
    );
    setAppointments(updatedAppointments);
  };

  const renderAppointmentItem = ({ item }) => (
    <View style={styles.appointmentItem}>
      <Text style={styles.label}>Client: </Text>
      <Text style={styles.value}>{item.clientName}Lisa</Text>
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
          style={[styles.button, styles.approveButton]}
          onPress={() => handleApprove(item.id)}
        >
          <Text style={styles.buttonText}>Approve</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.doneButton]}
          onPress={() => handleDone(item.id)}
        >
          <Text style={styles.buttonText}>Done</Text>
        </TouchableOpacity>
      </View>
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

      <Text style={styles.sectionTitle}>Upcoming Appointments</Text>
      {isLoading ? (
        <ActivityIndicator size="large" color="#075eec" />
      ) : (
        <FlatList
          data={appointments}
          renderItem={renderAppointmentItem}
          keyExtractor={(item) => item.id.toString()}
          ListEmptyComponent={
            <Text style={styles.noAppointments}>No upcoming appointments</Text>
          }
        />
      )}

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.footerIcon}
          onPress={() => navigation.navigate("BeauticianHomeScreen")}
        >
          <Icon name="home" size={24} color="#075eec" />
          <Text style={styles.footerIconText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.footerIcon}
          onPress={() => navigation.navigate("BeauticianProfileScreen")}
        >
          <Icon name="user" size={24} color="#075eec" />
          <Text style={styles.footerIconText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e8ecf4",
    padding: 16,
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
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1D2A32",
    marginBottom: 12,
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
  noAppointments: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  button: {
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 15,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 100,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  approveButton: {
    backgroundColor: "#3CB371", // Green color for approve button
  },
  doneButton: {
    backgroundColor: "#1E90FF", // Blue color for done button
  },
});
