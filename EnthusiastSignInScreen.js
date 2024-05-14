// EnthusiastSignInScreen.js
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
      nickname_ent: "", // Güncelleme: nickname_ent olarak değiştirildi
      password: "",
    };
  }

  handleLogin = () => {
    const { nickname_ent, password } = this.state;

    fetch("http://10.30.3.80/compproject/entsignincheck.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nickname_ent, password }),
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
          Alert.alert("Uyarı", "Nickname veya şifre yanlış!");
        }
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
        Alert.alert("Hata", "Bir hata oluştu. Lütfen tekrar deneyin.");
      });
  };

  handleSignIn = () => {
    const { navigation } = this.props;
    const { nickname_ent } = this.state;
    navigation.navigate("Main", {
      nickname: nickname_ent,
      userType: "enthusiast",
    });
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
              <TouchableOpacity onPress={() => this.nicknameInput.focus()}>
                <Text style={styles.placeholderText}>Nickname</Text>
              </TouchableOpacity>
              <TextInput
                ref={(input) => (this.nicknameInput = input)}
                style={styles.input}
                placeholderTextColor="black"
                value={this.state.nickname_ent}
                onChangeText={(nickname_ent) => this.setState({ nickname_ent })}
              />
              <TouchableOpacity onPress={() => this.passwordInput.focus()}>
                <Text style={styles.placeholderText}>Password</Text>
              </TouchableOpacity>
              <TextInput
                ref={(input) => (this.passwordInput = input)}
                style={styles.input}
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
