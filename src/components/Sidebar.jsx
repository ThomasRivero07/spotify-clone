import { usePlayer } from "../context/PlayerContext";
import { playlists } from "../data/songs";
import { Home, Search, Library, Plus, Heart } from "lucide-react";

export default function Sidebar() {
  const { currentSong, playSong, queue } = usePlayer();

  return (
    <div style={{
      width: "240px",
      minWidth: "240px",
      background: "#000",
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      padding: "24px 12px",
      gap: "8px"
    }}>
      {/* Logo */}
      <div style={{ padding: "0 12px 20px", display: "flex", alignItems: "center", gap: "10px" }}>
        <svg width="32" height="32" viewBox="0 0 24 24" fill="#1DB954">
          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
        </svg>
        <span style={{ color: "#fff", fontWeight: "800", fontSize: "18px", letterSpacing: "-0.5px" }}>Spotify</span>
      </div>

      {/* Nav */}
      <nav style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        {[
          { icon: <Home size={22} />, label: "Home" },
          { icon: <Search size={22} />, label: "Search" },
          { icon: <Library size={22} />, label: "Your Library" },
        ].map(item => (
          <button key={item.label} style={{
            display: "flex", alignItems: "center", gap: "14px",
            background: "transparent", border: "none",
            color: "#b3b3b3", padding: "10px 12px", borderRadius: "6px",
            cursor: "pointer", fontSize: "14px", fontWeight: "600",
            transition: "color 0.2s"
          }}
            onMouseEnter={e => e.currentTarget.style.color = "#fff"}
            onMouseLeave={e => e.currentTarget.style.color = "#b3b3b3"}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </nav>

      <div style={{ width: "100%", height: "1px", background: "#282828", margin: "8px 0" }} />

      {/* Playlists */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 12px 8px" }}>
        <span style={{ color: "#b3b3b3", fontSize: "12px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "1px" }}>Playlists</span>
        <button style={{ background: "transparent", border: "none", color: "#b3b3b3", cursor: "pointer" }}>
          <Plus size={18} />
        </button>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "2px", overflowY: "auto", flex: 1 }}>
        <button style={{
          display: "flex", alignItems: "center", gap: "12px",
          background: "transparent", border: "none",
          color: "#b3b3b3", padding: "8px 12px", borderRadius: "6px",
          cursor: "pointer", fontSize: "13px", textAlign: "left"
        }}>
          <div style={{ width: "36px", height: "36px", background: "linear-gradient(135deg, #450af5, #c4efd9)", borderRadius: "4px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Heart size={16} fill="#fff" color="#fff" />
          </div>
          <div>
            <div style={{ color: "#fff", fontWeight: "600" }}>Liked Songs</div>
            <div style={{ fontSize: "11px", color: "#b3b3b3" }}>{queue.length} songs</div>
          </div>
        </button>

        {playlists.slice(1).map(pl => (
          <button key={pl.id} style={{
            display: "flex", alignItems: "center", gap: "12px",
            background: "transparent", border: "none",
            color: "#b3b3b3", padding: "8px 12px", borderRadius: "6px",
            cursor: "pointer", fontSize: "13px", textAlign: "left",
            transition: "background 0.2s"
          }}
            onMouseEnter={e => e.currentTarget.style.background = "#1a1a1a"}
            onMouseLeave={e => e.currentTarget.style.background = "transparent"}
          >
            <div style={{ width: "36px", height: "36px", background: "#282828", borderRadius: "4px" }} />
            <div>
              <div style={{ color: "#fff", fontWeight: "500" }}>{pl.name}</div>
              <div style={{ fontSize: "11px" }}>{pl.count} songs</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}