import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import Config from "../Server/config"; // Import the config file

const AppointmentScreen = ({ navigation }) => {
  const [date, setDate] = useState(new Date(2024, 4, 22));
  const [time, setTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const handleEditPress = () => {
    navigation.navigate("EditAppointmentScreen");
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  const showTimepicker = () => {
    setShowTimePicker(true);
  };

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === "ios");
    setDate(currentDate);
  };

  const onChangeTime = (event, selectedTime) => {
    const currentTime = selectedTime || time;
    setShowTimePicker(Platform.OS === "ios");
    setTime(currentTime);
  };
  // `${BASE_URL}/appointments`
  const submitAppointment = async () => {
    try {
      const response = await fetch(`${Config.API_URL}/api/appointments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          client_name: "Anna", // Replace with actual data from TextInput
          service_name: "Braids", // Replace with actual data from TextInput
          appointment_date: date.toISOString().split("T")[0], // Assuming 'date' is your state holding the appointment date
          appointment_time: time.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }), // Assuming 'time' is your state holding the appointment time
          business_name: "Salon", // Replace with actual data from TextInput
          client_email: "anna.mulia04@gmail.com", // Replace with actual data from TextInput
          beautician_name: "Annastacia", // Replace with actual data from TextInput
          extra_info: "Extra long braids", // Replace with actual data from TextInput
        }),
      });
      const data = await response.json();
      console.log(data); // Handle response as needed
      // Optionally, navigate to a success screen or show a success message
    } catch (error) {
      console.error("Error submitting appointment:", error);
      // Handle error (show error message, retry logic, etc.)
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#e8ecf4" }}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Appointment Details</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.input}>
            <Text style={styles.inputLabel}>Client Name</Text>
            <TextInput
              placeholder="Anna"
              placeholderTextColor="#6b7280"
              style={styles.inputControl}
            />
          </View>

          <View style={styles.input}>
            <Text style={styles.inputLabel}>Service Name</Text>
            <TextInput
              placeholder="Braids"
              placeholderTextColor="#6b7280"
              style={styles.inputControl}
            />
          </View>

          <View style={styles.input}>
            <Text style={styles.inputLabel}>Date</Text>
            <TouchableOpacity
              onPress={showDatepicker}
              style={styles.dateButton}
            >
              <Text style={styles.dateButtonText}>{date.toDateString()}</Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={date}
                mode="date"
                display="default"
                onChange={onChangeDate}
                minimumDate={new Date(2020, 0, 1)}
                maximumDate={new Date(2030, 11, 31)}
              />
            )}
          </View>

          <View style={styles.input}>
            <Text style={styles.inputLabel}>Time</Text>
            <TouchableOpacity
              onPress={showTimepicker}
              style={styles.dateButton}
            >
              <Text style={styles.dateButtonText}>
                {time.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Text>
            </TouchableOpacity>
            {showTimePicker && (
              <DateTimePicker
                value={time}
                mode="time"
                display="default"
                onChange={onChangeTime}
              />
            )}
          </View>

          <View style={styles.input}>
            <Text style={styles.inputLabel}>Business Name</Text>
            <TextInput
              placeholder="Salon"
              placeholderTextColor="#6b7280"
              style={styles.inputControl}
            />
          </View>

          <View style={styles.input}>
            <Text style={styles.inputLabel}>Client Email</Text>
            <TextInput
              placeholder="anna.mulia04@gmail.com"
              placeholderTextColor="#6b7280"
              style={styles.inputControl}
            />
          </View>

          <View style={styles.input}>
            <Text style={styles.inputLabel}>Beautician Name</Text>
            <TextInput
              placeholder="Annastacia"
              placeholderTextColor="#6b7280"
              style={styles.inputControl}
            />
          </View>

          <View style={styles.input}>
            <Text style={styles.inputLabel}>Extra Info</Text>
            <TextInput
              placeholder="Extra long braids"
              placeholderTextColor="#6b7280"
              style={styles.inputControl}
            />
          </View>

          <TouchableOpacity style={styles.btn} onPress={submitAppointment}>
            <Text style={styles.btnText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    paddingHorizontal: 24,
    flexGrow: 1,
  },
  title: {
    fontSize: 31,
    fontWeight: "700",
    color: "#1D2A32",
    marginBottom: 6,
  },
  header: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 36,
  },
  form: {
    marginBottom: 24,
    flexGrow: 1,
  },
  input: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 17,
    fontWeight: "600",
    color: "#222",
    marginBottom: 8,
  },
  inputControl: {
    height: 50,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: "500",
    color: "#222",
    borderWidth: 1,
    borderColor: "#C9D3DB",
    borderStyle: "solid",
  },
  dateButton: {
    height: 50,
    justifyContent: "center",
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#C9D3DB",
  },
  dateButtonText: {
    fontSize: 15,
    color: "#222",
  },
  btn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    backgroundColor: "#075eec",
    borderColor: "#075eec",
  },
  btnText: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: "600",
    color: "#fff",
  },
});

export default AppointmentScreen;
