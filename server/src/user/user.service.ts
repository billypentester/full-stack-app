import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { User } from './entities/user.entity';
import { dataSource } from './../../db/datasource';

dataSource.initialize()

@Injectable()
export class UserService {

  async create(createUserDto: CreateUserDto) {
    try{
      const user = new User()
      user.name = createUserDto.name
      user.email = createUserDto.email
      user.age = createUserDto.age
      return await dataSource.manager.save(user)
    }
    catch(error){
      return {  "message": "Error creating user"}
    }
  }

  async findAll() {
    return await dataSource.manager.find(User)
  }

  async findOne(id: number) {
    const user = await dataSource.manager.findOneBy(User, { id: id })
    if (user) {
      return user
    }
    else{
      return { "message": "User not found" }
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try{
      const userToUpdate = await dataSource.manager.findOneBy(User, { id: id })
      if (userToUpdate) {
        await dataSource.manager.update(User, id, updateUserDto)
        return { "message": "User Successfully updated" }
      }
      else{
        return { "message": "User not found" }
      }
    }
    catch(error){
      return {  "message": "Error updating user"}
    }
  }

  async remove(id: number) {
    try{
      const userToRemove = await dataSource.manager.findOneBy(User, { id: id })
      if (userToRemove) {
        await dataSource.manager.remove(userToRemove)
        return { "message": "User Successfully deleted" }
      }
      else{
        return { "message": "User not found" }
      }
    }
    catch(error){
      return {  "message": "Error deleting user"}
    }
  }

}
