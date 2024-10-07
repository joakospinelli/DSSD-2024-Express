const bcrypt = require("bcryptjs");

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

exports.createUser = async (req, res) => {

    const { username, password, email, dni, fullName } = req.body;

    if (!username || !password || !email || !dni || !fullName) {
        return res.status(400).json({
            status: "fail",
            message: "A user needs an username, password, email, DNI and full name"
        });
    }

    const newUser = User.build({
        email,
        dni,
        username,
        password,
        fullName
    });

    await newUser.save()
        .then(_ => {
            newUser.password = undefined; // para que no la muestre en el response

            res.status(201).json({
                status: "success",
                data: {
                    user: newUser
                }});
        })
        .catch(err => {
            console.error(err);
            res.status(400).json({
                status: "fail",
                message: err.parent.detail
            })
        });
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