import InvoiceFacade from "../facade/invoice.facade";
import InvoiceRepository from "../repository/invoice.repository";
import { FindInvoiceUseCase } from "../usecase/find/find.usecase";
import GenerateInvoiceUseCase from "../usecase/generate/generate.usecase";

export default class InvoiceFacadeFactory {
  static create() {
    const repository = new InvoiceRepository();
    const findUsecase = new FindInvoiceUseCase(repository);
    const generateUseCase = new GenerateInvoiceUseCase(repository);
    const facade = new InvoiceFacade({
      generateUseCase: generateUseCase,
      findUsecase: findUsecase,
    });

    return facade;
  }
}
