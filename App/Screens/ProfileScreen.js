import React, { useState, useEffect, useCallback } from "react";
import { View, Text, StyleSheet, Button, Alert, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import Config from "../Server/config";

const ProfileScreen = ({ navigation }) => {
  const [userID, setUserID] = useState(null);
  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    gender: "",
  });

  useEffect(() => {
    AsyncStorage.getItem("userID").then((id) => {
      if (id) {
        setUserID(id);
        fetchUserDetails(id);
      }
    });
  }, []);

  useFocusEffect(
    useCallback(() => {
      if (userID) {
        fetchUserDetails(userID);
      }
    }, [userID])
  );

  const fetchUserDetails = async (userID) => {
    try {
      const response = await fetch(`${Config.API_URL}/api/user-details/${userID}`);
      const data = await response.json();
      setUserDetails(data);
    } catch (error) {
      console.error("Error fetching user details:", error);
      Alert.alert("Error", "Failed to fetch user details.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <View style={styles.profileSection}>
        <Text style={styles.label}>First Name</Text>
        <Text style={styles.text}>{userDetails.firstName}</Text>
      </View>
      <View style={styles.profileSection}>
        <Text style={styles.label}>Last Name</Text>
        <Text style={styles.text}>{userDetails.lastName}</Text>
      </View>
      <View style={styles.profileSection}>
        <Text style={styles.label}>Phone</Text>
        <Text style={styles.text}>{userDetails.phone}</Text>
      </View>
      <View style={styles.profileSection}>
        <Text style={styles.label}>Email</Text>
        <Text style={styles.text}>{userDetails.email}</Text>
      </View>
      <View style={styles.profileSection}>
        <Text style={styles.label}>Gender</Text>
        <Text style={styles.text}>{userDetails.gender}</Text>
      </View>
      <TouchableOpacity
        style={styles.editButton}
        onPress={() => navigation.navigate("EditProfileScreen")}
      >
        <Text style={styles.editButtonText}>Edit Profile</Text>
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
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  noImageText: {
    fontSize: 16,
    color: "#666",
  },
  profileSection: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 6,
    color: "#075eec",
  },
  text: {
    fontSize: 16,
    color: "#333",
  },
  editButton: {
    backgroundColor: "#075eec",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 25,
    marginTop: 20,
    alignSelf: "center",
  },
  editButtonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
  },
});

export default ProfileScreen;
