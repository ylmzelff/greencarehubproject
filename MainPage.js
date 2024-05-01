import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SearchAndAddPage from "./SearchAndAddPage";
import Forum from "./Forum";
import Swiper from "react-native-swiper";
import TabVegetables from "./TabVegetables";
import TabFruits from "./TabFruits";
import FavoritePlants from "./FavoritePlants";
import TabFlowers from "./TabFlowers";

import { AntDesign } from "@expo/vector-icons"; // AntDesign'ı import ediyoruz

const Tab = createBottomTabNavigator();

const MainPage = ({ route }) => {
  const { nickname, userType } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>
        Hoş geldiniz, {nickname}! User Type: {userType}
      </Text>
      <Swiper style={styles.wrapper} showsButtons={false}>
        <TabVegetables userType={userType} />
        <TabFruits userType={userType} />
        <TabFlowers userType={userType} />
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
      <Tab.Screen
        name="Home"
        component={MainPage}
        initialParams={{ nickname: nickname, userType: userType }}
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
        initialParams={{ nickname: nickname, userType: userType }}
      />
      {/* Favori Bitkiler ekranını ekliyoruz */}
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
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
  },
  wrapper: {
    width: "100%",
  },
});

export default BottomTabNavigator;
