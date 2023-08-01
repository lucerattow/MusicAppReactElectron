import React, { useState, useEffect } from 'react';
import { Loader } from "semantic-ui-react";
import { useParams } from "react-router-dom";
import { Album as AlbumController } from "../../api";
import { AlbumInfo } from "../../components/Albums";
import "./Album.scss";

const albumController = new AlbumController();

export function Album() {
  const { id } = useParams();
  const [album, setAlbum] = useState(null);

  useEffect(() => {
    const getAlbum = async () => {
      const response = await albumController.getById(id);
      setAlbum(response);
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
      </div>
    );
  }
}
