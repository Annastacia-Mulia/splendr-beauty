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

export default function ForgotPassword({ navigation }) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false); // State to manage loading state

  const handlePasswordResetRequest = async () => {
    setIsLoading(true); // Set loading state to true when password reset request starts
    try {
      const response = await axios.post(
        `${Config.API_URL}/api/request-password-reset`,
        {
          email,
        }
      );
      //

      if (response.status === 200) {
        Alert.alert("Success", "Password reset email sent");
        navigation.navigate("Login");
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred. Please try again.");
      console.error(error);
    } finally {
      setIsLoading(false); // Set loading state to false when password reset request finishes
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.title}>Forgot Password</Text>
        <Text style={styles.subtitle}>
          Enter your email to reset your password
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          placeholderTextColor="#6b7280"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />

        <TouchableOpacity
          onPress={handlePasswordResetRequest}
          style={styles.button}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Send Reset Email</Text>
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
