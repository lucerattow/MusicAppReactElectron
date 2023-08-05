import React, { useState, createContext } from "react";
import { Album } from "../api";

export const PlayerContext = createContext({});

export function PlayerProvider({ children }) {
  const [song, setSong] = useState(null);
  const [image, setImage] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);

  const playSong = (song, image = null) => {
    setSong(song);
    image !== null && setImage(image);
    setPlaying(true);
    console.log(song.fileUrl);
  };

  const pause = () => setPlaying(false);

  const resume = () => setPlaying(true);

  const data = {
    //funciones
    playSong,
    pause,
    resume,
    //estados
    song,
    image,
    playing,
    volume,
    //setters de estado
    setVolume,
    setPlaying,
  };

  return (
    <PlayerContext.Provider value={data}>
      {children}
    </PlayerContext.Provider>
  );
}