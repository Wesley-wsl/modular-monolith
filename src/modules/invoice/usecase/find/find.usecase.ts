import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import { InvoiceGateway } from "../../gateway/invoice.gateway";
import Product from "../../value-object/product";
import {
  FindInvoiceUseCaseInputDTO,
  FindInvoiceUseCaseOutputDTO,
} from "./find.dto";

export class FindInvoiceUseCase implements UseCaseInterface {
  constructor(private invoiceRepository: InvoiceGateway) {}

  async execute(
    input: FindInvoiceUseCaseInputDTO
  ): Promise<FindInvoiceUseCaseOutputDTO> {
    const invoice = await this.invoiceRepository.find(input.id);

    return {
      address: invoice.address,
      document: invoice.document,
      id: invoice.id.id,
      name: invoice.name,
      items: invoice.items.map((item) => new Product(item)),
      createdAt: invoice.createdAt,
      total: invoice.total,
    };
  }
}
