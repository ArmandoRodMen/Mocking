import {
    findAll,
    createOne
} from "../services/messages.services.js";

export const findMessages = async (req, res) => {
    try {
        const messages = await findAll(res);
        res.render('chat', { messages });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createMessage = async (req, res) => {
    const { username, message } = req.body;
    if (!message) {
        res.status(400).json({ message: "Required data is missing" });
    }
    try {
        const newMessage = await createOne(req);
        const messages = await findAll(res);
        res.render('chat', { messages, username });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
