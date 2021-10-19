import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductDto } from '../dto/product.dto';
import { CreateProductDto } from '../dto/create-product.dto';
import { v4 as uuid } from 'uuid';
import { UpdateProductDto } from '../dto/update-product.dto';

@Injectable()
export class ProductsService {
  private products: ProductDto[];

  constructor() {
    this.products = [];
  }

  getAllProducts(): ProductDto[] {
    return this.products;
  }

  getProductById(id: string): ProductDto {
    const product = this.products.find((product) => product.id === id);

    if (!product) {
      throw new NotFoundException('Product not found!');
    }

    return product;
  }

  addProduct(productDto: CreateProductDto): ProductDto {
    const currentDate = new Date();
    const createdProduct: ProductDto = {
      ...productDto,
      id: uuid(),
      createdAt: currentDate,
      updatedAt: currentDate,
    };
    this.products.push(createdProduct);

    return createdProduct;
  }

  updateProduct(id: string, productDto: UpdateProductDto): ProductDto {
    let updatedProduct = this.getProductById(id);

    if (!updatedProduct) {
      throw new NotFoundException('Product not found!');
    }

    updatedProduct = {
      ...updatedProduct,
      ...productDto,
      id, // Overwrite the id just in case the user tried to change it
      updatedAt: new Date(),
    };
    this.products = this.products.map((product) => {
      if (product.id === updatedProduct.id) {
        return updatedProduct;
      }

      return product;
    });

    return updatedProduct;
  }

  deleteProduct(id: string): ProductDto {
    const deletedProduct = this.getProductById(id);

    if (!deletedProduct) {
      throw new NotFoundException('Product not found!');
    }

    this.products = this.products.filter((product) => product.id !== id);

    return deletedProduct;
  }
}
