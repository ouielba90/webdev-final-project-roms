import { useState, useEffect } from "react";

function useHardwareValidation(model, os, cpu, ram, storage, purchaseDate, lastMaintenance) {
  const [errors, setErrors] = useState({});
  const [canSubmit, setCanSubmit] = useState(false);

  useEffect(() => {
    const textRegex = /^[\p{L}0-9]+(?: [\p{L}0-9]+)*$/u;
    const specialRegex = /^[\p{L}0-9-]+(?: [\p{L}0-9-]+)*$/u;
    const newErrors = {};
    const today = new Date().toISOString().split("T")[0];

    if (!model) {
      newErrors.model = "El modelo es obligatorio.";
    } else if (model.length < 2) {
      newErrors.model = "El modelo debe tener al menos 2 caracteres.";
    } else if (model.length > 100) {
      newErrors.model = "El modelo no puede superar los 100 caracteres.";
    } else if (!specialRegex.test(model)) {
      newErrors.model =
        "Modelo inválido: solo letras, números, espacios intermedios y guiones.";
    }

    if (!os) {
      newErrors.os = "El sistema operativo es obligatorio.";
    } else if (os.length < 2) {
      newErrors.os = "El sistema operativo debe tener al menos 2 caracteres.";
    } else if (os.length > 50) {
      newErrors.os = "El sistema operativo no puede superar los 50 caracteres.";
    } else if (!textRegex.test(os)) {
      newErrors.os =
        "Sistema operativo inválido: solo letras, números y espacios intermedios.";
    }

    if (!cpu) {
      newErrors.cpu = "El CPU es obligatorio.";
    } else if (cpu.length < 2) {
      newErrors.cpu = "El CPU debe tener al menos 2 caracteres.";
    } else if (cpu.length > 50) {
      newErrors.cpu = "El CPU no puede superar los 50 caracteres.";
    } else if (!specialRegex.test(cpu)) {
      newErrors.cpu =
        "CPU inválido: solo letras, números, espacios intermedios y guiones.";
    }

    if (!ram) {
      newErrors.ram = "La RAM es obligatoria.";
    } else if (ram.length < 1) {
      newErrors.ram = "La RAM debe tener al menos 1 carácter.";
    } else if (ram.length > 20) {
      newErrors.ram = "La RAM no puede superar los 20 caracteres.";
    } else if (!textRegex.test(ram)) {
      newErrors.ram =
        "RAM inválida: solo letras, números y espacios intermedios.";
    }

    if (!storage) {
      newErrors.storage = "El disco es obligatorio.";
    } else if (storage.length < 1) {
      newErrors.storage = "El disco debe tener al menos 1 carácter.";
    } else if (storage.length > 50) {
      newErrors.storage = "El disco no puede superar los 50 caracteres.";
    } else if (!textRegex.test(storage)) {
      newErrors.storage =
        "Disco inválido: solo letras, números y espacios intermedios.";
    }

    if (!purchaseDate) {
      newErrors.purchaseDate = "La fecha de compra es obligatoria.";
    } else if (purchaseDate >= today) {
      newErrors.purchaseDate = "La fecha de compra no puede ser futura.";
    }

    if (lastMaintenance) {
      if (lastMaintenance >= today) {
        newErrors.lastMaintenance =
          "El último mantenimiento no puede ser futuro.";
      }
      if (purchaseDate && lastMaintenance < purchaseDate) {
        newErrors.compareDates =
          "La fecha del último mantenimiento no puede ser anterior a la fecha de compra.";
      }
    } else {
      newErrors.lastMaintenance = "La fecha de mantenimiento es obligatoria.";
    }

    setErrors(newErrors);
    setCanSubmit(Object.keys(newErrors).length === 0);
  }, [model, os, cpu, ram, storage, purchaseDate, lastMaintenance]);

  return { errors, canSubmit };
}

export default useHardwareValidation;