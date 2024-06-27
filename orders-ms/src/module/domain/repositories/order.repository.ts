import { OrderEntity, STATUS } from "../../domain/entities/order.entity";

export default interface OrderRepository {
  
  insert(order: OrderEntity): Promise<OrderEntity>;
  update(transaction: string, status: STATUS): Promise<string>;
}
