import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ImageBackground,
  StyleSheet,
  Alert,
} from "react-native";

export default class EnthusiastSignInScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  handleLogin = () => {
    const { email, password } = this.state;

    fetch("http://10.30.3.96:80/compproject/entsignincheck.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (data.Message === "true") {
          this.setState({ showSuccessMessage: true });
          setTimeout(() => {
            this.setState({ showSuccessMessage: false });
          }, 3000);
          this.handleSignIn();
        } else if (data.Message === "false") {
          Alert.alert("Uyarı", "Email veya şifre yanlış!");
        }
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
        Alert.alert("Hata", "Bir hata oluştu. Lütfen tekrar deneyin.");
      });
  };

  handleSignIn = () => {
    const { navigation } = this.props;
    navigation.navigate("Main");
  };

  render() {
    return (
      <ImageBackground
        source={require("./assets/enthusiast.jpg")}
        style={styles.backgroundImage}
      >
        <View style={styles.container}>
          <View style={styles.overlay}>
            <View style={styles.bottomContainer}>
              <TextInput
                style={styles.placeholderText}
                placeholder="Email"
                placeholderTextColor="black"
                value={this.state.email}
                onChangeText={(email) => this.setState({ email })}
              />
              <TextInput
                style={styles.placeholderText}
                placeholder="Password"
                placeholderTextColor="black"
                secureTextEntry
                value={this.state.password}
                onChangeText={(password) => this.setState({ password })}
              />
              <TouchableOpacity
                style={styles.button}
                onPress={this.handleLogin}
              >
                <Text style={styles.buttonText}>Sign In</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  bottomContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    padding: 50,
    borderRadius: 20,
    marginTop: 20,
    width: "80%",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "normal",
    color: "#F97B22",
    textAlign: "center",
  },
  placeholderText: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
    width: "100%",
    marginBottom: 20,
    padding: 10,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
});
