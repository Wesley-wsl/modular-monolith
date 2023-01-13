import { AggregateRoot } from "../../@shared/domain/entity/aggregate-root.interface";
import BaseEntity from "../../@shared/domain/entity/base.entity";
import Id from "../../@shared/domain/value-object/id.value-object";
import Address from "../value-object/address";
import Product from "../value-object/product";

export interface IInvoiceEntity {
  id?: Id;
  name: string;
  document: string;
  address: Address;
  items: Product[];
  createdAt?: Date;
  updatedAt?: Date;
  total?: number;
}

export default class InvoiceEntity extends BaseEntity implements AggregateRoot {
  _name: string;
  _document: string;
  _address: Address;
  _items: Product[];

  constructor(props: IInvoiceEntity) {
    super(props.id, props.createdAt, props.updatedAt);
    this._name = props.name;
    this._document = props.document;
    this._address = props.address;
    this._items = props.items;
  }

  get name() {
    return this._name;
  }

  get document() {
    return this._document;
  }

  get address() {
    return this._address;
  }

  get items() {
    return this._items;
  }

  total() {
    return this.items.reduce((prev, curr) => prev + curr.price, 0);
  }
}
