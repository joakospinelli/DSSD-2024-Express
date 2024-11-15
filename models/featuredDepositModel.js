const { DataTypes } = require("sequelize");
const sqlize = require("../database.js");
const Material = require("./materialModel.js");
const Deposit = require("./depositModel.js");

const FeaturedDeposit = sqlize.define("FeaturedDeposit", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        nullable: false,
        field: "id"
    },
    materialId: {
        type: DataTypes.INTEGER,
        nullable: true,
        field: "material_id"
    },
    depositId: {
        type: DataTypes.INTEGER,
        nullable: true,
        field: "deposit_id"
    }
}, {
    indexes: [
        {
            fields: [ "material_id", "deposit_id"],
            unique: true      
        }
    ],
    tableName: "featured_deposits",
    timestamps: false
});

FeaturedDeposit.belongsTo(Material, { foreignKey: "materialId", as: "material" });
FeaturedDeposit.belongsTo(Deposit, { foreignKey: "depositId", as: "deposit" });

module.exports = FeaturedDeposit;