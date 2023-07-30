import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu } from "semantic-ui-react";
import { BasicModal } from "../Shared";
import { NewAlbum, NewArtist, NewSong } from "../Forms";
import "./LeftMenu.scss";

export function LeftMenu() {
	//variables
	const [showModal, setShowModal] = useState(false);
	const [titleModal, setTitleModal] = useState("");
	const [contentModal, setContentModal] = useState(null);
	const { pathname } = useLocation();
	const routeHome = "/";
	const routeArtists = "/Artists";
	const routeAlbums = "/Albums";

	//funciones
	const isCurrentPage = route => {
		return route === pathname;
	};
	const addSong = () => {
		setTitleModal("Nueva Canción");
		setContentModal(<NewSong onClose={onCloseModal} />);
		setShowModal(true);
	};
	const addAlbum = () => {
		setTitleModal("Nuevo Álbum");
		setContentModal(<NewAlbum onClose={onCloseModal} />);
		setShowModal(true);
	};
	const addArtist = () => {
		setTitleModal("Nuevo Artista");
		setContentModal(<NewArtist onClose={onCloseModal} />);
		setShowModal(true);
	};
	const onCloseModal = () => {
		setShowModal(false);
		setTitleModal("");
		setContentModal(null);
	};

	//renderizacion
	return (
		<>
			<div className="left-menu">
				<Menu secondary vertical fluid>
					<Menu.Item as={Link} to={routeHome} name="Inicio" icon="home" active={isCurrentPage(routeHome)} />
					<Menu.Item as={Link} to={routeArtists} name="Artistas" icon="users" active={isCurrentPage(routeArtists)} />
					<Menu.Item as={Link} to={routeAlbums} name="Álbumes" icon="window maximize outline" active={isCurrentPage(routeAlbums)} />
				</Menu>

				<Menu secondary vertical fluid>
					<Menu.Item name="Nueva canción" icon="plus" link onClick={addSong} />
					<Menu.Item name="Nuevo álbum" icon="plus" link onClick={addAlbum} />
					<Menu.Item name="Nuevo artista" icon="plus" link onClick={addArtist} />
				</Menu>
			</div>
			<BasicModal show={showModal} onClose={onCloseModal} title={titleModal}>
				{contentModal}
			</BasicModal>
		</>
	);
}
