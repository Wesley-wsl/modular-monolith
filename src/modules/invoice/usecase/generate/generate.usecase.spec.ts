import Id from "../../../@shared/domain/value-object/id.value-object";
import Product from "../../value-object/product";
import GenerateInvoiceUseCase from "./generate.usecase";

const invoiceOutput = {
  id: new Id("123"),
  name: "Invoice 1",
  document: "Document",
  city: "City",
  complement: "Complement",
  number: "4",
  state: "State",
  street: "Street",
  zipCode: "ZipCode",
  items: [new Product({ name: "Product 1", price: 200 })],
  total: () => 200,
};

const invoiceIput = {
  name: "Invoice 1",
  document: "Document",
  city: "City",
  complement: "Complement",
  number: "4",
  state: "State",
  street: "Street",
  zipCode: "ZipCode",
  items: [new Product({ name: "Product 1", price: 200 })],
};

const mockRepository = () => {
  return {
    find: jest.fn(),
    generate: jest.fn().mockReturnValue(Promise.resolve(invoiceOutput)),
  };
};

describe("Generate invoice unit tests", () => {
  it("Should generate a invoice", async () => {
    const repository = mockRepository();

    const usecase = new GenerateInvoiceUseCase(repository);

    const result = await usecase.execute(invoiceIput);

    expect(result).toBeTruthy();
    expect(result).toEqual(invoiceOutput);
  });
});
