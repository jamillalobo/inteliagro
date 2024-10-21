
import { ApiProperty } from '@nestjs/swagger';
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
    @ApiProperty()
    name: string;

    @IsNotEmpty()
    @Length(11, 11)
    @ApiProperty()
    cpf: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    cep: string;

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty()
    sizeProperty: number;
}
