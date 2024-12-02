import { useState } from "react";
import headerLogo from "./img/outline-check.svg";

const tasks = [
  {
    id: 1,
    todo: "Doctor Appointment",
    done: true,
  },
  {
    id: 2,
    todo: "Meeting at School",
    done: false,
  },
  {
    id: 3,
    todo: "Meeting at work",
    done: false,
  },
];

export default function App() {
  return (
    <div className="app">
      <TodoList />
    </div>
  );
}

function TodoList() {
  // const [todoItems, setTodoItems] = useState([]);
  const [todoItems, setTodoItems] = useState([]);

  function addTodo(item) {
    setTodoItems((items) => [...items, item]);
  }

  return (
    <div>
      <Header />
      <InputForm onAddTodo={addTodo} />
      <List todoItems={todoItems} />
      <Stats todoItems={todoItems} />
    </div>
  );
}

function Header() {
  return (
    <span className="header">
      <img className="headerLogo" src={headerLogo} alt="Checkbox logo" />
      <h1>TODO LIST</h1>
    </span>
  );
}

function InputForm({ onAddTodo }) {
  const [todo, setTodo] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!todo) return;

    const newTodo = { id: Date.now(), todo, done: false };
    onAddTodo(newTodo);
    setTodo("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <button>Add Task</button>
    </form>
  );
}

function List({ todoItems }) {
  return (
    <div>
      <select name="filter">
        <option>All</option>
        <option>Done</option>
        <option>Todo</option>
      </select>

      <select name="filter">
        <option>Sort by Input Order</option>
        <option>Sort by Description</option>
        <option>Sort by Status</option>
      </select>
      <ul>
        {todoItems.map((todoItem) => (
          <li key={todoItem.id}>{todoItem.todo}</li>
        ))}
      </ul>
    </div>
  );
}

function Stats({ todoItems }) {
  return <div>{todoItems.length !== 0 && <p>X of Y complete</p>}</div>;
}
