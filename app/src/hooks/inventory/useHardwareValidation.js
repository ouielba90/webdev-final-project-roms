import { useState, useEffect } from "react";

export default function useHardwareValidation(form) {
  const [errors, setErrors] = useState({});
  const [canSubmit, setCanSubmit] = useState(false);

  useEffect(() => {
    const textRegex = /^[A-Za-z0-9]+(?: [A-Za-z0-9]+)*$/; // letras, números, espacios intermedios
    const specialRegex = /^[A-Za-z0-9-]+(?: [A-Za-z0-9-]+)*$/;

    const newErrors = {};
    const today = new Date().toISOString().split("T")[0];

    if (form.model !== "" && !specialRegex.test(form.model)) {
      newErrors.model =
        "Modelo inválido: solo letras, números, espacios intermedios y guiones.";
    }

    if (form.os !== "" && !textRegex.test(form.os)) {
      newErrors.os =
        "Sistema operativo inválido: solo letras, números y espacios intermedios.";
    }

    if (form.cpu !== "" && !specialRegex.test(form.cpu)) {
      newErrors.cpu =
        "CPU inválido: solo letras, números, espacios intermedios y guiones.";
    }

    if (form.ram !== "" && !textRegex.test(form.ram)) {
      newErrors.ram =
        "RAM inválido: solo letras, números y espacios intermedios.";
    }

    if (form.storage !== "" && !textRegex.test(form.storage)) {
      newErrors.storage =
        "Disco inválido: solo letras, números y espacios intermedios.";
    }

    if (form.purchaseDate && form.purchaseDate > today) {
      newErrors.purchaseDate = "La fecha de compra no puede ser futura.";
    }

    if (form.lastMaintenance && form.lastMaintenance > today) {
      newErrors.lastMaintenance =
        "El último mantenimiento no puede ser futuro.";
    }

    if (form.lastMaintenance < form.purchaseDate) {
      newErrors.compareDates =
        "La fecha del último mantenimiento no puede ser más antigua que la fecha de compra futuro.";
    }

    setErrors(newErrors);

    const isValid =
      Object.keys(newErrors).length === 0 &&
      form.model !== "" &&
      form.purchaseDate !== "" &&
      form.os !== "" &&
      form.cpu !== "" &&
      form.ram !== "" &&
      form.storage !== "";

    setCanSubmit(isValid);
  }, [form]);

  return { errors, canSubmit };
}
