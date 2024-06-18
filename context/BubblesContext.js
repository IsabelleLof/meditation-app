import React, { createContext, useContext, useRef, useEffect, useState } from "react";
import { View, Animated, StyleSheet, Dimensions, PanResponder } from "react-native";

const { width, height } = Dimensions.get("window");

const BubblesContext = createContext();

export const useBubbles = () => useContext(BubblesContext);

export const BubblesProvider = ({ children }) => {
  const animation = useRef(new Animated.Value(0)).current;
  const [bubbles, setBubbles] = useState([]);
  const [mode, setMode] = useState("light");

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

  const addBubble = () => {
    const color = getColorByMode(mode);
    const newBubble = {
      key: Date.now(),
      initialLeft: Math.random() * (width - 60),
      initialTop: Math.random() * (height - 60),
      color: color,
    };
    setBubbles((prevBubbles) => [...prevBubbles, newBubble]);
  };

  const getColorByMode = (mode) => {
    switch (mode) {
      case "dark":
        return `rgba(0, 0, 0, 0.5)`; // Dark bubbles
      case "red":
        return `rgba(255, 0, 0, 0.5)`; // Red bubbles
      case "light":
      default:
        return `rgba(255, 255, 255, 0.5)`; // Light bubbles
    }
  };

  const changeMode = (newMode) => {
    setMode(newMode);
    setBubbles((prevBubbles) =>
      prevBubbles.map((bubble) => ({
        ...bubble,
        color: getColorByMode(newMode),
      }))
    );
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
    <BubblesContext.Provider value={{ animation, bubbles, panResponder, addBubble, changeMode }}>
      {children}
    </BubblesContext.Provider>
  );
};
