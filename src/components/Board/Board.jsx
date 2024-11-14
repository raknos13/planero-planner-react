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
      <Droppable droppableId="board" type="list" direction="horizontal">
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={`flex-grow overflow-x-hidden overflow-y-hidden`}
            style={{
              // Dim the board background color for light and dark modes
              background:
                theme === "dark" ? "rgba(0,0,0, 0.5)" : "rgba(0, 0, 0, 0.2)",
            }}
          >
            <div className="h-10 flex gap-4 pl-6 bg-black/20 text-white font-bold text-xl py-6 justify-start items-center">
              {activeBoard.title}
              <button className="hover:text-yellow-300">
                <FiStar />
              </button>
            </div>
            <div
              className={`boardContainer snap-x snap-always snap-mandatory scroll-pl-4 flex flex-nowrap p-4 h-full w-full overflow-x-scroll overflow-y-hidden text-text-primary`}
            >
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
              <div className="flex-shrink-0 w-64 bg-bg-primary h-min rounded-lg p-2">
                <AddNew
                  type="list"
                  multiAddMode={true}
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
