import { Sequelize } from "sequelize-typescript";
import Id from "../../@shared/domain/value-object/id.value-object";
import InvoiceEntity from "../domain/invoice.entity";
import Address from "../value-object/address";
import Product from "../value-object/product";
import { InvoiceModel } from "./invoice.model";
import InvoiceRepository from "./invoice.repository";
import { ProductInvoiceModel } from "./product.invoice.model";

const invoice = {
  name: "Invoice 1",
  document: "Document",
  city: "City",
  complement: "Complement",
  number: "4",
  state: "State",
  street: "Street",
  zipCode: "ZipCode",
  items: [{ name: "Product 1", price: 200, id: "12" }],
};

describe("InvoiceRepository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([InvoiceModel, ProductInvoiceModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should find a invoice", async () => {
    await InvoiceModel.create(
      {
        id: new Id("123").id,
        name: "Invoice 1",
        document: "Document",
        city: "City",
        complement: "Complement",
        number: "4",
        state: "State",
        street: "Street",
        zipCode: "ZipCode",
        items: [{ name: "Product 1", price: 200, id: "12" }],
        createdAt: new Date(),
        total: 200,
      },
      {
        include: [{ model: ProductInvoiceModel }],
      }
    );

    const invoiceDb = await InvoiceModel.findOne({
      where: { id: "123" },
      include: ["items"],
    });
    const repository = new InvoiceRepository();
    const result = await repository.find(invoiceDb.id);

    expect(result.id.id).toEqual(invoiceDb.id);
    expect(result.name).toEqual(invoiceDb.name);
    expect(result.document).toEqual(invoiceDb.document);
    expect(result.address.complement).toEqual(invoiceDb.complement);
  });

  it("should generate a invoice", async () => {
    const invoiceRepository = new InvoiceRepository();

    const generatedInvoice = await invoiceRepository.generate(invoice);

    const result = await InvoiceModel.findOne({
      where: { id: generatedInvoice.id },
      include: ["items"],
    });

    expect(result).toBeDefined();
    expect(result.name).toBe(invoice.name);
    expect(result.document).toStrictEqual(invoice.document);
  });
});
