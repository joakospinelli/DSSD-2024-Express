const Request = require("../models/requestModel.js");
const User = require("../models/userModel.js");
const MaterialRequest = require("../models/materialRequestModel.js");
const catchErrors = require("../utils/catchErrors.js");

exports.getAllRequests = catchErrors(async (req, res) => {
    const requests = await Request.findAll({
        include: [
            { model: User, as: "recolector" },
            { model: MaterialRequest, as: "materials" }
        ]
    });

    return res.status(200).json({
        status: "success",
        data: {
            results: requests.length,
            requests
        }
    })
});