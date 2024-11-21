import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { EmptyBoard, List, AddNew } from "./";
import { useBoardContext, useTheme } from "../../contexts/";
import { FiStar } from "react-icons/fi";

export function Board() {
  const { boards, lists, cards, activeBoardId, addNewList, onDragEnd } =
    useBoardContext();

  const { theme } = useTheme();

  const activeBoard = boards[activeBoardId];

  if (!activeBoard) {
    return <EmptyBoard />;
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="boardContainer flex flex-col w-full overflow-y-hidden">
        <div
          className={`boardHeader h-10 flex gap-4 pl-6 text-white font-bold text-xl py-6 justify-start items-center 
                ${theme === "dark" ? "bg-black/60" : "bg-black/40"}`}
        >
          {activeBoard.title}
          <button className="hover:text-yellow-300">
            <FiStar />
          </button>
        </div>
        <div className={`flex-grow overflow-x-hidden overflow-y-hidden`}>
          <Droppable droppableId="board" type="list" direction="horizontal">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={`flex flex-nowrap p-4 h-full w-full overflow-x-scroll text-text-primary`}
                style={{
                  // Dim the board background color for light and dark modes
                  background:
                    theme === "dark"
                      ? "rgba(0,0,0, 0.5)"
                      : "rgba(0, 0, 0, 0.2)",
                }}
              >
                {activeBoard.listIds.map((listId, index) => {
                  const list = lists[listId];
                  const listCards = list.cardIds.map((cardId) => cards[cardId]);
                  return (
                    <Draggable
                      key={list.id}
                      draggableId={list.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          className="snap-start h-min mr-3 w-64"
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
                <div className="flex-shrink-0 w-64 bg-primary h-min rounded-lg p-2">
                  <AddNew
                    type="list"
                    multiAddMode={true}
                    handleAddNew={addNewList}
                  />
                </div>
              </div>
            )}
          </Droppable>
        </div>
      </div>
    </DragDropContext>
  );
}
