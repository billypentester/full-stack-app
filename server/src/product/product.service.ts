import { Injectable } from '@nestjs/common';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

import { Product } from './entities/product.entity';
import { dataSource } from './../../db/datasource';

dataSource.initialize()

@Injectable()
export class ProductService {
  async create(createProductDto: CreateProductDto) {
    try{
      const product = new Product()
      product.name = createProductDto.name
      product.price = createProductDto.price
      return await dataSource.manager.save(product)
    }
    catch(error){
      return {  "message": "Error creating product"}
    }
  }

  async findAll() {
    return await dataSource.manager.find(Product)
  }

  async findOne(id: number) {
    const product = await dataSource.manager.findOneBy(Product, { id: id })
    if (product) {
      return product
    }
    else{
      return { "message": "Product not found" }
    }
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    try{
      const productToUpdate = await dataSource.manager.findOneBy(Product, { id: id })
      if (productToUpdate) {
        await dataSource.manager.update(Product, id, updateProductDto)
        return { "message": "Product Successfully updated" }
      }
      else{
        return { "message": "Product not found" }
      }
    }
    catch(error){
      return {  "message": "Error updating Product"}
    }
  }

  async remove(id: number) {
    try{
      const productToRemove = await dataSource.manager.findOneBy(Product, { id: id })
      if (productToRemove) {
        await dataSource.manager.remove(productToRemove)
        return { "message": "Product Successfully deleted" }
      }
      else{
        return { "message": "Product not found" }
      }
    }
    catch(error){
      return {  "message": "Error deleting Product"}
    }
  }
}
