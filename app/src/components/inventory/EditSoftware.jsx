import { useEffect, useState } from "react";
import useSoftwareValidation from "../../logic/inventory/useSoftwareValidation";

function EditSoftware({ toBeEdited, categList, serverList, hardList, handleSubmitEdit, selectedHard, setSelectedHard, selectedServ, setSelectedServ, setEditFormOpen }) {
  const [name, setName] = useState(toBeEdited?.name || "");
  const [version, setVersion] = useState(toBeEdited?.version || "");
  const [category, setCategory] = useState(toBeEdited?.category || "");
  const [status, setStatus] = useState(toBeEdited?.status || "");
  const [description, setDescription] = useState(toBeEdited?.description || "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!toBeEdited) return;
    setSelectedHard(toBeEdited.installedOnHardware || []);
    setSelectedServ(toBeEdited.serverId || []);
  }, [toBeEdited]);

  function handleSelectedHardware(e) {
    const selected = Array.from(e.target.selectedOptions, option => option.value);
    setSelectedHard(selected);
  }

  function handleSelectedServers(e) {
    const selected = Array.from(e.target.selectedOptions, option => option.value);
    setSelectedServ(selected)
  }

  const { errors, canSubmit } = useSoftwareValidation(
    name,
    version,
    description
  );

  async function onSubmit(e) {
    setIsSubmitting(true);
    await handleSubmitEdit(e);
  }

  useEffect(() => setIsSubmitting(false), []);

  return (
    <form id="softwareForm" onSubmit={onSubmit} className="addsoft-form">

      <h2 className="addsoft-title">Editar Software</h2>

      <div className="addsoft-row">
        <div className="addsoft-group">
          <label htmlFor="id">ID</label>
          <input type="text" value={toBeEdited._id} disabled />
        </div>
      </div>
      <div className="addsoft-row">
        <div className="addsoft-group">
          <label htmlFor="name">Nombre</label>
          <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} />
          {errors.name && <small className="error-msg">{errors.name}</small>}
        </div>
        <div className="addsoft-group">
          <label htmlFor="version">Versión</label>
          <input type="text" id="version" name="version" value={version} onChange={(e) => setVersion(e.target.value)} />
          {errors.version && <small className="error-msg">{errors.version}</small>}
        </div>
      </div>

      <div className="addsoft-row">
        <div className="addsoft-group">
          <label htmlFor="category">Categoria</label>
          <select id="category" name="category" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">Seleccione categoria</option>
            {categList.map((cat, i) => (
              <option key={i} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <div className="addsoft-group">
          <label htmlFor="status">Estado</label>
          <select id="status" name="status" value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="en-uso">En-uso</option>
            <option value="disponible">Disponible</option>
          </select>
        </div>
      </div>

      <div className="addsoft-row">
        <div className="addsoft-group">
          <label htmlFor="installedOnHardware">Hardware</label>
          <select
            multiple
            id="installedOnHardware"
            name="installedOnHardware"
            value={selectedHard}
            onChange={handleSelectedHardware}
          >
            {hardList.map((h, i) => (
              <option key={i} value={h.id}>{h.model}</option>
            ))}
          </select>
          <small className="hint">Mantén pulsado CTRL para seleccionar varios</small>
        </div>
        <div className="addsoft-group">
          <label htmlFor="serverId">Servidor</label>
          <select multiple id="serverId" name="serverId" value={selectedServ} onChange={handleSelectedServers}>
            {serverList.map((srv, i) => (
              <option key={i} value={srv.id}>{srv.name}</option>
            ))}
          </select>
          <small className="hint">Mantén pulsado CTRL para seleccionar varios</small>
        </div>
      </div>

      <div className="addsoft-group">
        <label htmlFor="description">Descripción</label>
        <textarea id="description" name="description" rows="2" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
        {errors.description && <small className="error-msg">{errors.description}</small>}
      </div>

      <div className="addsoft-row">
        <button className="addsoft-cancel" type="button" onClick={() => {
          setEditFormOpen(false)
          setSelectedHard([])
          setSelectedServ([])
        }} disabled={isSubmitting}>Cancel</button>
        <button
          type="submit"
          className="addsoft-submit"
          disabled={!canSubmit || isSubmitting}
        >
          {isSubmitting ? "Editando..." : "Aplicar cambios"}
        </button>
      </div>
    </form>

  );
}

export default EditSoftware;

