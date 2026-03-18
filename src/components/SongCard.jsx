import { usePlayer } from "../context/PlayerContext";
import { Play, Pause } from "lucide-react";

export default function SongCard({ song }) {
  const { currentSong, isPlaying, playSong } = usePlayer();
  const isActive = currentSong.id === song.id;

  return (
    <div
      onClick={() => playSong(song)}
      style={{
        background: isActive ? "#282828" : "#181818",
        borderRadius: "8px",
        padding: "16px",
        cursor: "pointer",
        transition: "background 0.2s",
        position: "relative",
        group: true
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background = "#282828";
        e.currentTarget.querySelector(".play-btn").style.opacity = "1";
        e.currentTarget.querySelector(".play-btn").style.transform = "translateY(0)";
      }}
      onMouseLeave={e => {
        if (!isActive) e.currentTarget.style.background = "#181818";
        if (!isActive) {
          e.currentTarget.querySelector(".play-btn").style.opacity = "0";
          e.currentTarget.querySelector(".play-btn").style.transform = "translateY(8px)";
        }
      }}
    >
      <div style={{ position: "relative", marginBottom: "16px" }}>
        <img
          src={song.cover}
          alt={song.album}
          style={{ width: "100%", aspectRatio: "1", borderRadius: "6px", objectFit: "cover" }}
          onError={e => {
            e.target.style.display = "none";
            e.target.nextSibling.style.display = "flex";
          }}
        />
        <div style={{
          display: "none", width: "100%", aspectRatio: "1", borderRadius: "6px",
          background: song.color, alignItems: "center", justifyContent: "center",
          fontSize: "32px", marginBottom: "0"
        }}>🎵</div>

        <button
          className="play-btn"
          style={{
            position: "absolute", bottom: "8px", right: "8px",
            width: "40px", height: "40px", borderRadius: "50%",
            background: "#1DB954", border: "none", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            opacity: isActive ? "1" : "0",
            transform: isActive ? "translateY(0)" : "translateY(8px)",
            transition: "all 0.2s",
            boxShadow: "0 8px 24px rgba(0,0,0,0.5)"
          }}
          onClick={e => { e.stopPropagation(); playSong(song); }}
        >
          {isActive && isPlaying
            ? <Pause size={18} fill="#000" color="#000" />
            : <Play size={18} fill="#000" color="#000" />
          }
        </button>
      </div>

      <div style={{ color: isActive ? "#1DB954" : "#fff", fontWeight: "700", fontSize: "14px", marginBottom: "4px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
        {song.title}
      </div>
      <div style={{ color: "#b3b3b3", fontSize: "12px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
        {song.artist}
      </div>
    </div>
  );
}