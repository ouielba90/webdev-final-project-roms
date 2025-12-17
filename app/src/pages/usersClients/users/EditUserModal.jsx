function EditUserModal({ editingUser, setEditingUser, handleUpdate }) {
  if (!editingUser) return null

  return (
    <div className="modal-overlay">
      <div className="edit-modal">
        <h2>Edición de usuario</h2>
        <form className="editUserForm" onSubmit={handleUpdate}>

          <div className="editUserInputsDiv">
            <div>
              <label className="userEditFormLabels">Nombre y apellidos:</label>
              <input
                type="text"
                name="name"
                value={editingUser.name ?? ""}
                onChange={(e) =>
                  setEditingUser({ ...editingUser, name: e.target.value })
                }
              />
            </div>

            <div>
              <label className="userEditFormLabels">Correo electrónico:</label>
              <input
                type="email"
                name="email"
                value={editingUser.email ?? ""}
                onChange={(e) =>
                  setEditingUser({ ...editingUser, email: e.target.value })
                }
              />
            </div>
          </div>

          <div className="editUserSelectsDiv">
            <div>
              <label className="userEditFormLabels">Rol:</label>
              <select className="edit-select-user"
                name="role"
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
            </div>

            <div>
              <label className="userEditFormLabels">Estado:</label>
              <select className="edit-select-user"
                name="status"
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

            <div>
              <div className="user-btns-edit-div">
                <button className="user-edit-btn" type="submit">Aceptar</button>
                <button className="user-edit-btn" type="button" onClick={() => setEditingUser(null)}>
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditUserModal