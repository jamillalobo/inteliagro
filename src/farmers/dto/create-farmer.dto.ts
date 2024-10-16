import {
    IsEmail,
    IsNotEmpty,
    IsNumber,
    IsString,
    Length,
  } from 'class-validator';
export class CreateFarmerDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @Length(11, 11)
    cpf: string;

    @IsNotEmpty()
    @IsString()
    cep: string;

    @IsNotEmpty()
    @IsNumber()
    sizeProperty: number;

    @IsNotEmpty()
    agronomistId: string;
}
