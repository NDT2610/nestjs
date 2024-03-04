import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CreateProfileUserDto } from 'src/users/dtos/CreateProfileUser.dto';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { CreateUserPostsDto } from 'src/users/dtos/CreateUserPost.dto';
import { UpdateUsersDto } from 'src/users/dtos/UpdateUser.dto';
import { UsersService } from 'src/users/services/users/users.service';

@Controller('users')
export class UsersController {

  constructor(private userService: UsersService) {}

  @Get()
  async getUsers() {
    const users = await this.userService.findUsers();
    return users;
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    this.userService.createUser(createUserDto);

  }

  @Put(':id')
  async updateUsersById(@Param('id') id: number, 
  @Body() updateUsersDto: UpdateUsersDto ){
   await this.userService.updateUsers(id,updateUsersDto);
  }

  @Delete(':id')
  async deleteUsersById(@Param('id') id: number, ){
   await this.userService.deleteUsers(id);
  }

  @Post(':id/profiles')
  createProfileUser(@Param('id',ParseIntPipe) id: number,
    @Body() createProfilUseDto: CreateProfileUserDto){
    return  this.userService.createProfileUser(id, createProfilUseDto)
  }

  @Post(':id/posts')
  createUserPost(@Param('id',ParseIntPipe) id:number, 
  @Body() createUserPostsDto: CreateUserPostsDto){
    return this.userService.createUserPost(id,createUserPostsDto)
  }
}
