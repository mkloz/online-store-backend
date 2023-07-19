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
import { UserService } from './user.service';
import { User as UserPayload } from './user.decorator';
import { JwtPayload } from 'src/auth/dto/jwt-payload.dto';
import { User } from './user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RoleAuthGuard } from 'src/auth/guards/role-auth.guard';
import { IDDto } from 'src/common/dto/id.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
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
import { RelationsExistsPipe } from './pipes/relations-exists.pipe';
import { UserExistPipe } from './pipes/user-exist.pipe';

@ApiUser()
@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get('me')
  @UseGuards(AuthGuard)
  @ApiUserMe()
  getMe(@UserPayload() user: JwtPayload): Promise<User> {
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
    @UserPayload() user: JwtPayload,
    @Body(RelationsExistsPipe) dto: UpdateUserDto,
  ): Promise<User> {
    return this.userService.updateById(user.id, dto);
  }
  @Patch(':id')
  @UseGuards(RoleAuthGuard)
  @Roles(Role.ADMIN)
  @ApiUserByIdUpdate()
  updateById(
    @Param() { id }: IDDto,
    @Body(RelationsExistsPipe) dto: UpdateUserDto,
  ): Promise<User> {
    return this.userService.updateById(id, dto);
  }

  @Delete('me')
  @UseGuards(AuthGuard)
  @ApiUserMeDelete()
  deleteMe(@UserPayload() user: JwtPayload): Promise<User> {
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
