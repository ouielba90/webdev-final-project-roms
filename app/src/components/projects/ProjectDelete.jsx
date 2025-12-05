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
                        <h3 className="modal-title">Eliminar Projecto</h3>
                    </header>
                    <p>¿Estás seguro de que deseas eliminar el proyecto <strong className="modal-title"> {project.name} </strong>?</p>
                    <div className="div-button-form">
                        <button onClick={() => onConfirm?.(project.id)}>Eliminar</button>
                        <button onClick={handleCancel}>Cancelar</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProjectDelete;