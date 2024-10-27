const sqlize = require("../database.js");
const DataTypes = require("sequelize");
const User = require("./userModel.js");
const Deposit = require("./depositModel.js");
const MaterialRequest = require("./materialRequestModel.js");

const Request = sqlize.define(
  "Request",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      field: "id",
    },
    received: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      field: "received",
    },
    caseId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "case_id",
    },
    payment: {
      type: DataTypes.DOUBLE,
      defaultValue: 0,
      field: "payment",
    },
    depositId: {
      // TODO declarar referencia al depósito (cuando lo modele)
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
      field: "deposit_id",
    },
    recolectorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "recolector_id",
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: new Date(Date.now()),
      field: "created_at",
    },
  },
  {
    tableName: "requests",
    timestamps: false,
  }
);

Request.belongsTo(User, { foreignKey: "recolectorId", as: "recolector" });
Request.belongsTo(Deposit, { foreignKey: "depositId", as: "deposit" });
Request.hasMany(MaterialRequest, { foreignKey: "requestId", as: "materials" });

module.exports = Request;
