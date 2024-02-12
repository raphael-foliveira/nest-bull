import { IsNumber, Min } from 'class-validator';

export class CreateTransactionDto {
  @IsNumber()
  userId: number;

  @IsNumber()
  @Min(1)
  amount: number;
}
