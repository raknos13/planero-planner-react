import Main from "./components/Main";
import { BoardProvider, ThemeProvider, AuthProvider } from "./contexts";

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BoardProvider>
          <Main />
        </BoardProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
