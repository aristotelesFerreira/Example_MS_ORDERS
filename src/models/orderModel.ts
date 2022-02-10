import { DataTypes, Model } from "sequelize";
import { sequelize } from "../utility/database";
import { ProductModel } from "./productModel";

export class OrderModel extends Model {}

export interface IOrderEntity {
  name: string;
  description: string;
  createdAt?: Date;
}

export interface OrderModel extends IOrderEntity {}

OrderModel.init(
  {
    user_real_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    full_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    total: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
  },
  {
    tableName: "orders",
    timestamps: true,
    underscored: true,
    sequelize,
  }
);

OrderModel.hasOne(ProductModel, {
  foreignKey: "order_id",
});
