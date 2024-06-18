import React from "react";
import { Animated, StyleSheet } from "react-native";

const AnimatedBubble = ({ style }) => {
  return <Animated.View style={[styles.bubble, style]} />;
};

const styles = StyleSheet.create({
  bubble: {
    position: "absolute",
    width: 20, // Fixed size
    height: 20, // Fixed size
    borderRadius: 10, // Circle shape
  },
});

export default AnimatedBubble;
