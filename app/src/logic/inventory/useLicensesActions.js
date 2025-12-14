import { useContext, useState } from "react";
import { ApiDataContext } from "../../context/ApiDataContext";

export default function useLicensesActions() {
    const {
        software,
        setSoftware,
        softwareApi,
    } = useContext(ApiDataContext);

    async function syncCreationWithSoftware(createdId, softwareId) {
        // Software
        await softwareApi.updateData(softwareId, { licenseId: createdId });

        setSoftware(prev =>
            prev.map(item =>
                item._id === softwareId ? { ...item, licenseId: createdId } : item
            )
        );
    }

    async function syncEditWithSoftware(currentId, prevItem, updatedItem) {
        const prevSoft = prevItem.softwareId;
        const newSoft = updatedItem.softwareId;

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
