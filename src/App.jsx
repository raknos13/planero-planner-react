import TodoList from "./components/TodoList.jsx";

export default function App() {
  return (
    <>
      <h1 className="text-2xl font-bold text-center mb-4">
        Planero project manager
      </h1>
      <ul>
        <TodoList />
      </ul>
    </>
  );
}
