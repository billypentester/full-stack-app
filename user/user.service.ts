import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {

    private readonly users = [
        {
            id: 1,
            name: 'John Doe',
            age: 25,
        },
        {
            id: 2,
            name: 'Alice Caeiro',
            age: 28,
        },
        {
            id: 3,
            name: 'Who Knows',
            age: 35,
        },
    ];

    findAll(): { id: number; name: string; age: number}[] {
        return this.users;
    }

    findOne(id: string): { id: number; name: string; age: number} {
        return this.users.find(user => user.id === +id);
    }

    create(value : {name: String, age: Number }): Object {
        return { id: 4, name: value.name, age: value.age}
    }

    remove(id: string): Object {
        return { message: `This action removes a #${id} user`};
    }

    update(id: string): Object {
        return { message: `This action updates a #${id} user`};
    }

}
