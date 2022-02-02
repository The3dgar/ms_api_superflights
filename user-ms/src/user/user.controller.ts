import { Controller, HttpStatus, UseGuards } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserMSG } from 'src/common/contants';
import { UserDTO } from './dto/user.dto';
import { UserService } from './user.service';

// @UseGuards(TokenGuard)
@Controller('api/v1/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern(UserMSG.CREATE)
  create(@Payload() user: UserDTO) {
    return this.userService.create(user);
  }

  @MessagePattern(UserMSG.FIND_ALL)
  findAll() {
    return this.userService.findAll();
  }

  @MessagePattern(UserMSG.FIND_ONE)
  findOne(@Payload() id: string) {
    return this.userService.findOne(id);
  }

  @MessagePattern(UserMSG.UPDATE)
  update(@Payload() payload: any) {
    const { id, user } = payload;
    return this.userService.update(id, user);
  }

  @MessagePattern(UserMSG.DELETE)
  async delete(@Payload() id: string) {
    await this.userService.delete(id);
    return {
      status: HttpStatus.OK,
      msg: 'Deleted',
    };
  }

  @MessagePattern(UserMSG.VALID_USER)
  async validateUser(@Payload() payload) {
    const { username, password } = payload;
    const user = await this.userService.findByUsername(username);
    if (!user) return null;

    const isValidPassword = await this.userService.checkPassword(
      password,
      user.password,
    );
    if (!isValidPassword) return null;

    return user;
  }
}
