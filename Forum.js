import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

const Forum = ({ navigation }) => {
  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    //<ImageBackground source={require('./assets/forumBackground.jpg')} style={styles.backgroundImage}>

    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Forum</Text>
      <TouchableOpacity onPress={handleGoBack}>
        <Text style={{ marginTop: 20, color: "blue" }}>Geri</Text>
      </TouchableOpacity>
    </View>
    //</ImageBackground>
  );
};

export default Forum;
