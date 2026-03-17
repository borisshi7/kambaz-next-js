import { create } from "zustand";

interface TodoState {
  todos: { id: string; title: string }[];
  todo: { id: string; title: string };
  addTodo: (todo: { id: string; title: string }) => void;
  deleteTodo: (id: string) => void;
  updateTodo: (todo: { id: string; title: string }) => void;
  setTodo: (todo: { id: string; title: string }) => void;
}

export const useTodoStore = create<TodoState>((set) => ({
  todos: [
    { id: "1", title: "Learn React" },
    { id: "2", title: "Learn Node" },
  ],
  todo: { id: "-1", title: "Learn Mongo" },
  addTodo: (todo) => {
    set((state) => ({
      todos: [...state.todos, { ...todo, id: new Date().getTime().toString() }],
      todo: { id: "-1", title: "" },
    }));
  },
  deleteTodo: (id) => {
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id),
    }));
  },
  updateTodo: (todo) => {
    set((state) => ({
      todos: state.todos.map((Todo) => (Todo.id === todo.id ? todo : Todo)),
    }));
  },
  setTodo: (todo) => set({ todo }),
}));
