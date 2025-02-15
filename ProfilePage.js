import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import axios from "axios";

const profilePictures = [
  { source: require("./assets/picture1.jpg"), icontype: 1 },
  { source: require("./assets/picture2.jpg"), icontype: 2 },
  { source: require("./assets/picture3.jpg"), icontype: 3 },
  { source: require("./assets/picture4.jpg"), icontype: 4 },
  { source: require("./assets/picture5.jpg"), icontype: 5 },
];

export default class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPicture: profilePictures[0], // Default picture
      successMessage: "", // Success message state
    };
  }

  handlePictureSelect = (picture) => {
    this.setState({ selectedPicture: picture });
  };

  handleSaveProfile = () => {
    const { nickname, email } = this.props.route.params;
    const { selectedPicture } = this.state;

    if (!selectedPicture.icontype) {
      Alert.alert("Warning", "Please select a profile picture");
      return;
    }

    axios
      .post("", { //deleted for security
        nickname: nickname,
        email: email,
        icontype: selectedPicture.icontype,
      })
      .then((response) => {
        console.log(response.data);
        this.setState({ successMessage: "Profile saved successfully!" });
      })
      .catch((error) => {
        console.error(error);
        Alert.alert("Error", "Failed to save profile");
      });
  };

  render() {
    const { nickname, email, isExpertLoggedIn, userType } =
      this.props.route.params;
    const { selectedPicture, successMessage } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.profileContainer}>
          <Image source={selectedPicture.source} style={styles.profileIcon} />
          <Text style={styles.nickname}>Nickname: {nickname}</Text>
          <Text style={styles.email}>Email: {email}</Text>
          <Text style={styles.userType}>User Type: {userType}</Text>
          {isExpertLoggedIn && (
            <FontAwesome
              name="check-circle"
              size={20}
              color="#007bff"
              style={styles.blueTickIcon}
            />
          )}
        </View>
        <View style={styles.picturesContainer}>
          {profilePictures.map((picture, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => this.handlePictureSelect(picture)}
            >
              <Image source={picture.source} style={styles.pictureOption} />
            </TouchableOpacity>
          ))}
        </View>
        {successMessage !== "" && ( // Show success message if it's not empty
          <View style={styles.successMessageContainer}>
            <Text style={styles.successMessageText}>{successMessage}</Text>
          </View>
        )}
        <TouchableOpacity
          style={styles.saveButton}
          onPress={this.handleSaveProfile}
        >
          <Text style={styles.saveButtonText}>Save Profile</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  profileContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  profileIcon: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  nickname: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  email: {
    fontSize: 16,
    marginBottom: 20,
  },
  userType: {
    fontSize: 16,
    marginBottom: 10,
  },
  blueTickIcon: {
    marginTop: 10,
  },
  picturesContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  pictureOption: {
    width: 50,
    height: 50,
    borderRadius: 25,
    margin: 10,
  },
  saveButton: {
    backgroundColor: "rgba(156, 167, 119, 0.7)",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  saveButtonText: {
    color: "white",
  },
  successMessageContainer: {
    position: "absolute",
    top: 20,
    width: "100%",
    alignItems: "center",
  },
  successMessageText: {
    color: "green",
    fontWeight: "bold",
  },
});
