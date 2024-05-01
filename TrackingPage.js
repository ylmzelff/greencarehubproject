import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";

const TrackingPage = () => {
  const [wateringDates, setWateringDates] = useState([
    { date: "2024-04-10", completed: true },
    { date: "2024-04-08", completed: false },
    { date: "2024-04-06", completed: true },
    // Buraya daha fazla sulama tarihi ekleyebilirsiniz
  ]);

  const toggleWatering = (index) => {
    const updatedDates = [...wateringDates];
    updatedDates[index].completed = !updatedDates[index].completed;
    setWateringDates(updatedDates);

    // Sulama tarihini kaydetmek için API isteği gönder
    //saveWateringDate(updatedDates[index].date);
  };

  // const saveWateringDate = async (date) => {
  //     try {
  //         const response = await fetch('http://your-api-url.com/watering', {
  //             method: 'POST',
  //             headers: {
  //                 'Content-Type': 'application/json',
  //             },
  //             body: JSON.stringify({ date }),
  //         });
  //         const data = await response.json();
  //         console.log('Watering data saved:', data);
  //     } catch (error) {
  //         console.error('Error saving watering data:', error);
  //     }
  // };

  return (
    <View style={styles.container}>
      <Image
        source={require("./assets/m.jpg")}
        style={styles.basicbackground}
      />
      <View style={styles.greenContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.text1}>Plants NickName</Text>
          <Text style={styles.text2}>Plants Real Name</Text>
          <View style={styles.lastWateringContainer}>
            <Text style={styles.lastWateringText}>Last watered x day ago</Text>
          </View>
        </View>
        <View style={styles.imageContainer}>
          <Image
            source={require("./assets/tomato.png")}
            style={{ width: 180, height: 100, resizeMode: "contain" }}
          />
        </View>
      </View>
      <View style={styles.circleContainer}>
        <View style={styles.wateringCircle}>
          <Text style={styles.wateringCircleText}>x days</Text>
        </View>
        <View style={styles.TemperatureCircle}>
          <Text style={styles.TemperatureCircleText}>x&#176; C</Text>
        </View>
        <View style={styles.lightCircle}>
          <Text style={styles.lightCircleText}>light info</Text>
        </View>
      </View>

      <View style={styles.circleInfoContainer}>
        <View style={styles.info1Circle}>
          <Text style={styles.info1Text}>next watering</Text>
        </View>
        <View style={styles.info2Circle}>
          <Text style={styles.info2Text}>ideal temperature</Text>
        </View>
        <View style={styles.info3Circle}>
          <Text style={styles.info3Text}>sun exposure</Text>
        </View>
      </View>

      <Text style={styles.title}> Irrigation Tracking List</Text>
      {wateringDates.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.dateItem,
            { backgroundColor: item.completed ? "#FFE6E6" : "white" },
          ]}
          onPress={() => toggleWatering(index)}
        >
          <Text style={styles.dateText}>{item.date}</Text>
          {item.completed && (
            <Text style={styles.completedText}> Completed</Text>
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    position: "relative",
  },
  basicbackground: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  greenContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.9)", // Koyu beyaz ve %70 şeffaflık
    width: "100%",
    height: "40%",
    borderBottomLeftRadius: 55,
    borderBottomRightRadius: 55,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },

  textContainer: {
    justifyContent: "center",
    height: "100%",
    width: "60%",
    paddingLeft: 20,
    borderRadius: 20,
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "flex-end",
    width: "50%",
  },
  text1: {
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#AFD198",
  },
  text2: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
  lastWateringContainer: {
    justifyContent: "center",
    backgroundColor: "#AFD198",
    marginTop: 10,
    borderRadius: 60,
    paddingHorizontal: 10,
  },
  lastWateringText: {
    fontSize: 15,
    color: "white",
    fontWeight: "bold",
  },
  circleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 20,
  },
  wateringCircle: {
    width: 110,
    height: 110,
    borderRadius: 100,
    backgroundColor: "#FFEBB2",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
  },
  TemperatureCircle: {
    width: 110,
    height: 110,
    borderRadius: 100,
    backgroundColor: "#FFCBCB",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
  },
  lightCircle: {
    width: 110,
    height: 110,
    borderRadius: 100,
    backgroundColor: "#AFD198",
    justifyContent: "center",
    alignItems: "center",
  },
  wateringCircleText: {
    fontSize: 20,
    color: "black",
    fontWeight: "bold",
  },
  TemperatureCircleText: {
    fontSize: 20,
    color: "black",
    fontWeight: "bold",
  },
  lightCircleText: {
    fontSize: 20,
    color: "black",
    fontWeight: "bold",
  },
  circleInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 10,
  },
  info1Circle: {
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 13,
  },
  info2Circle: {
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 14,
  },
  info3Circle: {
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 15,
  },
  info1Text: {
    fontSize: 13,
    color: "black",
    fontWeight: "bold",
  },
  info2Text: {
    fontSize: 13,
    color: "black",
    fontWeight: "bold",
  },
  info3Text: {
    fontSize: 13,
    color: "black",
    fontWeight: "bold",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 20,
  },
  dateItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 100,
    marginBottom: 10,
  },
  dateText: {
    fontSize: 18,
  },
  completedText: {
    fontSize: 14,
    color: "red",
  },
});

export default TrackingPage;
