
function ProjectItem({ id, name, client, status, description, tasks, projectUsers, activeId, setActiveId }) {

    const taskItems = [];
    if (tasks == []) {
        for (let i = 0; i < tasks.length; i++) {
            taskItems.push(<li key={i}>{tasks[i]}</li>);
        }
    }

    const usersItems = [];
    if (projectUsers == []) {
        for (let i = 0; i < projectUsers.length; i++) {
            if (projectUsers[i].id_project === id) {
                usersItems.push(<li key={projectUsers[i].id}>{projectUsers[i].name}</li>);
            }
        }
    }


    const isOpen = activeId === id;

    const toggleOpen = () => {
        setActiveId(isOpen ? null : id);
    };

    return (
        <>
            <div key={id} className="box-project">
                <div onClick={toggleOpen}>
                    <h3 className="name-project">{name}</h3>
                    <p className="client-project">{client}</p>
                    <p className="description-project">{description}</p>
                    {isOpen && (
                        <ul className="box-list-tasks">
                            {taskItems}
                        </ul>
                    )}
                </div>
                <div>
                    <p className="status-project" >{status}</p>
                    {isOpen && (
                        <div className="box-users-project">
                            <h4>Usuarios</h4>
                            <ul>
                                {usersItems}
                            </ul>
                        </div>
                    )}
                    {isOpen && (
                        <div className="box-buttons-project">
                            <button className="btn-card-project">Editar</button>
                            <button className="btn-card-project">Eliminar</button>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default ProjectItem