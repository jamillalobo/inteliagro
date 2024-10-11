import { PartialType } from '@nestjs/mapped-types';
import { CreateAgronomistDto } from './create-agronomist.dto';

export class UpdateAgronomistDto extends PartialType(CreateAgronomistDto) {}
