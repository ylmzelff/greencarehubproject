import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const FavoritePlants = () => {
  const [plants, setPlants] = useState([]);

  useEffect(() => {
    fetch("http://192.168.1.106:80/compproject/fav_plant.php")
      .then((response) => response.json())
      .then((data) => {
        setPlants(data);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favorite Plants</Text>
      <View>
        {plants.map((plant, index) => (
          <Text key={index}>{plant}</Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});

export default FavoritePlants;
