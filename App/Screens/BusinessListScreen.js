import React from 'react';
import { StyleSheet, SafeAreaView, View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Rating } from 'react-native-ratings';

const BusinessListScreen = ({ route }) => {
  const { businesses } = route.params;
  const navigation = useNavigation();



  
  const handleSelectBusiness = async (business) => {
    try {
      await AsyncStorage.setItem('businessID', business.businessID.toString());
    } catch (error) {
      console.error('Error storing businessID:', error);
    }

    navigation.navigate('ServiceListScreen', { business });
  };

  const renderBusinessItem = ({ item }) => (
    <TouchableOpacity
      style={styles.businessItem}
      onPress={() => handleSelectBusiness(item)}
    >
      {item.image_url && <Image source={{ uri: item.image_url }} style={styles.businessImage} />}
      <Text style={styles.businessName}>{item.name}</Text>
      <Text style={styles.businessDetails}>{item.address}</Text>
      <Text style={styles.businessDetails}>{item.phone}</Text>
      <Text style={styles.businessDetails}>{item.email}</Text>
      <Text style={styles.businessDetails}>{item.description}</Text>
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
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Beauty Businesses</Text>
      </View>
      <FlatList
        data={businesses}
        keyExtractor={(item) => (item.businessID ? item.businessID.toString() : Math.random().toString())}
        renderItem={renderBusinessItem}
        contentContainerStyle={styles.businessList}
      />
    </SafeAreaView>
  );
};

export default BusinessListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8ecf4',
  },
  header: {
    alignItems: 'center',
    marginVertical: 36,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#075eec',
    marginBottom: 6,
  },
  businessList: {
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
  businessItem: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  businessName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#075eec',
    marginBottom: 6,
  },
  businessDetails: {
    fontSize: 14,
    color: '#929292',
  },
  businessImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 10,
    marginTop: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  star: {
    marginHorizontal: 2,
  },
  ratingText: {
    marginLeft: 5,
    fontSize: 14,
    color: '#929292',
  },
});
