
function ProjectItem({ project, projectUsers, activeId, setActiveId, onEdit, onDelete}) {

    const {id, name, client, status, description, tasks} = project

    // Renderiza las tareas asociadas al proyecto
    const taskItems = [];
    if (Array.isArray(tasks) && tasks.length > 0) {
        for (let i = 0; i < tasks.length; i++) {
            taskItems.push(<li key={i}>{tasks[i]}</li>);
        }
    }

    // Renderiza los usuarios asociados al proyecto
    const usersItems = [];
    if (Array.isArray(projectUsers) && projectUsers.length > 0) {
        for (let i = 0; i < projectUsers.length; i++) {
            if (projectUsers[i].id_project === id) {
                usersItems.push(<li key={projectUsers[i].id}>{projectUsers[i].name}</li>);
            }
        }
    }

    // cambia el class name del componente que imprime el estatus del proyecto
    const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
        case "completo":
        case "completado":
        case "finalizado":
            return "status-green";
        case "en progreso":
        case "progreso":
            return "status-yellow";
        case "atrasado":
        case "pendiente":
            return "status-red";
        default:
            return "status-gray";
    }
};

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
                    <p className={`status-project ${getStatusClass(status)}`}>{status}</p>
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
                            <button className="btn-card-project" onClick={() => onEdit?.(project)}>Editar</button>
                            <button className="btn-card-project" onClick={() => onDelete?.(project)}>Eliminar</button>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default ProjectItem