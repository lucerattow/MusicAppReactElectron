import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { Artist as ArtistController } from "../../api";
import { ArtistBanner } from "../../components/Artist";
import "./Artist.scss";

const artistController = new ArtistController();

export function Artist() {
  const { id } = useParams();
  const [artist, setArtist] = useState(null);

  useEffect(() => {
    const fetchArtist = async () => {
      const response = await artistController.getArtist(id);
      setArtist(response);
    };

    fetchArtist();
  }, []);

  if (!artist) return null;

  //render
  return (
    <div className='artist-page'>
      <ArtistBanner image={artist.image} name={artist.name} />

      <div className='artist-page__slider' >
        <h2>Albumes</h2>
        {/* TODO: Lista de albumes */}
      </div>

      <div className='artist-page__slider' >
        <h2>Canciones</h2>
        {/* TODO: Lista de canciones */}
      </div>
    </div>
  );
}
