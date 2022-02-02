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
import { UserMSG } from 'src/common/contants';
import { UserInterface } from 'src/common/interfaces/user.interface';
import { ClientProxySuperFlight } from 'src/common/proxy/client.proxy';
import { UserDTO } from './dto/user.dto';

@ApiTags("User")
@UseGuards(TokenGuard)
@Controller('api/v2/user')
export class UserController {
  constructor(private readonly clientProxy: ClientProxySuperFlight) {}
  private _clientProxyUser = this.clientProxy.clientProxyUsers();

  async onApplicationBootstrap() {
    await this._clientProxyUser.connect();
  }  

  @Post()
  create(@Body() user: UserDTO): Observable<UserInterface> {
    return this._clientProxyUser.send(UserMSG.CREATE, user);
  }

  @Get()
  findAll(): Observable<UserInterface[]> {
    return this._clientProxyUser.send(UserMSG.FIND_ALL, '');
  }

  @Get(':id')
  findOne(@Param('id') id: string): Observable<UserInterface> {
    return this._clientProxyUser.send(UserMSG.FIND_ONE, id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() user: UserDTO,
  ): Observable<UserInterface> {
    return this._clientProxyUser.send(UserMSG.UPDATE, { id, user });
  }

  @Delete(':id')
  delete(@Param('id') id: string): Observable<any> {
    return this._clientProxyUser.send(UserMSG.DELETE, id);
  }
}
