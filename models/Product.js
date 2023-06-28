const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db");

class Product extends Model {}

Product.init(
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
    },
    {
        sequelize: sequelize,
        modelName: "product",
    }
);

module.exports = Product;