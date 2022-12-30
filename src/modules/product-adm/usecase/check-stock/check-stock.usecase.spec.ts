import Product from "../../domain/product.entity";
import CheckStockUseCase from "./check-stock.usecase";

const product = new Product({
  name: "Product 1",
  description: "Product 1 description",
  purchasePrice: 100,
  stock: 10,
});

const MockRepository = () => {
  return {
    add: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
  };
};

describe("CheckStock usecase unit test", () => {
  it("should get stock of a product", async () => {
    const productRepository = MockRepository();
    const usecase = new CheckStockUseCase(productRepository);

    const result = await usecase.execute({
      productId: product.id.id,
    });

    expect(productRepository.find).toHaveBeenCalled();
    expect(result.productId).toBeDefined;
    expect(result.stock).toBe(product.stock);
  });
});
