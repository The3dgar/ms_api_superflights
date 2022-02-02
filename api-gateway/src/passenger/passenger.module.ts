import { Module } from '@nestjs/common';
import { ProxyModule } from 'src/common/proxy/proxy.module';
import { PassengerController } from './passenger.controller';
import { PassengerService } from './passenger.service';

@Module({
  imports: [ProxyModule],
  controllers: [PassengerController],
  providers: [PassengerService],
})
export class PassengerModule {}
