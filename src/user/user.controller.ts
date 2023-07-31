import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './services/user.service';
import { User as UserPayload } from '../shared/decorators/user.decorator';
import { User } from './user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard, RoleAuthGuard } from '@shared/guards';
import { IDDto, JwtPayloadDto } from '@shared/dto';
import { Roles } from '@shared/decorators/roles.decorator';
import { Role } from '@prisma/client';
import {
  ApiUser,
  ApiUserById,
  ApiUserByIdDelete,
  ApiUserByIdUpdate,
  ApiUserMe,
  ApiUserMeDelete,
  ApiUserMeUpdate,
} from './docs';
import { UserExistPipe } from './pipes/user-exist.pipe';
import { Prefix } from '@utils/prefix.enum';

@ApiUser()
@Controller(Prefix.USERS)
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get('me')
  @UseGuards(AuthGuard)
  @ApiUserMe()
  getMe(@UserPayload() user: JwtPayloadDto): Promise<User> {
    return this.userService.getById(user.id);
  }

  @Get(':id')
  @UseGuards(RoleAuthGuard)
  @Roles(Role.ADMIN)
  @ApiUserById()
  getById(@Param() { id }: IDDto): Promise<User> {
    return this.userService.getById(id);
  }

  @Patch('me')
  @UseGuards(AuthGuard)
  @ApiUserMeUpdate()
  updateMe(
    @UserPayload() user: JwtPayloadDto,
    @Body() dto: UpdateUserDto,
  ): Promise<User> {
    return this.userService.updateById(user.id, dto);
  }
  @Patch(':id')
  @UseGuards(RoleAuthGuard)
  @Roles(Role.ADMIN)
  @ApiUserByIdUpdate()
  updateById(
    @Param() { id }: IDDto,
    @Body() dto: UpdateUserDto,
  ): Promise<User> {
    return this.userService.updateById(id, dto);
  }

  @Delete('me')
  @UseGuards(AuthGuard)
  @ApiUserMeDelete()
  deleteMe(@UserPayload() user: JwtPayloadDto): Promise<User> {
    return this.userService.deleteById(user.id);
  }

  @Delete(':id')
  @UseGuards(RoleAuthGuard)
  @Roles(Role.ADMIN)
  @ApiUserByIdDelete()
  deleteById(@Param(UserExistPipe) { id }: IDDto): Promise<User> {
    return this.userService.deleteById(id);
  }
}
