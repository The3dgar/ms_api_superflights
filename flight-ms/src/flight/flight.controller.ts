import {
  Controller,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { FlightMSG } from 'src/common/contants';

import { FlightDTO } from './dto/flight.dto';
import { FlightService } from './flight.service';

@Controller()
export class FlightController {
  constructor(private readonly flighService: FlightService) {}

  @MessagePattern(FlightMSG.CREATE)
  create(@Payload() flight: FlightDTO) {
    return this.flighService.create(flight);
  }

  @MessagePattern(FlightMSG.FIND_ALL)
  findAll() {
    return this.flighService.findAll();
  }

  @MessagePattern(FlightMSG.FIND_ONE)
  findOne(@Payload() id: string) {
    return this.flighService.findOne(id);
  }

  @MessagePattern(FlightMSG.UPDATE)
  update(@Payload() payload: any) {
    const { id, flight } = payload;
    return this.flighService.update(id, flight);
  }

  @MessagePattern(FlightMSG.DELETE)
  async delete(@Payload() id: string) {
    await this.flighService.delete(id);
    return {
      status: HttpStatus.OK,
      msg: 'Deleted',
    };
  }

  @MessagePattern(FlightMSG.ADD_PASSENGER)
  async addPassenger(@Payload() payload: any) {
    const { id, passengerId } = payload;
    return this.flighService.addPassenger(id, passengerId);
  }
}
