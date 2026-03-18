import { createContext, useContext, useState, useRef, useEffect } from "react";
import { songs } from "../data/songs";

const PlayerContext = createContext();

export function PlayerProvider({ children }) {
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [queue, setQueue] = useState(songs);
  const audioRef = useRef(new Audio(songs[0].src));

  useEffect(() => {
    const audio = audioRef.current;
    audio.volume = volume;

    const updateProgress = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    const handleEnded = () => {
      if (repeat) {
        audio.currentTime = 0;
        audio.play();
      } else {
        playNext();
      }
    };

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [currentSong, repeat, shuffle]);

  const playSong = (song) => {
    const audio = audioRef.current;
    if (currentSong.id === song.id) {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        audio.play();
        setIsPlaying(true);
      }
    } else {
      audio.src = song.src;
      audio.play();
      setCurrentSong(song);
      setIsPlaying(true);
      setProgress(0);
    }
  };

  const togglePlay = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const playNext = () => {
    const currentIndex = queue.findIndex(s => s.id === currentSong.id);
    let nextIndex;
    if (shuffle) {
      nextIndex = Math.floor(Math.random() * queue.length);
    } else {
      nextIndex = (currentIndex + 1) % queue.length;
    }
    const nextSong = queue[nextIndex];
    audioRef.current.src = nextSong.src;
    audioRef.current.play();
    setCurrentSong(nextSong);
    setIsPlaying(true);
    setProgress(0);
  };

  const playPrev = () => {
    const currentIndex = queue.findIndex(s => s.id === currentSong.id);
    const prevIndex = (currentIndex - 1 + queue.length) % queue.length;
    const prevSong = queue[prevIndex];
    audioRef.current.src = prevSong.src;
    audioRef.current.play();
    setCurrentSong(prevSong);
    setIsPlaying(true);
    setProgress(0);
  };

  const seek = (value) => {
    const audio = audioRef.current;
    if (audio.duration) {
      audio.currentTime = (value / 100) * audio.duration;
      setProgress(value);
    }
  };

  const changeVolume = (value) => {
    audioRef.current.volume = value;
    setVolume(value);
  };

  return (
    <PlayerContext.Provider value={{
      currentSong, isPlaying, progress, volume, shuffle, repeat, queue,
      playSong, togglePlay, playNext, playPrev, seek, changeVolume,
      setShuffle, setRepeat, audioRef
    }}>
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  return useContext(PlayerContext);
}