import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import List from "./List";
import AddNew from "./AddNew";
import { useBoardContext } from "./BoardContext";

export default function Board({ boardData }) {
  const { boards, lists, cards, activeBoardId, addNewList, onDragEnd } =
    useBoardContext();

  const activeBoard = boards[activeBoardId];

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="board" type="list" direction="horizontal">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            // className="flex h-100 justify-start overflow-x-auto whitespace-nowrap scroll-smooth snap-x snap-mandatory  mx-4 my-4"
            className="boardContainer flex flex-grow w-full h-full p-4 overflow-x-scroll"
          >
            <div>
              <div className="listContainer flex gap-3 h-min">
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
                <div className="min-w-[250px] bg-gray-200 h-min rounded-xl p-2 mx-2 mr-4">
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
