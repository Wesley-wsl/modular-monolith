import { IInvoiceEntity } from "../domain/invoice.entity";

export interface GenerateInvoiceUseCaseInputDto {
  name: string;
  document: string;
  street: string;
  number: string;
  complement: string;
  city: string;
  state: string;
  zipCode: string;
  items: {
    id: string;
    name: string;
    price: number;
  }[];
}

export interface GenerateInvoiceUseCaseOutputDto {
  id: string;
  name: string;
  document: string;
  street: string;
  number: string;
  complement: string;
  city: string;
  state: string;
  zipCode: string;
  items: {
    id: string;
    name: string;
    price: number;
  }[];
  total: number;
}

export interface IFindInput {
  id: string;
}

export default interface InvoiceFacadeInterface {
  find(input: IFindInput): Promise<IInvoiceEntity>;
  generate(
    input: GenerateInvoiceUseCaseInputDto
  ): Promise<GenerateInvoiceUseCaseOutputDto>;
}
