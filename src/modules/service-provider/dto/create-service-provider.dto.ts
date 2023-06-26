import { IsString, IsNotEmpty, IsDateString } from "class-validator";

export class CreateServiceProviderDto {

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  CPF: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  CEP: string;

  @IsDateString()
  @IsNotEmpty()
  birth_date: Date;
}
