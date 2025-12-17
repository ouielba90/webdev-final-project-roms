import { useContext } from "react";
import { ApiDataContext } from "../../context/ApiDataContext";

export default function useHardwareActions() {
    const {
        software,
        setSoftware,
        softwareApi,
    } = useContext(ApiDataContext);

    // Calcula la diferencia entre la lista antigua y la nueva para identificar
    // exactamente qué referencias se han añadido y cuáles se han eliminado,
    // minimizando las llamadas a la API
    function diffLists(oldList, newList) {
        const oldSet = new Set(oldList);
        const newSet = new Set(newList);
        return {
            added: newList.filter(item => !oldSet.has(item)),
            removed: oldList.filter(item => !newSet.has(item))
        };
    }

    // Sincronización bidireccional al editar un hardware:
    // 1. Añade la ID de este hardware a los nuevos software seleccionados.
    async function syncCreationWithSoftware(createdId, softwareIds) {
        // Software
        for (const sid of softwareIds) {
            const softItem = software.find(h => h._id === sid);
            const updatedList = [...softItem.installedOnHardware, createdId];

            await softwareApi.updateData(sid, { installedOnHardware: updatedList });

            setSoftware(prev =>
                prev.map(item =>
                    item._id === sid ? { ...item, installedOnHardware: updatedList } : item
                )
            );
        }
    }

    // 2. Elimina la ID de este hardware de los software que fueron deseleccionados
    // y lo añade en el otro.
    async function syncEditWithSoftware(currentId, prevItem, updatedItem) {
        const prevSoft = prevItem.installedSoftware || [];
        const newSoft = updatedItem.installedSoftware || prevItem.installedSoftware || [];

        const softDiff = diffLists(prevSoft, newSoft);

        // SOFTWARE ADDED
        for (const sid of softDiff.added) {
            const softItem = software.find(s => s._id === sid);
            const updatedList = [...softItem.installedOnHardware, currentId];

            await softwareApi.updateData(sid, { installedOnHardware: updatedList });

            setSoftware(prev =>
                prev.map(item =>
                    item._id === sid ? { ...item, installedOnHardware: updatedList } : item
                )
            );
        }

        // SOFTWARE REMOVED
        for (const sid of softDiff.removed) {
            const softItem = software.find(s => s._id === sid);
            const updatedList = softItem.installedOnHardware.filter(sw => sw !== currentId);

            await softwareApi.updateData(sid, { installedOnHardware: updatedList });

            setSoftware(prev =>
                prev.map(item =>
                    item._id === sid ? { ...item, installedOnHardware: updatedList } : item
                )
            );
        }
    }

    // 2. Elimina la ID de este hardware en el software seleccionado anteriormente.
    async function syncRemoveWithSoftware(removedId) {
        for (const s of software) {
            if (s.installedOnHardware.includes(removedId)) {
                const updatedList = s.installedOnHardware.filter(sw => sw !== removedId);
                await softwareApi.updateData(s._id, { installedOnHardware: updatedList });
                setSoftware(prev => prev.map(item => item._id === s._id ? { ...item, installedOnHardware: updatedList } : item));
            }
        }
    }

    return {
        syncCreationWithSoftware,
        syncEditWithSoftware,
        syncRemoveWithSoftware
    };
}
