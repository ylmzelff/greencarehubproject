import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import { Calendar } from "react-native-calendars";

const TrackingPage = ({ route }) => {
  const { plantNickname, plantRealName } = route.params;
  const [plantInfo, setPlantInfo] = useState({});
  const [wateringDates, setWateringDates] = useState([]);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    fetch(`http://10.30.10.210/compproject/get_plant_info.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ plant_real_name: plantRealName }),
    })
      .then((response) => response.json())
      .then((data) => {
        setPlantInfo(data);
      })
      .catch((error) => {
        console.error(error);
        Alert.alert("Error", "Failed to fetch plant information.");
      });
  }, [plantRealName]);

  const getFrequencyNumber = (frequency) => {
    switch (frequency.toLowerCase()) {
      case "once a week":
        return 1;
      case "twice per week":
        return 2;
      case "three times a week":
        return 3;
      case "four times a week":
        return 4;
      default:
        return 1;
    }
  };

  const calculateNextWateringDates = (selectedDate, frequency) => {
    const nextDates = [];
    let currentDate = new Date(selectedDate);
    const frequencyNumber = getFrequencyNumber(frequency);
    const daysBetweenWaterings = Math.floor(7 / frequencyNumber);

    for (let i = 0; i < 10; i++) {
      nextDates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + daysBetweenWaterings);
    }

    return nextDates;
  };

  const handleAddMultipleWateringDates = (date) => {
    const nextWateringDates = calculateNextWateringDates(
      date,
      plantInfo.frequency
    );
    setWateringDates(
      nextWateringDates.map((date, index) => ({
        date: index === 0 ? date : nextWateringDates[index - 1],
        completed: false,
      }))
    );
    setShowCalendar(false);
  };

  const toggleWatering = (index) => {
    const updatedWateringDates = [...wateringDates];
    updatedWateringDates[index].completed = true;
    setWateringDates(updatedWateringDates);
  };

  const nextIncompleteWateringDateIndex = wateringDates.findIndex(
    (date) => !date.completed
  );

  const getImageSource = (plantName) => {
    switch (plantName.toLowerCase()) {
      case "pear":
        return require("./assets/armut.jpg");
      case "china rose":
        return require("./assets/ChineRose.jpg");
      case "cucumber":
        return require("./assets/cucumber.jpg");
      // Add cases for other plant names
      default:
        return require("./assets/default.png");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.greenContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.text1}>{plantNickname}</Text>
          <Text style={styles.text2}>{plantRealName}</Text>
          <Text style={styles.text2}>Frequency: {plantInfo.frequency}</Text>
        </View>
        <View style={styles.imageContainer}>
          <Image
            source={getImageSource(plantRealName)}
            style={{ width: 180, height: 100, resizeMode: "contain" }}
          />
        </View>
      </View>
      <View style={styles.circleContainer}>
        <View style={styles.wateringCircle}>
          <Text style={styles.wateringCircleText}>Planting Time</Text>
          <Text style={styles.lightCircleText}>{plantInfo.planting_time}</Text>
          <Text style={styles.wateringCircleDate}></Text>
        </View>
        <View style={styles.TemperatureCircle}>
          <Text style={styles.TemperatureCircleText}>
            {plantInfo.ideal_temperature}
          </Text>
        </View>
        <View style={styles.lightCircle}>
          <Text style={styles.lightCircleText}>{plantInfo.sunlight}</Text>
        </View>
      </View>
      <View style={styles.circleInfoContainer}>
        <View style={styles.info1Circle}>
          <Text style={styles.info1Text}>Planting Time</Text>
        </View>
        <View style={styles.info2Circle}>
          <Text style={styles.info2Text}>Ideal Temperature</Text>
        </View>
        <View style={styles.info3Circle}>
          <Text style={styles.info3Text}>Sun Exposure</Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.selectDateButton}
        onPress={() => setShowCalendar(true)}
      >
        <Text style={styles.selectDateButtonText}>
          Select the First Watering Date
        </Text>
      </TouchableOpacity>
      {showCalendar && (
        <Calendar
          onDayPress={(day) => {
            handleAddMultipleWateringDates(day.dateString);
            setSelectedDate(day.dateString);
          }}
        />
      )}
      <Text>
        Selected Date: {selectedDate ? selectedDate : "No date selected"}
      </Text>
      <Text style={styles.title}>Next Watering Dates</Text>
      {nextIncompleteWateringDateIndex !== -1 ? (
        <TouchableOpacity
          style={[styles.dateItem, { backgroundColor: "#FFE6E6" }]}
          onPress={() => toggleWatering(nextIncompleteWateringDateIndex)}
        >
          <Text style={styles.dateText}>
            {wateringDates[
              nextIncompleteWateringDateIndex + 1
            ].date.toLocaleDateString()}
          </Text>
          <Text style={styles.completedText}> Complete it </Text>
        </TouchableOpacity>
      ) : (
        <Text>No more upcoming watering dates</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "flex-start",
    flex: 1,
    backgroundColor: "white",
  },
  greenContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
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
  selectDateButton: {
    backgroundColor: "#AFD198",
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
  },
  selectDateButtonText: {
    fontSize: 16,
    color: "white",
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
