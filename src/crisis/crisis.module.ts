import { Module } from '@nestjs/common';
import { CrisisController } from './crisis.controller';
import { CrisisService } from './crisis.service';

@Module({
  controllers: [CrisisController],
  providers: [CrisisService],
})
export class CrisisModule {}
