import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { EmptyBoard, List, AddNew, useBoardContext } from "./";

export function Board() {
  const { boards, lists, cards, activeBoardId, addNewList, onDragEnd } =
    useBoardContext();

  const activeBoard = boards[activeBoardId];

  if (!activeBoard) {
    return <EmptyBoard />;
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="board" type="list" direction="horizontal">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={`boardContainer flex w-full p-4 overflow-x-scroll bg-bg-primary text-text-primary`}
            style={
              {
                // background: `linear-gradient(135deg, ${activeBoard.color} , rgba(255, 255, 39, 0.5)`,
                // background: activeBoard.color,
                // backdropFilter: "blur(12px)",
              }
            }
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
              <div className="min-w-64 bg-bg-secondary h-min rounded-lg p-2">
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
