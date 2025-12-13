import { useEffect, useState } from "react";

function useSoftwareValidation(form) {
  const [errors, setErrors] = useState({});
  const [canSubmit, setCanSubmit] = useState(false);

  useEffect(() => {
    const nameRegex = /^[\p{L}0-9]+(?: [\p{L}0-9]+)*$/u;
    const versionRegex = /^[A-Za-z0-9]+([.\-_][A-Za-z0-9]+)*$/;
    const descriptionRegex = /^[\p{L}0-9 ,.\-_:()"'%!?\+*\/\\=]+$/u;

    const newErrors = {};

    if (!form.name) {
      newErrors.name = "El nombre es obligatorio.";
    } else if (form.name.length < 2) {
      newErrors.name = "El nombre debe tener al menos 2 caracteres.";
    } else if (form.name.length > 100) {
      newErrors.name = "El nombre no puede superar los 100 caracteres.";
    } else if (!nameRegex.test(form.name)) {
      newErrors.name = "El nombre contiene caracteres no permitidos.";
    }

    if (!form.version) {
      newErrors.version = "La versión es obligatoria.";
    } else if (form.version.length > 50) {
      newErrors.version = "La versión no puede superar los 50 caracteres.";
    } else if (!versionRegex.test(form.version)) {
      newErrors.version = "La versión contiene caracteres no permitidos.";
    }

    if (!form.description) {
      newErrors.description = "La descripción es obligatoria.";
    } else if (form.description.length < 10) {
      newErrors.description = "La descripción debe tener al menos 10 caracteres.";
    } else if (form.description.length > 500) {
      newErrors.description = "La descripción no puede superar los 500 caracteres.";
    } else if (!descriptionRegex.test(form.description)) {
      newErrors.description = "La descripción contiene caracteres no permitidos.";
    }

    setErrors(newErrors);

    setCanSubmit(Object.keys(newErrors).length === 0);

  }, [form]);

  return { errors, canSubmit };
}

export default useSoftwareValidation;
