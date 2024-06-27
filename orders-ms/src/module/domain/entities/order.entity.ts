export type STATUS = "ORDERED" | "PAID" | "STORED" | "DELIVERED" | "COMPLETED" | "CANCELLED";

export class OrderBuilder {

  public userId: string;
  public productId: string;
  public name: string;
  public itemCount: number;
  public transaction: string;
  public status: STATUS;

  public addUserId(userId: string): OrderBuilder {
    this.userId = userId;
    return this;
  }

  public addProductId(productId: string): OrderBuilder {
    this.productId = productId;
    return this;
  }

  public addName(name: string): OrderBuilder {
    this.name = name;
    return this;
  }

  public addItemCount(itemCount: number): OrderBuilder {
    this.itemCount = itemCount;
    return this;
  }

  public addTransaction(transaction: string): OrderBuilder {
    this.transaction = transaction;
    return this;
  }

  public addStatus(status: STATUS): OrderBuilder {
    this.status = status;
    return this;
  }

  public build(): OrderEntity {
    return new OrderEntity(this);
  }
}

export class OrderEntity {
  public userId: string;
  public productId: string;
  public name: string;
  public itemCount: number;
  public transaction: string;
  public status: STATUS;

  constructor(builder: OrderBuilder) {
    Object.assign(this, builder);
  }
}
