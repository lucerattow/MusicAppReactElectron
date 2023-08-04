import React, { useState, useEffect } from 'react';
import _ from "lodash";
import { Artist as ArtistController, Album as AlbumController, Song as SongController } from "../../api";
import { bannerHome } from "../../assets";
import { Slider } from '../../components/Shared';
import "./Home.scss";

const artistController = new ArtistController();
const albumController = new AlbumController();
const songController = new SongController();

export function Home() {
  const [artists, setArtists] = useState(null);
  const [albums, setAlbums] = useState(null);
  const [songs, setSongs] = useState(null);

  //Obtengo los ultimos artistas
  useEffect(() => {
    const getArtists = async () => {
      const response = await artistController.getLastAdded();
      setArtists(response);
    };
    getArtists();
  }, []);

  //Obtengo los ultimos albumes
  useEffect(() => {
    const getAlbums = async () => {
      const response = await albumController.getLastAdded();
      setAlbums(_.sortBy(response, "created_at"));
    };
    getAlbums();
  }, []);

  //Obtengo las ultimas canciones
  useEffect(() => {
    const getSongs = async () => {
      const songsList = await songController.getLastAdded();
      for await (const song of songsList)
      {
        const album = await albumController.getById(song.album);
        song.image = album.image;
      }
      setSongs(songsList);
    };

    if (albums) {
      getSongs();
    }
  }, [albums]);

  return (
    <div className='home-page'>
      <div
        className='home-page__banner'
        style={{ backgroundImage: `url(${bannerHome})`}}
      />

      <div className='home-page__slider'>
        <h2>Últimos artistas</h2>
        {artists && <Slider data={artists} basePath="artists" />}
      </div>

      <div className='home-page__slider'>
        <h2>Últimos álbumes</h2>
        {albums && <Slider data={albums} basePath="albums" />}
      </div>

      <div className='home-page__slider'>
        <h2>Últimas canciones</h2>
        {songs && <Slider data={songs} isSong/>}
      </div>
    </div>
  );
}
