import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import TodoItem from "./TodoItem";

const TODOS = [
  { id: 0, title: "Start building Planero", completed: true },
  { id: 1, title: "Stop procrastinating", completed: false },
  { id: 2, title: "You can't learn unless you build", completed: true },
];

export default function TodoList() {
  const [tasks, setTasks] = useState(TODOS);
  const [newTask, setNewTask] = useState("");

  function deleteTask(id) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  function editTask(id, updatedTitle) {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, title: updatedTitle } : task,
      ),
    );
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (newTask.trim() !== "") {
      setTasks([...tasks, { id: uuidv4(), title: newTask, completed: false }]);
      setNewTask("");
    }
  }

  return (
    <ul>
      {tasks.map((task, index) => (
        <TodoItem
          key={index}
          id={index}
          task={task}
          handleDelete={deleteTask}
          handleEdit={editTask}
        />
      ))}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Type a task to add"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button type="submit">+ Add a task</button>
      </form>
    </ul>
  );
}
