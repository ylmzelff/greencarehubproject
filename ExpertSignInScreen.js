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
      nickname_exp: "", // Değişiklik: 'email' yerine 'nickname_exp'
      password: "",
      showSuccessMessage: false,
    };
  }

  handleLogin = () => {
    const { nickname_exp, password } = this.state;

    fetch("http://192.168.1.110/compproject/expsignincheck.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nickname_exp, password }),
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
          this.handleSignIn(nickname_exp);
        } else if (data.Message === "false") {
          Alert.alert("Uyarı", "Nickname veya şifre yanlış!"); // Değişiklik: 'Email' yerine 'Nickname'
        }
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
        Alert.alert("Hata", "Bir hata oluştu. Lütfen tekrar deneyin.");
      });
  };

  handleSignIn = (nickname) => {
    const { navigation } = this.props;
    navigation.navigate("Main", { nickname, userType: "expert" }); // userType ekleniyor
  };

  render() {
    const { nickname_exp, password, showSuccessMessage } = this.state;

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
                placeholder="Nickname" // Değişiklik: 'Email' yerine 'Nickname'
                placeholderTextColor="black"
                value={nickname_exp}
                onChangeText={(nickname_exp) => this.setState({ nickname_exp })} // Değişiklik: 'email' yerine 'nickname_exp'
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
