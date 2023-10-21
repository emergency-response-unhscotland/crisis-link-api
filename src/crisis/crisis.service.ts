import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCrisisDto, EditCrisisDto } from './dto';

@Injectable()
export class CrisisService {
  constructor(private prisma: PrismaService) {}

  getCrises() {
    return this.prisma.crisis.findMany({});
  }

  getCrisisByName(name: string) {
    return this.prisma.crisis.findFirst({
      where: {
        name: name,
      },
    });
  }

  getCrisesByLocation(location: string) {
    return this.prisma.crisis.findMany({
      where: {
        location: location,
      },
    });
  }

  getCrisesByType(type: string) {
    return this.prisma.crisis.findMany({
      where: {
        type: type,
      },
    });
  }

  getCrisesBySeverity(severity: number) {
    return this.prisma.crisis.findMany({
      where: {
        severity: severity,
      },
    });
  }

  async createCrisis(dto: CreateCrisisDto) {
    const crisis = await this.prisma.crisis.create({
      data: {
        ...dto,
      },
    });

    return crisis;
  }

  async editCrisisByName(name: string, dto: EditCrisisDto) {
    const crisis = await this.prisma.crisis.findUnique({
      where: {
        name: name,
      },
    });

    if (!crisis) throw new ForbiddenException('Resource does not exist');

    return this.prisma.crisis.update({
      where: {
        name: name,
      },
      data: {
        ...dto,
      },
    });
  }

  async deleteCrisisByName(name: string) {
    const crisis = await this.prisma.crisis.findUnique({
      where: {
        name: name,
      },
    });

    if (!crisis) throw new ForbiddenException('Resource does not exist');

    await this.prisma.crisis.delete({
      where: {
        name: name,
      },
    });
  }
}
