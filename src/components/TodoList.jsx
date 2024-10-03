import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import TodoItem from "./TodoItem";
import { useTasks } from "./useTasks";

const initialTasks = [
  { id: uuidv4(), title: "Start building Planero", completed: true },
  { id: uuidv4(), title: "Stop procrastinating", completed: false },
  { id: uuidv4(), title: "You can't learn unless you build", completed: true },
];

export default function TodoList() {
  const { tasks, addTask, deleteTask, editTask, reorderTasks } =
    useTasks(initialTasks);
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

    reorderTasks(source.index, destination.index);
  }

  function handleSubmit(e) {
    e.preventDefault();
    addTask();
    setNewTask("");
  }

  return (
    <div className="container mx-auto p-4">
      {/* Wrap drag-and-drop context */}
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
              className="bg-gray-100 rounded-lg p-4 shadow-md"
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
    </div>
  );
}
