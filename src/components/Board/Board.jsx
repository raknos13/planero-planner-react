import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { EmptyBoard, List, AddNew } from "./";
import { useAuth, useBoardContext, useTheme } from "../../contexts/";
import { FiStar } from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";
import { useEffect } from "react";

export function Board() {
  const { boards, lists, cards, activeBoardId, addNewList, onDragEnd } =
    useBoardContext();
  const { currentUser } = useAuth();

  const { theme } = useTheme();

  useEffect(() => {
    toast.dismiss();
    toast.info(`Welcome ${currentUser.displayName}! 😊`, { autoClose: 5000 });
    setTimeout(() => {
      toast.info("Take your time and explore around.. ✨");
    }, 5000);
  }, [currentUser]);

  const activeBoard = boards[activeBoardId];

  if (!activeBoard) {
    return <EmptyBoard />;
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="boardContainer flex w-full flex-col overflow-y-hidden">
        <div
          className={`boardHeader flex h-10 items-center justify-start gap-4 py-6 pl-6 text-xl font-bold text-white 
                ${theme === "dark" ? "bg-black/60" : "bg-black/40"}`}
        >
          {activeBoard.title}
          <button className="hover:text-yellow-300">
            <FiStar />
          </button>
        </div>
        <div className={`flex-grow overflow-x-hidden overflow-y-hidden`}>
          <ToastContainer theme={theme} />
          <Droppable droppableId="board" type="list" direction="horizontal">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={`flex h-full w-full flex-nowrap overflow-x-scroll p-4 text-text-primary`}
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
                          className="mr-3 h-min w-64 snap-start"
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
                <div className="h-min w-64 flex-shrink-0 rounded-lg bg-primary p-2">
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
