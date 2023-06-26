import { Type } from "class-transformer";
import { IsEmail, IsString, IsNotEmpty, Length, IsNumber, ValidateNested } from "class-validator";

class ItemDto {
  @IsNotEmpty()
  item_id: string;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}


export class CreateOrderDto {

  @IsNotEmpty()
  status: number;

  @IsNotEmpty()
  table: string;

  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => ItemDto)
  items: ItemDto[];

}