import List from "./List";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useTasks } from "../hooks/useTasks";

const initialBoardData = {
  lists: {
    "list-1": {
      id: "list-1",
      title: "To Do",
      taskIds: ["task-1", "task-2", "task-3"],
    },
    "list-2": {
      id: "list-2",
      title: "In Progress",
      taskIds: ["task-4", "task-5"],
    },
    "list-3": {
      id: "list-3",
      title: "Paused",
      taskIds: [],
    },
  },
  tasks: {
    "task-1": {
      id: "task-1",
      title: "Start building Planero",
      description: "Start from a todo list and build up",
      labels: ["project"],
    },
    "task-2": {
      id: "task-2",
      title: "Learn React",
      description: "Learn state management",
      labels: ["learning"],
    },
    "task-3": {
      id: "task-3",
      title: "You can't learn unless you build",
      description: "Implementing stuff is important",
      labels: ["learning"],
    },
    "task-4": {
      id: "task-4",
      title: "Write documentation",
      description: "Document the process",
      labels: ["documentation"],
    },
    "task-5": {
      id: "task-5",
      title: "Normalize the data structure",
      description: "Normalize to improve performance",
      labels: ["todo"],
    },
  },
  listOrder: ["list-1", "list-2", "list-3"],
};

export default function Board() {
  const [data, setData] = useState(initialBoardData);

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
            {data.listOrder.map((listId, index) => {
              const list = data.lists[listId];
              return (
                <Draggable key={list.id} draggableId={list.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <List
                        list={list}
                        tasks={list.tasks.map((taskId) => data.tasks[taskId])}
                        onDragEnd={onDragEnd}
                        dragHandleProps={provided.dragHandleProps}
                      />
                    </div>
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
