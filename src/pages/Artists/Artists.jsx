import React, { useState, useEffect } from 'react';
import { ListArtists } from "../../components/Artists";
import { Artist } from "../../api";
import "./Artists.scss";

const artistController = new Artist();

export function Artists() {
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    const fetchArtists = async () => {
      const response = await artistController.getAll();
      setArtists(response);
    };

    fetchArtists();
  }, []);

  return (
    <div className='artists-page'>
      <h1>Artistas</h1>
      <ListArtists artists={artists} />
    </div>
  );
}
