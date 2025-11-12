
function AddHardware({ query, softList, handleSubmit, selectedSoft, setSelectedSoft }) {
  return (
    <>
      <form id="softwareForm" onSubmit={handleSubmit}>
        <h2>Hardware Information</h2>
        <label htmlFor="id">ID:</label>
        <input type="text" id="id" name="assignedId" value={query.at(-1).id + 1} disabled />

        <label htmlFor="type">Type:</label>
        <select id="type" name="type">
          <option value="Desktop">Desktop</option>
          <option value="Laptop">Laptop</option>
        </select>

        <label htmlFor="model">Model:</label>
        <input type="text" id="model" name="model" required />

        <label htmlFor="status">Status:</label>
        <select id="status" name="status">
          <option value="Operational">Operational</option>
          <option value="Maintenance">Maintenance</option>
        </select>

        <label htmlFor="cpu">CPU:</label>
        <input type="text" id="cpu" name="cpu" />
        <label htmlFor="ram">RAM:</label>
        <input type="number" id="ram" name="ram" />
        <label htmlFor="storage">Storage:</label>
        <input type="number" id="storage" name="storage" />

        <label htmlFor="purchaseDate">Purchase date:</label>
        <input type="date" id="purchaseDate" name="purchaseDate" defaultValue={new Date().toISOString().split("T")[0]} />

        <label htmlFor="installedSoftware">Software:</label>
        <select multiple id="installedSoftware" name="installedSoftware" value={selectedSoft}
          onChange={e =>
            setSelectedSoft(Array.from(e.target.selectedOptions, o => o.value))}>
          {softList.map((software, i) => {
            return (
              <option key={i} value={software.name}>{software.name}</option>
            )
          })}
        </select>
        <button type="submit">Add item</button>
      </form>
    </>
  )
}

export default AddHardware
