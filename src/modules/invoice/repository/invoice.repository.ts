import Id from "../../@shared/domain/value-object/id.value-object";
import InvoiceEntity, { IInvoiceEntity } from "../domain/invoice.entity";
import {
  GenerateInvoiceUseCaseInputDto,
  GenerateInvoiceUseCaseOutputDto,
  InvoiceGateway,
} from "../gateway/invoice.gateway";
import Address from "../value-object/address";
import Product from "../value-object/product";
import { InvoiceModel } from "./invoice.model";
import { ProductInvoiceModel } from "./product.invoice.model";

export default class InvoiceRepository implements InvoiceGateway {
  async find(id: string): Promise<IInvoiceEntity> {
    const invoice = await InvoiceModel.findOne({
      where: { id },
      include: ["items"],
    });

    if (!invoice) {
      throw new Error("Client not found");
    }

    const invoiceValidated = new InvoiceEntity({
      id: new Id(invoice.id),
      document: invoice.document,
      address: new Address({
        street: invoice.street,
        number: invoice.number,
        complement: invoice.complement,
        city: invoice.city,
        state: invoice.state,
        zipCode: invoice.zipCode,
      }),
      items: invoice.items.map(
        (item) =>
          new Product({ name: item.name, price: item.price, id: item.id })
      ),
      name: invoice.name,
      createdAt: invoice.createdAt,
    });

    return {
      id: invoiceValidated.id,
      document: invoiceValidated.document,
      address: invoiceValidated.address,
      items: invoiceValidated.items,
      name: invoiceValidated.name,
      createdAt: invoiceValidated.createdAt,
      total: invoiceValidated.total(),
    };
  }

  async generate(
    input: GenerateInvoiceUseCaseInputDto
  ): Promise<GenerateInvoiceUseCaseOutputDto> {
    const newInvoice = new InvoiceEntity({
      document: input.document,
      address: new Address({
        street: input.street,
        number: input.number,
        complement: input.complement,
        city: input.city,
        state: input.state,
        zipCode: input.zipCode,
      }),
      items: input.items.map((item) => new Product(item)),
      name: input.name,
    });

    const resultFormated = {
      id: newInvoice.id.id,
      city: newInvoice.address.city,
      complement: newInvoice.address.complement,
      document: newInvoice.document,
      items: newInvoice.items,
      name: newInvoice.name,
      number: newInvoice.address.number,
      state: newInvoice.address.state,
      street: newInvoice.address.street,
      zipCode: newInvoice.address.zipCode,
      total: newInvoice.total(),
    };

    await InvoiceModel.create(resultFormated, {
      include: [{ model: ProductInvoiceModel }],
    });

    return resultFormated;
  }
}
