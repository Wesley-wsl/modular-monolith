import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import { IInvoiceEntity } from "../domain/invoice.entity";
import InvoiceFacadeInterface, {
  GenerateInvoiceUseCaseInputDto,
  GenerateInvoiceUseCaseOutputDto,
  IFindInput,
} from "./invoice.facade.interface";

export interface UseCaseProps {
  findUsecase: UseCaseInterface;
  generateUseCase: UseCaseInterface;
}

export default class InvoiceFacade implements InvoiceFacadeInterface {
  private _findUsecase: UseCaseInterface;
  private _generateUseCase: UseCaseInterface;

  constructor(usecaseProps: UseCaseProps) {
    this._findUsecase = usecaseProps.findUsecase;
    this._generateUseCase = usecaseProps.generateUseCase;
  }

  async find({ id }: IFindInput): Promise<IInvoiceEntity> {
    return await this._findUsecase.execute({ id });
  }

  async generate(
    input: GenerateInvoiceUseCaseInputDto
  ): Promise<GenerateInvoiceUseCaseOutputDto> {
    return await this._generateUseCase.execute(input);
  }
}
