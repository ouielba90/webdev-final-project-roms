import { useEffect, useState } from "react";

function EditSoftware({ toBeEdited, categList, serverList, hardList, handleSubmitEdit, selectedHard, setSelectedHard, selectedServ, setSelectedServ, setEditFormOpen }) {
  const [name, setName] = useState(toBeEdited.name)
  const [version, setVersion] = useState(toBeEdited.version)
  const [category, setCategory] = useState(toBeEdited.category)
  const [status, setStatus] = useState(toBeEdited.status)
  const [description, setDescription] = useState(toBeEdited.description)

  function handleSelectedHardware(e) {
    const selected = Array.from(e.target.selectedOptions, option => option.value);
    setSelectedHard(selected);
  }

  function handleSelectedServers(e) {
    const selected = Array.from(e.target.selectedOptions, option => option.value);
    setSelectedServ(selected)
  }

  useEffect(() => {
    setSelectedHard(toBeEdited.installedOnHardware)
    setSelectedServ(toBeEdited.serverId)
  }, [toBeEdited, setSelectedHard, setSelectedServ])
  return (
    <form id="softwareForm" onSubmit={handleSubmitEdit} className="addsoft-form">

      <h2 className="addsoft-title">Editar Software</h2>

      <div className="addsoft-row">
        <div className="addsoft-group">
          <label htmlFor="id">ID</label>
          <input type="text" id="id" name="id" value={toBeEdited.id} readOnly />
        </div>
      </div>
      <div className="addsoft-row">
        <div className="addsoft-group">
          <label htmlFor="name">Nombre*</label>
          <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="addsoft-group">
          <label htmlFor="version">Versión*</label>
          <input type="text" id="version" name="version" value={version} onChange={(e) => setVersion(e.target.value)} required />
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
      </div>

      <div className="addsoft-row">
        <button className="addsoft-cancel" type="button" onClick={() => setEditFormOpen(false)}>Cancel</button>
        <button type="submit" className="addsoft-submit">Aplicar cambios</button>
      </div>
    </form>

  );
}

export default EditSoftware;

