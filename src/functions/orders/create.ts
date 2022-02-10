import "source-map-support/register";
import "reflect-metadata";

import { middyfy } from "../../utility/lambda";

import { APIGatewayProxyResult, Context } from "aws-lambda";
import { IHandlerInput } from "src/utility/types";
import { OrderModel } from "src/models/orderModel";
import { ProductModel } from "src/models/productModel";
import { UserModel } from "src/models/userModel";

const main = async (
  event: IHandlerInput,
  context: Context
): Promise<APIGatewayProxyResult> => {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    const { user, total, product } = event.body;

    const orderResult = await OrderModel.create({
      total: total,
      user_real_id: user.user_real_id,
      full_name: user.full_name,
      email: user.email,
    });

    // Register Product
    await ProductModel.create({
      product_real_id: product.product_real_id,
      order_id: orderResult.id,
      name: product.name,
      description: product.description,
      color: product.color,
      price: product.price,
      quantity: product.quantity,
    });

    return {
      statusCode: 200,
      body: JSON.stringify(orderResult),
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 400,
      body: JSON.stringify(error),
    };
  }
};
export const handler = middyfy(main);
