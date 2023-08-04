import React, { useState, useEffect, useCallback } from 'react';
import { Form, Icon } from "semantic-ui-react";
import { useDropzone } from "react-dropzone";
import { useFormik } from "formik";
import { map } from "lodash";
import { v4 as uuidv4 } from "uuid";
import classNames from 'classnames';
import { Storage, Artist, Album, Song } from "../../api";
import { initialValues, validationSchema } from "./NewSong.data";
import { getFileNameWithoutExtension } from "../../logic";
import "./NewSong.scss";

const songController = new Song();
const albumController = new Album();
const artistController = new Artist();
const storageController = new Storage();

export function NewSong({ onClose }) {
	const [artistList, setArtistList] = useState([]);
  const [albumList, setAlbumList] = useState([]);
  const [songName, setSongName] = useState("");

	//validations
	const formik = useFormik({
		initialValues: initialValues(),
		validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async ({ name, artist, album, file }) => {
			const response = await storageController.uploadFile(file, songController.collectionName, uuidv4());
			const fileUrl = await storageController.getUrlFile(response.metadata.fullPath);
      await songController.create(name, artist, album, fileUrl);
			onClose();
		},
	});

	//dropZone
	const onDrop = useCallback(async acceptedFile => {
		const file = acceptedFile[0];
    formik.setFieldValue("file", file);
    formik.setFieldValue("name", getFileNameWithoutExtension(file.name));
    setSongName(file.name);
	});

	const { getRootProps, getInputProps } = useDropzone({ onDrop });

  //Obtengo datos de la base de datos
	useEffect(() => {
		const getArtist = async () => {
			const response = await artistController.getAll();
			const artists = map(response, item => ({
				key: item.id,
				value: item.id,
				text: item.name,
			}));
			setArtistList(artists);
		};

		getArtist();
  }, []);

	useEffect(() => {
    const getAlbums = async () => {
      const response = await albumController.getByArtist(formik.values.artist);
      const albums = map(response, item => ({
        key: item.id,
        value: item.id,
        text: item.name,
      }));
      setAlbumList(albums);
    };

		getAlbums();
  }, [formik.values.artist]);

  const artistChange = (_, data) => {
    formik.setFieldValue("artist", data.value);
  };

  const albumChange = (_, data) => {
    formik.setFieldValue("album", data.value);
  };

	//render
  return (
    <Form className='new-song-form' onSubmit={formik.handleSubmit}>
      <Form.Input
        name="name"
        placeholder="Nombre de la canción"
        onChange={formik.handleChange}
        value={formik.values.name}
        error={formik.errors.name}
      />
      <Form.Dropdown
        placeholder="Asigna la canción a un artista"
        fluid
        search
        selection
        options={artistList}
        values={formik.values.artist}
        error={formik.errors.artist}
        onChange={artistChange}
      />
      {albumList.length !== 0 &&
        <Form.Dropdown
          placeholder="Asigna la canción a un álbum"
          fluid
          search
          selection
          options={albumList}
          values={formik.values.album}
          error={formik.errors.album}
          onChange={albumChange}
        />
      }

      <div
        {...getRootProps()}
        className={classNames("new-song-form__file", {
          error: formik.errors.file,
        })}
      >
        <input {...getInputProps()} />
        <Icon name="cloud upload"/>
        <div>
          <p>Arrastra tu canción o haz click <span>aquí</span></p>
          {songName && <p className='song-name'>{songName}</p>}
        </div>
      </div>

      <Form.Button type="submit" primary fluid  loading={formik.isSubmitting}>
        Subir canción
      </Form.Button>
    </Form>
  );
}
