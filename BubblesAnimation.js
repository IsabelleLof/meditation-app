// // BubblesAnimation.js
// import React from "react";
// import { View, Animated, StyleSheet, Button } from "react-native";
// import { useBubbles, BubblesProvider } from "../context/BubblesContext";

// const BubblesAnimation = () => {
//   const { animation, bubbles, panResponder, addBubble, changeMode } =
//     useBubbles();

//   return (
//     <View style={styles.container} {...panResponder.panHandlers}>
//       {bubbles.map((bubble) => (
//         <Animated.View
//           key={bubble.key}
//           style={[
//             styles.bubble,
//             {
//               left: bubble.initialLeft,
//               top: bubble.initialTop,
//               backgroundColor: bubble.color,
//               transform: [
//                 {
//                   translateY: animation.interpolate({
//                     inputRange: [0, 1],
//                     outputRange: [0, 30], // Adjust the vertical movement range
//                   }),
//                 },
//                 {
//                   translateX: animation.interpolate({
//                     inputRange: [0, 1],
//                     outputRange: [0, 30], // Adjust the horizontal movement range
//                   }),
//                 },
//               ],
//             },
//           ]}
//         />
//       ))}
//       <Button title="Add Bubble" onPress={addBubble} />
//       <Button title="Light Mode" onPress={() => changeMode("light")} />
//       <Button title="Dark Mode" onPress={() => changeMode("dark")} />
//       <Button title="Red Mode" onPress={() => changeMode("red")} />
//     </View>
//   );
// };



// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#00bfff", // Light blue background
//   },
//   bubble: {
//     position: "absolute",
//     width: 20, // Fixed size
//     height: 20, // Fixed size
//     borderRadius: 10, // Circle shape
//   },
// });

// export default BubblesAnimation;
