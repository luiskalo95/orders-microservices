import OrderApplication from "../../application/order.application";
import { OrderBuilder, OrderEntity } from "../../domain/entities/order.entity";
import { Request, Response } from "express";

export default class OrderController {

  constructor(private orderApplication: OrderApplication) {
    this.insert = this.insert.bind(this);
  }

  public async insert(req: Request, res: Response): Promise<void> {
    const { userId, productId, name, itemCount, transaction } = req.body;

    const entity: OrderEntity = new OrderBuilder()
      .addUserId(userId)
      .addProductId(productId)
      .addName(name)
      .addItemCount(itemCount)
      .addTransaction(transaction)
      .addStatus("ORDERED")
      .build();

    const orderInserted = await this.orderApplication.create(entity);

    res.json(orderInserted);
  }
}
