const sqlize = require("../database.js");
const DataTypes = require("sequelize");
const DepositStock = require("./depositStockModel.js");
const User = require("./userModel.js");

const Deposit = sqlize.define("Deposit", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "id"
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "name",
        unique: true
    },
    address: {
        type: DataTypes.STRING,
        field: "address"
    },
    contactEmail: {
        type: DataTypes.STRING,
        validate: {
            isEmail: true
        },
        field: "contact_email"
    }
}, {
    tableName: "deposits",
    timestamps: false
});

Deposit.hasMany(DepositStock, { foreignKey: "depositId", as: "stock" });
Deposit.hasMany(User, { foreignKey: "depositId", as: "employees" });

module.exports = Deposit;