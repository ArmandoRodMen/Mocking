import {
    findAll,
    findById,
    findByEmail,
    createOne,
    updateOne,
    deleteOne
} from "../services/users.services.js";

export const finUsers = async (req, res) => {
    try {
        const users = await findAll();
        res.status(200).json({ message: "Users", users });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const findUser = async (req, res) => {
    passport.authenticate('jwt', { session: false })(req, res, async () => {
        authMiddleware(["user"])(req, res, async () => {
            const { idUser } = req.params;
            try {
                const user = await findById(idUser);
                res.status(200).json({ message: "User", user });
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
    });
};

export const deleteUser = async (req, res) => {
    const { idUser } = req.params;
    try {
        await deleteOne(idUser);
        res.status(200).json({ message: "User deleted:" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createUser = async (req, res) => {
    const { first_name, last_name, email, password, username } = req.body;
    if (!first_name || !last_name || !email || !password || !username) {
        return res.status(400).json({ message: "Some data is missing" });
    }
    try {
        const createdUser = await createOne(req.body);
        res.redirect(`/profile/${createdUser._id}`);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateUser = async (req, res) => {
    const { idUser } = req.params;
    const updateData = req.body;

    try {
        const updatedUser = await updateOne(idUser, updateData);
        res.status(200).json({ message: "User updated", user: updatedUser });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const findUserByEmail = async (req, res) => {
    const { email } = req.params;

    try {
        const user = await findByEmail(email);
        res.status(200).json({ message: "User found by email", user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

