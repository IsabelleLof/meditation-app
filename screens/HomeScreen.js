import React, { useContext, useLayoutEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Button,
  StyleSheet,
} from "react-native";
import { useBubbles } from "../context/BubblesContext";
import AnimatedBubble from "../screens/AnimatedBubble"; // Assuming you have a component for animated bubbles

const HomeScreen = ({ navigation }) => {
  const { bubbles, addBubble, changeMode, mode } = useBubbles();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          onPress={() => navigation.navigate("AddBubblesModeScreen")}
          title="Add Bubbles"
        />
      ),
    });
  }, [navigation]);

  const renderBubbleItem = ({ item }) => (
    <AnimatedBubble
      key={item.key}
      style={{
        left: item.initialLeft,
        top: item.initialTop,
        backgroundColor: item.color,
      }}
    />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Bubbles Animation</Text>
      <Text style={styles.modeText}>Current Mode: {mode}</Text>
      <FlatList
        data={bubbles}
        keyExtractor={(item) => item.key.toString()}
        renderItem={renderBubbleItem}
        ListEmptyComponent={<Text>No bubbles</Text>}
      />
      <View style={styles.buttonContainer}>
        <Button title="Add Bubble" onPress={addBubble} />
        <Button title="Light Mode" onPress={() => changeMode("light")} />
        <Button title="Dark Mode" onPress={() => changeMode("dark")} />
        <Button title="Red Mode" onPress={() => changeMode("red")} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
  },
  modeText: {
    fontSize: 16,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
});

export default HomeScreen;
