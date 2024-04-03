import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SearchAndAddPage from "./SearchAndAddPage";
import Forum from "./Forum";
import Swiper from "react-native-swiper";
import TabVegetables from "./TabVegetables";
import TabFruits from "./TabFruits";
import TabFlowers from "./TabFlowers";

const Tab = createBottomTabNavigator();

const MainPage = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Swiper style={styles.wrapper} showsButtons={false}>
        <TabVegetables />
        <TabFruits />
        <TabFlowers />
      </Swiper>
    </View>
  );
};

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Forum"
        component={Forum}
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="message1" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Home"
        component={MainPage}
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchAndAddPage}
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="search1" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
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
    height: 35,
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
    backgroundColor: "739072",
  },
  boxText: {
    marginTop: 5,
    textAlign: "center",
  },
});

export default BottomTabNavigator;
