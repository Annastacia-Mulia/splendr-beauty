import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Config from "../Server/config";

const EditProfileScreen = ({ navigation }) => {
  const [userID, setUserID] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");

  useEffect(() => {
    AsyncStorage.getItem("userID").then((id) => {
      if (id) {
        setUserID(id);
        fetchUserDetails(id);
      }
    });
  }, []);

  const fetchUserDetails = async (userID) => {
    try {
      const response = await fetch(
        `${Config.API_URL}/api/user-details/${userID}`
      );
      const data = await response.json();
      setFirstName(data.firstName);
      setLastName(data.lastName);
      setPhone(data.phone);
      setEmail(data.email);
      setGender(data.gender);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const handleSaveChanges = async () => {
    if (!userID) {
      Alert.alert("Error", "User ID is missing.");
      return;
    }

    try {
      const response = await fetch(
        `${Config.API_URL}/api/user-details/${userID}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName,
            lastName,
            phone,
            email,
            gender,
          }),
        }
      );

      const responseData = await response.json();
      console.log(responseData);

      if (response.ok) {
        Alert.alert("Success", "Profile updated successfully.");
        navigation.goBack();
      } else {
        console.error("Error updating profile:", responseData);
        Alert.alert("Error", `Failed to update profile: ${responseData.error}`);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      Alert.alert("Error", "Failed to update profile. Please try again later.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Profile</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="First Name"
          value={firstName}
          onChangeText={setFirstName}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          value={lastName}
          onChangeText={setLastName}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Phone"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Gender"
          value={gender}
          onChangeText={setGender}
        />
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
        <Text style={styles.saveButtonText}>Save Changes</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: "#e8ecf4",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  inputContainer: {
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  saveButton: {
    backgroundColor: "#075eec",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 25,
    marginTop: 20,
    alignSelf: "center",
  },
  saveButtonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
  },
});

export default EditProfileScreen;
