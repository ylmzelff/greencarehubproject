import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ImageBackground,
  Image,
} from "react-native";

const FavoritePlants = () => {
  const [favoritePlants, setFavoritePlants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("http://192.168.1.110/compproject/fav_plant.php")
      .then((response) => response.json())
      .then((data) => {
        setFavoritePlants(data);
        setIsLoading(false);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleAddPlant = async () => {
    // Eklemek için gerekli işlemleri burada yapın
    try {
      // Add plant logic
    } catch (error) {
      console.error(error);
      // Error handling
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const renderPlantContainer = (plant, index) => (
    <View key={index} style={styles.horizontalContainer}>
      <View style={styles.imageContainer}>
        <Image source={require("./assets/tomato.png")} style={styles.image} />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>{plant}</Text>
      </View>
      <TouchableOpacity style={styles.addContainer} onPress={handleAddPlant}>
        <Text style={styles.addText}>+</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ImageBackground
      source={require("./assets/favbg.jpeg")}
      style={styles.container}
    >
      <View style={styles.headerContainer}>
        <Text style={styles.heading}>Favorite Plants</Text>
      </View>
      {favoritePlants.map((plant, index) => renderPlantContainer(plant, index))}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: "cover",
  },
  headerContainer: {
    paddingTop: 60,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  heading: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#fff",
  },
  horizontalContainer: {
    flexDirection: "row",
    backgroundColor: "rgba(156, 167, 119, 0.7)",
    marginBottom: 20,
    paddingHorizontal: 15,
    justifyContent: "space-between",
    height: 70,
    width: 400,
    borderRadius: 50,
    overflow: "hidden",
  },
  imageContainer: {
    flex: 1,
    marginRight: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 60,
    height: 50,
  },
  infoContainer: {
    borderRadius: 10,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  infoText: {
    fontSize: 20,
    color: "#fff",
  },
  addContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    borderRadius: 100,
    marginLeft: 5,
    alignItems: "center",
    justifyContent: "center",
    width: 80,
  },
  addText: {
    fontSize: 40,
    color: "black",
  },
  plantsContainer: {
    flex: 1,
  },
  plantItem: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  plantText: {
    fontSize: 18,
    color: "#fff",
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default FavoritePlants;
