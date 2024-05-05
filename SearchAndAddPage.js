import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const SearchAndAddPage = ({ route }) => {
  const { nickname, userType } = route.params;
  const [searchText, setSearchText] = useState("");
  const [plantDetails, setPlantDetails] = useState([]);
  const [error, setError] = useState(null);
  const [isAddingPlant, setIsAddingPlant] = useState(false);
  const [nickText, setNickText] = useState("");

  const handleSearch = async () => {
    try {
      const response = await fetch(
        "http://10.30.19.255:80/compproject/check_plant.php",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: searchText }),
        }
      );

      const data = await response.json();

      if (response.status === 200) {
        console.log("Bitki bulundu:", data);
        Alert.alert(
          "Success!",
          "Plant exists!",
          [{ text: "Ok", onPress: () => console.log("OK Pressed") }],
          { cancelable: false }
        );
        setPlantDetails(data.Data);
        updateSearchCount(searchText);
      } else if (response.status === 404) {
        console.log("Bitki bulunamadı");
        Alert.alert(
          "Error",
          "Plant could not found",
          [{ text: "Ok", onPress: () => console.log("OK Pressed") }],
          { cancelable: false }
        );
        setPlantDetails([]);
        setError("Bitki bulunamadı");
      } else {
        throw new Error(data.Message || "Beklenmeyen bir hata oluştu");
      }
    } catch (error) {
      console.error(error);
      Alert.alert(
        "Hata",
        "Beklenmeyen bir hata oluştu",
        [{ text: "Tamam", onPress: () => console.log("OK Pressed") }],
        { cancelable: false }
      );
      setPlantDetails([]);
      setError("Beklenmeyen bir hata oluştu");
    }
  };

  const updateSearchCount = async (searchText) => {
    try {
      const response = await fetch(
        "http://110.30.19.255:80/compproject/update_search_count.php",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: searchText }),
        }
      );

      const data = await response.json();

      if (response.status === 200) {
        console.log("Arama sayısı güncellendi:", data.Message);
      } else {
        throw new Error(data.Message || "Beklenmeyen bir hata oluştu");
      }
    } catch (error) {
      console.error(error);
      Alert.alert(
        "Hata",
        "Arama sayısı güncellenirken bir hata oluştu",
        [{ text: "Tamam", onPress: () => console.log("OK Pressed") }],
        { cancelable: false }
      );
    }
  };

  const handleAddPlant = async () => {
    try {
      if (!nickText) {
        Alert.alert(
          "Error",
          "Please enter a nickname",
          [{ text: "Ok", onPress: () => console.log("OK Pressed") }],
          { cancelable: false }
        );
        return;
      }

      if (plantDetails.length === 0) {
        Alert.alert(
          "Error",
          "Please search and select a plant first",
          [{ text: "Ok", onPress: () => console.log("OK Pressed") }],
          { cancelable: false }
        );
        return;
      }

      const plantData = {
        nickname: nickname,
        plant_nickname: nickText,
        name: plantDetails[0].name,
        frequency: plantDetails[0].water,
        category: plantDetails[0].category_name,
      };

      const response = await fetch(
        "http://10.30.19.255:80/compproject/user_plants.php",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(plantData),
        }
      );

      const data = await response.json();

      if (response.status === 200) {
        console.log("Nickname başarıyla eklendi:", data.Message);
        Alert.alert(
          "Success!",
          "Nickname added successfully!",
          [{ text: "Ok", onPress: () => console.log("OK Pressed") }],
          { cancelable: false }
        );
      } else {
        throw new Error(data.Message || "Beklenmeyen bir hata oluştu");
      }
    } catch (error) {
      console.error(error);
      Alert.alert(
        "Hata",
        "Nickname eklenirken bir hata oluştu",
        [{ text: "Tamam", onPress: () => console.log("OK Pressed") }],
        { cancelable: false }
      );
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Search And Add Page</Text>
      <View style={{ marginTop: 20 }}>
        <Text style={styles.welcomeText}>
          Hoş geldiniz, {nickname}! User Type: {userType}
        </Text>

        <Text>Enter a plant name:</Text>
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 5,
            padding: 8,
            marginTop: 8,
            width: 200,
          }}
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
        />
        <TouchableOpacity style={{ marginTop: 10 }} onPress={handleSearch}>
          <Ionicons name="search" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {plantDetails && plantDetails.length > 0 && (
        <View style={{ marginTop: 20 }}>
          <Text>Plant Details:</Text>
          {plantDetails.map((plant, index) => (
            <View key={index} style={{ marginTop: 10 }}>
              <Text>Name: {plant.name}</Text>
              <Text>Category: {plant.category_name}</Text>
              <Text>Ideal Temperature: {plant.ideal_temperature}</Text>
              <Text>Lifespan: {plant.lifespan}</Text>
              <Text>Soilcare: {plant.soilcare}</Text>
              <Text>Sunlight: {plant.sunlight}</Text>
              <Text>Planting Time: {plant.planting_time}</Text>
              <Text>Water: {plant.water}</Text>
            </View>
          ))}
          <Text>Enter a nickname:</Text>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: "#ccc",
              borderRadius: 5,
              padding: 8,
              marginTop: 8,
              width: 200,
            }}
            value={nickText}
            onChangeText={(text) => setNickText(text)}
          />
          <TouchableOpacity style={{ marginTop: 10 }} onPress={handleAddPlant}>
            <Ionicons name="add" size={24} color="black" />
          </TouchableOpacity>
        </View>
      )}

      {error && <Text style={{ color: "red", marginTop: 20 }}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  welcomeText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
export default SearchAndAddPage;
