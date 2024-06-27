import { DeliveryEntity, STATUS } from "../../domain/entities/delivery.entity";
import Repository from "../../domain/repositories/delivery.repository";
import Model from "../models/delivery.model";

export default class DeliveryInfrastructure implements Repository {

  public async insert(delivery: DeliveryEntity): Promise<DeliveryEntity> {
    await Model.create(delivery);
    return delivery;
  }

  public async update(transaction: string, status: STATUS): Promise<string> {
    await Model.findOneAndUpdate({ transaction }, { status });
    return status;
  }
}
