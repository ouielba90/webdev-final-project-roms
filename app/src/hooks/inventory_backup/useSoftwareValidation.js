import { useEffect, useState } from "react";

function useSoftwareValidation(form) {
  const [errors, setErrors] = useState({});
  const [canSubmit, setCanSubmit] = useState(false);

  useEffect(() => {
    const nameRegex = /^[A-Za-z0-9]+(?: [A-Za-z0-9]+)*$/;
    const versionRegex = /^[A-Za-z0-9]+([.\-_][A-Za-z0-9]+)*$/;
    const descriptionRegex = /^[A-Za-z0-9 ,.\-_:()"\'%!?\+*/\\=]+$/;

    const newErrors = {};

    if (form.name !== "" && !nameRegex.test(form.name)) {
      newErrors.name =
        "El nombre no puede contener caracteres especiales ni acabar con espacio.";
    }

    if (form.version !== "" && !versionRegex.test(form.version)) {
      newErrors.version =
        "La versión no puede contener caracteres especiales ni acabar con espacio.";
    }

    if (form.description !== "" && !descriptionRegex.test(form.description)) {
      newErrors.description =
        "La descripción contiene caracteres no permitidos.";
    }

    setErrors(newErrors);

    const isValid =
      Object.keys(newErrors).length === 0 &&
      form.name !== "" &&
      form.version !== "" &&
      form.description !== "";

    setCanSubmit(isValid);
  }, [form]);

  return { errors, canSubmit };
}

export default useSoftwareValidation;
