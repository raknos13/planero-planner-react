import Main from "./components/Main";
import BoardProvider from "./components/BoardContext";

export default function App() {
  return (
    <BoardProvider>
      <Main />
    </BoardProvider>
  );
}
