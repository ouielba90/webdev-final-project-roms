
function ProjectItem({ id, name, client, status, description, tasks }) {

    const taskItems = [];
  for (let i = 0; i < tasks.length; i++) {
    taskItems.push(<li key={i}>{tasks[i]}</li>);
  }

    return (
        <>
            <div key={id} className="box-project">
                <div>
                    <h3>{name}</h3>
                    <p>{client}</p>
                    <p>{description}</p>
                    <div>
                        <ul>
                            {taskItems}
                        </ul>
                            
                    </div>
                </div>
                <div>
                    <p className="status-project" >{status}</p>
                </div>
            </div>
        </>
    )
}

export default ProjectItem