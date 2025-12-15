import communicationsMessagesPost from "./../models/communications.messages.model.js"

const getAllMessages = async (req, res) => {
    try {
        const messages = await communicationsMessagesPost.find();
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving messages", error });
    }
}
const getIdMessage = async (req, res) => {
    try {
        const { id } = req.params; 
        const message = await communicationsMessagesPost.findById(id);
        if (!message) {
            return res.status(404).json({ message: "Message not found" });
        }
        res.status(200).json(message);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving message", error });
    }
}
const createMessage = async (req, res) => {
    try {
        const newMessage = new communicationsMessagesPost(req.body);
        const savedMessage = await newMessage.save();
        res.status(201).json(savedMessage);
    } catch (error) {
        res.status(500).json({ message: "Error creating message", error });
    }
}
const updateMessage = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedMessage = await communicationsMessagesPost.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedMessage) {
            return res.status(404).json({ message: "Message not found" });
        }
        res.status(200).json(updatedMessage);
    } catch (error) {
        res.status(500).json({ message: "Error updating message", error });
    }
}
const deleteMessage = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedMessage = await communicationsMessagesPost.findByIdAndDelete(id);
        if (!deletedMessage) {
            return res.status(404).json({ message: "Message not found" });
        }
        res.status(200).json({ message: "Message deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting message", error });
    }
}

export default{
    getAllMessages,
    getIdMessage,
    createMessage,
    updateMessage,
    deleteMessage
} 

//const { id } = objeto.id = extraemos la propiedad id del objeto usuario y la guardas en una variable llamada id.