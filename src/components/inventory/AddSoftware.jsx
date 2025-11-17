function AddSoftware({ categList, serverList, hardList, handleSubmit, selectedHard, setSelectedHard, selectedServ, setSelectedServ }) {
  return (
    <form id="softwareForm" onSubmit={handleSubmit} className="addsoft-form">

      <h2 className="addsoft-title">Add New Software</h2>

      <div className="addsoft-row">
        <div className="addsoft-group">
          <label htmlFor="name">Name *</label>
          <input type="text" id="name" name="name" required />
        </div>
        <div className="addsoft-group">
          <label htmlFor="version">Version *</label>
          <input type="text" id="version" name="version" required />
        </div>
      </div>

      <div className="addsoft-row">
        <div className="addsoft-group">
          <label htmlFor="category">Category</label>
          <select id="category" name="category">
            <option value="">Select category</option>
            {categList.map((cat, i) => (
              <option key={i} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <div className="addsoft-group">
          <label htmlFor="status">Status</label>
          <select id="status" name="status">
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
            onChange={(e) => setSelectedHard(Array.from(e.target.selectedOptions, o => o.value))}
          >
            {hardList.map((h, i) => (
              <option key={i} value={h.id}>{h.model}</option>
            ))}
          </select>
          <small className="hint">Hold CTRL to select multiple</small>
        </div>
        <div className="addsoft-group">
          <label htmlFor="serverId">Server</label>
          <select multiple id="serverId" name="serverId" value={selectedServ}
            onChange={(e) => setSelectedServ(Array.from(e.target.selectedOptions, o => o.value))}
          >
            <option value="">None</option>
            {serverList.map((srv, i) => (
              <option key={i} value={srv.id}>{srv.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="addsoft-group">
        <label htmlFor="description">Description</label>
        <textarea id="description" name="description" rows="2"></textarea>
      </div>

      <button type="submit" className="addsoft-submit">Add</button>
    </form>

  );
}

export default AddSoftware;

