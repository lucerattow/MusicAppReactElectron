import * as Yup from "yup";

export function initialValues() {
  return {
    password: "",
    newPassword: "",
  };
}

export function validationSchema() {
  return Yup.object({
    password: Yup.string().min(8, "La contraseña debe tener al menos 8 caracteres").required("Este campo es requerido"),
    newPassword: Yup.string().min(8, "La contraseña debe tener al menos 8 caracteres").required("Este campo es requerido"),
  });
}