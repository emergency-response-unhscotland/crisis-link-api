import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class EditCrisisDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  link?: string;
}
