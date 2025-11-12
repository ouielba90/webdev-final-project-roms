
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
                </div>
            </div>
        </>
    )
}

export default ProjectItem