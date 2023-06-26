import { IsEmail, IsString, IsNotEmpty, Length } from "class-validator";

export class CreateUserDto {

  @IsString({ message: "O nome tem que ser "})
  @IsNotEmpty()
  first_name: string;

  @IsNotEmpty()
  last_name: string;

  @IsEmail()
  email: string;

  @Length(8, 16)
  password: string;
}
