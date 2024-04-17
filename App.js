// App.js

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./HomeScreen";
import MainPage from "./MainPage";
import ExpertHomeScreen from "./ExpertHomeScreen";
import EnthusiastHomeScreen from "./EnthusiastHomeScreen";
import ExpertSignInScreen from "./ExpertSignInScreen";
import EnthusiastSignInScreen from "./EnthusiastSignInScreen";
import ExpertSignUpScreen from "./ExpertSignUpScreen";
import EnthusiastSignUpScreen from "./EnthusiastSignUpScreen";
import SearchAndAddPage from "./SearchAndAddPage";
import TabVegetables from "./TabVegetables";
import TabFruits from "./TabFruits";
import TabFlowers from "./TabFlowers";
import Forum from "./Forum";
import WelcomeScreen from "./WelcomeScreen";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="ExpertHome" component={ExpertHomeScreen} />
        <Stack.Screen name="EnthusiastHome" component={EnthusiastHomeScreen} />
        <Stack.Screen name="ExpertSignIn" component={ExpertSignInScreen} />
        <Stack.Screen
          name="EnthusiastSignIn"
          component={EnthusiastSignInScreen}
        />
        <Stack.Screen name="ExpertSignUp" component={ExpertSignUpScreen} />
        <Stack.Screen
          name="EnthusiastSignUp"
          component={EnthusiastSignUpScreen}
        />
        <Stack.Screen
          name="Main"
          component={MainPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="SearchAndAdd" component={SearchAndAddPage} />
        <Stack.Screen name="TabVegetables" component={TabVegetables} />
        <Stack.Screen name="TabFruits" component={TabFruits} />
        <Stack.Screen name="TabFlowers" component={TabFlowers} />
        <Stack.Screen name="Forum" component={Forum} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;