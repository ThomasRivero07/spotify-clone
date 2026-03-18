import { usePlayer } from "../context/PlayerContext";
import Visualizer from "./Visualizer";
import {
  Play, Pause, SkipBack, SkipForward,
  Shuffle, Repeat, Volume2, VolumeX, Heart
} from "lucide-react";

export default function Player() {
  const {
    currentSong, isPlaying, progress, volume,
    shuffle, repeat, togglePlay, playNext, playPrev,
    seek, changeVolume, setShuffle, setRepeat
  } = usePlayer();

  return (
    <div style={{
      position: "fixed", bottom: 0, left: 0, right: 0,
      background: "#181818",
      borderTop: "1px solid #282828",
      padding: "12px 24px",
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr",
      alignItems: "center",
      gap: "16px",
      zIndex: 100
    }}>

      {/* Current Song */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <img
          src={currentSong.cover}
          alt={currentSong.album}
          style={{ width: "56px", height: "56px", borderRadius: "4px", objectFit: "cover" }}
          onError={e => {
            e.target.style.background = currentSong.color;
            e.target.src = "";
          }}
        />
        <div>
          <div style={{ color: "#fff", fontSize: "13px", fontWeight: "600" }}>{currentSong.title}</div>
          <div style={{ color: "#b3b3b3", fontSize: "11px" }}>{currentSong.artist}</div>
        </div>
        <button style={{ background: "transparent", border: "none", color: "#1DB954", cursor: "pointer", marginLeft: "8px" }}>
          <Heart size={16} />
        </button>
      </div>

      {/* Controls */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <button
            onClick={() => setShuffle(!shuffle)}
            style={{ background: "transparent", border: "none", color: shuffle ? "#1DB954" : "#b3b3b3", cursor: "pointer", transition: "color 0.2s" }}
          >
            <Shuffle size={18} />
          </button>

          <button
            onClick={playPrev}
            style={{ background: "transparent", border: "none", color: "#b3b3b3", cursor: "pointer", transition: "color 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.color = "#fff"}
            onMouseLeave={e => e.currentTarget.style.color = "#b3b3b3"}
          >
            <SkipBack size={22} fill="#b3b3b3" />
          </button>

          <button
            onClick={togglePlay}
            style={{
              width: "36px", height: "36px", borderRadius: "50%",
              background: "#fff", border: "none", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "transform 0.1s"
            }}
            onMouseEnter={e => e.currentTarget.style.transform = "scale(1.06)"}
            onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
          >
            {isPlaying
              ? <Pause size={18} fill="#000" color="#000" />
              : <Play size={18} fill="#000" color="#000" />
            }
          </button>

          <button
            onClick={playNext}
            style={{ background: "transparent", border: "none", color: "#b3b3b3", cursor: "pointer", transition: "color 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.color = "#fff"}
            onMouseLeave={e => e.currentTarget.style.color = "#b3b3b3"}
          >
            <SkipForward size={22} fill="#b3b3b3" />
          </button>

          <button
            onClick={() => setRepeat(!repeat)}
            style={{ background: "transparent", border: "none", color: repeat ? "#1DB954" : "#b3b3b3", cursor: "pointer", transition: "color 0.2s" }}
          >
            <Repeat size={18} />
          </button>
        </div>

        {/* Progress bar */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", width: "100%" }}>
          <span style={{ color: "#b3b3b3", fontSize: "11px", minWidth: "35px", textAlign: "right" }}>
            {currentSong.duration ? "0:00" : "0:00"}
          </span>
          <div style={{ flex: 1, position: "relative", height: "4px" }}>
            <div style={{ width: "100%", height: "4px", background: "#535353", borderRadius: "2px" }} />
            <div style={{ position: "absolute", top: 0, left: 0, width: `${progress}%`, height: "4px", background: "#1DB954", borderRadius: "2px", transition: "width 0.1s" }} />
            <input
              type="range" min="0" max="100" value={progress}
              onChange={e => seek(Number(e.target.value))}
              style={{ position: "absolute", top: "-6px", left: 0, width: "100%", opacity: 0, cursor: "pointer", height: "16px" }}
            />
          </div>
          <span style={{ color: "#b3b3b3", fontSize: "11px", minWidth: "35px" }}>
            {currentSong.duration}
          </span>
        </div>

        {/* Visualizer */}
        <div style={{ width: "100%", height: "40px" }}>
          <Visualizer />
        </div>
      </div>

      {/* Volume */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px", justifyContent: "flex-end" }}>
        <button
          onClick={() => changeVolume(volume > 0 ? 0 : 0.7)}
          style={{ background: "transparent", border: "none", color: "#b3b3b3", cursor: "pointer" }}
        >
          {volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>
        <div style={{ position: "relative", width: "100px", height: "4px" }}>
          <div style={{ width: "100%", height: "4px", background: "#535353", borderRadius: "2px" }} />
          <div style={{ position: "absolute", top: 0, left: 0, width: `${volume * 100}%`, height: "4px", background: "#1DB954", borderRadius: "2px" }} />
          <input
            type="range" min="0" max="1" step="0.01" value={volume}
            onChange={e => changeVolume(Number(e.target.value))}
            style={{ position: "absolute", top: "-6px", left: 0, width: "100%", opacity: 0, cursor: "pointer", height: "16px" }}
          />
        </div>
      </div>
    </div>
  );
}