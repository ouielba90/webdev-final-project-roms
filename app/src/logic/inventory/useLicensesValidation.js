import { useState, useEffect } from "react";

function useLicenseValidation(form) {
  const [errors, setErrors] = useState({});
  const [canSubmit, setCanSubmit] = useState(false);

  useEffect(() => {
    const textRegex = /^[\p{L}0-9-]+(?: [\p{L}0-9-]+)*$/u;

    const newErrors = {};
    const today = new Date().toISOString().split("T")[0];

    if (!form.vendor) {
      newErrors.vendor = "El proveedor es obligatorio.";
    } else if (form.vendor.length < 2) {
      newErrors.vendor = "El proveedor debe tener al menos 2 caracteres.";
    } else if (form.vendor.length > 100) {
      newErrors.vendor = "El proveedor no puede superar los 100 caracteres.";
    } else if (!textRegex.test(form.vendor)) {
      newErrors.vendor =
        "Proveedor inválido: solo letras, números, guiones y espacios intermedios.";
    }

    if (!form.seats) {
      newErrors.seats = "El número de asignaciones es obligatorio.";
    } else if (Number(form.seats) <= 0) {
      newErrors.seats = "El número de asignaciones debe ser mayor que 0.";
    }

    if (!form.licenseKey) {
      newErrors.licenseKey = "La clave de licencia es obligatoria.";
    } else if (form.licenseKey.length < 2) {
      newErrors.licenseKey = "La clave de licencia debe tener al menos 2 caracteres.";
    } else if (form.licenseKey.length > 50) {
      newErrors.licenseKey = "La clave de licencia no puede superar los 50 caracteres.";
    } else if (!textRegex.test(form.licenseKey)) {
      newErrors.licenseKey =
        "Clave de licencia inválida: solo letras, números, guiones y espacios intermedios.";
    }

    if (!form.purchaseDate) {
      newErrors.purchaseDate = "La fecha de compra es obligatoria.";
    } else if (form.purchaseDate > today) {
      newErrors.purchaseDate = "La fecha de compra no puede ser futura.";
    }

    if (!form.expiryDate) {
      newErrors.expiryDate = "La fecha de expiración es obligatoria.";
    } else if (form.purchaseDate && form.expiryDate < form.purchaseDate) {
      newErrors.compareDates =
        "La fecha de expiración no puede ser anterior a la fecha de compra.";
    }

    if (form.cost === "" || form.cost === null || form.cost === undefined) {
      newErrors.cost = "El precio es obligatorio.";
    } else if (Number(form.cost) < 0) {
      newErrors.cost = "El precio debe ser mayor o igual que 0.";
    }

    setErrors(newErrors);

    const isValid =
      Object.keys(newErrors).length === 0

    setCanSubmit(isValid);
  }, [form]);

  return { errors, canSubmit };
}

export default useLicenseValidation