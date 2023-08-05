import React, { useState } from 'react';
import { Progress, Icon, Input } from "semantic-ui-react";
import ReactPlayer from "react-player";
import { usePlayer } from "../../hooks";
import "./Player.scss";

export function Player() {
  const [playedSeconds, setPlayedSeconds] = useState(0);
  const [totalSeconds, setTotalSeconds] = useState(0);
	const { song, volume, playing, setPlaying, pause, resume } = usePlayer();

  const playerClick = () => {
    setPlaying(!playing);
  };

  const onProgress = (data) => {
    setPlayedSeconds(data.playedSeconds);
    setTotalSeconds(data.loadedSeconds);
  };

  return (
    <div className='player'>
      <Icon name={playing ? "pause circle outline" : "play circle outline"} onClick={playerClick} />
      <Progress progress="value" value={playedSeconds} total={totalSeconds} size="tiny" />
      <ReactPlayer
        className="react-player"
        url={song?.fileUrl}
        playing={playing}
        volume={volume}
        height={0}
        width={0}
        onProgress={onProgress}
      />
    </div>
  );
}
