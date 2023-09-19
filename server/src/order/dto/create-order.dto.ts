import { IsInt, IsString, IsNotEmpty } from 'class-validator';

export class CreateOrderDto {

    @IsString()
    @IsNotEmpty()
    readonly status: string;

    @IsInt()
    @IsNotEmpty()
    readonly userId: number;

    @IsInt()
    @IsNotEmpty()
    readonly productId: number;

}