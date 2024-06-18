import React from "react";
import AppNavigator from "./navigation/AppNavigator";
import TodoProvider from "./context/TodoContext";
import Background from "./Background";
import BubblesAnimation from "./BubblesAnimation";
import { BubblesProvider } from "./context/BubblesContext";

const App = () => {
  return (
    <BubblesProvider>
      {/* <AppNavigator /> */}
      <Background />
    </BubblesProvider>
  );
};

export default App;
