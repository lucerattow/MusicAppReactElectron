import React from 'react'
import { Link, useLocation } from "react-router-dom"
import { Menu } from 'semantic-ui-react'
import "./LeftMenu.scss"

export function LeftMenu() {
  const { pathname } = useLocation()

  //variables
  const routeHome = "/"
  const routeArtists = "/Artists"
  const routeAlbums = "/Albums"

  //funciones
  const isCurrentPage = (route) => {
    return route === pathname
  }

  const addSong = () => {
    console.log("subir cancion")
  }

  const addAlbum = () => {
    console.log("crear album")
  }

  const addArtist = () => {
    console.log("crear artista")
  }

  //renderizacion
  return (
    <div className='left-menu'>
      <Menu secondary vertical fluid>
        <Menu.Item
          as={Link}
          to={routeHome}
          name="Inicio"
          icon="home"
          active={isCurrentPage(routeHome)}
        />
        <Menu.Item
          as={Link}
          to={routeArtists}
          name="Artistas"
          icon="users"
          active={isCurrentPage(routeArtists)}
        />
        <Menu.Item
          as={Link}
          to={routeAlbums}
          name="Álbumes"
          icon="window maximize outline"
          active={isCurrentPage(routeAlbums)}
        />
      </Menu>

      <Menu secondary vertical fluid>
        <Menu.Item
          name="Nueva canción"
          icon="plus"
          link
          onClick={addSong}
        />
        <Menu.Item
          name="Nuevo álbum"
          icon="plus"
          link
          onClick={addAlbum}
        />
        <Menu.Item
          name="Nuevo artista"
          icon="plus"
          link
          onClick={addArtist}
        />
      </Menu>
    </div>
  )
}