import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { FlightModel, PassengerModel } from 'src/common/models/models';
import { FlightController } from './flight.controller';
import { FlightService } from './flight.service';
import { FlightSchema } from './schema/flight.schema';
import { PassengerSchema } from './schema/passenger.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: FlightModel.name,
        useFactory: () => FlightSchema.plugin(require('mongoose-autopopulate')),
      },
      {
        name: PassengerModel.name,
        useFactory: () => PassengerSchema,
      },
    ]),
  ],
  controllers: [FlightController],
  providers: [FlightService],
})
export class FlightModule {}
