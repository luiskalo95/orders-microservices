export type STATUS = "ORDERED" | "PAID" | "STORED" | "DELIVERED" | "COMPLETED" | "CANCELLED";

export class DeliveryBuilder {

  public userId: string;
  public productId: string;
  public name: string;
  public itemCount: number;
  public transaction: string;
  public status: STATUS;

  public addUserId(userId: string): DeliveryBuilder {
    this.userId = userId;
    return this;
  }

  public addProductId(productId: string): DeliveryBuilder {
    this.productId = productId;
    return this;
  }

  public addName(name: string): DeliveryBuilder {
    this.name = name;
    return this;
  }

  public addItemCount(itemCount: number): DeliveryBuilder {
    this.itemCount = itemCount;
    return this;
  }

  public addTransaction(transaction: string): DeliveryBuilder {
    this.transaction = transaction;
    return this;
  }

  public addStatus(status: STATUS): DeliveryBuilder {
    this.status = status;
    return this;
  }

  public build(): DeliveryEntity {
    return new DeliveryEntity(this);
  }
}

export class DeliveryEntity {

  public userId: string;
  public productId: string;
  public name: string;
  public itemCount: number;
  public transaction: string;
  public status: STATUS;

  constructor(builder: DeliveryBuilder) {
    Object.assign(this, builder);
  }
}
