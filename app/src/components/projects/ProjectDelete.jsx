// Funcion para la ventana modal de eliminar proyecto
function ProjectDelete({ project, onCancel, onConfirm }) {
    // evento para cancelar la eliminacion
    function handleCancel() {
        onCancel?.()
    }
    // evento para cerrar la ventana modal al hacer click fuera de ella
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
                        <button onClick={() => onConfirm?.(project._id)}>Eliminar</button>
                        <button onClick={handleCancel}>Cancelar</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProjectDelete;