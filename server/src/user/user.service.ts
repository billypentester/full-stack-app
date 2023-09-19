import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // get all users

  async findAll(res: any) {
    try{
       const users = await this.userRepository.find()
       res.status(HttpStatus.OK).json(users)
    }
     catch(error){
       res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message: "Internal server error"})
     }
  }
 
  // get user by id

  async findOne(id: number, res: any) {
    try{
      const user = await this.userRepository.findOneBy({ id: id })
      if (user) {
        res.status(HttpStatus.OK).json(user)
      }
      else{
        res.status(HttpStatus.NOT_FOUND).json({message: "User not found"})
      }
    }
    catch(error){
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message: "Internal server error"})
    }
  }

  // create a new user

  async create(createUserDto: CreateUserDto, res: any) {
    try{
      const user = new User()
      user.name = createUserDto.name
      user.email = createUserDto.email
      user.age = createUserDto.age
      const savedUser = await this.userRepository.save(user)
      res.status(HttpStatus.CREATED).json(savedUser)
    }
    catch(error){
      res.status(HttpStatus.BAD_REQUEST).json({message: "Bad Request"})
    }
  }

  // update user by id

  async update(id: number, updateUserDto: UpdateUserDto, res: any) {
    try{
      const userToUpdate = await this.userRepository.findOneBy({ id: id })
      if (userToUpdate) {
        const updatedUser = await this.userRepository.update(id, updateUserDto)
        res.status(HttpStatus.OK).json(updatedUser)
      }
      else{
        res.status(HttpStatus.NOT_FOUND).json({message: "User not found"})
      }
    }
    catch(error){
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message: "Internal server error"})
    }
  }

  // delete user by id

  async remove(id: number, res: any) {
    try{
      const userToDelete = await this.userRepository.findOneBy({ id: id })
      console.log(userToDelete)
      if (userToDelete) {
        await this.userRepository.delete(id)
        res.status(HttpStatus.NO_CONTENT).json({message: "User deleted"})
      }
      else{
        res.status(HttpStatus.NOT_FOUND).json({message: "User not found"})
      }
    }
    catch(error){
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message: "Internal server error"})
    }
  }

}
