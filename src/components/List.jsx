import { Draggable, Droppable } from "@hello-pangea/dnd";
import { FiMoreHorizontal } from "react-icons/fi";
import Card from "./Card";
import AddNew from "./AddNew";
import { useBoardContext } from "./BoardContext";

export default function List({ list, listCards, dragHandleProps }) {
  const { deleteList, addNewCard } = useBoardContext();

  return (
    <div className="listContainer p-2 w-64 bg-gray-200 rounded-lg flex flex-col h-min">
      <div
        {...dragHandleProps}
        className="listHeader flex justify-between items-center mb-2 p-1"
      >
        <span className="text-sm font-bold">{list.title}</span>
        <button
          className="p-1 rounded-md hover:bg-gray-400 transition-colors"
          onClick={() => deleteList(list.id)}
        >
          <FiMoreHorizontal />
        </button>
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
