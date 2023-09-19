const { IsEmail, IsNotEmpty, IsNumber, IsString, Min, Max, Length, IsDefined } = require('class-validator');   
const { ApiProperty } = require('@nestjs/swagger'); 

export class CreateUserDto {

    @ApiProperty({ description: 'Abc' })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({ description: 'abc@gmail.com' })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({ description: '20' })
    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    @Max(80)
    age: number;

}

