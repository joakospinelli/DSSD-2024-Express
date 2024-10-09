const Deposit = require("../models/depositModel.js");
const DepositStock = require("../models/depositStockModel.js");
const Material = require("../models/materialModel.js");
const User = require("../models/userModel.js");

exports.getAllDeposits = async (req, res) => {
    const deposits = await Deposit.findAll();

    return res.status(200).json({
        status: "success",
        data: {
            results: deposits.length,
            deposits
        }
    })
}

exports.getDepositById = async (req, res) => {
    const id = req.params.id;
    const deposit = await Deposit.findByPk(id, {
        include: [
            {
                model: DepositStock,
                as: "stock",
                include: [{model: Material, as: "material" }],
                attributes: { exclude: [ "id", "materialId", "depositId" ]},
                required: false
            }, {
                model: User,
                as: "employees"
            }
        ]
    });

    if (!deposit) return res.status(404).json({
        status: "fail",
        message: `Couldn't find deposit with ID ${id}`
    });

    return res.status(200).json({
        status: "success",
        data: {
            deposit
        }
    });
}

exports.createDeposit = async (req, res) => {
    const { name, address, contactEmail } = req.body;

    if (!name) return res.status(400).json({
        status: "fail",
        message: "A deposit needs a name"
    });

    const newDeposit = Deposit.build({ name, address, contactEmail });

    await newDeposit.save()
        .then(_ => {
            res.status(201).json({
                status: "success",
                data: {
                    deposit: newDeposit
                }
            });
        })
        .catch(err => {
            console.error(err);
            res.status(400).json({
                status: "fail",
                message: err.parent.detail
            });
        })
}