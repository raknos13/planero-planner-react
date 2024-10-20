import { useState, useRef, useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { AiOutlinePlus, AiOutlineClose } from "react-icons/ai";
// import { v4 as uuidv4 } from "uuid";
import TodoItem from "./TodoItem";
import { useTasks } from "../hooks/useTasks";

export default function TodoList({ initialTasks, title, onDragEnd }) {
  const { tasks, addTask, deleteTask, editTask } = useTasks(initialTasks);
  const [newTask, setNewTask] = useState("");
  const [isAddingNewTask, setIsAddingNewTask] = useState(false);

  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current && isAddingNewTask) {
      textareaRef.current.focus();
    }
  }, [isAddingNewTask]);

  function handleSubmit(e) {
    e.preventDefault();
    addTask(newTask);
    setNewTask("");
    // setIsAddingNewTask(false);
  }

  return (
    <div className="container mx-2 p-2 bg-gray-200 rounded-xl w-[300px] h-min">
      <div className="font-bold mb-2 p-1">
        <span>{title}</span>
      </div>
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
            >
              {tasks &&
                tasks.map((task, index) => (
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
            </ul>
          )}
        </Droppable>
      </DragDropContext>
      {isAddingNewTask && (
        <textarea
          placeholder="Type a task to add..."
          value={newTask}
          ref={textareaRef}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSubmit(e);
            }
          }}
          onBlur={() => {
            setIsAddingNewTask(false);
            setNewTask("");
          }}
          className="mb-1 p-2 w-full rounded-lg text-sm"
        />
      )}
      <div className="flex">
        <button
          // type="submit"
          onClick={() => {
            setIsAddingNewTask(true);
          }}
          className="flex justify-start items-center gap-2 p-2 bg-gray-200 rounded-md w-full text-sm hover:bg-gray-400"
        >
          <AiOutlinePlus />
          <span>Add new task</span>
        </button>
        {isAddingNewTask && (
          <button
            onClick={() => setIsAddingNewTask(false)}
            className="p-1 px-2 rounded-md hover:bg-gray-400"
          >
            <AiOutlineClose />
          </button>
        )}
      </div>
    </div>
  );
}
