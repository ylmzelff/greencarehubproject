import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { MainContext } from "./MainContext";

const TabFruits = () => {
  const { nickname } = useContext(MainContext);
  const navigation = useNavigation();

  const handleAddButtonPress = () => {
    navigation.navigate("FavoritePlants");
  };

  const [fruits, setFruits] = useState([]);
  useEffect(() => {
    fetch("http://192.168.1.106:80/compproject/get_fruit.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nickname: nickname }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setFruits(data);
      })
      .catch((error) => {
        console.error(error);
        console.error("Error fetching data for nickname:", nickname);
      });
  }, []);

  const handleTrackingPage = (
    plantNickname,
    plantName,
    idealTemperature,
    sunlight
  ) => {
    navigation.navigate("TrackingPage", {
      plantNickname: plantNickname,
      plantRealName: plantName,
      plantTemperature: idealTemperature,
      plantLight: sunlight,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.boxContainer}>
        <Text style={[styles.boxText, styles.flowersText]}>Flowers</Text>

        <Text style={styles.boxText}>Vegetables</Text>

        <Text style={styles.boxText}>Fruits</Text>
      </View>
      <Text style={styles.title}>My Fruits</Text>
      <Text>Nickname: {nickname}</Text>
      {fruits.map((fruit, index) => (
        <TouchableOpacity
          key={index}
          style={styles.rectangleContainer}
          onPress={() =>
            handleTrackingPage(
              fruit.plant_nickname,
              fruit.name,
              fruit.ideal_temperature,
              fruit.sunlight
            )
          }
        >
          <View style={styles.imageContainer}>
            <Image
              //source={{ uri: fruit.image_url }} // Add a default image source
              style={{ width: 120, height: 100, resizeMode: "contain" }}
            />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.text1}>{fruit.plant_nickname}</Text>
            <Text style={styles.text2}>Last watered x days ago</Text>
          </View>
        </TouchableOpacity>
      ))}
      <TouchableOpacity style={styles.addButton} onPress={handleAddButtonPress}>
        <AntDesign name="pluscircle" size={50} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 100,
  },
  boxContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
  },
  addButton: {
    position: "absolute",
    bottom: 70,
    right: 30,
  },
  box: {
    width: 100,
    height: 30,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  flowersBox: {
    backgroundColor: "#739072",
  },
  vegetablesBox: {
    backgroundColor: "#739072",
  },
  fruitsBox: {
    backgroundColor: "green",
  },
  fruitsText: {
    color: "white",
  },
  boxText: {
    marginTop: 5,
    textAlign: "center",
  },
  rectangleContainer: {
    flexDirection: "row",
    width: "90%",
    height: 100,
    marginTop: 20,
  },
  imageContainer: {
    position: "absolute",
    top: 0,
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    zIndex: 1,
  },
  textContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(144, 238, 144, 0.7)",
    height: 100,
    width: "95%",
    marginLeft: 30,
    paddingLeft: 20,
    borderRadius: 20,
    zIndex: 0,
  },
  text1: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    marginLeft: 20,
    paddingLeft: 20,
  },
  text2: {
    fontSize: 18,
    marginBottom: 10,
    marginLeft: 20,
    paddingLeft: 20,
  },
});

export default TabFruits;
