import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SearchAndAddPage from "./SearchAndAddPage"; // Adjust the path
import ProfilePage from "./ProfilePage";
import Forum from "./Forum";
import Swiper from "react-native-swiper";
import TabVegetables from "./TabVegetables";
import TabFruits from "./TabFruits";
import TabFlowers from "./TabFlowers";
import FavoritePlants from "./FavoritePlants";
import { MainContext } from "./MainContext";
import { useContext } from "react";
import { createContext, useState } from "react";

const Tab = createBottomTabNavigator();

const MainPage = ({ route }) => {
  const { setNickname } = useContext(MainContext);
  const { nickname, userType } = route.params;
  console.log("Nickname:", nickname); // Ekleyin
  console.log("User Type:", userType);
  setNickname(nickname);
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

const BottomTabNavigator = ({ route }) => {
  const { nickname, userType } = route.params;

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
        initialParams={{ nickname: nickname, userType: userType }}
      />

      {/* Yorum satırını buraya taşıyın */}
      <Tab.Screen
        name="Home"
        component={MainPage}
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="home" size={size} color={color} />
          ),
        }}
        initialParams={{ nickname: nickname, userType: userType }}
      />

      <Tab.Screen
        name="Search"
        component={SearchAndAddPage}
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="search1" size={size} color={color} />
          ),
        }}
        initialParams={{ nickname: nickname, userType: userType }}
      />
      <Tab.Screen
        name="FavoritePlants"
        component={FavoritePlants}
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="hearto" size={size} color={color} />
          ),
        }}
        initialParams={{ nickname: nickname, userType: userType }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfilePage}
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="profile" size={size} color={color} />
          ),
        }}
        initialParams={{ nickname: nickname, userType: userType }}
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
    bottom: 200,
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
    backgroundColor: "lightblue",
  },
  vegetablesBox: {
    backgroundColor: "lightblue",
  },
  fruitsBox: {
    backgroundColor: "lightblue",
  },
  boxText: {
    marginTop: 5,
    textAlign: "center",
  },
});

export default BottomTabNavigator;
