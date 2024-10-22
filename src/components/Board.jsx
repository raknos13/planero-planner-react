import TodoList from "./List";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useTasks } from "../hooks/useTasks";

const initialData = {
  lists: [
    {
      id: "list-1",
      title: "Todo",
      tasks: [
        { id: "task-1", title: "Start building Planero", completed: true },
        { id: "task-2", title: "Stop procrastinating", completed: false },
        {
          id: "task-3",
          title: "You can't learn unless you build",
          completed: true,
        },
      ],
    },
    {
      id: "list-2",
      title: "In Progress",
      tasks: [
        { id: "task-1", title: "Make the lists draggable", completed: false },
        {
          id: "task-2",
          title: "Keep working on the project every single day",
          completed: false,
        },
      ],
    },
    { id: "list-3", title: "Done", tasks: [] },
  ],
};

export default function Board() {
  const [lists, setLists] = useState(initialData.lists);

  function updateListTasks(listId, updatedTasks) {
    setLists((prevLists) =>
      prevLists.map((list) =>
        list.id === listId ? { ...list, tasks: updatedTasks } : list,
      ),
    );
  }

  function deleteTask(listId, taskId) {
    const list = lists.find((list) => list.id === listId);
    updateListTasks(
      listId,
      list.tasks.filter((task) => task.id !== taskId),
    );
  }

  function addTask(listId, newTaskTitle) {
    if (newTaskTitle.trim === "") return;
    const newTask = { id: uuidv4(), title: newTaskTitle, completed: false };
    const list = lists.find((list) => list.id === listId);
    updateListTasks(listId, [...list.tasks, newTask]);
  }

  function editTask(listId, taskId, updatedTask) {
    const list = lists.find((list) => list.id === listId);
    updateListTasks(
      listId,
      list.map((task) => {
        task.id === taskId ? updatedTask : task;
      }),
    );
  }

  // Function to handle what happens when dragging ends
  function onDragEnd(result) {
    const { destination, source, type } = result;
    // If there's no destination (dropped outside), do nothing
    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    ) {
      return;
    }

    // Handle list reordering
    if (type === "list") {
      const newLists = Array.from(lists);
      const [movedList] = newLists.splice(source.index, 1);
      newLists.splice(destination.index, 0, movedList);

      setLists(newLists);
      return;
    }

    // Handle task reordering
    const sourceList = lists.find((list) => list.id === source.droppableId);
    const destList = lists.find((list) => list.id === destination.droppableId);

    // Create new array references for updating state
    const newSourceTasks = Array.from(sourceList.tasks);
    const [movedTask] = newSourceTasks.splice(source.index, 1);

    // If moving to same list
    if (source.droppableId === destination.droppableId) {
      newSourceTasks.splice(destination.index, 0, movedTask);

      const newLists = lists.map((list) =>
        list.id === sourceList.id ? { ...list, tasks: newSourceTasks } : list,
      );

      setLists(newLists);
    }
    // If moving to different list
    else {
      const newDestTasks = Array.from(destList.tasks);
      newDestTasks.splice(destination.index, 0, movedTask);

      const newLists = lists.map((list) => {
        if (list.id === sourceList.id) {
          return { ...list, tasks: newSourceTasks };
        }
        if (list.id === destList.id) {
          return { ...list, tasks: newDestTasks };
        }
        return list;
      });

      setLists(newLists);
    }
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="board" type="list" direction="horizontal">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="flex justify-start w-auto h-screen mx-3 my-3"
          >
            {lists.map((list, index) => (
              <Draggable key={list.id} draggableId={list.id} index={index}>
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.draggableProps}>
                    <TodoList
                      title="Todo"
                      list={list}
                      addTask={addTask}
                      editTask={editTask}
                      deleteTask={deleteTask}
                      onDragEnd={onDragEnd}
                      dragHandleProps={provided.dragHandleProps}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
