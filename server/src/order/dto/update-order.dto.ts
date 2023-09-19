import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDto } from './create-order.dto';
import { IsInt, IsString } from 'class-validator';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {

    @IsString()
    readonly status?: string;

    @IsInt()
    readonly userId?: number;

    @IsInt()
    readonly productId?: number;


}
