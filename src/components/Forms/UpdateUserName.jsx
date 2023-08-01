import React from "react";
import { Form } from "semantic-ui-react";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "./UpdateUserName.data";
import { User } from "../../api";
import "./UpdateUserName.scss";

const userController = new User();

export function UpdateUserName({ onClose }) {
	const { displayName } = userController.getMe();
	//validations
	const formik = useFormik({
		initialValues: initialValues(displayName),
		validationSchema: validationSchema(),
		validateOnChange: false,
		onSubmit: async formValues => {
			await userController.updateDisplayName(formValues.displayName);
			onClose();
		},
	});

	//render
	return (
		<Form className="form-display-name" onSubmit={formik.handleSubmit}>
			<Form.Input
				name="displayName"
				placeholder="Nombre y apellido"
				icon="user circle outline"
				onChange={formik.handleChange}
				value={formik.values.displayName}
				error={formik.errors.displayName}
			/>
			<Form.Button type="submit" primary fluid loading={formik.isSubmitting}>
				Guardar
			</Form.Button>
		</Form>
	);
}
