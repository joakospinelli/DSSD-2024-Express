const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { promisify } = require("util");

const User = require("../models/userModel.js");

const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES
    });
}

const checkPassword = async (userPassword, reqPassword) => {
    return await bcrypt.compare(reqPassword, userPassword);
}

exports.protect = async (req, res, next) => {
    const token = req.cookies.jwt;

    if (!token) {
        return res.status(401).json({
            status: "fail",
            message: "You need to be authenticated to do this action"
        });
    }

    // promisify(jwt.verify) retorna una promesa que ejecuta jwt.verify asincrónicamente. después le paso los parámetros que necesitaría verify(token, JWT_SECRET)
    const tokenDecoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    const currentUser = await User.findByPk(tokenDecoded.id);

    if (!currentUser) { // este caso sólo es posible si el usuario se eliminó
        return res.status(401).json({
            status: "fail",
            message: "You need to be authenticated to do this action"
        });
    }

    req.user = currentUser; // IMPORTANTE!! setea req.user para que lo puedan usar los próximos middlewares
    next();
}

// esto en realidad es una función que retorna una función, por eso se puede invocar en el middleware sin que rompa
exports.requiresRoles = (...roles) => {
    return (req, res, next) => {
        if ((!req.user) || !roles.includes(req.user.role)) {
            return res.status(403).json({
                status: "fail",
                message: "You don't have permission to do this action"
            });
        }
        next();
    }
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

    if (!user || !await checkPassword(user.password, password)) {
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

exports.logout = async (req, res) => {
    res.cookie('jwt', '', {
        expires: new Date(Date.now() + 10 * 1000)
    });

    return res.status(204).json({
        status: "success",
        data: null
    });
}