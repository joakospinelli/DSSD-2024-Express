const Deposit = require("../models/depositModel.js");
const FeaturedDeposit = require("../models/featuredDepositModel.js");
const Material = require("../models/materialModel.js");
const catchErrors = require("../utils/catchErrors.js");

exports.getAllMaterials = catchErrors(async (req, res, next) => {
    const materials = await Material.findAll();

    return res.status(200).json({
        status: "success",
        data: {
            results: materials.length,
            materials
        }
    });
});

exports.createMaterial = catchErrors(async (req, res, next) => {
    const { name, unit, pricePerUnit } = req.body;

    if (!name || !pricePerUnit) return res.status(400).json({
        status: "fail",
        message: "A material needs a name and a price per unit"
    });

    const newMaterial = Material.build({ name, unit, pricePerUnit });

    await newMaterial.save()
        .then(_ => {
            res.status(200).json({
                status: "success",
                data: {
                    material: newMaterial
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
});

exports.getFeaturedDepositsByMaterial = catchErrors(async (req, res, next) => {
    const id = +req.params.id;

    console.log(req.params.id);

    const deposits = await FeaturedDeposit.findAll({
        where: { materialId: id },
        include: [{
            model: Deposit,
            required: false,
            as: "deposit"
        }]
    });

    return res.status(200).json({
        status: "success",
        data: {
            results: deposits.length,
            deposits
        }
    })
});