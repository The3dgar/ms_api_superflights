import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { map, Observable } from 'rxjs';
import { UserMSG } from 'src/common/contants';
import { UserInterface } from 'src/common/interfaces/user.interface';
import { ClientProxySuperFlight } from 'src/common/proxy/client.proxy';
import { UserDTO } from 'src/user/dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly clientProxy: ClientProxySuperFlight,
    private readonly tokenService: JwtService,
  ) {}

  private _clientProxyUser = this.clientProxy.clientProxyUsers();

  async onApplicationBootstrap() {
    await this._clientProxyUser.connect();
  }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this._clientProxyUser
      .send(UserMSG.VALID_USER, { username, password })
      .toPromise();

    if (!user) return null;
    return user;
  }

  async signIn(user: any) {
    const payload = {
      username: user.username,
      sub: user._id,
    };

    return {
      access_token: this.tokenService.sign(payload, {
        secret: process.env.JWT_SECRET,
        audience: process.env.APP_URL,
      }),
    };
  }

  async signUp(userDto: UserDTO) {
    return this._clientProxyUser.send(UserMSG.CREATE, userDto);
  }
}
