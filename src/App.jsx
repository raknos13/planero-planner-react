import Main from "./components/Main";
import { BoardProvider, ThemeProvider, useAuth } from "./contexts";

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BoardProvider>
          <Main />;
        </BoardProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
