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
      nickname: "",
      userType: "",
      password: "",
      showSuccessMessage: false,
    };
  }

  handleLogin = () => {
    const { nickname, password, userType } = this.state; // userType'ı da state'ten al

    fetch("http://10.30.10.210/compproject/expsignincheck.php", {
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
    navigation.navigate("Main", { nickname, userType: "expert" });
  };

  render() {
    const { nickname, password, showSuccessMessage } = this.state;

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
                placeholder="Nickname"
                placeholderTextColor="black"
                value={nickname}
                onChangeText={(nickname) => this.setState({ nickname })}
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
