const User = require("../models/userModel.js");
const Request = require("../models/requestModel.js");

exports.getAllUsers = async (req, res) => {
    const users = await User.findAll();

    return res.status(200).json({
        status: "success",
        data: {
            users
        }
    })
}

exports.getUserById = async (req, res) => {

    const id = req.params.id;
    const user = await User.findByPk(id);

    if (!user) return res.status(404).json({
        status: "fail",
        message: `Couldn't find user with ID ${id}`
    });

    return res.status(200).json({
        status: "success",
        data: {
            user
        }
    })
}

exports.createUser = (req, res) => {
    return res.status(201).json({
        status: "success",
        data: {
            message: "Hello world!"
        }
    })
}

exports.updateUserById = (req, res) => {
    return res.status(200).json({
        status: "success",
        data: {
            message: "Hello world!"
        }
    })
}

exports.deleteUserById = (req, res) => {
    return res.status(204).json({
        status: "success",
        data: {
            message: "Hello world!"
        }
    })
}