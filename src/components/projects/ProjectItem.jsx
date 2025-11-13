
function ProjectItem({ id, name, client, status, description, tasks }) {

    const taskItems = [];
    for (let i = 0; i < tasks.length; i++) {
        taskItems.push(<li key={i}>{tasks[i]}</li>);
    }

    return (
        <>
            <div key={id} className="box-project">
                <div>
                    <h3 className="name-project">{name}</h3>
                    <p className="client-project">{client}</p>
                    <p className="description-project">{description}</p>
                    <ul className="box-list-tasks">
                        {taskItems}
                    </ul>
                </div>
                <div>
                    <p className="status-project" >{status}</p>
                    <div className="box-users-project">
                        <h4>Usuarios</h4>
                        <ul>
                            <li>
                                <p>ana</p>
                            </li>
                            <li>
                                <p>maria</p>
                            </li>
                            <li>
                                <p>juan</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProjectItem