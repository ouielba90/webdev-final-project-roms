import { useEffect, useState } from "react";

function EditSoftware({ toBeEdited, categList, serverList, hardList, handleSubmitEdit, selectedHard, setSelectedHard, selectedServ, setSelectedServ }) {
  console.log('Im in edit', toBeEdited)
  const [name, setName] = useState(toBeEdited.name)
  const [version, setVersion] = useState(toBeEdited.version)
  const [category, setCategory] = useState(toBeEdited.category)
  const [status, setStatus] = useState(toBeEdited.status)
  //const [installedOnHardware, setInstalledOnHardware] = useState(toBeEdited.installedOnHardware || [])
  //const [serverId, setServerId] = useState(toBeEdited.serverId || [])
  const [description, setDescription] = useState(toBeEdited.description)

  function handleSelectedHardware(e) {
    const selected = Array.from(e.target.selectedOptions, option => option.value);
    console.log("sel hard", selected)
    setSelectedHard(selected);
  }

  function handleSelectedServers(e) {
    const selected = Array.from(e.target.selectedOptions, option => option.value);
    console.log("sel serv", selected)
    setSelectedServ(selected)
  }

  useEffect(() => {
    setSelectedHard(toBeEdited.installedOnHardware)
    setSelectedServ(toBeEdited.serverId)
  }, [toBeEdited, setSelectedHard, setSelectedServ])
  return (
    <form id="softwareForm" onSubmit={handleSubmitEdit} className="addsoft-form">

      <h2 className="addsoft-title">Edit Software</h2>

      <div className="addsoft-row">
        <div className="addsoft-group">
          <label htmlFor="id">ID</label>
          <input type="text" id="id" name="id" value={toBeEdited.id} readOnly />
        </div>
      </div>
      <div className="addsoft-row">
        <div className="addsoft-group">
          <label htmlFor="name">Name *</label>
          <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="addsoft-group">
          <label htmlFor="version">Version *</label>
          <input type="text" id="version" name="version" value={version} onChange={(e) => setVersion(e.target.value)} required />
        </div>
      </div>

      <div className="addsoft-row">
        <div className="addsoft-group">
          <label htmlFor="category">Category</label>
          <select id="category" name="category" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">Select category</option>
            {categList.map((cat, i) => (
              <option key={i} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <div className="addsoft-group">
          <label htmlFor="status">Status</label>
          <select id="status" name="status" value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="in-use">In use</option>
            <option value="available">Available</option>
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
          <small className="hint">Hold CTRL to select multiple</small>
        </div>
        <div className="addsoft-group">
          <label htmlFor="serverId">Server</label>
          <select multiple id="serverId" name="serverId" value={selectedServ} onChange={handleSelectedServers}>
            {serverList.map((srv, i) => (
              <option key={i} value={srv.id}>{srv.name}</option>
            ))}
          </select>
          <small className="hint">Hold CTRL to select multiple</small>
        </div>
      </div>

      <div className="addsoft-group">
        <label htmlFor="description">Description</label>
        <textarea id="description" name="description" rows="2" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
      </div>

      <button type="submit" className="addsoft-submit">Edit</button>
    </form>

  );
}

export default EditSoftware;

