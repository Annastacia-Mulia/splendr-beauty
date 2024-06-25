import React, { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import axios from "axios"; // Import Axios for making HTTP requests
import Config from "../Server/config";
import DateTimePickerModal from "react-native-modal-datetime-picker";



const RescheduleAppointmentScreen = ({ route, navigation }) => {
  const { appointmentId } = route.params; // Get appointmentId from navigation route params
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  // Calculate today's date
  const today = new Date();
  const todayDate = today.toISOString().split("T")[0];

  // Set minimum date to 17th July 2024
  const minimumDate = new Date("2024-07-17");

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirmDate = (selectedDate) => {
    setDate(selectedDate.toISOString().split("T")[0]); // Format date as YYYY-MM-DD
    hideDatePicker();
  };

  const handleReschedule = async () => {
    try {
      const rescheduleData = {
        date,
        time,
      };
      // Send a PUT request to update appointment details
      await axios.put(
        `${Config.API_URL}/api/appointments/${appointmentId}`,
        rescheduleData
      ); // Replace with actual endpoint
      console.log("Appointment rescheduled successfully");
      navigation.goBack(); // Navigate back to previous screen after rescheduling
      navigation.navigate("MyAppointmentsScreen", { refresh: true }); // Navigate to MyAppointmentsScreen with refresh flag
    } catch (error) {
      console.error("Error rescheduling appointment:", error);
      // Handle error rescheduling appointment
    }
  };

  const renderTimeSlots = () => {
    const timeSlots = [];
    const startTime = 8;
    const endTime = 17;
    for (let hour = startTime; hour < endTime; hour++) {
      const time12hr = hour >= 12 ? `${hour - 12} PM` : `${hour} AM`; // Convert to 12-hour format
      const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour; // Handle 12 AM case
      timeSlots.push(
        <TouchableOpacity
          key={`${hour}:00`}
          style={styles.timeSlot}
          onPress={() =>
            handleSelectTime(`${displayHour}:00 ${hour >= 12 ? "PM" : "AM"}`)
          }
        >
          <Text>{`${displayHour}:00 ${hour >= 12 ? "PM" : "AM"}`}</Text>
        </TouchableOpacity>
      );
      timeSlots.push(
        <TouchableOpacity
          key={`${hour}:30`}
          style={styles.timeSlot}
          onPress={() =>
            handleSelectTime(`${displayHour}:30 ${hour >= 12 ? "PM" : "AM"}`)
          }
        >
          <Text>{`${displayHour}:30 ${hour >= 12 ? "PM" : "AM"}`}</Text>
        </TouchableOpacity>
      );
    }
    return timeSlots;
  };

  const handleSelectTime = (selectedTime) => {
    setTime(selectedTime);
    // Optionally, you can automatically trigger the rescheduling process upon selecting a time
    // handleReschedule();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.content}>
          <Text style={styles.title}>Reschedule Appointment</Text>
          <View style={styles.formGroup}>
            <Text style={styles.label}>New Date:</Text>
            <TouchableOpacity style={styles.input} onPress={showDatePicker}>
              <Text>{date ? date : "Select Date"}</Text>
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              minimumDate={minimumDate}
              maximumDate={undefined} // Optionally set maximum date
              onConfirm={handleConfirmDate}
              onCancel={hideDatePicker}
            />
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.label}>New Time:</Text>
            <View style={styles.timeSlotsContainer}>{renderTimeSlots()}</View>
          </View>
          <TouchableOpacity
            style={styles.rescheduleButton}
            onPress={handleReschedule}
          >
            <Text style={styles.buttonText}>Reschedule Appointment</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RescheduleAppointmentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e8ecf4",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 20, // Ensure content is not covered by the navigation bar
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#075eec",
    marginBottom: 20,
    textAlign: "center",
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: "600",
    color: "#555",
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginTop: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  timeSlotsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  timeSlot: {
    width: "48%", // Adjust as per your design needs
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    marginBottom: 10,
    borderRadius: 8,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  rescheduleButton: {
    backgroundColor: "#075eec",
    borderRadius: 5,
    paddingVertical: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
