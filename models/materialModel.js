const sqlize = require("../database.js");
const DataTypes = require("sequelize");

const Material = sqlize.define("Material", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "id"
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "name"
    },
    unit: {
        type: DataTypes.STRING,
        defaultValue: "unidades",
        field: "unit"
    },
    pricePerUnit: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        field: "price_per_unit"
    }
}, {
    tableName: "materials",
    timestamps: false
});

module.exports = Material;