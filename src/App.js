import { useState } from "react";
import headerLogo from "./img/outline-check.svg";
import deleteIcon from "./img/delete.svg";

export default function App() {
  const [todoItems, setTodoItems] = useState([]);

  function handleAddTodo(todoItem) {
    setTodoItems((todoItems) => [...todoItems, todoItem]);
  }

  function handleToggleTodo(id) {
    setTodoItems((todoItems) =>
      todoItems.map((todoItem) =>
        todoItem.id === id ? { ...todoItem, done: !todoItem.done } : todoItem
      )
    );
  }

  function handleDeleteTodo(id) {
    setTodoItems((todoItems) =>
      todoItems.filter((todoItem) => todoItem.id !== id)
    );
  }

  return (
    <div div className="app">
      <Header />
      <InputForm onAddTodo={handleAddTodo} />
      <List
        todoItems={todoItems}
        onToggleTodo={handleToggleTodo}
        onDeleteTodo={handleDeleteTodo}
      />
      <Stats todoItems={todoItems} />
    </div>
  );
}

function Header() {
  return (
    <header className="header">
      <img className="header-img" src={headerLogo} alt="Checkbox logo" />
      <h1>TODO LIST</h1>
    </header>
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
    <form className="add-form" onSubmit={handleSubmit}>
      <input
      className="form-input"
        type="text"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <button className="add-btn">Add</button>
    </form>
  );
}

function List({ todoItems, onToggleTodo, onDeleteTodo }) {
  const [filterBy, setFilterBy] = useState("all");
  const [sortBy, setSortBy] = useState("input");

  let arrangedTodoItems =
    (filterBy === "all" && todoItems) ||
    (filterBy === "done" && todoItems.filter((item) => item.done === true)) ||
    (filterBy === "todo" && todoItems.filter((item) => item.done === false));

  arrangedTodoItems =
    (sortBy === "input" && arrangedTodoItems) ||
    (sortBy === "todo" &&
      arrangedTodoItems.slice().sort((a, b) => a.todo.localeCompare(b.todo))) ||
    (sortBy === "done" &&
      arrangedTodoItems.slice().sort((a, b) => a.done - b.done));

  return (
    <div>
      <div className="actions">
        <select value={filterBy} onChange={(e) => setFilterBy(e.target.value)}>
          <option value="all">All</option>
          <option value="done">Done</option>
          <option value="todo">Todo</option>
        </select>

        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by Input Order</option>
          <option value="todo">Sort by Description</option>
          <option value="done">Sort by Status</option>
        </select>
      </div>

      <ul className="todo-list">
        {arrangedTodoItems.map((todoItem) => (
          <li
            className="todo-list-item"
            key={todoItem.id}
            style={todoItem.done ? { textDecoration: "line-through" } : {}}
          >
            <input
              type="checkbox"
              value={todoItem.done}
              onChange={() => onToggleTodo(todoItem.id)}
            />
            {todoItem.todo}
            <button
              className="delete-btn"
              onClick={() => onDeleteTodo(todoItem.id)}
            >
              <img src={deleteIcon} alt="Delete icon" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Stats({ todoItems }) {
  const doneItems = todoItems.filter((item) => item.done === true).length;
  return (
    <div className="stats">
      {todoItems.length !== 0 && (
        <p>
          {doneItems} of {todoItems.length}{" "}
          {todoItems.length > 1 ? "tasks" : "task"} complete
        </p>
      )}
    </div>
  );
}
