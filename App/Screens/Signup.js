import React, { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import Config from "../Server/config";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage

export default function Signup({ navigation }) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    gender: "",
    userType: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    Business_ID: "", // Added businessID field
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    gender: "",
    userType: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    businessID: "", // Added businessID field
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state

  const validateForm = () => {
    let valid = true;
    let newErrors = { ...errors };

    if (form.firstName.trim() === "") {
      newErrors.firstName = "First Name is required";
      valid = false;
    } else {
      newErrors.firstName = "";
    }

    if (form.lastName.trim() === "") {
      newErrors.lastName = "Last Name is required";
      valid = false;
    } else {
      newErrors.lastName = "";
    }

    if (form.phone.trim() === "") {
      newErrors.phone = "Phone Number is required";
      valid = false;
    } else {
      newErrors.phone = "";
    }

    if (form.gender.trim() === "") {
      newErrors.gender = "Gender is required";
      valid = false;
    } else {
      newErrors.gender = "";
    }

    if (form.userType.trim() === "") {
      newErrors.userType = "User Type is required";
      valid = false;
    } else {
      newErrors.userType = "";
    }

    if (form.email.trim() === "") {
      newErrors.email = "Email Address is required";
      valid = false;
    } else {
      newErrors.email = "";
    }

    if (form.password.trim() === "") {
      newErrors.password = "Password is required";
      valid = false;
    } else if (form.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
      valid = false;
    } else {
      newErrors.password = "";
    }

    if (form.passwordConfirmation.trim() === "") {
      newErrors.passwordConfirmation = "Please confirm your password";
      valid = false;
    } else if (form.passwordConfirmation !== form.password) {
      newErrors.passwordConfirmation = "Passwords do not match";
      valid = false;
    } else {
      newErrors.passwordConfirmation = "";
    }

    if (form.userType === "Beautician" && form.businessID.trim() === "") {
      newErrors.businessID = "Business ID is required for beauticians";
      valid = false;
    } else {
      newErrors.businessID = "";
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSignup = async () => {
    if (validateForm()) {
      setLoading(true); // Start loading

      try {
        const response = await axios.post(`${Config.API_URL}/api/signup`, form);

        if (response.status === 200) {
          // Store user ID and userType in AsyncStorage
          await AsyncStorage.setItem("userID", response.data.userID.toString());
          await AsyncStorage.setItem("userType", form.userType);

          Alert.alert(
            "Signup Successful",
            "Please check your email to verify your account."
          );

          navigation.navigate("Login");
        }
      } catch (error) {
        console.error("Error creating user:", error);
        if (error.response && error.response.status === 409) {
          Alert.alert(
            "Signup Failed",
            "Email already exists. Please use a different email address."
          );
        } else {
          Alert.alert(
            "Signup Failed",
            "An error occurred while signing up. Please try again later."
          );
        }
      } finally {
        setLoading(false); // Stop loading
      }
    } else {
      Alert.alert(
        "Validation Error",
        "Please fill out all required fields correctly."
      );
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#e8ecf4" }}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>
            Sign Up to <Text style={{ color: "#075eec" }}>Splendr</Text>
          </Text>
          <Text style={styles.subtitle}>
            The Ultimate Beauty booking application
          </Text>
        </View>

        <View style={styles.form}>
          <View style={styles.input}>
            <Text style={styles.inputLabel}>First Name</Text>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={(firstName) => setForm({ ...form, firstName })}
              placeholder="John"
              placeholderTextColor="#6b7280"
              style={styles.inputControl}
              value={form.firstName}
            />
            <Text style={styles.errorText}>{errors.firstName}</Text>
          </View>

          <View style={styles.input}>
            <Text style={styles.inputLabel}>Last Name</Text>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={(lastName) => setForm({ ...form, lastName })}
              placeholder="Doe"
              placeholderTextColor="#6b7280"
              style={styles.inputControl}
              value={form.lastName}
            />
            <Text style={styles.errorText}>{errors.lastName}</Text>
          </View>

          <View style={styles.input}>
            <Text style={styles.inputLabel}>Phone Number</Text>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="phone-pad"
              onChangeText={(phone) => setForm({ ...form, phone })}
              placeholder="0722000000"
              placeholderTextColor="#6b7280"
              style={styles.inputControl}
              value={form.phone}
            />
            <Text style={styles.errorText}>{errors.phone}</Text>
          </View>

          <View style={styles.input}>
            <Text style={styles.inputLabel}>Gender</Text>
            <View style={styles.radioContainer}>
              <TouchableOpacity
                style={styles.radioButton}
                onPress={() => setForm({ ...form, gender: "Male" })}
              >
                <View
                  style={[
                    styles.radioCircle,
                    form.gender === "Male" && styles.selectedRadioCircle,
                  ]}
                />
                <Text style={styles.radioText}>Male</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.radioButton}
                onPress={() => setForm({ ...form, gender: "Female" })}
              >
                <View
                  style={[
                    styles.radioCircle,
                    form.gender === "Female" && styles.selectedRadioCircle,
                  ]}
                />
                <Text style={styles.radioText}>Female</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.errorText}>{errors.gender}</Text>
          </View>

          <View style={styles.input}>
            <Text style={styles.inputLabel}>User Type</Text>
            <View style={styles.radioContainer}>
              <TouchableOpacity
                style={styles.radioButton}
                onPress={() => setForm({ ...form, userType: "Client" })}
              >
                <View
                  style={[
                    styles.radioCircle,
                    form.userType === "Client" && styles.selectedRadioCircle,
                  ]}
                />
                <Text style={styles.radioText}>Client</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.radioButton}
                onPress={() => setForm({ ...form, userType: "Beautician" })}
              >
                <View
                  style={[
                    styles.radioCircle,
                    form.userType === "Beautician" &&
                      styles.selectedRadioCircle,
                  ]}
                />
                <Text style={styles.radioText}>Beautician</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.errorText}>{errors.userType}</Text>
          </View>

          {form.userType === "Beautician" && (
            <View style={styles.input}>
              <Text style={styles.inputLabel}>Business ID</Text>
              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={(businessID) => setForm({ ...form, businessID })}
                placeholder="1"
                placeholderTextColor="#6b7280"
                style={styles.inputControl}
                value={form.businessID}
              />
              <Text style={styles.errorText}>{errors.businessID}</Text>
            </View>
          )}

          <View style={styles.input}>
            <Text style={styles.inputLabel}>Email address</Text>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              clearButtonMode="while-editing"
              keyboardType="email-address"
              onChangeText={(email) => setForm({ ...form, email })}
              placeholder="you@email.com"
              placeholderTextColor="#6b7280"
              style={styles.inputControl}
              value={form.email}
            />
            <Text style={styles.errorText}>{errors.email}</Text>
          </View>

          <View style={styles.input}>
            <Text style={styles.inputLabel}>Password</Text>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={(password) => setForm({ ...form, password })}
              placeholder="Enter Password"
              placeholderTextColor="#6b7280"
              secureTextEntry={!showPassword}
              style={styles.inputControl}
              value={form.password}
            />
            <Text style={styles.errorText}>{errors.password}</Text>
          </View>

          <View style={styles.input}>
            <Text style={styles.inputLabel}>Confirm Password</Text>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={(passwordConfirmation) =>
                setForm({ ...form, passwordConfirmation })
              }
              placeholder="Confirm Password"
              placeholderTextColor="#6b7280"
              secureTextEntry={!showPassword}
              style={styles.inputControl}
              value={form.passwordConfirmation}
            />
            <Text style={styles.errorText}>{errors.passwordConfirmation}</Text>
          </View>

          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.showPassword}
          >
            <Text style={styles.showPasswordText}>
              {showPassword ? "Hide" : "Show"} Password
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleSignup}
            style={styles.signupButton}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.signupButtonText}>Sign Up</Text>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Already have an account?{" "}
            <Text
              onPress={() => navigation.navigate("Login")}
              style={{ color: "#075eec" }}
            >
              Login
            </Text>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  header: {
    alignItems: "center",
    marginBottom: 40,
  },
  title: {
    color: "#222",
    fontSize: 24,
    fontWeight: "bold",
  },
  subtitle: {
    color: "#707070",
    fontSize: 16,
  },
  form: {
    marginBottom: 32,
  },
  input: {
    marginBottom: 16,
  },
  inputLabel: {
    color: "#333",
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 4,
  },
  inputControl: {
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    fontSize: 14,
    padding: 12,
  },
  radioContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 8,
  },
  radioButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  radioCircle: {
    height: 16,
    width: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#075eec",
    marginRight: 8,
  },
  selectedRadioCircle: {
    backgroundColor: "#075eec",
  },
  radioText: {
    color: "#333",
  },
  showPassword: {
    alignSelf: "flex-end",
    marginBottom: 32,
  },
  showPasswordText: {
    color: "#075eec",
    fontSize: 14,
  },
  signupButton: {
    backgroundColor: "#075eec",
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: "center",
  },
  signupButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
  footer: {
    alignItems: "center",
  },
  footerText: {
    color: "#333",
    fontSize: 14,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 4,
  },
});
