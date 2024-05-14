import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

export default class ProfilePage extends Component {
  render() {
    const { nickname_exp, email, isExpertLoggedIn } = this.props.route.params;

    return (
      <View style={styles.container}>
        <View style={styles.profileContainer}>
          <FontAwesome
            name="user-circle"
            size={150}
            color="#000000"
            style={styles.profileIcon}
          />
          <Text style={styles.nickname}>{nickname_exp}</Text>
          <Text style={styles.email}>{email}</Text>
          {isExpertLoggedIn && (
            <FontAwesome
              name="check-circle"
              size={20}
              color="#007bff"
              style={styles.blueTickIcon}
            />
          )}
        </View>
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
  },
  profileIcon: {
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
  blueTickIcon: {
    marginTop: 10,
  },
});
