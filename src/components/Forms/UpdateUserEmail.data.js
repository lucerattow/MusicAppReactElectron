import * as Yup from "yup";

export function initialValues(email) {
  return {
    email,
    password: "",
  };
}

export function validationSchema() {
  return Yup.object({
    email: Yup.string().email("Email inválido").required("Este campo es requerido"),
    password: Yup.string().min(8, "La contraseña debe tener al menos 8 caracteres").required("Este campo es requerido"),
  });
}