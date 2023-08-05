import React from "react";
import { Image, Input, Icon } from "semantic-ui-react";
import { Player } from "../Shared";
import { usePlayer } from "../../hooks";
import "./Footer.scss";

export function Footer() {
	const { song, image, volume, setVolume } = usePlayer();

	return (
		<div className="footer">
			<div className="footer__left">
				<Image src={image} />
				{song && (<span>{song.name}</span>)}
			</div>

			<div className="footer__center">
				<Player />
			</div>

			<div className="footer__right">
				<Input
					type="range"
					value={volume}
					min={0}
					max={1}
					step={0.01}
					label={<Icon name="volume up" />}
					onChange={(_, data) => setVolume(Number(data.value))} />
			</div>
		</div>
	);
}
