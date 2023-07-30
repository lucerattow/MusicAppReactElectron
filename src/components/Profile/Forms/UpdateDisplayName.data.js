import * as Yup from "yup";

export function initialValues(displayName) {
  return {
    displayName, //como la prop se llama igual, se actualiza sin especificar "displayName: displayName,"
  };
}

export function validationSchema() {
  return Yup.object({
    displayName: Yup.string().required("Este campo es requerido"),
  });
}