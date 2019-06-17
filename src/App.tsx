import React, { useState, Fragment } from "react";
import { number } from "prop-types";
import Add from "./components/Add";
import './App.css';
interface ITodo {
  text: string;
  complete: boolean;
}
function App() {
  const [value, setValue] = useState<string>("");
  const [todos, setTodos] = useState<ITodo[]>([]);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    addTodo(value);
    setValue("");
  };
  const addTodo = (text: string): void => {
    const newTodos: ITodo[] = [...todos, { text, complete: false }];
    setTodos(newTodos);
  };
  const completeTodo = (index: number): void => {
    const newTodos: ITodo[] = [...todos];
    newTodos[index].complete = !newTodos[index].complete;
    setTodos(newTodos);
  };
  return (
    <div className="App">
      <h1>TODO List </h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={value}
          onChange={e => setValue(e.target.value)}
          required
        />
        <button type="submit">Add TODO</button>
      </form>
      <section>
        {todos.map((todo: ITodo, index: number) => {
          return (
            <Fragment key={index}>
              <div>{todo.text}</div>
              <button type="button" onClick={() => completeTodo(index)}>
                {todo.complete ? "Incomplete" : "complete"}
              </button>
            </Fragment>
          );
        })}
      </section>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="App">
        <header className="App-header">
          <Add />
        </header>
      </div>
    </div>
  );
}

export default App;
