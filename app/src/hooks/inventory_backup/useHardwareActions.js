import { useContext, useState } from "react";
import { DataContext } from "../../context/inventory/DataContext";

export default function useHardwareActions() {
    const {
        software,
        setSoftware,
        softwareApi,
    } = useContext(DataContext);

    function diffLists(oldList, newList) {
        const oldSet = new Set(oldList);
        const newSet = new Set(newList);
        return {
            added: newList.filter(item => !oldSet.has(item)),
            removed: oldList.filter(item => !newSet.has(item))
        };
    }

    async function syncCreationWithSoftware(createdId, softwareIds) {
        // Software
        for (const sid of softwareIds) {
            const softItem = software.find(h => h._id === sid);
            const updatedList = [...softItem.installedOnHardware, createdId];

            await softwareApi.updateSoftware(sid, { installedOnHardware: updatedList });

            setSoftware(prev =>
                prev.map(item =>
                    item._id === sid ? { ...item, installedOnHardware: updatedList } : item
                )
            );
        }
    }

    async function syncEditWithSoftware(currentId, prevItem, updatedItem) {
        const prevSoft = prevItem.installedSoftware;
        const newSoft = updatedItem.installedSoftware;

        const softDiff = diffLists(prevSoft, newSoft);

        // SOFTWARE ADDED
        for (const sid of softDiff.added) {
            const softItem = software.find(s => s._id === sid);
            const updatedList = [...softItem.installedOnHardware, currentId];

            await softwareApi.updateSoftware(sid, { installedOnHardware: updatedList });

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

            await softwareApi.updateSoftware(sid, { installedOnHardware: updatedList });

            setSoftware(prev =>
                prev.map(item =>
                    item._id === sid ? { ...item, installedOnHardware: updatedList } : item
                )
            );
        }
    }

    async function syncRemoveWithSoftware(removedId) {
        for (const s of software) {
            if (s.installedOnHardware.includes(removedId)) {
                const updatedList = s.installedOnHardware.filter(sw => sw !== removedId);
                await softwareApi.updateSoftware(s._id, { installedOnHardware: updatedList });
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
