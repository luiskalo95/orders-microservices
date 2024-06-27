import { OrderEntity, STATUS } from "../../domain/entities/order.entity";
import Repository from "../../domain/repositories/order.repository";
import Model from "../models/order.model";

export default class OrderInfrastructure implements Repository {

  public async insert(order: OrderEntity): Promise<OrderEntity> {
    await Model.create(order);
    return order;
  }

  public async update(transaction: string, status: STATUS): Promise<string> {
    await Model.findOneAndUpdate({ transaction }, { status });

    return status;
  }
}
