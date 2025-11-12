function AddLicense({ query, softList, handleSubmit, selectedSoft, setSelectedSoft }) {
  return (
    <>
      <form id="licenseform" onSubmit={handleSubmit}>
        <h2>Hardware Information</h2>
        <label htmlFor="id">ID:</label>
        <input type="text" id="id" name="assignedId" value={query.at(-1).id + 1} disabled />

        <label htmlFor="software">Software:</label>
        <select id="software" name="software" value={selectedSoft}
          onChange={e =>
            setSelectedSoft(Array.from(e.target.selectedOptions, o => o.value))}>
          {softList.map((software, i) => {
            return (
              <option key={i} value={software.name}>{software.name}</option>
            )
          })}
        </select>

        <label htmlFor="seats">Seats:</label>
        <input type="number" id="seats" name="seats" />

        <label htmlFor="purchaseDate">Purchase date:</label>
        <input type="date" id="purchaseDate" name="purchaseDate" defaultValue={new Date().toISOString().split("T")[0]} />

        <label htmlFor="expiryDate">Purchase date:</label>
        <input type="date" id="expiryDate" name="expiryDate" />
        <button type="submit">Add item</button>
      </form>
    </>
  )
}

export default AddLicense
