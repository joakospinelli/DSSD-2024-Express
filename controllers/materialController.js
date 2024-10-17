const Material = require("../models/materialModel.js");

exports.getAllMaterials = async (req, res) => {
    const materials = await Material.findAll();

    return res.status(200).json({
        status: "success",
        data: {
            results: materials.length,
            materials
        }
    });
}

exports.createMaterial = async (req, res) => {
    const { name, pricePerUnit } = req.body;

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
}