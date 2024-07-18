import React, { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import Config from "../Server/config"; // Import the config file

export default function ResetPassword({ route, navigation }) {
  const [newPassword, setNewPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false); // State to manage loading state
  const { token } = route.params;

  const handlePasswordReset = async () => {
    setIsLoading(true); // Set loading state to true when password reset starts
    try {
      const response = await axios.post(
        `${Config.API_URL}/api/reset-password`,
        {
          token,
          newPassword,
        }
      );

      if (response.status === 200) {
        Alert.alert("Success", "Password reset successfully");
        navigation.navigate("Login");
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred. Please try again.");
      console.error(error);
    } finally {
      setIsLoading(false); // Set loading state to false when password reset finishes
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.title}>Reset Password</Text>
        <Text style={styles.subtitle}>Enter your new password</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter your new password"
          placeholderTextColor="#6b7280"
          value={newPassword}
          onChangeText={setNewPassword}
          secureTextEntry={true}
          autoCapitalize="none"
          autoCorrect={false}
        />

        <TouchableOpacity
          onPress={handlePasswordReset}
          style={styles.button}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Reset Password</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#e8ecf4",
  },
  form: {
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1D2A32",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#929292",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#C9D3DB",
    borderRadius: 12,
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#075eec",
    padding: 10,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
});
