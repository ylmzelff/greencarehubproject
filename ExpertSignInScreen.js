import React, { Component } from "react";
import {
  View,
  Text,
  Alert,
  TouchableOpacity,
  TextInput,
  ImageBackground,
} from "react-native";
import { StyleSheet } from "react-native";

class ExpertSignInScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      showSuccessMessage: false,
    };
  }

  handleLogin = () => {
    const { email, password } = this.state;

    fetch("http://10.30.3.96:80/compproject/expsignincheck.php", {
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
    const { email, password, showSuccessMessage } = this.state;

    return (
      <ImageBackground
        source={require("./assets/expert.jpg")}
        style={styles.backgroundImage}
      >
        <View style={styles.container}>
          <View style={styles.overlay}>
            <View style={styles.bottomContainer}>
              <TextInput
                style={styles.placeholderText}
                placeholder="Email"
                placeholderTextColor="black"
                value={email}
                onChangeText={(email) => this.setState({ email })}
              />
              <TextInput
                style={styles.placeholderText}
                placeholder="Password"
                placeholderTextColor="black"
                secureTextEntry
                value={password}
                onChangeText={(password) => this.setState({ password })}
              />
              <TouchableOpacity
                style={styles.button}
                onPress={this.handleLogin}
              >
                <Text style={styles.buttonText}>Sign In</Text>
              </TouchableOpacity>
              {showSuccessMessage && (
                <Text style={styles.successText}>Giriş başarılı!</Text>
              )}
            </View>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

export default ExpertSignInScreen;

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
    borderBottomColor: "gray",
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
  successText: {
    marginTop: 10,
    color: "green",
    fontWeight: "bold",
  },
});
