import { Draggable, Droppable } from "@hello-pangea/dnd";
import { FiMoreHorizontal, FiX } from "react-icons/fi";
import Card from "./Card";
import AddNew from "./AddNew";
import { useState, useRef } from "react";
import { useBoardContext } from "./BoardContext";

export default function List({ list, listCards, dragHandleProps }) {
  const { deleteList, editList, addNewCard } = useBoardContext();
  const [showPopover, setShowPopover] = useState(false);
  const popoverRef = useRef(null);

  return (
    <div className="listContainer relative p-2 w-64 bg-gray-200 rounded-lg flex flex-col h-min">
      <div
        {...dragHandleProps}
        className="listHeader flex justify-between items-center mb-2 p-1"
      >
        <span className="text-sm font-bold">{list.title}</span>
        <button
          className="p-1 rounded-md hover:bg-gray-400 transition-colors"
          onClick={() => setShowPopover(true)}
        >
          <FiMoreHorizontal />
        </button>
        {showPopover && (
          <div
            ref={popoverRef}
            className="flex flex-col top-10 left-16 absolute z-50 w-48 h-32 text-sm mb-2 rounded-md shadow-lg border border-gray-300 bg-white"
          >
            <div className="flex justify-between p-3">
              <h2 className="font-semibold">List options</h2>
              <button
                onClick={() => setShowPopover(false)}
                className="rounded-full p-1 hover:bg-gray-300"
              >
                <FiX />
              </button>
            </div>
            <div className="flex flex-col items-start">
              <button
                onClick={editList}
                className="w-full h-8 hover:bg-gray-100 px-4"
              >
                Edit
              </button>
              <button
                onClick={() => deleteList(list.id)}
                className="w-full h-8 hover:bg-gray-100 px-4"
              >
                Delete
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="max-h-[calc(100vh-9rem)] overflow-y-scroll flex flex-col">
        <Droppable droppableId={list.id}>
          {(provided) => (
            <ul
              // pass necessary props to make the list droppable
              {...provided.droppableProps}
              // bind ref to DOM element
              ref={provided.innerRef}
              className="min-h-1"
            >
              {listCards.map((card, index) => (
                <Draggable key={card.id} draggableId={card.id} index={index}>
                  {(provided) => (
                    <Card
                      ref={provided.innerRef}
                      draggableProps={provided.draggableProps}
                      dragHandleProps={provided.dragHandleProps}
                      listId={list.id}
                      card={card}
                    />
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
        <AddNew
          type="card"
          multiAddMode={true}
          id={list.id}
          handleAddNew={addNewCard}
        />
      </div>
    </div>
  );
}
