
function ProjectItem({ id, name, client, status, description }) {

    return (
        <>
            <div key={id} className="box-project">
                <div>
                    <h3>{name}</h3>
                    <p>{client}</p>
                    <p>{description}</p>
                </div>
                <div>
                    <p className="status-project" >{status}</p>
                </div>
            </div>
        </>
    )
}

export default ProjectItem