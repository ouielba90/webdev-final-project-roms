import { useState } from "react";

function getInitialValues(project) {
    if (!project) return { name: "", client: "", status: "", description: "", tasks: [] }
    return {
        name: project.name,
        client: project.client,
        status: project.status,
        description: project.description,
        tasks: project.tasks || [],
    }
}

function ProjectItem({ project, onClose, onSubmit }) {
    const [values, setValues] = useState(getInitialValues(project));
    const [newTask, setNewTask] = useState("");

    if (!project) return null;

    function handleCancel() {
        setValues(getInitialValues(project));
        onClose?.();
    }

    function handelSubmit(e) {
        e.preventDefault()
        const trimmed = {
            name: values.name.trim(),
            client: values.client.trim(),
            status: values.status,
            description: values.description.trim(),
            tasks: values.tasks,
        }
        if (!trimmed.name || !trimmed.client || !trimmed.description) return;
        onSubmit?.(trimmed)

    }

    function addTask() {
        const t = newTask.trim();
        if (!t) return;

        setValues({
            ...values,
            tasks: [...values.tasks, t]
        });
        setNewTask("");
    }

    return (
        <>
            <div className="modal-overlay">
                <div className="modal-content">
                    <header>
                        <h3 className="modal-title">Editar Projecto</h3>
                    </header>
                    <div className="content-modal">
                        <form onSubmit={handelSubmit}>
                            <label htmlFor={`edit-name-${project.id}`}>Nombre:</label>
                            <input
                                id={`edit-name-${project.id}`}
                                type="text"
                                name="name"
                                value={values.name}
                                onChange={(e) => setValues({ ...values, name: e.target.value })}
                                required
                            />
                            <label htmlFor={`edit-client-${project.id}`}>Cliente:</label>
                            <input
                                id={`edit-client-${project.id}`}
                                type="text"
                                name="client"
                                value={values.client}
                                onChange={(e) => setValues({ ...values, client: e.target.value })}
                                required
                            />
                            <label htmlFor={`edit-status-${project.id}`}>Estado:</label>
                            <select
                                id={`edit-status-${project.id}`}
                                name="status"
                                value={values.status}
                                onChange={(e) => setValues({ ...values, status: e.target.value })}
                            >
                                <option value="Pendiente">Pendiente</option>
                                <option value="En Progreso">En Progreso</option>
                                <option value="Completado">Completado</option>
                            </select>
                            <label htmlFor={`edit-description-${project.id}`}>Descripción:</label>
                            <textarea
                                id={`edit-description-${project.id}`}
                                name="description"
                                value={values.description}
                                onChange={(e) => setValues({ ...values, description: e.target.value })}
                                required
                            />
                            <label htmlFor={`edit-task-${project.id}`}>Nueva tarea:</label>
                            <div style={{ display: "flex", gap: "8px", marginBottom: "10px" }}>
                                <input
                                    id={`edit-task-${project.id}`}
                                    type="text"
                                    value={newTask}
                                    onChange={(e) => setNewTask(e.target.value)}
                                    placeholder="Escribe una tarea..."
                                />
                                <button type="button" onClick={addTask}>
                                    Añadir
                                </button>
                            </div>

                            {/* Lista de tareas añadidas */}
                            <ul className="ul-task-project-edit">
                                {values.tasks.map((task, index) => (
                                    <li key={index}>
                                        {task}
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setValues({
                                                    ...values,
                                                    tasks: values.tasks.filter((_, i) => i !== index)
                                                })
                                            }
                                        >
                                            X
                                        </button>
                                    </li>
                                ))}
                            </ul>
                            <div className="div-button-form">
                                <button type="submit">Guardar</button>
                                <button type="button" onClick={handleCancel}>Cancelar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProjectItem;