const sqlize = require("../database");
const { DataTypes } = require("sequelize");
const OrderMaterial = require("../models/orderMaterialModel.js");

const Order = sqlize.define(
  "Order",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "id",
    },
    status: {
      type: DataTypes.ENUM("created", "assigned", "sent", "done", "canceled"),
      defaultValue: "created",
      field: "status",
    },
    depositId: {
      type: DataTypes.INTEGER,
      field: "deposit_id",
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: new Date(Date.now()),
      field: "created_at",
    },
    completedAt: {
      type: DataTypes.DATE,
      field: "completed_at",
    },
    observations: {
      type: DataTypes.TEXT,
      field: "observations",
    },
  },
  {
    tableName: "orders",
    timestamps: false,
  }
);

Order.hasMany(OrderMaterial, { foreignKey: "orderId", as: "materials" });

module.exports = Order;
