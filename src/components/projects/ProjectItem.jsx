
function ProjectItem({ id, name, client, status, description }) {

    return (
        <>
            <h1>Project</h1>
            <div key={id}>
                <div>
                    <h3>{name}</h3>
                    <p>{client}</p>
                    <p>{description}</p>
                </div>
                <div>
                    <p>{status}</p>
                </div>
            </div>
        </>
    )
}

export default ProjectItem