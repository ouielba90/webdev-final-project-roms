import { useState } from "react"

const emptyForm = Object.freeze({ name: '', client: '', description: '' })


export default function ProjectCreate({ onClose, onSumit }) {
    const [values, setValues] = useState(emptyForm)

    function updatefield(field) {
        return function (event) {
            const value = event.target.value;
            setValues((prev) => ({ ...prev, [field]: value }))
        }
    }

    function resetForm() {
        setValues(emptyForm)
    }

    function closeModal() {
        onClose?.()
        resetForm()
    }

    function handleSubmit(event) {
        event.preventDefault();
        console.log(values);
        const trimmed = {
            name: values.name.trim(),
            client: values.client.trim(),
            description: values.description.trim(),
        }
        if (!trimmed.name || !trimmed.client || !trimmed.description) {
            return;
        }
        onSumit?.(trimmed);
        resetForm();
    }

    return (
        <>
            <div className="create-project-container">
                <div className="box-create-project">
                    <form onSubmit={handleSubmit}>
                        <div className="div-create">
                            <label>Nombre del proyecto:</label>
                            <input
                                type="text"
                                id="create-proyect"
                                name="name"
                                value={values.name}
                                onChange={updatefield("name")}
                                autoFocus
                                required
                            />
                        </div>
                        <div className="div-create">
                            <label>Cliente:</label>
                            <input
                                type="text"
                                id="create-client"
                                name="client"
                                value={values.client}
                                onChange={updatefield("client")}
                                required
                            />
                        </div>
                        <div className="div-create">
                            <label>Descripción:</label>
                            <textarea
                                id="create-description"
                                name="description"
                                value={values.description}
                                onChange={updatefield("description")}
                                required
                            />
                        </div>
                        <button className="btn-standard" type="submit">Crear Proyecto</button>
                        <button className="btn-cancel" onClick={closeModal} type="button">Cancelar</button>
                    </form>
                </div>
            </div>
        </>
    )
}

