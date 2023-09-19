import { Controller, Get, Post, Delete, Put, Param, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { Request } from 'express';

@Controller('user')
export class UserController {
    
    constructor(private readonly userService: UserService) {}

    @Get()
    findAll() : { id: number; name: string; age: number}[] {
        return this.userService.findAll();
    }

    @Get(':id')
    findOne(@Req() req: Request) {
        return this.userService.findOne(req.params.id);
    }

    @Post()
    create(@Req() req: Request) : Object {
        return this.userService.create(req.body);
    }

    @Delete(':id')
    remove(@Req() req: Request) : Object {
        return this.userService.remove(req.params.id);
    }

    @Put(':id')
    update(@Req() req: Request) : Object {
        return this.userService.update(req.params.id);
    }

}
