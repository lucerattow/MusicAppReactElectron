import React, { useState } from "react";
import { Form, Icon } from "semantic-ui-react";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "./RegisterForm.data";
import { Auth, User } from "../../api";
import "./RegisterForm.scss";

const authController = new Auth();
const userController = new User();

export function RegisterForm({ openLogin, goBack }) {
	//variables
	const [showingPassword, setShowingPassword] = useState(false);

	//functions
	const showPassword = () => setShowingPassword(prevState => !prevState);

	//validations
	const formik = useFormik({
		initialValues: initialValues(),
		validationSchema: validationSchema(),
		validateOnChange: false,
		onSubmit: async formValues => {
			await authController.register(formValues.email, formValues.password);
			await userController.updateDisplayName(formValues.displayName);
		},
	});

	//render
	return (
		<div className="register-form">
			<h1>Empieza a escuchar con una cuenta de MUSIC gratis!</h1>
			<Form onSubmit={formik.handleSubmit}>
				<Form.Input
					type="text"
					placeholder="Correo electrónico"
					icon="mail outline"
					name="email"
					onChange={formik.handleChange}
					value={formik.values.email}
					error={formik.errors.email}
				/>
				<Form.Input
					type={showingPassword ? "text" : "password"}
					placeholder="Contraseña"
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
					type="text"
					placeholder="Nombre de usuario"
					icon="user circle outline"
					name="displayName"
					onChange={formik.handleChange}
					value={formik.values.displayName}
					error={formik.errors.displayName}
				/>

				<Form.Button type="submit" primary fluid loading={formik.isSubmitting}>
					Continuar
				</Form.Button>
			</Form>

			<div className="register-form__options">
				<p onClick={goBack}>Volver</p>
				<p>
					Ya tienes MUSIC? <span onClick={openLogin}>Inisiar sesión</span>
				</p>
			</div>
		</div>
	);
}
