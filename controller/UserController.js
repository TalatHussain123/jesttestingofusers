import User from "../models/User.js";

//Create User
export const createUser = async (req, res) => {

    const newUser = new User(req.body);
    try {
        const saveUser = await newUser.save();
        res.status(200).json({ success: true, message: 'Sucessfully Created', data: saveUser });

    } catch (err) {
        res.status(500).json({ success: false, message: 'Created Failed!' });
    }
}



//Update User
export const updateUser = async (req, res) => {
    const id = req.params.id
    try {
        const updateUser = await User.findByIdAndUpdate(id, {
            $set: req.body
        }, { new: true })
        res.status(200).json({ success: true, message: 'Sucessfully updated', data: updateUser });
    } catch (err) {
        res.status(500).json({ success: false, message: 'update Failed' });
    }
}

//Delete
export const deleteUser = async (req, res) => {
    const id = req.params.id;
    try {
        await User.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: 'Sucessfully deleted!' });
    } catch (err) {
        res.status(500).json({ success: false, message: 'delete Failed' });
    }
}

// get single User
export const getSingleUser = async (req, res) => {
    const id = req.params.id
    try {
        const user = await User.findById(id);
        res.status(200).json({ success: true, message: 'Sucessful', data: user });
    } catch (err) {
        res.status(404).json({ success: false, message: 'Not Found' });
    }
}

//getallUser
export const getAllUser = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json({ success: true, message: 'Sucessful', data: users });
    } catch (err) {
        res.status(404).json({ success: false, message: 'Not Found' });
    }
}
