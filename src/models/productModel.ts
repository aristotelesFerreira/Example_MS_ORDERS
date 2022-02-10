import { DataTypes, Model } from "sequelize";
import { sequelize } from "../utility/database";

export class ProductModel extends Model {}

export interface IProductEntity {
  product_real_id: number;
  order_id: number;
  name: string;
  description: string;
  color: string;
  price: number;
  quantity: number;
  createdAt?: Date;
}

export interface ProductModel extends IProductEntity {}

ProductModel.init(
  {
    product_real_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "products",
    timestamps: true,
    underscored: true,
    sequelize,
  }
);
