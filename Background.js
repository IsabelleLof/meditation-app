import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Animated,
  StyleSheet,
  Dimensions,
  PanResponder,
  Button,
  Switch,
  Text,
} from "react-native";

const { width, height } = Dimensions.get("window");

const Background = () => {
  const animation = useRef(new Animated.Value(0)).current;
  const [bubbles, setBubbles] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [bubbleSize, setBubbleSize] = useState(20);
  const [movementRange, setMovementRange] = useState(30);
  const [isMoving, setIsMoving] = useState(false);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animation, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(animation, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  useEffect(() => {
    if (isMoving) {
      const moveBubbles = () => {
        setBubbles((prevBubbles) =>
          prevBubbles.map((bubble) => {
            let newLeft = bubble.initialLeft + bubble.vx;
            let newTop = bubble.initialTop + bubble.vy;

            // Reverse direction if the bubble hits the edge of the screen
            if (newLeft < 0 || newLeft > width - bubbleSize) bubble.vx = -bubble.vx;
            if (newTop < 0 || newTop > height - bubbleSize) bubble.vy = -bubble.vy;

            return {
              ...bubble,
              initialLeft: newLeft,
              initialTop: newTop,
            };
          })
        );
        requestAnimationFrame(moveBubbles);
      };
      moveBubbles();
    }
  }, [isMoving, bubbleSize]);

  const addBubble = () => {
    const newBubble = {
      key: bubbles.length,
      initialLeft: Math.random() * (width - 60),
      initialTop: Math.random() * (height - 60),
      vx: (Math.random() - 0.5) * 2, // Random horizontal velocity
      vy: (Math.random() - 0.5) * 2, // Random vertical velocity
    };
    setBubbles((prevBubbles) => [...prevBubbles, newBubble]);
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (e, gestureState) => {
        setBubbles((prevBubbles) =>
          prevBubbles.map((bubble) => ({
            ...bubble,
            initialLeft: bubble.initialLeft + gestureState.dx,
            initialTop: bubble.initialTop + gestureState.dy,
          }))
        );
      },
    })
  ).current;

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? "#000" : "#00bfff" }]} {...panResponder.panHandlers}>
      {bubbles.map((bubble) => (
        <Animated.View
          key={bubble.key}
          style={[
            styles.bubble,
            {
              left: bubble.initialLeft,
              top: bubble.initialTop,
              width: bubbleSize,
              height: bubbleSize,
              borderRadius: bubbleSize / 2,
              transform: [
                {
                  translateY: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, movementRange], // Adjust the vertical movement range
                  }),
                },
                {
                  translateX: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, movementRange], // Adjust the horizontal movement range
                  }),
                },
              ],
            },
          ]}
        />
      ))}
      <Button title="+" onPress={addBubble} />
      <View style={styles.controls}>
        <Text style={{ color: isDarkMode ? "#fff" : "#000" }}>Dark Mode</Text>
        <Switch value={isDarkMode} onValueChange={setIsDarkMode} />
        <Text style={{ color: isDarkMode ? "#fff" : "#000" }}>Bubble Size</Text>
        <Button title="Increase Size" onPress={() => setBubbleSize(bubbleSize + 10)} />
        <Button title="Decrease Size" onPress={() => setBubbleSize(Math.max(10, bubbleSize - 10))} />
        <Text style={{ color: isDarkMode ? "#fff" : "#000" }}>Movement Range</Text>
        <Button title="Increase Movement" onPress={() => setMovementRange(movementRange + 10)} />
        <Button title="Decrease Movement" onPress={() => setMovementRange(Math.max(10, movementRange - 10))} />
        <Text style={{ color: isDarkMode ? "#fff" : "#000" }}>Bubbles Moving</Text>
        <Switch value={isMoving} onValueChange={setIsMoving} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center", // Center the content
    alignItems: "center", // Center the content
  },
  bubble: {
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 0.5)", // Semi-transparent white
  },
  controls: {
    position: "absolute",
    bottom: 50,
    alignItems: "center",
  },
});

export default Background;



