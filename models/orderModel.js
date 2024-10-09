import sqlize from "../database";
import { DataTypes } from "sequelize";

const Order = sqlize.define("Order", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "id"
    },
    status: {
        type: DataTypes.ENUM("created", "pending", "received", "done", "canceled"),
        defaultValue: "created",
        field: "status"
    },
    depositId: {
        type: DataTypes.INTEGER,
        field: "deposit_id"
    },
    createdAt: {
        type: DataTypes.DATE,
        default: new Date(Date.now()),
        field: "created_at"
    },
    completedAt: {
        type: DataTypes.DATE,
        field: "completed_at"
    },
    observations: {
        type: DataTypes.TEXT,
        field: "observations"
    }
}, {
    tableName: "orders",
    timestamps: false
});

module.exports = Order;