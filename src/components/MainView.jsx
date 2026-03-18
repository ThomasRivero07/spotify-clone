import { usePlayer } from "../context/PlayerContext";
import SongCard from "./SongCard";
import { songs } from "../data/songs";

export default function MainView() {
  const { currentSong } = usePlayer();

  return (
    <div style={{
      flex: 1,
      overflowY: "auto",
      background: `linear-gradient(180deg, ${currentSong.color}88 0%, #121212 30%)`,
      transition: "background 1s ease",
      paddingBottom: "120px"
    }}>
      {/* Header */}
      <div style={{ padding: "32px 24px 24px", display: "flex", alignItems: "flex-end", gap: "24px" }}>
        <img
          src={currentSong.cover}
          alt={currentSong.album}
          style={{ width: "200px", height: "200px", borderRadius: "8px", objectFit: "cover", boxShadow: "0 20px 60px rgba(0,0,0,0.5)" }}
          onError={e => {
            e.target.style.background = currentSong.color;
            e.target.style.display = "flex";
          }}
        />
        <div>
          <div style={{ color: "#fff", fontSize: "11px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "8px" }}>Playlist</div>
          <h1 style={{ color: "#fff", fontSize: "clamp(28px, 4vw, 64px)", fontWeight: "900", letterSpacing: "-1px", lineHeight: 1, marginBottom: "16px" }}>
            16 Songs For The Number 16
          </h1>
          <p style={{ color: "#b3b3b3", fontSize: "14px" }}>
            Various Artists · {songs.length} songs
          </p>
        </div>
      </div>

      {/* Song Grid */}
      <div style={{ padding: "0 24px" }}>
        <h2 style={{ color: "#fff", fontSize: "20px", fontWeight: "700", marginBottom: "16px" }}>All Songs</h2>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
          gap: "16px"
        }}>
          {songs.map(song => (
            <SongCard key={song.id} song={song} />
          ))}
        </div>
      </div>
    </div>
  );
}