import { DeliveryEntity, STATUS } from "../entities/delivery.entity";

export default interface Repository {
  
  insert(delivery: DeliveryEntity): Promise<DeliveryEntity>;
  update(transaction: string, status: STATUS): Promise<string>;
}
