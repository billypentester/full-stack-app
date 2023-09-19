import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { User } from './entities/user.entity';

import { ApiBadRequestResponse, ApiOperation, ApiResponse, ApiTags, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiProperty } from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
export class UserController {
  
  constructor(private readonly userService: UserService) {}

  // get all users

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'Return all users'})
  @ApiInternalServerErrorResponse({ status: 500, description: 'Internal server error' })
  @Get()
  findAll(@Res() res: Response) {
    return this.userService.findAll(res)
  }

  // get user by id

  @ApiOperation({ summary: 'Get user by id' })
  @ApiResponse({ status: 200, description: 'Return user by ID'})
  @ApiInternalServerErrorResponse({ status: 500, description: 'Internal server error' })
  @Get(':id')
  findOne(@Param('id') id: string, @Res() res: Response) {
    return this.userService.findOne(+id, res);
  }

  // create a new user

  @ApiOperation({ summary: 'Create user' })
  @ApiCreatedResponse({ status: 201, description: 'User Created', type: User })
  @ApiProperty({ type: CreateUserDto })
  @ApiBadRequestResponse({ status: 400, description: 'Validation failed'})
  @Post()
  create(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    return this.userService.create(createUserDto, res);
  }

  // update user by id

  @ApiOperation({ summary: 'Update user by id' })
  @ApiResponse({ status: 200, description: 'Return user by id.'})
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto, @Res() res: Response) {
    console.log('updateUserDto', updateUserDto);
    return this.userService.update(+id, updateUserDto, res);
  }

  // delete user by id

  @ApiOperation({ summary: 'Delete user by id' })
  @ApiResponse({ status: 204, description: 'User deleted'})
  @ApiNotFoundResponse({ status: 404, description: 'User not found'})
  @ApiInternalServerErrorResponse({ status: 500, description: 'Internal server error' })
  @Delete(':id')
  remove(@Param('id') id: string, @Res() res: Response) {
    return this.userService.remove(+id, res);
  }

}
