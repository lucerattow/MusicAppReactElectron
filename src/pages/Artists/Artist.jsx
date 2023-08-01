import React, { useState, useEffect } from 'react';
import { Loader } from "semantic-ui-react";
import { useParams } from "react-router-dom";
import { Artist as ArtistController, Album as AlbumController } from "../../api";
import { ArtistBanner } from "../../components/Artists";
import { Slider } from "../../components/Shared";
import "./Artist.scss";

const artistController = new ArtistController();
const albumsController = new AlbumController();

export function Artist() {
  const { id } = useParams();
  const [artist, setArtist] = useState(null);
  const [albums, setAlbums] = useState(null);

  useEffect(() => {
    const getArtist = async () => {
      const response = await artistController.getById(id);
      setArtist(response);
    };
    getArtist();
  }, []);

  useEffect(() => {
    const getAlbums = async () => {
      const response = await albumsController.getByArtist(id);
      setAlbums(response);
    };
    getAlbums();
  }, []);

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
          {/* TODO: Lista de canciones */}
        </div>
      </div>
    );
  }
}
