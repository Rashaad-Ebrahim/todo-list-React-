const tasks = [
  {
    id: 1,
    text: "Doctor Appointment",
    completed: true,
  },
  {
    id: 2,
    text: "Meeting at School",
    completed: false,
  },
  {
    id: 3,
    text: "Meeting at work",
    completed: false,
  },
];

export default function App() {
  return (
    <div>
      <TodoList />
    </div>
  );
}

function TodoList() {
  return (
    <div>
      <Header />
      <InputForm />
      <List />
    </div>
  );
}

function Header() {
  return <h1>TODO LIST</h1>;
}

function InputForm() {
  return (
    <form>
      <input type="text" />
      <button>Add Task</button>
    </form>
  );
}

function List() {
  return (
    <div>
      <ul>
        {tasks.map( task => <li>task</li>)}
      </ul>

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

    </div>
  );
}

function Stats() {
  return <div></div>;
}
