import React, { Component } from "react";
import { View, Text, TouchableOpacity, TextInput, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default class SearchAndAddPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
      plantDetails: [],
      error: null,
    };
  }

  handleSearch = async () => {
    const { searchText } = this.state;

    try {
      const response = await fetch(
        `http://192.168.1.106:80/compproject/check_plant.php`,
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
        // Bitki bulunduğunda
        console.log("Bitki bulundu:", data);
        Alert.alert(
          "Success!",
          "Plant exists!",
          [{ text: "Ok", onPress: () => console.log("OK Pressed") }],
          { cancelable: false }
        );
        // Bitki bilgilerini state'e kaydet
        this.setState({
          plantDetails: data.Data,
          error: null,
        });
        // Bitki arama sayacını güncelle
        this.updateSearchCount(searchText);
      } else if (response.status === 404) {
        // Bitki bulunamadığında
        console.log("Bitki bulunamadı");
        Alert.alert(
          "Error",
          "Plant could not found",
          [{ text: "Ok", onPress: () => console.log("OK Pressed") }],
          { cancelable: false }
        );
        this.setState({
          plantDetails: [],
          error: "Bitki bulunamadı",
        });
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
      this.setState({
        plantDetails: [],
        error: "Beklenmeyen bir hata oluştu",
      });
    }
  };

  updateSearchCount = async (searchText) => {
    try {
      const response = await fetch(
        `http://192.168.1.106:80/compproject/update_search_count.php`,
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

  render() {
    const { plantDetails } = this.state;

    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Search And Add Page</Text>
        <View style={{ marginTop: 20 }}>
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
            value={this.state.searchText}
            onChangeText={(text) => this.setState({ searchText: text })}
          />
          <TouchableOpacity
            style={{ marginTop: 10 }}
            onPress={this.handleSearch}
          >
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
          </View>
        )}

        {/* Hata mesajını göster */}
        {this.state.error && (
          <Text style={{ color: "red", marginTop: 20 }}>
            {this.state.error}
          </Text>
        )}
      </View>
    );
  }
}
