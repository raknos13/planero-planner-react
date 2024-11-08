import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { EmptyBoard, List, AddNew } from "./";
import { useBoardContext, useTheme } from "../../contexts/";

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
            className={`w-full h-svh`}
            style={{
              background: activeBoard.color,
            }}
          >
            <div
              className={`boardContainer flex w-full h-full p-4 overflow-x-auto overflow-y-hidden bg-bg-primary text-text-primary`}
              style={{
                // Dim the board background color for light and dark modes
                background:
                  theme === "dark" ? "rgba(0,0,0, 0.4)" : "rgba(0, 0, 0, 0.2)",
              }}
            >
              <div className="listContainer flex h-full">
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
                <div className="min-w-64 bg-bg-primary h-min rounded-lg p-2">
                  <AddNew
                    type="list"
                    multiAddMode={false}
                    handleAddNew={addNewList}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
