import { Sequelize } from "sequelize-typescript";
import Id from "../../@shared/domain/value-object/id.value-object";
import InvoiceFacadeFactory from "../factory/invoice.facade.factory";
import { InvoiceModel } from "../repository/invoice.model";
import { ProductInvoiceModel } from "../repository/product.invoice.model";

describe("InvoiceFacade test", () => {
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

  it("should generate invoice", async () => {
    const facade = InvoiceFacadeFactory.create();

    const input = {
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
    };

    const generateResult = await facade.generate(input);

    expect(generateResult).toBeDefined();
    expect(generateResult.id).toBeDefined();
    expect(generateResult.name).toBe(input.name);
    expect(generateResult.complement).toBe(input.complement);
  });

  it("should find a invoice", async () => {
    const facade = InvoiceFacadeFactory.create();

    const input = {
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
    };

    const generateResult = await facade.generate(input);
    const invoice = await facade.find({ id: generateResult.id });

    expect(invoice).toBeDefined();
    expect(invoice.id).toBe(generateResult.id);
    expect(invoice.name).toBe(generateResult.name);
    expect(invoice.address.complement).toBe(generateResult.complement);
  });
});
