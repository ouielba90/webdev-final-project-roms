import { useState, useEffect } from "react";

export default function useHardwareValidation(form) {
  const [errors, setErrors] = useState({});
  const [canSubmit, setCanSubmit] = useState(false);

  console.log(form);
  useEffect(() => {
    const textRegex = /^[A-Za-z0-9-]+(?: [A-Za-z0-9-]+)*$/;

    const newErrors = {};
    const today = new Date().toISOString().split("T")[0];

    if (form.vendor !== "" && !textRegex.test(form.vendor)) {
      newErrors.vendor =
        "Modelo inválido: solo letras, números, espacios intermedios y guiones.";
    }

    if (form.seats != "" && form.seats <= 0) {
      newErrors.seats = "El número de asignaciones debe de ser mayor que 0.";
    }

    if (form.licenseKey !== "" && !textRegex.test(form.licenseKey)) {
      newErrors.licenseKey =
        "Clave de licencia inválida: letras, números y guiones, con espacios intermedios.";
    }

    if (
      form.expiryDate !== "" &&
      form.purchaseDate !== "" &&
      form.expiryDate < form.purchaseDate
    ) {
      newErrors.compareDates =
        "La fecha de expiración no puede ser más antigua que la fecha de compra.";
    }

    if (form.purchaseDate && form.purchaseDate > today) {
      newErrors.purchaseDate = "La fecha de compra no puede ser futura.";
    }

    if (form.cost < 0) {
      newErrors.cost = "El precio debe de ser mayor o igual que 0.";
    }
    setErrors(newErrors);

    const isValid =
      Object.keys(newErrors).length === 0 &&
      form.vendor !== "" &&
      form.seats !== "" &&
      form.licenseKey !== "" &&
      form.purchaseDate !== "" &&
      form.expiryDate !== "" &&
      form.cost !== "";

    setCanSubmit(isValid);
  }, [form]);

  return { errors, canSubmit };
}
