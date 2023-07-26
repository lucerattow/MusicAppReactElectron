import React, { useState } from 'react';
import { Form, Icon } from 'semantic-ui-react';
import { useFormik } from "formik";
import { initialValues, validationSchema } from "./RegisterForm.data";
import { Auth } from "../../../api";
import "./RegisterForm.scss";

const auth = new Auth();

export function RegisterForm({ openLogin, goBack }) {
  //estados
  const [showingPassword, setShowingPassword] = useState(false);

  //funciones
  const showPassword = () => setShowingPassword((prevState) => !prevState);

  //validaciones
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValues) => {
      await auth.register(formValues.email, formValues.password);
    }
  });

  //Renderizado
  return (
    <div className='register-form'>
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
          icon={
            <Icon
              name={showingPassword ? "eye" : "eye slash"}
              link
              onClick={showPassword}
            />
          }
          name="password"
          onChange={formik.handleChange}
          value={formik.values.password}
          error={formik.errors.password}
        />
        <Form.Input
          type="text"
          placeholder="Como deberíamos llamarte?"
          icon="user circle outline"

          name="username"
          onChange={formik.handleChange}
          value={formik.values.username}
          error={formik.errors.username}
        />

        <Form.Button type="submit" primary fluid loading={formik.isSubmitting}>
          Continuar
        </Form.Button>
      </Form>

      <div className='register-form__options'>
        <p onClick={goBack}>Volver</p>
        <p>Ya tienes MUSIC? <span onClick={openLogin}>Inisiar sesión</span></p>
      </div>
    </div>
  );
}