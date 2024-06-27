import { StoreEntity, STATUS } from "../../domain/entities/store.entity";
import Repository from "../../domain/repositories/store.repository";
import Model from "../models/store.model";

export default class StoreInfrastructure implements Repository {

  public async insert(store: StoreEntity): Promise<StoreEntity> {
    await Model.create(store);
    return store;
  }

  public async update(transaction: string, status: STATUS): Promise<string> {
    await Model.findOneAndUpdate({ transaction }, { status });
    return status;
  }
}
