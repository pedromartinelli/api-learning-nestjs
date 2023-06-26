import { Length } from "class-validator";

export class ResetUserPasswordDto {

  @Length(8, 16)
  password: string;

}