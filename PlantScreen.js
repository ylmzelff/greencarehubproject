import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
  Image,
  StyleSheet,
} from "react-native";

const PlantScreen = ({ route, navigation }) => {
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

  const [isContainerVisible, setIsContainerVisible] = useState(true);

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

  const handleInputChange = (key, text) => {
    setNewPlant((prevState) => ({
      ...prevState,
      [key]: text,
    }));
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        {isContainerVisible && (
          <View style={styles.sideContainer}>
            <View style={styles.box}>
              <Text style={styles.label}>Plant's Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter plant's name"
                value={newPlant.name}
                onChangeText={(text) => handleInputChange("name", text)}
              />
            </View>
            <View style={styles.box}>
              <Text style={styles.label}>Watering Frequency</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter watering frequency"
                value={newPlant.frequency}
                onChangeText={(text) => handleInputChange("frequency", text)}
              />
            </View>
            <View style={styles.box}>
              <Text style={styles.label}>Sunlight</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter sunlight"
                value={newPlant.sunlight}
                onChangeText={(text) => handleInputChange("sunlight", text)}
              />
            </View>
            <View style={styles.box}>
              <Text style={styles.label}>Soil Care</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter soil care"
                value={newPlant.soilcare}
                onChangeText={(text) => handleInputChange("soilcare", text)}
              />
            </View>
            <View style={styles.box}>
              <Text style={styles.label}>Ideal Temperature</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter ideal temperature"
                value={newPlant.ideal_temperature}
                onChangeText={(text) =>
                  handleInputChange("ideal_temperature", text)
                }
              />
            </View>
            <View style={styles.box}>
              <Text style={styles.label}>Planting Time</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter planting time"
                value={newPlant.planting_time}
                onChangeText={(text) =>
                  handleInputChange("planting_time", text)
                }
              />
            </View>
            <View style={styles.box}>
              <Text style={styles.label}>Lifespan</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter lifespan"
                value={newPlant.lifespan}
                onChangeText={(text) => handleInputChange("lifespan", text)}
              />
            </View>
            <View style={styles.box}>
              <Text style={styles.label}>Category</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter category"
                value={newPlant.category_name}
                onChangeText={(text) =>
                  handleInputChange("category_name", text)
                }
              />
            </View>
            <View style={styles.box}></View>
            <TouchableOpacity
              style={styles.addPlantButton}
              onPress={handleAddNewPlant}
            >
              <Image
                source={require("./assets/plus.png")}
                style={styles.addPlantButtonImage}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setIsContainerVisible(false)}
            >
              <Image
                source={require("./assets/circle.png")}
                style={styles.closeButtonImage}
              />
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  sideContainer: {
    padding: 20,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
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
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 8,
  },
  addPlantButton: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  closeButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  addPlantButtonImage: {
    width: 20,
    height: 20,
  },
  closeButtonImage: {
    width: 20,
    height: 20,
  },
});

export default PlantScreen;
