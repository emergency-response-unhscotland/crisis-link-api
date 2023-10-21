import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from '../auth/decorator';
import { JwtGuard, RolesGuard } from '../auth/guard';
import { Roles } from '../auth/decorator';
import { CrisisService } from './crisis.service';
import { CreateCrisisDto, EditCrisisDto } from './dto';

@UseGuards(JwtGuard)
@Controller('crises')
export class CrisisController {
  constructor(private crisisService: CrisisService) {}

  @Get()
  @Roles('USER')
  getCrisis() {
    return this.crisisService.getCrises();
  }

  @Get(':name')
  @Roles('USER')
  getCrisisByName(@Param('name') name: string) {
    return this.crisisService.getCrisisByName(name);
  }

  @Get('location/:location')
  @Roles('USER')
  getCrisisByLocation(@Param('location') location: string) {
    return this.crisisService.getCrisesByLocation(location);
  }

  @Get('type/:type')
  @Roles('USER')
  getCrisisByType(@Param('type') type: string) {
    return this.crisisService.getCrisesByType(type);
  }

  @Get('severity/:severity')
  @Roles('USER')
  getCrisisBySeverity(@Param('severity') severity: number) {
    return this.crisisService.getCrisesBySeverity(severity);
  }

  @Post()
  @Roles('ADMIN')
  createCrisis(@Body() dto: CreateCrisisDto) {
    return this.crisisService.createCrisis(dto);
  }

  @Patch(':name')
  @Roles('ADMIN')
  editCrisisByName(@Param('name') name: string, @Body() dto: EditCrisisDto) {
    return this.crisisService.editCrisisByName(name, dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':name')
  deleteCrisisByName(@Param('name') name: string) {
    return this.crisisService.deleteCrisisByName(name);
  }
}
