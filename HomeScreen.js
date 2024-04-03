import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "./styles";

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Welcome!</Text>
      <View style={styles.optionsContainer}>
        <TouchableOpacity
          style={styles.option}
          onPress={() => navigation.navigate("ExpertHome")}
        >
          <Text style={styles.optionText}>Expert</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.option}
          onPress={() => navigation.navigate("EnthusiastHome")}
        >
          <Text style={styles.optionText}>Enthusiast</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;
