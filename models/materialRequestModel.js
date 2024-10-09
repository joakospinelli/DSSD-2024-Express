const sqlize = require("../database.js");
const DataTypes = require("sequelize");

const MaterialRequest = sqlize.define("MaterialRequest", {
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
    requestId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "request_id"
    }
}, {
    tableName: "material_requests",
    timestamps: false,
    defaultScope: {
        attributes: { exclude: [ "id", "materialId", "requestId" ] }
    }
});

module.exports = MaterialRequest;