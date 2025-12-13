import { useState } from "react";
import useSoftwareValidation from "../../logic/inventory/useSoftwareValidation";

function AddSoftware({ categList, serverList, hardList, handleSubmit, selectedHard, setSelectedHard, selectedServ, setSelectedServ, setAddFormOpen }) {
  const initialForm = {
    name: "",
    version: "",
    description: "",
    category: "",
    status: ""
  };

  const [form, setForm] = useState(initialForm)
  const { errors, canSubmit } = useSoftwareValidation(form);

  function handleChange(e) {
    setForm(prev => ({
      ...prev,
      [e.target.id]: e.target.value
    }));
  }

  return (
    <form id="softwareForm" onSubmit={handleSubmit} className="addsoft-form">

      <h2 className="addsoft-title">Añadir Software</h2>

      <div className="addsoft-row">
        <div className="addsoft-group">
          <label htmlFor="name">Nombre</label>
          <input type="text" id="name" name="name" onChange={handleChange} />
          {errors.name && <small className="error-msg">{errors.name}</small>}
        </div>
        <div className="addsoft-group">
          <label htmlFor="version">Versión</label>
          <input type="text" id="version" name="version" onChange={handleChange} />
          {errors.version && <small className="error-msg">{errors.version}</small>}
        </div>
      </div>

      <div className="addsoft-row">
        <div className="addsoft-group">
          <label htmlFor="category">Categoria</label>
          <select id="category" name="category" onChange={handleChange}>
            {categList.map((cat, i) => (
              <option key={i} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <div className="addsoft-group">
          <label htmlFor="status">Estado</label>
          <select id="status" name="status" onChange={handleChange}>
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
            onChange={(e) => setSelectedHard(Array.from(e.target.selectedOptions, o => o.value))}
          >
            {hardList.map((h, i) => (
              <option key={i} value={h.id}>{h.model}</option>
            ))}
          </select>
          <small className="hint">Mantén pulsado CTRL para seleccionar varios</small>
        </div>
        <div className="addsoft-group">
          <label htmlFor="serverId">Servidor</label>
          <select multiple id="serverId" name="serverId" value={selectedServ}
            onChange={(e) => setSelectedServ(Array.from(e.target.selectedOptions, o => o.value))}
          >
            {serverList.map((srv, i) => (
              <option key={i} value={srv.id}>{srv.name}</option>
            ))}
          </select>
          <small className="hint">Mantén pulsado CTRL para seleccionar varios</small>
        </div>
      </div>

      <div className="addsoft-group">
        <label htmlFor="description">Descripción</label>
        <textarea id="description" name="description" rows="2" onChange={handleChange}></textarea>
        {errors.description && <small className="error-msg">{errors.description}</small>}
      </div>

      <div className="addsoft-row">
        <button className="addsoft-cancel" type="button" onClick={() => {
          setForm(initialForm);
          setSelectedHard([]);
          setSelectedServ([]);
          setAddFormOpen(false)
        }}>Cancel</button>
        <button type="submit" className="addsoft-submit" disabled={!canSubmit}>Añadir</button>
      </div>
    </form>

  );
}

export default AddSoftware;

