import * as Yup from "yup";

export function initialValues() {
  return {
    file: "",
    name: "",
    artist: "",
  };
}

export function validationSchema() {
  return Yup.object({
    file: Yup.string().required("Este campo es requerido"),
    name: Yup.string().required("Este campo es requerido"),
    artist: Yup.string().required("Este campo es requerido"),
  });
}