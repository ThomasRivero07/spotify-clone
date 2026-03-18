import { PlayerProvider } from "./context/PlayerContext";
import Sidebar from "./components/Sidebar";
import MainView from "./components/MainView";
import Player from "./components/Player";

export default function App() {
  return (
    <PlayerProvider>
      <div style={{
        display: "flex",
        height: "100vh",
        background: "#121212",
        overflow: "hidden",
        fontFamily: "'Circular', 'Helvetica Neue', Helvetica, Arial, sans-serif"
      }}>
        <Sidebar />
        <MainView />
      </div>
      <Player />
    </PlayerProvider>
  );
}