const Request = require("../models/requestModel.js");
const User = require("../models/userModel.js");

exports.getAllRequests = async (req, res) => {
    const requests = await Request.findAll({
        include: User
    });

    return res.status(200).json({
        status: "success",
        data: {
            requests: requests.map(el => {
                return { ...el.toJSON(), recolector: el.User, User: undefined } // esto nomás porque me daba TOC que "User" empiece con mayúscula
            })
        }
    })
}