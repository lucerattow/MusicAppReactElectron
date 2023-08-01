import React, { useState, useEffect } from "react";
import { Album } from "../../api";
import { ListAlbums } from "../../components/Albums";
import "./Albums.scss";

const albumController = new Album();

export function Albums() {
	const [albums, setAlbums] = useState([]);

	useEffect(() => {
		const useEffectAsync = async () => {
			const response = await albumController.getAll();
			setAlbums(response);
		};

		useEffectAsync();
	}, []);

	return (
		<div className="albums-page">
			<h1>Albumes</h1>
			<ListAlbums albums={albums} />
		</div>
	);
}
