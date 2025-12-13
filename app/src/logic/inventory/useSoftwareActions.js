import { useContext, useState } from "react";
import { DataContext } from "../../context/inventory/DataContext";

export default function useSoftwareActions() {
    const {
        hardware,
        setHardware,
        hardwareApi,
        servers,
        setServers,
        serversApi
    } = useContext(DataContext);

    function diffLists(oldList, newList) {
        const oldSet = new Set(oldList);
        const newSet = new Set(newList);
        return {
            added: newList.filter(item => !oldSet.has(item)),
            removed: oldList.filter(item => !newSet.has(item))
        };
    }

    async function syncCreationWithHardwareAndServers(createdId, hardwareIds, serverIds) {
        // Hardware
        for (const hid of hardwareIds) {
            const hardItem = hardware.find(h => h._id === hid);
            const updatedList = [...hardItem.installedSoftware, createdId];

            await hardwareApi.updateHardware(hid, { installedSoftware: updatedList });

            setHardware(prev =>
                prev.map(item =>
                    item._id === hid ? { ...item, installedSoftware: updatedList } : item
                )
            );
        }

        // Servers
        for (const sid of serverIds) {
            const servItem = servers.find(s => s._id === sid);
            const updatedList = [...servItem.hostedSoftware, createdId];

            await serversApi.updateServer(sid, { hostedSoftware: updatedList });

            setServers(prev =>
                prev.map(item =>
                    item._id === sid ? { ...item, hostedSoftware: updatedList } : item
                )
            );
        }
    }

    async function syncEditWithHardwareAndServers(currentId, prevItem, updatedItem) {
        const prevHard = prevItem.installedOnHardware;
        const newHard = updatedItem.installedOnHardware;

        const prevServ = prevItem.serverId;
        const newServ = updatedItem.serverId;

        const hardDiff = diffLists(prevHard, newHard);
        const servDiff = diffLists(prevServ, newServ);

        // HARDWARE ADDED
        for (const hid of hardDiff.added) {
            const hardItem = hardware.find(h => h._id === hid);
            const updatedList = [...hardItem.installedSoftware, currentId];

            await hardwareApi.updateHardware(hid, { installedSoftware: updatedList });

            setHardware(prev =>
                prev.map(item =>
                    item._id === hid ? { ...item, installedSoftware: updatedList } : item
                )
            );
        }

        // HARDWARE REMOVED
        for (const hid of hardDiff.removed) {
            const hardItem = hardware.find(h => h._id === hid);
            const updatedList = hardItem.installedSoftware.filter(sw => sw !== currentId);

            await hardwareApi.updateHardware(hid, { installedSoftware: updatedList });

            setHardware(prev =>
                prev.map(item =>
                    item._id === hid ? { ...item, installedSoftware: updatedList } : item
                )
            );
        }

        // SERVERS ADDED
        for (const sid of servDiff.added) {
            const servItem = servers.find(s => s._id === sid);
            const updatedList = [...servItem.hostedSoftware, currentId];

            await serversApi.updateServer(sid, { hostedSoftware: updatedList });

            setServers(prev =>
                prev.map(item =>
                    item._id === sid ? { ...item, hostedSoftware: updatedList } : item
                )
            );
        }

        // SERVERS REMOVED
        for (const sid of servDiff.removed) {
            const servItem = servers.find(s => s._id === sid);
            const updatedList = servItem.hostedSoftware.filter(sw => sw !== currentId);

            await serversApi.updateServer(sid, { hostedSoftware: updatedList });

            setServers(prev =>
                prev.map(item =>
                    item._id === sid ? { ...item, hostedSoftware: updatedList } : item
                )
            );
        }
    }
    async function syncRemoveWithHardwareAndServers(removedId) {
        // Update hardware
        for (const h of hardware) {
            if (h.installedSoftware.includes(removedId)) {
                const updatedList = h.installedSoftware.filter(sw => sw !== removedId);
                await hardwareApi.updateHardware(h._id, { installedSoftware: updatedList });
                setHardware(prev => prev.map(item => item._id === h._id ? { ...item, installedSoftware: updatedList } : item));
            }
        }

        // Update servers
        for (const s of servers) {
            if (s.hostedSoftware.includes(removedId)) {
                const updatedList = s.hostedSoftware.filter(sw => sw !== removedId);
                await serversApi.updateServer(s._id, { hostedSoftware: updatedList });
                setServers(prev => prev.map(item => item._id === s._id ? { ...item, hostedSoftware: updatedList } : item));
            }
        }
    }

    return {
        syncCreationWithHardwareAndServers,
        syncEditWithHardwareAndServers,
        syncRemoveWithHardwareAndServers
    };
}
