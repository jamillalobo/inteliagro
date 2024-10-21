import { IsNotEmpty, IsNumber, IsString, Length } from "class-validator";
import { PlantingStage } from "../../../commom/enums/plantingStage.enum";
import { WaterConsumption } from "../../../commom/enums/waterConsumption.enum";
import { ApiProperty } from "@nestjs/swagger";

export class CreatePlantationDto {

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    area: number;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    waterConsumption: WaterConsumption;

    @IsNotEmpty()
    @ApiProperty()
    plantingStage: PlantingStage;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    location: string;

    @IsNotEmpty()
    @Length(11, 11)
    @ApiProperty()
    farmerCpf: string;
}
