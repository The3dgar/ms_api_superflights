import { Module } from '@nestjs/common';
import { ProxyModule } from 'src/common/proxy/proxy.module';
import { FlightController } from './flight.controller';
import { FlightService } from './flight.service';

@Module({
  imports: [ProxyModule],
  controllers: [FlightController],
  providers: [FlightService]
})
export class FlightModule {}
