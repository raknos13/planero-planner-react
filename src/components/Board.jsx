import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import List from "./List";
import AddNew from "./AddNew";
import { useBoardContext } from "./BoardContext";

export default function Board() {
  const { boards, lists, cards, activeBoardId, addNewList, onDragEnd } =
    useBoardContext();

  const activeBoard = boards[activeBoardId];

  if (!activeBoard) {
    return (
      <div className="flex flex-col justify-center items-center gap-4 w-full">
        <div>No boards present. Click to add new board</div>
        <button
          // className="p-3 bg-green-400 hover:bg-green-500 rounded-lg"
          className="cursor-pointer transition-all bg-blue-500 text-white px-6 py-2 rounded-lg
border-blue-600 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
        >
          Add New Board
        </button>
      </div>
    );
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="board" type="list" direction="horizontal">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="boardContainer flex p-4 overflow-x-scroll"
          >
            <div className="listContainer flex">
              {activeBoard.listIds.map((listId, index) => {
                const list = lists[listId];
                const listCards = list.cardIds.map((cardId) => cards[cardId]);
                return (
                  <Draggable key={list.id} draggableId={list.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="h-min mr-3"
                      >
                        <List
                          list={list}
                          listCards={listCards}
                          dragHandleProps={provided.dragHandleProps}
                        />
                      </div>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
              <div className="min-w-64 bg-gray-200 h-min rounded-lg p-2">
                <AddNew
                  type="list"
                  multiAddMode={false}
                  handleAddNew={addNewList}
                />
              </div>
            </div>
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
