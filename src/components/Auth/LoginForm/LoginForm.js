import React, { useState } from 'react'
import { Form, Icon } from 'semantic-ui-react'
import { useFormik } from "formik"
import { initialValues, validationSchema } from "./LoginForm.data"
import { Auth } from "../../../api"
import "./LoginForm.scss"

const auth = new Auth()

export function LoginForm({ openRegister, goBack }) {
  //estados
  const [showingPassword, setShowingPassword] = useState(false)

  //funciones
  const showPassword = () => setShowingPassword((prevState) => !prevState)

  //validaciones
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValues) => {
      try {
        await auth.login(formValues.email, formValues.password)
      }
      catch (error) {
        throw error
      }
    }
  })

  //Renderizado
  return (
    <div className='login-form'>
      <h1>Música para todos</h1>

      <Form onSubmit={formik.handleSubmit}>
        <Form.Input
          name="email"
          type="text"
          placeholder="Correo electrónico"
          icon="mail outline"

          onChange={formik.handleChange}
          value={formik.values.email}
          error={formik.errors.email}
        />
        <Form.Input
          name="password"
          type={showingPassword ? "text" : "password"}
          placeholder="Contraseña"
          icon={
            <Icon
              name={showingPassword ? "eye" : "eye slash"}
              link
              onClick={showPassword}
            />
          }

          onChange={formik.handleChange}
          value={formik.values.password}
          error={formik.errors.password}
        />

        <Form.Button type="submit" primary fluid loading={formik.isSubmitting}>
          Iniciar sesion
        </Form.Button>
      </Form>

      <div className='login-form__options'>
        <p onClick={goBack}>Volver</p>
        <p>No tienes MUSIC? <span onClick={openRegister}>Registrate gratis!</span></p>
      </div>
    </div>
  )
}
