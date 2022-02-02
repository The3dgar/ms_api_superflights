import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { TokenGuard } from 'src/auth/guards/token.guard';
import { PassengerMSG } from 'src/common/contants';
import { PassengerInterface } from 'src/common/interfaces/passenger.interface';
import { ClientProxySuperFlight } from 'src/common/proxy/client.proxy';
import { PassengerDTO } from './dto/passenger.dto';

@ApiTags("Passenger")
@UseGuards(TokenGuard)
@Controller('api/v2/passenger')
export class PassengerController {
  constructor(private readonly clientProxy: ClientProxySuperFlight) {}

  private _clientProxyPassenger = this.clientProxy.clientProxyPassenger();

  async onApplicationBootstrap() {
    await this._clientProxyPassenger.connect();
  }  

  @Post()
  create(@Body() passenger: PassengerDTO): Observable<PassengerInterface> {
    return this._clientProxyPassenger.send(PassengerMSG.CREATE, passenger);
  }

  @Get()
  findAll(): Observable<PassengerInterface[]> {
    return this._clientProxyPassenger.send(PassengerMSG.FIND_ALL, '');
  }

  @Get(':id')
  findOne(@Param('id') id: string): Observable<PassengerInterface> {
    return this._clientProxyPassenger.send(PassengerMSG.FIND_ONE, id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() passenger: PassengerDTO,
  ): Observable<PassengerInterface> {
    return this._clientProxyPassenger.send(PassengerMSG.UPDATE, { id, passenger });
  }

  @Delete(':id')
  delete(@Param('id') id: string): Observable<any> {
    return this._clientProxyPassenger.send(PassengerMSG.DELETE, id);
  }
}
