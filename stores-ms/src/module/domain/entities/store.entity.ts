export type STATUS = "ORDERED" | "PAID" | "STORED" | "DELIVERED" | "COMPLETED" | "CANCELLED";

export class StoreBuilder {

  public userId: string;
  public productId: string;
  public name: string;
  public itemCount: number;
  public transaction: string;
  public status: STATUS;

  public addUserId(userId: string): StoreBuilder {
    this.userId = userId;
    return this;
  }

  public addProductId(productId: string): StoreBuilder {
    this.productId = productId;
    return this;
  }

  public addName(name: string): StoreBuilder {
    this.name = name;
    return this;
  }

  public addItemCount(itemCount: number): StoreBuilder {
    this.itemCount = itemCount;
    return this;
  }

  public addTransaction(transaction: string): StoreBuilder {
    this.transaction = transaction;
    return this;
  }

  public addStatus(status: STATUS): StoreBuilder {
    this.status = status;
    return this;
  }

  public build(): StoreEntity {
    return new StoreEntity(this);
  }
}

export class StoreEntity {
  
  public userId: string;
  public productId: string;
  public name: string;
  public itemCount: number;
  public transaction: string;
  public status: STATUS;

  constructor(builder: StoreBuilder) {
    Object.assign(this, builder);
  }
}
