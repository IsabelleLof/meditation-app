import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
//import BubblesAnimation from "./BubblesAnimation";
import AddBubblesModeScreen from "../screens/AddBubblesModeScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "../screens/HomeScreen";

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <SafeAreaView style={styles.container}>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen
            name="AddBubblesModeScreen"
            component={AddBubblesModeScreen}
          />
        </Stack.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#00bfff",
  },
});

export default AppNavigator;
