function ProjectDelete({ project, onCancel, onConfirm }) {

    function handleCancel() {
        onCancel?.()
    }

    function handleOverlay(event){
        if (event.target === event.curretntTarget) handleCancel()
    }

    return (
        <>
            <div className="modal-overlay" onMouseDown={handleOverlay}>
                <div className="modal-content">
                    <header>
                        <h3>Eliminar Projecto</h3>
                    </header>
                    <p>¿Estás seguro de que deseas eliminar el proyecto <strong> {project.name} </strong>?</p>
                    <div>
                        <button onClick={handleCancel}>Cancelar</button>
                        <button onClick={() => onConfirm?.(project.id)}>Eliminar</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProjectDelete;