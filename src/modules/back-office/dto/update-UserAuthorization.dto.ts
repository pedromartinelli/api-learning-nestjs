import { IsNotEmpty } from "class-validator";

export class UpdateUserAuthorizationDto {
  
  @IsNotEmpty()
  last_name: string

}
