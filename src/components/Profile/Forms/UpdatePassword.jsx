import React, { useState } from "react";
import { Form, Icon } from "semantic-ui-react";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "./UpdatePassword.data";
import { Auth, User } from "../../../api";
import "./UpdatePassword.scss";

const userController = new User();

export function UpdatePassword({ onClose }) {
	const [showingPassword, setShowingPassword] = useState(false);
	const [showingNewPassword, setShowingNewPassword] = useState(false);

	//functions
	const showPassword = () => setShowingPassword(prevState => !prevState);
	const showNewPassword = () => setShowingNewPassword(prevState => !prevState);

	//validations
	const formik = useFormik({
		initialValues: initialValues(),
		validationSchema: validationSchema(),
		validateOnChange: false,
		onSubmit: async formValues => {
			await userController.updatePassword(formValues.password, formValues.newPassword);
			onClose();
		},
	});

	return (
		<Form className="form-password" onSubmit={formik.handleSubmit}>
			<Form.Input
				type={showingPassword ? "text" : "password"}
				placeholder="Contraseña actual"
				icon={{
					name: showingPassword ? "eye" : "eye slash",
					link: true,
					onClick: showPassword,
				}}
				name="password"
				onChange={formik.handleChange}
				value={formik.values.password}
				error={formik.errors.password}
			/>
			<Form.Input
				type={showingNewPassword ? "text" : "password"}
				placeholder="Nueva contraseña"
				icon={{
					name: showingNewPassword ? "eye" : "eye slash",
					link: true,
					onClick: showNewPassword,
				}}
				name="newPassword"
				onChange={formik.handleChange}
				value={formik.values.newPassword}
				error={formik.errors.newPassword}
			/>
			<Form.Button type="submit" primary fluid loading={formik.isSubmitting}>
				Guardar
			</Form.Button>
		</Form>
	);
}
