import React, { useState, useCallback } from 'react';
import { Form, Image } from "semantic-ui-react";
import { useDropzone } from "react-dropzone";
import { useFormik } from "formik";
import classNames from 'classnames';
import { v4 as uuidv4 } from "uuid";
import { noImage } from "../../assets";
import { Storage, Artist } from "../../api";
import { initialValues, validationSchema } from "./NewArtist.data";
import "./NewArtist.scss";

const storageController = new Storage();
const artistController = new Artist();

export function NewArtist({ onClose }) {
  const [image, setImage] = useState(null);

  //dropZone
  const onDrop = useCallback(async (acceptedFile) => {
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
    onSubmit: async (formValues) => {
      const { file, name } = formValues;
      const response = await storageController.uploadFile(file, "artist", uuidv4());
      const url = await storageController.getUrlFile(response.metadata.fullPath);
      await artistController.create(url, name);
      onClose();
    }
  });

  //render
  return (
    <Form className='form-new-song' onSubmit={formik.handleSubmit}>
      <div
        {...getRootProps()}
        className={classNames('form-new-song__banner', {
          error: formik.errors.file,
        })}
      >
        <input {...getInputProps()} />
        <Image
          className={classNames({ full: image })}
          src={image || noImage}
        />
      </div>
      <Form.Input
        name="name"
        type="text"
        placeholder="Nombre del artista"
        onChange={formik.handleChange}
        value={formik.values.name}
        error={formik.errors.name}
      />
      <Form.Button type="submit" primary fluid loading={formik.isSubmitting}>
        Crear
      </Form.Button>
    </Form >
  );
}
