//rating
import React, { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
 ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import axios from "axios";
import Config from "../Server/config"; // Assuming you have a config file for API URL
import { AirbnbRating } from "react-native-ratings";

RatingScreen = ({ route, navigation }) => {
  const { beauticianId, businessId } = route.params || {};

  const [businessRating, setBusinessRating] = useState(0);
  const [beauticianRating, setBeauticianRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleRatingSubmit = () => {
    axios
      .post(`${Config.API_URL}/api/ratings`, {
        beauticianId,
        businessId,
        businessRating,
        beauticianRating,
        comment,
      })
      .then((response) => {
        console.log("Rating submitted successfully:", response.data);
        navigation.navigate("ClientHomeScreen"); // Navigate back to home screen after submission
      })
      .catch((error) => {
        console.error("Error submitting rating:", error);
        // Handle error (show alert or retry logic)
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>Rate Your Experience</Text>
        </View>

        <View style={styles.ratingContainer}>
          <Text style={styles.label}>Rate the Business:</Text>
          <AirbnbRating
            count={5}
            reviews={["Terrible", "Bad", "OK", "Good", "Great"]}
            defaultRating={0}
            size={24}
            onFinishRating={(rating) => setBusinessRating(rating)}
          />

          <Text style={styles.label}>Rate the Beautician:</Text>
          <AirbnbRating
            count={5}
            reviews={["Terrible", "Bad", "OK", "Good", "Great"]}
            defaultRating={0}
            size={24}
            onFinishRating={(rating) => setBeauticianRating(rating)}
          />

          <Text style={styles.label}>Comment (Optional):</Text>
          <TextInput
            style={[styles.input, { height: 100 }]}
            placeholder="Leave a comment..."
            multiline
            numberOfLines={4}
            value={comment}
            onChangeText={(text) => setComment(text)}
          />

          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleRatingSubmit}
          >
            <Text style={styles.submitButtonText}>Submit Rating</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RatingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e8ecf4",
    paddingHorizontal: 24,
  },
  header: {
    alignItems: "center",
    marginVertical: 36,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#075eec",
  },
  ratingContainer: {
    marginTop: 24,
  },
  label: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1D2A32",
    marginBottom: 6,
  },
  input: {
    height: 40,
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  submitButton: {
    backgroundColor: "#075eec",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 25,
    marginTop: 20,
    alignItems: "center",
  },
  submitButtonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
  },
});
