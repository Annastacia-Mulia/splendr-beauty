import React, { useEffect } from "react";
import { View, Text, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native"; // Assuming you use React Navigation
import Config from "../Server/config"; // Import the config file

const VerifyEmailScreen = ({ route }) => {
  const navigation = useNavigation();
  const { token } = route.params; // Assuming you pass the token to this screen

  useEffect(() => {
    verifyEmail(token);
  }, []);

  

  const verifyEmail = async (token) => {
    try {
      const response = await fetch(
        `${Config.API_URL}/verifyEmail?token=${token}`
      );
      const data = await response.json();

      if (response.ok) {
        // Show success message
        Alert.alert("Success", data.message, [
          { text: "OK", onPress: () => navigation.navigate("Login") },
        ]);
      } else {
        // Handle error case
        Alert.alert("Error", data.message);
      }
    } catch (error) {
      console.error("Error verifying email:", error);
      Alert.alert("Error", "Failed to verify email");
    }
  };

  return (
    <View>
      <Text>Verifying email...</Text>
      {/* You can optionally show a spinner or loading indicator here */}
    </View>
  );
};

export default VerifyEmailScreen;
