import { useContext, useState } from "react";
import { ApiDataContext } from "../../context/ApiDataContext";

export default function useLicensesActions() {
    const {
        software,
        setSoftware,
        softwareApi,
    } = useContext(ApiDataContext);

    // Sincronización bidireccional al editar una licencia:
    // 1. Añade la ID de esta licencia al software seleccionado.
    async function syncCreationWithSoftware(createdId, softwareId) {
        // Software
        await softwareApi.updateData(softwareId, { licenseId: createdId });

        setSoftware(prev =>
            prev.map(item =>
                item._id === softwareId ? { ...item, licenseId: createdId } : item
            )
        );
    }

    // 2. Elimina la ID de esta licencia del software que fué deseleccionado.
    // y lo añade en el otro.
    async function syncEditWithSoftware(currentId, prevItem, updatedItem) {
        const prevSoft = prevItem.softwareId;
        const newSoft = updatedItem.softwareId;
        console.log(prevSoft, newSoft)
        // SOFTWARE ADDED
        await softwareApi.updateData(newSoft, { licenseId: currentId });
        setSoftware(prev =>
            prev.map(item =>
                item._id === newSoft ? { ...item, licenseId: currentId } : item
            )
        );

        // SOFTWARE REMOVED
        await softwareApi.updateData(prevSoft, { licenseId: null });
        setSoftware(prev =>
            prev.map(item =>
                item._id === prevSoft ? { ...item, licenseId: null } : item
            )
        );
    }

    // 2. Elimina la ID de esta licencia en el software seleccionado anteriormente.
    async function syncRemoveWithSoftware(removedId) {
        for (const s of software) {
            if (s.licenseId === removedId) {
                await softwareApi.updateData(s._id, { licenseId: null });
                setSoftware(prev => prev.map(item => item._id === s._id ? { ...item, licenseId: null } : item));
            }
        }
    }

    return {
        syncCreationWithSoftware,
        syncEditWithSoftware,
        syncRemoveWithSoftware
    };
}
