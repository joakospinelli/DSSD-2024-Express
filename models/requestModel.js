const sqlize = require("../database.js");
const DataTypes = require("sequelize");
const User = require("./userModel.js");

const Request = sqlize.define('Request', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      field: "id"
    },
    received: {
        type: DataTypes.BOOLEAN,
        default: false,
        field: "received"
    },
    depositId: {
        // TODO declarar referencia al depósito (cuando lo modele)
        type: DataTypes.INTEGER,
        allowNull: true,
        default: null,
        field: "deposit_id"
    },
    recolectorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "recolector_id"
    }
},
{
    tableName: "requests",
    timestamps: false
});

Request.belongsTo(User, { foreignKey: 'recolectorId' });

module.exports = Request;