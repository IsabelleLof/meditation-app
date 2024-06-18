import React from "react";
import { View, Button, StyleSheet } from "react-native";
import { useBubbles } from "../context/BubblesContext";

const AddBubblesModeScreen = () => {
  const { addBubble, changeMode } = useBubbles();

  return (
    <View style={styles.container}>
      <Button title="Add Bubble" onPress={addBubble} />
      <View style={styles.modeButtons}>
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
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  modeButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    width: "100%",
  },
});

export default AddBubblesModeScreen;
