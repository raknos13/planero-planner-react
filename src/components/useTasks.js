import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export function useTasks(initialTasks) {
  const [tasks, setTasks] = useState(initialTasks);

  function deleteTask(id) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  function editTask(id, updatedTask) {
    setTasks(tasks.map((task) => (task.id === id ? updatedTask : task)));
  }

  function addTask(newTaskTitle) {
    if (newTaskTitle.trim() === "") return;
    setTasks([
      ...tasks,
      { id: uuidv4(), title: newTaskTitle, completed: false },
    ]);
  }

  function reorderTasks(sourceIndex, destinationIndex) {
    // Reordering the list of tasks
    const reorderedTasks = Array.from(tasks);
    // Remove the dragged task,
    // used array destructuring for [removed], as splice() returns an array
    // and we need the element
    const [removed] = reorderedTasks.splice(sourceIndex, 1);
    // Insert it at the new position
    reorderedTasks.splice(destinationIndex, 0, removed);

    setTasks(reorderedTasks);
  }

  return { tasks, addTask, deleteTask, editTask, reorderTasks };
}
