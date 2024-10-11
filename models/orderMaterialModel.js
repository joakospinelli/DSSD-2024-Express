const sqlize = require("../database.js");
const DataTypes = require("sequelize");
const Material = require("../models/materialModel.js");

const OrderMaterial = sqlize.define(
  "OrderMaterial",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      field: "id",
    },
    amount: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      field: "amount",
    },
    materialId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "material_id",
    },
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "order_id",
    },
  },
  {
    tableName: "material_order",
    timestamps: false,
  }
);

OrderMaterial.belongsTo(Material, { foreignKey: "materialId", as: "material" });

module.exports = OrderMaterial;
