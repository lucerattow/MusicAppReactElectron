import React, { useState, useCallback } from "react";
import { Image } from "semantic-ui-react";
import { useDropzone } from "react-dropzone";
import { User, Storage } from "../../api";
import { defaultUser } from "../../assets";
import "./AvatarUpdate.scss";

const userController = new User();
const storageController = new Storage();

export function AvatarUpdate() {
	//variables
	const { photoURL, uid } = userController.getMe();
	const [image, setImage] = useState(photoURL || defaultUser);

	//functions
	const onDrop = useCallback(async acceptedFile => {
		const file = acceptedFile[0];
		setImage(URL.createObjectURL(file));

		const response = await storageController.uploadFile(file, "avatar", uid);
		const url = await storageController.getUrlFile(response.metadata.fullPath);
		await userController.updateAvatar(url);
	});

	const { getRootProps, getInputProps } = useDropzone({ onDrop });

	//render
	return (
		<div className="avatar-update" {...getRootProps()}>
			<input {...getInputProps()} />
			<Image src={image} />
		</div>
	);
}
