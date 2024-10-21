import TodoList from "./TodoList";

export default function Board() {
  return (
    <div className="flex justify-start w-auto h-screen mx-3 my-3">
      <TodoList title="Todo" />
      <TodoList title="Todo" />
      <TodoList title="Todo" />
    </div>
  );
}
