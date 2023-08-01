import React, { useState, useEffect } from 'react';
import { Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { Artist as ArtistController } from "../../api";
import "./AlbumInfo.scss";

const artistController = new ArtistController();

export function AlbumInfo({ album, album: { name, image, artist }}) {
  const [artistData, setArtistData] = useState(null);

  useEffect(() => {
    const getAlbum = async () => {
      const response = await artistController.getById(artist);
      setArtistData(response);
    };
    getAlbum();
  }, [album]);

  return (
    <div className='album-info'>
      <Image src={image} alt={name} />
      <div>
        <h1>{name}</h1>
        {artistData && <p>De: <Link to={`/Artists/${artist}`}>{artistData.name}</Link></p>}
      </div>
    </div>
  );
}
