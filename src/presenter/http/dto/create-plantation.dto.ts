import { IsNotEmpty, IsNumber, IsString, Length } from "class-validator";
import { PlantingStage } from "../../../commom/enums/plantingStage.enum";
import { WaterConsumption } from "../../../commom/enums/waterConsumption.enum";

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
