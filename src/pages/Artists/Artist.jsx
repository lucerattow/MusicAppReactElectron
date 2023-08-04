import React, { useState, useEffect } from 'react';
import _ from "lodash";
import { Loader } from "semantic-ui-react";
import { useParams } from "react-router-dom";
import { Artist as ArtistController, Album as AlbumController, Song as SongController } from "../../api";
import { ArtistBanner } from "../../components/Artists";
import { Slider } from "../../components/Shared";
import "./Artist.scss";

const artistController = new ArtistController();
const albumController = new AlbumController();
const songController = new SongController();

export function Artist() {
  const { id } = useParams();
  const [artist, setArtist] = useState(null);
  const [albums, setAlbums] = useState(null);
  const [songs, setSongs] = useState(null);

  //Obtengo los datos del artista
  useEffect(() => {
    const getArtist = async () => {
      const response = await artistController.getById(id);
      setArtist(response);
    };
    getArtist();
  }, []);

  //Obtengo los datos de los albumes
  useEffect(() => {
    const getAlbums = async () => {
      const response = await albumController.getByArtist(id);
      setAlbums(response);
    };
    getAlbums();
  }, []);

  //Obtengo las canciones
  useEffect(() => {
    const getSongs = async () => {
      let data = [];
      for await (const item of albums) {
        const response = await songController.getByAlbum(item.id);
        const dataTemp = _.map(response, (song) => ({
          ...song,
          image: item.image,
        }));
        data.push(...dataTemp);
      }
      setSongs(data);
    };

    if (albums) {
      getSongs();
    }
  }, [albums]);

  //render
  if (!artist) {
    return (
      <Loader active inline="centered" size="large">
        Cargando
      </Loader>
    );
  } else {
    return (
      <div className='artist-page'>
        <ArtistBanner image={artist.image} name={artist.name} />

        <div className='artist-page__slider' >
          <h2>Albumes</h2>
          <Slider data={albums} basePath="albums" />
        </div>

        <div className='artist-page__slider' >
          <h2>Canciones</h2>
          <Slider data={songs} basePath="" isSong />
        </div>
      </div>
    );
  }
}
