const bcrypt = require("bcryptjs");
const sqlize = require("../database.js");
const DataTypes = require("sequelize");

const User = sqlize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      field: "id"
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "email",
      validate: {
        isEmail: true
      }
    },
    dni: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "dni",
        unique: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "username",
      unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "password",
        validate: {
            len: [8, 20]
        }
    },
    fullName: {
        type: DataTypes.STRING,
        field: "full_name",
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM("deposito", "recolector", "administrador"),
        default: "recolector",
        field: "role"
    },
    createdAt: {
        type: DataTypes.DATE,
        default: new Date(),
        field: "created_at"
    }
},
{
    hooks: {
        beforeCreate: async (user) => {
            user.password = await bcrypt.hash(user.password, 12);
        }
    },
    defaultScope: {
        attributes: { exclude: [ 'password', 'createdAt' ]}
    },
    tableName: "users",
    timestamps: false
});

module.exports = User;