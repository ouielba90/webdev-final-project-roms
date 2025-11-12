
function AddSoftware({ query, categList, serverList, hardList, handleSubmit, selectedHard, setSelectedHard }) {

  return (
    <>
      <form id="softwareForm" onSubmit={handleSubmit}>
        <h2>Software Information</h2>
        <label htmlFor="id">ID:</label>
        <input type="text" id="id" name="assignedId" value={query.at(-1).id + 1} disabled />

        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" required />

        <label htmlFor="version">Version:</label>
        <input type="text" id="version" name="version" required />

        <label htmlFor="category">Category:</label>
        <select id="category" name="category">
          {categList.map((category, i) => {
            return (
              <option key={i} value={category}>{category}</option>
            )
          })}
        </select>
        <label htmlFor="installedOnHardware">Hardware:</label>
        <select multiple id="installedOnHardware" name="installedOnHardware" value={selectedHard}
          onChange={e =>
            setSelectedHard(Array.from(e.target.selectedOptions, o => o.value))}>
          {hardList.map((hardware, i) => {
            return (
              <option key={i} value={hardware.id}>{hardware.id}</option>
            )
          })}
        </select>

        <label htmlFor="serverId">Servers:</label>
        <select id="serverId" name="serverId">
          {serverList.map((category, i) => {
            return (
              <option key={i} value={category}>{category}</option>
            )
          })}
        </select>
        <label htmlFor="status">Status:</label>
        <select id="status" name="status">
          <option value="in-use">in-use</option>
          <option value="available">available</option>
        </select>

        <label htmlFor="description">Description:</label>
        <textarea id="description" rows="3" name="description"></textarea>

        <label htmlFor="lastUpdated">Last Updated:</label>
        <input type="date" id="lastUpdated" name="lastUpdated" defaultValue={new Date().toISOString().split("T")[0]} />

        <button type="submit">Add item</button>
      </form>
    </>
  )
}

export default AddSoftware
