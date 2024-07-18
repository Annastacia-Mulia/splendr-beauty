import React, { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import axios from "axios";
import Config from "../Server/config"; // Import the config file

export default function ResetPassword({ route, navigation }) {
  const [newPassword, setNewPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const { token } = route.params;

  const handlePasswordReset = async () => {
    // Validate password
    if (!validatePassword(newPassword)) {
      return;
    }

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
    }
  };

  const validatePassword = (password) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!regex.test(password)) {
      setPasswordError(
        "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special symbol."
      );
      return false;
    } else {
      setPasswordError("");
      return true;
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.title}>Reset Password</Text>
        <Text style={styles.subtitle}>Enter your new password</Text>

        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter your new password"
            placeholderTextColor="#6b7280"
            value={newPassword}
            onChangeText={(text) => {
              setNewPassword(text);
              if (passwordError) {
                setPasswordError("");
              }
            }}
            secureTextEntry={!isPasswordVisible}
            autoCapitalize="none"
            autoCorrect={false}
          />
          <TouchableOpacity
            onPress={togglePasswordVisibility}
            style={styles.visibilityButton}
          >
            <Text style={styles.visibilityButtonText}>
              {isPasswordVisible ? "Hide" : "Show"}
            </Text>
          </TouchableOpacity>
        </View>

        {passwordError ? (
          <Text style={styles.error}>{passwordError}</Text>
        ) : null}

        <TouchableOpacity onPress={handlePasswordReset} style={styles.button}>
          <Text style={styles.buttonText}>Reset Password</Text>
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
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: "#C9D3DB",
    borderRadius: 12,
    backgroundColor: "#fff",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  visibilityButton: {
    padding: 10,
    marginLeft: 10,
  },
  visibilityButtonText: {
    color: "#075eec",
    fontWeight: "600",
  },
  button: {
    backgroundColor: "#075eec",
    padding: 10,
    borderRadius: 12,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    textAlign: "center",
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
});
