import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SearchAndAddPage from "./SearchAndAddPage";
import Forum from "./Forum";
import Swiper from "react-native-swiper";
import TabVegetables from "./TabVegetables";
import TabFruits from "./TabFruits";
import TabFlowers from "./TabFlowers";
import FavoritePlants from "./FavoritePlants";
import { MainContext } from "./MainContext";

const Tab = createBottomTabNavigator();

const MainPage = ({ route }) => {
  const { setNickname } = useContext(MainContext);
  const { nickname, userType } = route.params;

  console.log("Nickname:", nickname);
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
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  wrapper: {
    // Add styles for swiper wrapper if needed
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 100,
  },
});

export default BottomTabNavigator;
