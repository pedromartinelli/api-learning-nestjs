import { IsEmail, IsString, IsNotEmpty, Length, IsNumber } from "class-validator";

export class CreateItemDto {

  @IsString()
  @IsNotEmpty({
    message: 'The item should contain a name.'
  })
  name: string;

  @IsNotEmpty({
    message: 'The item should contain a description.'
  })
  description: string;

  @IsNumber()
  @IsNotEmpty({
    message: 'The item should contain a price.'
  })
  price: number;
}