import { Module } from '@nestjs/common';
import { EntityToDomainMapper } from "./entityToDomain.mapper";

@Module({
  imports: [],
  exports: [EntityToDomainMapper],
  controllers: [],
  providers: [EntityToDomainMapper],
})
export class MappersModule {}
