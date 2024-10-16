import { IsNotEmpty, IsNumber, IsString, Length } from "class-validator";
import { PlantingStage } from "../enum/plantingStage.enum";
import { WaterConsumption } from "../enum/waterConsumption.enum";

export class CreatePlantationDto {

    @IsNumber()
    @IsNotEmpty()
    area: number;

    @IsString()
    @IsNotEmpty()
    waterConsumption: WaterConsumption;

    @IsNotEmpty()
    plantingStage: PlantingStage;

    @IsString()
    @IsNotEmpty()
    location: string;

    @IsNotEmpty()
    @Length(11, 11)
    farmerCpf: string;
}
