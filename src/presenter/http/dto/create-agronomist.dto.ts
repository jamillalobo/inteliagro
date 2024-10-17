import {
    IsNotEmpty,
    IsNumber,
    IsString,
    Length,
  } from 'class-validator';

export class CreateAgronomistDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @Length(11, 11)
    cpf: string;
}
