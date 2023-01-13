import Id from "../../../@shared/domain/value-object/id.value-object";
import Address from "../../value-object/address";
import Product from "../../value-object/product";
import { FindInvoiceUseCase } from "./find.usecase";

const invoice = {
  id: new Id("123"),
  name: "Invoice 1",
  document: "Document",
  address: new Address({
    city: "City",
    complement: "Complement",
    number: "4",
    state: "State",
    street: "Street",
    zipCode: "ZipCode",
  }),
  items: [new Product({ name: "Product 1", price: 200 })],
  createdAt: new Date(),
  updatedAt: new Date(),
  total: 200,
};

const mockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(invoice)),
    generate: jest.fn(),
  };
};

describe("find invoice unit tests", () => {
  it("Should find invoice", async () => {
    const invoiceRepository = mockRepository();
    const usecase = new FindInvoiceUseCase(invoiceRepository);

    const result = await usecase.execute({
      id: "123",
    });

    expect(result.name).toEqual(invoice.name);
    expect(result.document).toEqual(invoice.document);
    expect(result.address).toEqual(invoice.address);
    expect(result.items).toEqual(invoice.items);
    expect(result.total).toEqual(200);
  });
});
