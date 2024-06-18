import React, { useContext } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { TodoContext } from "../context/TodoContext";

const TodoDetailScreen = ({ route, navigation }) => {
  const { todoId } = route.params;
  const { todos, markTodoAsDone, deleteTodo } = useContext(TodoContext);
  const todo = todos.find((todo) => todo.id === todoId);

  if (!todo) {
    return (
      <View style={styles.container}>
        <Text>Todo not found</Text>
        <Button
          title="Back to Home"
          onPress={() => navigation.navigate("Home")}
        />
      </View>
    );
  }

  const handleMarkAsDone = () => {
    markTodoAsDone(todoId);
    navigation.navigate("Home");
  };

  const handleDeleteTodo = () => {
    deleteTodo(todoId);
    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{todo.title}</Text>
      <Text style={styles.description}>{todo.description}</Text>
      {!todo.completed && <Button title="Done" onPress={handleMarkAsDone} />}
      <Button title="Delete" onPress={handleDeleteTodo} color="red" />
      <View style={styles.footer}>
        <Text style={styles.date}>{`Created on: ${todo.date}`}</Text>
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 18,
    marginBottom: 20,
  },
  footer: {
    marginTop: 20,
    alignItems: "center",
  },
  date: {
    fontSize: 14,
    color: "gray",
  },
});

export default TodoDetailScreen;
