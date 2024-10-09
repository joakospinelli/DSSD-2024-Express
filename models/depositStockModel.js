const sqlize = require("../database.js");
const DataTypes = require("sequelize");
const Material = require("./materialModel.js");

const DepositStock = sqlize.define("DepositStock", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        field: "id"
    },
    amount: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        field: "amount"
    },
    materialId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "material_id"
    },
    depositId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "deposit_id"
    }
}, {
    tableName: "deposit_stock",
    timestamps: false
});

DepositStock.belongsTo(Material, { foreignKey: "materialId", as: "material" });

module.exports = DepositStock;