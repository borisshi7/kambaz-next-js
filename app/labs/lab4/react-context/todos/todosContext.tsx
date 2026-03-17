"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface TodoContextState {
  todos: { id: string; title: string }[];
  todo: { id: string; title: string };
  addTodo: (todo: { id: string; title: string }) => void;
  deleteTodo: (id: string) => void;
  updateTodo: (todo: { id: string; title: string }) => void;
  setTodo: (todo: { id: string; title: string }) => void;
}

const TodosContext = createContext<TodoContextState | undefined>(undefined);

export const TodosProvider = ({ children }: { children: ReactNode }) => {
  const [todos, setTodos] = useState([
    { id: "1", title: "Learn React" },
    { id: "2", title: "Learn Node" },
  ]);
  const [todo, setTodo] = useState({ id: "-1", title: "Learn Mongo" });

  const addTodo = (todo: { id: string; title: string }) => {
    setTodos([...todos, { ...todo, id: new Date().getTime().toString() }]);
    setTodo({ id: "-1", title: "" });
  };
  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };
  const updateTodo = (todo: { id: string; title: string }) => {
    setTodos(todos.map((Todo) => (Todo.id === todo.id ? todo : Todo)));
    setTodo({ id: "-1", title: "" });
  };

  return (
    <TodosContext.Provider value={{ todos, todo, addTodo, deleteTodo, updateTodo, setTodo }}>
      {children}
    </TodosContext.Provider>
  );
};

export const useTodos = () => {
  const context = useContext(TodosContext);
  return context;
};