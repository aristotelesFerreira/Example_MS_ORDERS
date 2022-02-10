import "source-map-support/register";
import "reflect-metadata";

import { middyfy } from "../../utility/lambda";

import { APIGatewayProxyResult, Context } from "aws-lambda";
import { IHandlerInput } from "src/utility/types";
import { OrderModel } from "src/models/orderModel";

import { ProductModel } from "src/models/productModel";
const main = async (
  event: IHandlerInput,
  context: Context
): Promise<APIGatewayProxyResult> => {
  try {
    // const { order_id } = event.body;
    const orders = await OrderModel.findAndCountAll({
      include: [{ model: ProductModel }],
    });
    return {
      statusCode: 200,
      body: JSON.stringify(orders),
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
