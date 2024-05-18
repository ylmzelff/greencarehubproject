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
  require("./assets/picture1.jpg"),
  require("./assets/picture2.jpg"),
  require("./assets/picture3.jpg"),
  require("./assets/picture4.jpg"),
  require("./assets/picture5.jpg"),
];

export default class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPicture: profilePictures[0], // Default picture
    };
  }

  handlePictureSelect = (picture) => {
    this.setState({ selectedPicture: picture });
  };

  handleSaveProfile = () => {
    const { nickname, email, isExpertLoggedIn } = this.props.route.params;
    const { selectedPicture } = this.state;

    const formData = new FormData();
    formData.append("nickname", nickname);
    formData.append("email", email);
    formData.append("isExpertLoggedIn", isExpertLoggedIn);
    formData.append("profilePicture", {
      uri: selectedPicture.uri,
      type: "image/jpeg", // Adjust type as needed
      name: "profilePicture.jpg",
    });

    axios
      .post("http://192.168.1.110:80/compproject/save_profile.php", formData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response.data);
        // Pass selected picture to the Forum or other components
        this.props.navigation.navigate("Forum", {
          nickname: nickname,
          email: email,
          isExpertLoggedIn: isExpertLoggedIn,
          profilePicture: selectedPicture,
        });
      })
      .catch((error) => {
        console.error(error);
        Alert.alert("Error", "Failed to save profile");
      });
  };

  render() {
    const { nickname, email, isExpertLoggedIn, userType } =
      this.props.route.params;
    const { selectedPicture } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.profileContainer}>
          <Image source={selectedPicture} style={styles.profileIcon} />
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
              <Image source={picture} style={styles.pictureOption} />
            </TouchableOpacity>
          ))}
        </View>
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
});
