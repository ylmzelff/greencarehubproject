import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const TabFruits = () => {
  const navigation = useNavigation();

  const handleAddButtonPress = () => {
    navigation.navigate("FavoritePlants");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Fruits</Text>
      <View style={styles.boxContainer}>
        <TouchableOpacity
          style={[styles.box, styles.flowersBox]}
          onPress={() => navigation.navigate("TabFlowers")}
        >
          <Text style={[styles.boxText, styles.flowersText]}>Flowers</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.box, styles.vegetablesBox]}
          onPress={() => navigation.navigate("TabVegetables")}
        >
          <Text style={styles.boxText}>Vegetables</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.box, styles.fruitsBox]}
          onPress={() => navigation.navigate("TabFruits")}
        >
          <Text style={[styles.boxText, styles.fruitsText]}>Fruits</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.rectangleContainer}>
        {/* Resim */}
        <View style={styles.imageTextContainer}>
          <View style={styles.imageContainer}>
            <Image
              source={require("./assets/rasphberry.png")}
              style={{ width: 180, height: 100, resizeMode: "contain" }}
            />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.text1}>My Little rasphberry</Text>
            <Text style={styles.text2}>Last watered x days ago</Text>
          </View>
        </View>
      </View>
      <View style={styles.rectangleContainer}>
        {/* Resim */}
        <View style={styles.imageTextContainer}>
          <View style={styles.imageContainer}>
            <Image
              source={require("./assets/strawberry.png")}
              style={{ width: 120, height: 100, resizeMode: "contain" }}
            />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.text1}>My Little strawberry</Text>
            <Text style={styles.text2}>Last watered x days ago</Text>
          </View>
        </View>
      </View>
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
  imageTextContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    width: "100%",
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
