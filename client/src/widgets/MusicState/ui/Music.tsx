import { useState, type JSX } from "react";
import useSound from "use-sound";
import mySound from "@/assets/mytrack.mp3";
import s from "../style/style.module.css";

export function Music(): JSX.Element {
  const [volume, setVolume] = useState(0.5);
  const [isPlaying, setIsPlaying] = useState(false);

  const [play, { pause }] = useSound(mySound, {
    volume,
    onplay: () => setIsPlaying(true),
    onpause: () => setIsPlaying(false),
    onend: () => setIsPlaying(false),
  });

  const togglePlay = (): void => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <button onClick={togglePlay}>{isPlaying ? "Pause" : "Play"}</button>
        <input
          style={{ marginTop: "42px", marginLeft: "10px" }}
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
          className={s.volumeSlider}
        />
      </div>
    </>
  );
}
