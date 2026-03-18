import { useEffect, useRef } from "react";
import { usePlayer } from "../context/PlayerContext";

export default function Visualizer() {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const { isPlaying, currentSong } = usePlayer();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let bars = Array.from({ length: 40 }, () => ({ height: Math.random() * 20 + 5, target: Math.random() * 20 + 5 }));

    const animate = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const barWidth = canvas.width / bars.length - 2;

      bars.forEach((bar, i) => {
        if (isPlaying) {
          bar.target = Math.random() * (canvas.height * 0.8) + 5;
        } else {
          bar.target = 5;
        }
        bar.height += (bar.target - bar.height) * 0.15;

        const x = i * (barWidth + 2);
        const y = canvas.height - bar.height;

        const gradient = ctx.createLinearGradient(0, y, 0, canvas.height);
        gradient.addColorStop(0, currentSong.color || "#1DB954");
        gradient.addColorStop(1, "#1DB954");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.roundRect(x, y, barWidth, bar.height, 2);
        ctx.fill();
      });

      animRef.current = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animRef.current);
  }, [isPlaying, currentSong]);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: "100%", height: "40px", display: "block" }}
    />
  );
}