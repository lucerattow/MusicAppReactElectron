import * as Yup from "yup";

export function initialValues() {
  return {
    email: "",
    password: "",
    displayName: "",
  };
}

export function validationSchema() {
  return Yup.object({
    email: Yup.string().email("Email inválido").required("Este campo es requerido"),
    password: Yup.string().min(8, "La contraseña debe tener al menos 8 caracteres").required("Este campo es requerido"),
    displayName: Yup.string().required("Este campo es requerido"),
  });
}