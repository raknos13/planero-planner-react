import { useState } from "react";
import TodoItem from "./TodoItem";

const TODOS = [
  { id: 0, title: "Start building Planero", completed: true },
  { id: 1, title: "Stop procrastinating", completed: false },
  { id: 2, title: "You can't learn unless you build", completed: true },
];

export default function TodoList() {
  const [tasks, setTasks] = useState(TODOS);

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
    </ul>
  );
}
