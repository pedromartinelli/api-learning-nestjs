import { IsNotEmpty } from "class-validator";

export class CreateBackOfficeDto {
  
  @IsNotEmpty()
  authorization: number

}
