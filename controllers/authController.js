const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel.js");

const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES
    });
}

const checkPassword = async (userPassword, reqPassword) => {
    return await bcrypt.compare(userPassword, reqPassword);
}

exports.login = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({
            status: "fail",
            message: "Must provide username and password"
        });
    }

    const user = await User.findOne({
        where: { username },
        attributes: {
            include: [ "password" ]
        }
    });

    if (!user || !checkPassword(user.password, password)) {
        return res.status(401).json({
            status: "fail",
            message: "Invalid credentials"
        });
    }

    const token = signToken(user.id);
    res.cookie('jwt', token, {
        expires: new Date(Date.now() + (process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000)),
        httpOnly: true
    });

    user.password = undefined; // para que no la muestre en el response

    return res.status(200).json({
        status: "success",
        token,
        data: {
            user
        }
    });
}