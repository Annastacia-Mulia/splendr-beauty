import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from "react-native";


import { useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Config from "../Server/config";
import { Rating } from "react-native-ratings";

const BeauticianListScreen = () => {
  const [loading, setLoading] = useState(true);
  const [beauticianData, setBeauticianData] = useState([]);
  const navigation = useNavigation();
  const route = useRoute();
  const { service, business } = route.params;

  useEffect(() => {
    const fetchBeauticians = async () => {
      try {
        const businessID = await AsyncStorage.getItem("businessID");
        if (!businessID) {
          throw new Error("No businessID found in AsyncStorage");
        }

        const response = await fetch(
          `${Config.API_URL}/api/beauticians?businessID=${businessID}`
        );
        const data = await response.json();
        setBeauticianData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching beauticians:", error);
        setLoading(false);
      }
    };

    fetchBeauticians();
  }, []);

  const handleSelectBeautician = async (beautician) => {
    try {
      await AsyncStorage.setItem(
        "selectedBeauticianID",
        beautician.userID.toString()
      );
    } catch (error) {
      console.error("Error storing selectedBeauticianID:", error);
      return;
    }

    navigation.navigate("AppointmentBookingScreen", {
      beautician,
      business,
      service,
    });
  };

  const renderBeauticianItem = ({ item }) => (
    <TouchableOpacity
      style={styles.beauticianItem}
      onPress={() => handleSelectBeautician(item)}
    >
      {item.img_url && (
        <Image source={{ uri: item.img_url }} style={styles.beauticianImage} />
      )}
      <View style={styles.beauticianInfo}>
        <Text style={styles.beauticianName}>{`${item.firstName} ${item.lastName}`}</Text>
        <Text style={styles.beauticianDetails}>{item.email}</Text>
        <Text style={styles.beauticianDetails}>{item.phone}</Text>
        <View style={styles.ratingContainer}>
          <Rating
            readonly
            startingValue={item.rating}
            imageSize={20}
            ratingCount={5}
            style={styles.star}
          />
          <Text style={styles.ratingText}>({item.rating})</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <ActivityIndicator
          size="large"
          color="#075eec"
          style={styles.loadingIndicator}
        />
      ) : (
        <FlatList
          data={beauticianData}
          keyExtractor={(item) =>
            item.userID ? item.userID.toString() : Math.random().toString()
          }
          renderItem={renderBeauticianItem}
          contentContainerStyle={styles.beauticianList}
        />
      )}
    </SafeAreaView>
  );
};

export default BeauticianListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e8ecf4",
  },
  beauticianList: {
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  beauticianItem: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  beauticianImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 20,
  },
  beauticianInfo: {
    flex: 1,
  },
  beauticianName: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 6,
  },
  beauticianDetails: {
    fontSize: 14,
    color: "#929292",
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  star: {
    marginHorizontal: 2,
  },
  ratingText: {
    marginLeft: 5,
    fontSize: 14,
    color: "#929292",
  },
});
