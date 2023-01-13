import {
  Table,
  Model,
  PrimaryKey,
  Column,
  BelongsTo,
} from "sequelize-typescript";
import { InvoiceModel } from "./invoice.model";

@Table({
  tableName: "productsInvoice",
  timestamps: false,
})
export class ProductInvoiceModel extends Model {
  @PrimaryKey
  @Column
  declare id: string;
  @Column({ allowNull: true })
  declare name: string;
  @Column({ allowNull: true })
  declare price: number;
  @BelongsTo(() => InvoiceModel, { foreignKey: "invoice_id" })
  Invoice: InvoiceModel[];
}
