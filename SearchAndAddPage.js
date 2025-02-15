import React, { useState, useRef } from "react";
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
  Keyboard,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";

const SearchAndAddPage = ({ route, navigation }) => {
  const { nickname, userType } = route?.params || {};
  const [searchText, setSearchText] = useState("");
  const [plantDetails, setPlantDetails] = useState([]);
  const [error, setError] = useState(null);
  const [nickText, setNickText] = useState("");
  const [isContainerVisible, setIsContainerVisible] = useState(false); // State for container visibility

  const ScrollViewRef = useRef(null);

  // State variables for new plant data
  const [newPlant, setNewPlant] = useState({
    name: "",
    frequency: "",
    sunlight: "",
    soilcare: "",
    ideal_temperature: "",
    planting_time: "",
    lifespan: "",
    category_name: "",
  });

  // Ref for TextInput focus
  const inputRef = useRef(null);

  // Function to handle TextInput focus
  const handleInputFocus = () => {
    setTimeout(() => {
      inputRef.current.measure((x, y, width, height, pageX, pageY) => {
        const scrollTo = pageY + height;
        const screenHeight = Dimensions.get("window").height;
        const scrollAmount = scrollTo - screenHeight + 100; // Adjust this value according to your UI
        if (scrollAmount > 0) {
          // Scroll only if necessary
          ScrollViewRef.current.scrollTo({ y: scrollAmount });
        }
      });
    }, 100); // Delay to ensure component layout is complete before measuring
  };

  // Function to handle TextInput blur
  const handleInputBlur = () => {
    ScrollViewRef.current.scrollTo({ y: 0 }); // Scroll back to the top
  };

  const handleInputChange = (field, value) => {
    setNewPlant({ ...newPlant, [field]: value });
  };

  const handleSearch = async () => {
    try {
      const response = await fetch(
        "", //deleted for security
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
        const data = await response.json();
        Alert.alert(
          "Success!",
          "Plant exists!",
          [{ text: "Ok", onPress: () => console.log("OK Pressed") }],
          { cancelable: false }
        );
        setPlantDetails(data.Data);
        setError(null);
      } else if (response.status === 404) {
        Alert.alert(
          "Error",
          "Plant could not be found",
          [{ text: "Ok", onPress: () => console.log("OK Pressed") }],
          { cancelable: false }
        );
        setPlantDetails([]);
        setError("Plant could not be found");
      } else {
        throw new Error("Unexpected error occurred");
      }
    } catch (error) {
      console.error(error);
      Alert.alert(
        "Error",
        "An unexpected error occurred",
        [{ text: "Ok", onPress: () => console.log("OK Pressed") }],
        { cancelable: false }
      );
      setPlantDetails([]);
      setError("An unexpected error occurred");
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
        frequency: plantDetails[0].frequency,
        category: plantDetails[0].category_name,
      };

      const response = await fetch(
        "http://10.30.10.210/compproject/user_plants.php",
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
        Alert.alert(
          "Success!",
          "Nickname added successfully!",
          [{ text: "Ok", onPress: () => console.log("OK Pressed") }],
          { cancelable: false }
        );
      } else {
        throw new Error(data.Message || "Unexpected error occurred");
      }
    } catch (error) {
      console.error(error);
      Alert.alert(
        "Error",
        "An error occurred while adding the nickname",
        [{ text: "Ok", onPress: () => console.log("OK Pressed") }],
        { cancelable: false }
      );
    }
  };

  const handleAddNewPlant = async () => {
    try {
      // Check if all fields are filled
      for (let key in newPlant) {
        if (!newPlant[key]) {
          Alert.alert(
            "Error",
            "Please fill out all fields",
            [{ text: "Ok", onPress: () => console.log("OK Pressed") }],
            { cancelable: false }
          );
          return;
        }
      }

      // Send new plant data to the backend
      const response = await fetch(
        "", //deleted for security
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newPlant),
        }
      );

      const data = await response.json();

      if (response.status === 200) {
        Alert.alert(
          "Success!",
          "Plant added successfully!",
          [{ text: "Ok", onPress: () => console.log("OK Pressed") }],
          { cancelable: false }
        );
        setIsContainerVisible(false);
      } else {
        throw new Error(data.Message || "Unexpected error occurred");
      }
    } catch (error) {
      console.error(error);
      Alert.alert(
        "Error",
        "An error occurred while adding the plant",
        [{ text: "Ok", onPress: () => console.log("OK Pressed") }],
        { cancelable: false }
      );
    }
  };

  return (
    <ImageBackground style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        ref={ScrollViewRef} // Reference for ScrollView
      >
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <View style={{ marginTop: 20 }}>
            <Text style={styles.welcomeText}>Welcome, {nickname}</Text>
            <View style={styles.searchContainer}>
              <View style={styles.inputContainer}>
                <TextInput
                  ref={inputRef} // Reference for TextInput
                  style={styles.input}
                  value={searchText}
                  onChangeText={(text) => setSearchText(text)}
                  placeholder="Enter a plant name"
                  onFocus={handleInputFocus} // Call handleInputFocus when TextInput is focused
                  onBlur={handleInputBlur} // Call handleInputBlur when TextInput is blurred
                />
              </View>
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

          <View style={{ marginTop: 20 }}>
            {plantDetails.length > 0 && (
              <View style={styles.container}>
                <Text style={styles.nameText}>
                  <Text style={styles.nameText}>Name:</Text>{" "}
                  {plantDetails[0].name}
                </Text>
                <Text style={styles.text}>
                  <Text style={styles.catText}>Category:</Text>{" "}
                  {plantDetails[0].category_name}
                </Text>
                <View style={styles.subContainer}>
                  <View style={styles.sub1}>
                    <View style={styles.row}>
                      <Image
                        source={require("./assets/thermometer.png")}
                        style={styles.icon}
                      />
                      <Text style={styles.text}>
                        Ideal Temperature: {plantDetails[0].ideal_temperature}
                      </Text>
                    </View>
                    <View style={styles.row}>
                      <Image
                        source={require("./assets/hourglass.png")}
                        style={styles.icon}
                      />
                      <Text style={styles.text}>
                        Lifespan: {plantDetails[0].lifespan}
                      </Text>
                    </View>
                    <View style={styles.row}>
                      <Image
                        source={require("./assets/plant.png")}
                        style={styles.icon}
                      />
                      <Text style={styles.text}>
                        Soilcare: {plantDetails[0].soilcare}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.sub2}>
                    <View style={styles.row}>
                      <Image
                        source={require("./assets/sun.png")}
                        style={styles.icon}
                      />
                      <Text style={styles.text}>
                        Sunlight: {plantDetails[0].sunlight}
                      </Text>
                    </View>
                    <View style={styles.row}>
                      <Image
                        source={require("./assets/schedule.png")}
                        style={styles.icon}
                      />
                      <Text style={styles.text}>
                        Planting Time: {plantDetails[0].planting_time}
                      </Text>
                    </View>
                    <View style={styles.row}>
                      <Image
                        source={require("./assets/drop.png")}
                        style={styles.icon}
                      />
                      <Text style={styles.text}>
                        Watering: {plantDetails[0].water}
                      </Text>
                    </View>
                  </View>
                </View>
                <TextInput
                  style={styles.input}
                  placeholder="Enter plant nickname"
                  value={nickText}
                  onChangeText={(text) => setNickText(text)}
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
        </View>
      </ScrollView>
      <TouchableOpacity
        style={styles.addPlantButton}
        onPress={() => navigation.navigate("Plant")} // Plant.js'e yönlendirme
      >
        <Image
          source={require("./assets/add.png")}
          style={styles.addPlantButtonImage}
        />
      </TouchableOpacity>
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
    fontSize: 15,
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

  input: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    padding: 8,
    width: 200,
  },
  addButton: {
    marginTop: 10,
    backgroundColor: "green",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  searchButton: {
    marginTop: 10,
    backgroundColor: "#F6F6F6",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    width: 80,
  },
  errorText: {
    color: "red",
    marginTop: 10,
  },
  text: {
    fontSize: 14,
    marginBottom: 5,
  },
  container: {
    backgroundColor: "#E6F2E6",
    borderRadius: 10,
    marginBottom: 10,
    height: 400,
    width: 350,
    padding: 10,
  },
  nameText: {
    fontWeight: "bold",
    fontSize: 20,
  },
  catText: {
    fontSize: 16,
  },
  subContainer: {
    marginTop: 40,
    width: "100%",
    height: "60%",
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 10,
    overflow: "hidden",
  },
  sub1: {
    width: "48%",
    padding: 10,
    marginBottom: 10, // Add marginBottom here
  },
  sub2: {
    width: "48%",
    padding: 10,
    marginBottom: 10, // Add marginBottom here
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 35,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  floatingButton: {
    position: "absolute",
    bottom: 30,
    right: 30,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    padding: 10,
    borderRadius: 50,
    elevation: 5, // Adds shadow for Android
    shadowColor: "#000", // Adds shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  floatingButtonImage: {
    width: 50,
    height: 50,
  },
  closeButtonImage: {
    width: 25,
    height: 25,
  },
  sideContainer: {
    position: "absolute",
    bottom: 30,
    right: 30,
    width: 300,
    height: 700,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    padding: 10,
    borderRadius: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  box: {
    marginBottom: 10,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    padding: 8,
  },
  closeButton: {
    position: "absolute",
    top: 5,
    right: 5,
  },
  addPlantButton: {
    position: "absolute",
    top: 650,
    right: 15,
  },
  addPlantButtonImage: {
    width: 40,
    height: 40,
  },
});
export default SearchAndAddPage;
