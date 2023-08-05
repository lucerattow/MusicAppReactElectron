import React, { useState, useEffect } from 'react';
import { Loader } from "semantic-ui-react";
import { useParams } from "react-router-dom";
import { Album as AlbumController, Song as SongController } from "../../api";
import { SongList } from '../../components/Songs/SongList';
import { AlbumInfo } from "../../components/Albums";
import "./Album.scss";

const albumController = new AlbumController();
const songController = new SongController();

export function Album() {
  const { id } = useParams();
  const [album, setAlbum] = useState(null);
  const [songs, setSongs] = useState(null);
  useEffect(() => {
    const getAlbum = async () => {
      const albumData = await albumController.getById(id);
      setAlbum(albumData);

      const songsData = await songController.getByAlbum(id);
      setSongs(songsData);
    };
    getAlbum();
  }, [id]);

  if (!album) {
    return (
      <Loader active inline="centered" size="large">
        Cargando
      </Loader>
    );
  } else {
    return (
      <div className='album-page'>
        <AlbumInfo album={album} />
        {songs !== null && (<SongList songs={songs} albumImage={album.image} />)}
      </div>
    );
  }
}
