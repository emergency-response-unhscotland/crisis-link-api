import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateCrisisDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsNumber()
  @IsNotEmpty()
  severity: number;

  @IsString()
  @IsOptional()
  image?: string;

  @IsString()
  @IsOptional()
  link?: string;
}
