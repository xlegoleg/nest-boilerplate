import { IsCreditCard, IsNotEmpty, IsString } from 'class-validator';

export class CardDto {
  @IsString()
  @IsNotEmpty()
  cvc: string;

  @IsNotEmpty()
  exp_month: number;

  @IsNotEmpty()
  exp_year: number;

  @IsCreditCard()
  number: string;
}
