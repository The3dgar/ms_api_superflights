import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TokenGuard } from 'src/auth/guards/token.guard';
import { FlightMSG, PassengerMSG } from 'src/common/contants';
import { FlightInterface } from 'src/common/interfaces/flight.interface';
import { ClientProxySuperFlight } from 'src/common/proxy/client.proxy';
import { FlightDTO } from './dto/flight.dto';

@ApiTags('Flight')
@UseGuards(TokenGuard)
@Controller('api/v2/flight')
export class FlightController {
  constructor(private readonly clientProxy: ClientProxySuperFlight) {}

  private _clientProxyFlight = this.clientProxy.clientProxyFlight();
  private _clientProxyPassenger = this.clientProxy.clientProxyPassenger();

  async onApplicationBootstrap() {
    await this._clientProxyFlight.connect();
    await this._clientProxyPassenger.connect();
  }

  @Post()
  create(@Body() data: FlightDTO): Observable<FlightInterface> {
    return this._clientProxyFlight.send(FlightMSG.CREATE, data);
  }

  @Get()
  findAll(): Observable<FlightInterface[]> {
    return this._clientProxyFlight.send(FlightMSG.FIND_ALL, '');
  }

  @Get(':id')
  findOne(@Param('id') id: string): Observable<FlightInterface> {
    return this._clientProxyFlight.send(FlightMSG.FIND_ONE, id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() flight: FlightDTO,
  ): Observable<FlightInterface> {
    return this._clientProxyFlight.send(FlightMSG.UPDATE, { id, flight });
  }

  @Delete(':id')
  delete(@Param('id') id: string): Observable<any> {
    return this._clientProxyFlight.send(FlightMSG.DELETE, id);
  }

  @Post(':id/passenger/:passengerId')
  async addPassenger(
    @Param('id') id: string,
    @Param('passengerId') passengerId: string,
  ) {
    const passenger = await this._clientProxyPassenger
      .send(PassengerMSG.FIND_ONE, passengerId)
      .pipe(
        map((pax) => {
          return pax;
        }),
      );

    if (!passenger)
      throw new HttpException('Passenger not found', HttpStatus.NOT_FOUND);

    return this._clientProxyFlight.send(FlightMSG.ADD_PASSENGER, {
      id,
      passengerId,
    });
  }
}
