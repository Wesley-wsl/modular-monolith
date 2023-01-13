interface IProduct {
  id?: string;
  name: string;
  price: number;
}

export default class Product {
  private _id: string;
  private _name: string;
  private _price: number;

  constructor(props: IProduct) {
    this._id = props.id;
    this._name = props.name;
    this._price = props.price;
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get price() {
    return this._price;
  }
}
