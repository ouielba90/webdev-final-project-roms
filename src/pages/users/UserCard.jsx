function UserCard({ user, onDeleteUser }) {
    function userStatus(estado) {
    if(estado === 'activo') {
        return ({
            background: '#12a912ff',
        })
    }

    if(estado === 'inactivo') {
        return ({
            background: '#bfbfbfff',
        })
    }

    if(estado === 'ausente') {
        return ({
            background: '#ffbf00',
        })
    }

    if(estado === 'ocupado') {
        return ({
            background: '#dc143c',
        })
    }
}
    return (
        <div className="userDiv">
            <div className="user-data">
                <p>
                    {user.name} <br />
                    {user.email} <br />
                    {user.role}
                </p>
            </div>

            <div>
                <div className="estado" style={userStatus(user.status)}></div>
                <h1 className="estado-txt">{user.status}</h1>
            </div>
            <div>
                <button onClick={() => onDeleteUser(user.id)} className="del-btn">Eliminar</button>
            </div>
        </div>
    )
}

export default UserCard