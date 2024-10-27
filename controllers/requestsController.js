const Request = require("../models/requestModel.js");
const User = require("../models/userModel.js");
const MaterialRequest = require("../models/materialRequestModel.js");
const Material = require("../models/materialModel.js");
const Deposit = require("../models/depositModel.js");
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

exports.getRequestsByCurrentUser = catchErrors(async (req, res) => {
    const requests = await Request.findAll({
        include: [
            {
                model: MaterialRequest,
                as: "materials",
                include: [{ model: Material, as: "material" }],
                attributes: { exclude: [ "id", "materialId", "requestId" ]},
            },
            {
                model: Deposit,
                as: "deposit"
            }
        ],
        attributes: { exclude: [ "recolectorId", "depositId" ]},
        where: {
            recolectorId: req.user.id
        }
    });

    return res.status(200).json({
        status: "success",
        data: {
            results: requests.length,
            requests
        }
    });
});

exports.currentUserHasPending = catchErrors(async (req, res) => {
    const pendingRequest = await Request.findOne({
        where: {
            recolectorId: req.user.id,
            received: false
        }
    });

    return res.status(200).json({
        status: "success",
        data: {
            hasPending: pendingRequest !== null
        }
    })
});