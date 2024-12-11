import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  Length,
  MinLength,
} from "class-validator";

export class SignUpDto {
  constructor(obj?: any) {
    if (obj)
      ["firstName", "lastName", "email", "phoneNumber", "password"].forEach(
        (property) => (this[property] = obj[property])
      );
  }

  @IsNotEmpty()
  @Length(2, 30)
  firstName: string;

  @IsNotEmpty()
  @Length(2, 30)
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsOptional()
  @Length(10, 15)
  phoneNumber?: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
