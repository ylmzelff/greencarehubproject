import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  StyleSheet,
  ImageBackground,
  ScrollView,
  Image,
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
        `http://192.168.1.110/compproject/check_plant.php`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: searchText }),
        }
      );

      if (response.ok) {
        // 200 OK response
        const data = await response.json();
        console.log("Bitki bulundu:", data);
        Alert.alert(
          "Success!",
          "Plant exists!",
          [{ text: "Ok", onPress: () => console.log("OK Pressed") }],
          { cancelable: false }
        );
        setPlantDetails(data.Data);
        setError(null);
      } else if (response.status === 404) {
        // 404 Not Found
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
        // Diğer durumlar
        throw new Error("Beklenmeyen bir hata oluştu");
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
        "http://192.168.1.110/compproject/user_plants.php",
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
    <ImageBackground source={require("./assets/try.jpg")} style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <View style={{ marginTop: 20 }}>
            <Text style={styles.welcomeText}></Text>
            <Text style={[styles.inputLabel]}>Enter a plant name:</Text>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={searchText}
                onChangeText={(text) => setSearchText(text)}
              />
            </View>
            <TouchableOpacity
              style={styles.searchButton}
              onPress={handleSearch}
            >
              <Ionicons
                name="search"
                size={24}
                color="black"
                style={{ alignSelf: "center" }}
              />
            </TouchableOpacity>
          </View>

          {plantDetails.length > 0 && (
            <View style={{ marginTop: 20 }}>
              <Text style={styles.inputLabel}>Plant Details:</Text>

              <View style={styles.greenContainer}>
                <View style={styles.upperContainer}>
                  <View style={styles.upperLeftContainer}>
                    <Text style={styles.text}>
                      Plant Name: {plantDetails[0].name}
                    </Text>
                    <Text style={styles.text}>
                      Category: {plantDetails[0].category_name}
                    </Text>
                  </View>
                  <View style={styles.upperRightContainer}>
                    <Text style={styles.text}>
                      Ideal Temperature: {plantDetails[0].ideal_temperature}
                    </Text>
                    <Text style={styles.text}>
                      Lifespan: {plantDetails[0].lifespan}
                    </Text>
                    <Text style={styles.text}>
                      Soilcare: {plantDetails[0].soilcare}
                    </Text>
                  </View>
                </View>
                <View style={styles.lowerContainer}>
                  <View style={styles.lowerLeftContainer}>
                    <Text style={styles.text}>
                      Sunlight: {plantDetails[0].sunlight}
                    </Text>
                    <Text style={styles.text}>
                      Planting Time: {plantDetails[0].planting_time}
                    </Text>
                    <Text style={styles.text}>
                      Water: {plantDetails[0].water}
                    </Text>
                  </View>
                  <View style={styles.lowerRightContainer}>
                    <Image
                      source={{ uri: "https://example.com/image.jpg" }} // fotoğrafı buraya eklenecek
                      style={{ width: 100, height: 100 }}
                    />
                  </View>
                </View>
              </View>
              <TextInput
                style={styles.input}
                value={nickText} // nickText değerini TextInput'a atayın
                onChangeText={(text) => setNickText(text)} // Kullanıcının girdiği metni nickText state'ine kaydedin
              />

              <TouchableOpacity
                style={styles.addButton}
                onPress={handleAddPlant}
              >
                <Text style={styles.buttonText}>Add Plant</Text>
              </TouchableOpacity>
            </View>
          )}

          {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  welcomeText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  inputLabel: {
    fontSize: 15, // Yazı boyutunu artırma
    fontWeight: "bold", // Kalınlığı bold yapma
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  inputContainer: {
    backgroundColor: "white",
    opacity: 0.8,
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 5,
    marginBottom: 5,
  },
  nicknameInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    opacity: 0.8,
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 5,
    marginBottom: 5,
    width: 210,
  },
  input: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    padding: 8,
    width: 200,
  },
  addButton: {
    marginTop: 10,
    backgroundColor: "#7C9070",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    width: 215, // Genişliği artırabilir veya düzenleyebilirsiniz
    height: 40, // Yüksekliği artırabilir veya düzenleyebilirsiniz
  },
  searchButton: {
    marginTop: 10,
    backgroundColor: "#7C9070",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    width: 215, // Genişliği artırabilir veya düzenleyebilirsiniz
    height: 40, // Yüksekliği artırabilir veya düzenleyebilirsiniz
  },

  greenContainer: {
    backgroundColor: "white",
    height: 400,
    width: 300,
    marginHorizontal: 20,
    marginTop: 20,
    opacity: 0.8,
    borderRadius: 20,
  },
  upperContainer: {
    flexDirection: "row",
    flex: 1,
    paddingRight: 10,
    paddingTop: 10,
    paddingLeft: 10,
  },
  lowerContainer: {
    flexDirection: "row",
    flex: 1,
    paddingLeft: 10,
    paddingBottom: 10,
    paddingRight: 10,
  },
  upperLeftContainer: {
    flex: 1,
    padding: 20,
    justifyContent: "flex-start",
  },
  upperRightContainer: {
    flex: 1,
    padding: 20,
    justifyContent: "flex-start",
    backgroundColor: "#FEE8B0",
  },
  lowerLeftContainer: {
    flex: 1,
    padding: 20,
    justifyContent: "flex-end",
    backgroundColor: "#9CA777",
  },
  lowerRightContainer: {
    flex: 1,
    padding: 20,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  text: {
    color: "black",
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    marginTop: 20,
  },
});

export default SearchAndAddPage;
