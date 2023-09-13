import { Injectable } from '@nestjs/common';

import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

import { dataSource } from 'db/datasource';
import { Order } from './entities/order.entity';
import { Product } from 'src/product/entities/product.entity';
import { User } from 'src/user/entities/user.entity';
import { createQueryBuilder } from 'typeorm';

@Injectable()
export class OrderService {
  async create(createOrderDto: CreateOrderDto) {
    try{
      const order = new Order()
      order.status = createOrderDto.status
      order.userId = createOrderDto.userId
      order.productId = createOrderDto.productId
      const orderId = await dataSource.manager.save(order)
      return { "message": "Order created successfully", "orderId": orderId.id }
    }
    catch(error){
      return {  "message": "Error creating product"}
    }
  }

  async findAll() {
    const orders = await dataSource.manager.createQueryBuilder(Order, "order")
    .leftJoinAndSelect('order.product', 'product')
    .leftJoinAndSelect('order.user', 'user')
    .select(['order.id', 'user.name', 'product.name', 'product.price', 'order.status'])
    .getMany();
    return orders
  }

  async findOne(id: number) {
    const order = await dataSource.manager.findOneBy(Order, { id: id })
    if (order) {
      const orders = dataSource.manager.createQueryBuilder(Order, "order")
        .leftJoinAndSelect('order.product', 'product')
        .leftJoinAndSelect('order.user', 'user')
        .select(['order.id', 'user.name', 'product.name', 'product.price', 'order.status'])
        .where("order.id = :id", { id: id })
        .getOne();
      if(order.user.name == null || order.product.name == null){
        return { "message": "Order not found" }
      }
      else
      {
        return orders
      }
    }
    else{
      return { "message": "Order not found" }
    }
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    console.log(updateOrderDto)
    try{
      const orderToUpdate = await dataSource.manager.findOneBy(Order, { id: id })
      if (orderToUpdate) {
        await dataSource.manager.update(Order, id, updateOrderDto)
        return { "message": "Order Successfully updated" }
      }
      else{
        return { "message": "Order not found" }
      }
    }
    catch(error){
      return {  "message": "Error updating Order"}
    }
  }

  async remove(id: number) {
    try{
      const orderToRemove = await dataSource.manager.findOneBy(Order, { id: id })
      if (orderToRemove) {
        await dataSource.manager.remove(orderToRemove)
        return { "message": "Order Successfully deleted" }
      }
      else{
        return { "message": "Order not found" }
      }
    }
    catch(error){
      return {  "message": "Error deleting Order"}
    }
  }

}
