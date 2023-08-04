import React, { useState, useEffect, useCallback } from "react";
import { Form, Image } from "semantic-ui-react";
import { useDropzone } from "react-dropzone";
import { useFormik } from "formik";
import classNames from "classnames";
import { v4 as uuidv4 } from "uuid";
import { map } from "lodash";
import { noImage } from "../../assets";
import { Storage, Artist, Album } from "../../api";
import { initialValues, validationSchema } from "./NewAlbum.data";
import "./NewAlbum.scss";

const albumController = new Album();
const artistController = new Artist();
const storageController = new Storage();

export function NewAlbum({ onClose }) {
	//Estados
	const [image, setImage] = useState(null);
	const [artistList, setArtistList] = useState([]);

	useEffect(() => {
		const getArtist = async () => {
			const response = await artistController.getAll();
			const newData = map(response, artist => ({
				key: artist.id,
				value: artist.id,
				text: artist.name,
			}));
			setArtistList(newData);
		};

		getArtist();
	}, []);

	//dropZone
	const onDrop = useCallback(async acceptedFile => {
		const file = acceptedFile[0];
		setImage(URL.createObjectURL(file));
		formik.setFieldValue("file", file);
	});

	const { getRootProps, getInputProps } = useDropzone({ onDrop });

	//validations
	const formik = useFormik({
		initialValues: initialValues(),
		validationSchema: validationSchema(),
		validateOnChange: false,
		onSubmit: async ({ name, file, artist }) => {
			const response = await storageController.uploadFile(file, albumController.collectionName, uuidv4());
			const imageUrl = await storageController.getUrlFile(response.metadata.fullPath);
			await albumController.create(name, imageUrl, artist);
			onClose();
		},
	});

	//render
	return (
		<Form className="form-new-album" onSubmit={formik.handleSubmit}>
			<div className="form-new-album__content">
				<div
					{...getRootProps()}
					className={classNames("form-new-album__content-image", {
						error: formik.errors.file,
					})}
				>
					<input {...getInputProps()} />
					<Image className={classNames({ full: image })} src={image || noImage} />
				</div>

				<div className="form-new-album__content-input">
					<Form.Input
						name="name"
						type="text"
						placeholder="Nombre del àlbum"
						onChange={formik.handleChange}
						value={formik.values.name}
						error={formik.errors.name}
					/>
					<Form.Dropdown
						placeholder="El álbum pertenece a..."
						fluid
						search
						selection
						options={artistList}
						values={formik.values.artist}
						error={formik.errors.artist}
						onChange={(_, data) => formik.setFieldValue("artist", data.value)}
					/>
				</div>
			</div>

			<Form.Button type="submit" primary fluid loading={formik.isSubmitting}>
				Crear
			</Form.Button>
		</Form>
	);
}
