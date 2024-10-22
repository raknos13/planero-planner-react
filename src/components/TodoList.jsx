import { useState, useRef, useEffect } from "react";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import { AiOutlinePlus, AiOutlineClose } from "react-icons/ai";
import ListItem from "./TodoItem";
import { v4 as uuidv4 } from "uuid";
import { useTasks } from "../hooks/useTasks";

export default function TodoList({
  list,
  addTask,
  editTask,
  deleteTask,
  dragHandleProps,
}) {
  const [newTask, setNewTask] = useState({});
  const [isAddingNewTask, setIsAddingNewTask] = useState(false);
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current && isAddingNewTask) {
      textareaRef.current.focus();
    }
  }, [isAddingNewTask]);

  function handleSubmit(e) {
    e.preventDefault();
    addTask(list.id, newTask);
    setNewTask({});
    // setIsAddingNewTask(false);
  }

  return (
    <div className="container mx-2 p-2 bg-gray-200 rounded-xl w-[300px] h-min">
      <div {...dragHandleProps}>
        <div className="font-bold mb-2 p-1">
          <span>{list.title}</span>
        </div>
      </div>
      <Droppable droppableId="droppable">
        {(provided) => (
          <ul
            // pass necessary props to make the list droppable
            {...provided.droppableProps}
            // bind ref to DOM element
            ref={provided.innerRef}
          >
            {list.tasks &&
              list.tasks.map((task, index) => (
                <Draggable key={task.id} draggableId={task.id} index={index}>
                  {(provided) => (
                    <listItem
                      ref={provided.innerRef}
                      draggableProps={provided.draggableProps}
                      dragHandleProps={provided.dragHandleProps}
                      // key={index}
                      listId={list.id}
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

      {isAddingNewTask && (
        <textarea
          placeholder="Type a task to add..."
          value={newTask.title}
          ref={textareaRef}
          onChange={(e) =>
            setNewTask({
              id: uuidv4(),
              title: e.target.value,
              completed: false,
            })
          }
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSubmit(e);
            }
          }}
          onBlur={() => {
            setIsAddingNewTask(false);
            setNewTask({});
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
