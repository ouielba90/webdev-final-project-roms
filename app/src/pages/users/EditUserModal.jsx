function EditUserModal({ editingUser, setEditingUser, handleUpdate }) {
  if (!editingUser) return null

  return (
    <div className="edit-modal">
      <h2>Edición de usuario</h2>
      <form className="edit-form" onSubmit={handleUpdate}>
        <div className="user-edit-inputs">
          <input
            type="text"
            value={editingUser.name ?? ""}
            onChange={(e) =>
              setEditingUser({ ...editingUser, name: e.target.value })
            }
          />

          <input
            type="email"
            value={editingUser.email ?? ""}
            onChange={(e) =>
              setEditingUser({ ...editingUser, email: e.target.value })
            }
          />
        </div>

        <div className="user-edit-selects">
          <select className="edit-select-user"
            value={editingUser.role ?? ""}
            onChange={(e) =>
              setEditingUser({ ...editingUser, role: e.target.value })
            }
          >
            <option value="Manager">Manager</option>
            <option value="Consultor">Consultor</option>
            <option value="Consultora">Consultora</option>
            <option value="Cliente">Cliente</option>
          </select>

          <select className="edit-select-user"
            value={editingUser.status ?? ""}
            onChange={(e) =>
              setEditingUser({ ...editingUser, status: e.target.value })
            }
          >
            <option value="activo">Activo</option>
            <option value="inactivo">Inactivo</option>
            <option value="ausente">Ausente</option>
            <option value="ocupado">Ocupado</option>
          </select>
        </div>

        <div className="user-btn-edit-div">
          <button className="update-user-btn" type="submit">Guardar cambios</button>
          <button className="cancel-user-edit-btn" type="button" onClick={() => setEditingUser(null)}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditUserModal