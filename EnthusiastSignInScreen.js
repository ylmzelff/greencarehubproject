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
      nickname: "",
      userType: "",
      password: "",
      showSuccessMessage: false,
    };
  }

  handleLogin = () => {
    const { nickname, password, userType } = this.state; // userType'ı da state'ten al

    fetch("http://10.30.10.210/compproject/entsignincheck.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nickname, password, userType }), // userType'ı da gönder
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Server response:", data); // Sunucudan gelen veriyi kontrol et
        if (data.Message === "true") {
          this.setState({ showSuccessMessage: true });
          setTimeout(() => {
            this.setState({
              showSuccessMessage: false,
              nickname: "", // Giriş başarılı olduğunda nickname alanını temizle
              password: "", // Giriş başarılı olduğunda şifre alanını temizle
            });
          }, 3000);
          this.handleSignIn(nickname);
        } else if (data.Message === "false") {
          Alert.alert("Uyarı", "Nickname veya şifre yanlış!");
          this.setState({
            // Giriş başarısız olduğunda da alanları temizle
            nickname: "",
            password: "",
          });
        }
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
        Alert.alert("Hata", "Bir hata oluştu. Lütfen tekrar deneyin.");
      });
  };

  handleSignIn = () => {
    const { navigation } = this.props;
    const { nickname } = this.state;
    navigation.navigate("Main", { nickname, userType: "enthusiast" });
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
                value={this.state.nickname} // Burada nickname kullanılmalı
                onChangeText={(nickname) => this.setState({ nickname })}
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
