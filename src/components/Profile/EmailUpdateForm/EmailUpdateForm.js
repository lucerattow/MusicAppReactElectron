import React, { useState } from 'react';
import { Form } from "semantic-ui-react";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "./EmailUpdateForm.data";
import { User } from "../../../api";
import "./styles.scss";

const userController = new User();

export function EmailUpdateForm({ onClose }) {
  //variables
  const [showingPassword, setShowingPassword] = useState(false);
  const { email } = userController.getMe();

  //functions
  const showPassword = () => setShowingPassword((prevState) => !prevState);

  //validations
  const formik = useFormik({
    initialValues: initialValues(email),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValues) => {
      await userController.updateEmail(formValues.email, formValues.password);
      onClose();
    }
  });

  //render
  return (
    <Form className='form-email' onSubmit={formik.handleSubmit}>
      <Form.Input
        name="email"
        placeholder="Nuevo correo electrónico"
        icon="mail outline"
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
          onClick: showPassword
        }}
        name="password"
        onChange={formik.handleChange}
        value={formik.values.password}
        error={formik.errors.password}
      />
      <Form.Button type="submit" primary fluid loading={formik.isSubmitting}>
        Guardar
      </Form.Button>
    </Form>
  );
}
