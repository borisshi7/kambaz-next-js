"use client";
import { Button, FormControl, ListGroup, ListGroupItem } from "react-bootstrap";
import { useTodoStore } from "./useTodoStore";

export default function ZustandTodoList() {
  const { todos, todo, addTodo, deleteTodo, updateTodo, setTodo } = useTodoStore(
    (state) => state,
  );

  return (
    <div className="m-2">
      <h2>Todo List</h2>
      <ListGroup>
        {/*TodoForm*/}
        <ListGroupItem>
          <Button onClick={() => addTodo(todo)} id="wd-add-todo-click">
            Add
          </Button>
          <Button onClick={() => updateTodo(todo)} id="wd-update-todo-click">
            Update
          </Button>
          <FormControl
            defaultValue={todo.title}
            onChange={(e) => setTodo({ ...todo, title: e.target.value })}
          />
        </ListGroupItem>
        {todos.map((todo: { id: string; title: string }) => (
            <ListGroupItem key={todo.id}>
              <Button
                onClick={() => deleteTodo(todo.id)}
                id="wd-delete-todo-click"
              >
                Delete
              </Button>
              <Button onClick={() => setTodo(todo)} id="wd-set-todo-click">
                Edit
              </Button>
              {todo.title}
            </ListGroupItem>
          ))}
      </ListGroup>
      <hr />
    </div>
  );
}
