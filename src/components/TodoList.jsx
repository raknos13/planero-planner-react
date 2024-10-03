import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import TodoItem from "./TodoItem";

const initialTasks = [
  { id: uuidv4(), title: "Start building Planero", completed: true },
  { id: uuidv4(), title: "Stop procrastinating", completed: false },
  { id: uuidv4(), title: "You can't learn unless you build", completed: true },
];

export default function TodoList() {
  const [tasks, setTasks] = useState(initialTasks);
  const [newTask, setNewTask] = useState("");

  // Function to handle what happens when dragging ends
  function onDragEnd(result) {
    const { destination, source } = result;

    // If there's no destination (dropped outside), do nothing
    if (!destination) {
      return;
    }

    // If position hasn't changed do nothing
    if (destination.index === source.index) {
      return;
    }

    // Reordering the list of tasks
    const reorderedTasks = Array.from(tasks);
    // Remove the dragged task,
    // used array destructuring for [removed], as splice() returns an array
    // and we need the element
    const [removed] = reorderedTasks.splice(source.index, 1);
    // Insert it at the new position
    reorderedTasks.splice(destination.index, 0, removed);

    setTasks(reorderedTasks);
  }

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

  function addNewTask() {
    if (newTask.trim() !== "") {
      setTasks([...tasks, { id: uuidv4(), title: newTask, completed: false }]);
      setNewTask("");
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    addNewTask();
  }

  return (
    // Wrap drag-and-drop context
    <DragDropContext onDragEnd={onDragEnd}>
      {/* Define droppable area */}
      <Droppable droppableId="droppable">
        {(provided) => (
          <ul
            // pass necessary props to make the list droppable
            {...provided.droppableProps}
            // bind ref to DOM element
            ref={provided.innerRef}
            style={{ padding: 0 }}
          >
            {tasks.map((task, index) => (
              <Draggable key={task.id} draggableId={task.id} index={index}>
                {(provided) => (
                  <TodoItem
                    ref={provided.innerRef}
                    draggableProps={provided.draggableProps}
                    dragHandleProps={provided.dragHandleProps}
                    // key={index}
                    task={task}
                    handleEdit={editTask}
                    handleDelete={deleteTask}
                  />
                )}
              </Draggable>
            ))}
            {provided.placeholder}
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
        )}
      </Droppable>
    </DragDropContext>
  );
}
