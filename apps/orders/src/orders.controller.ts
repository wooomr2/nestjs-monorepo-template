import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateOrderRequest } from './dto/create-order.request';
import { OrdersService } from './orders.service';

@Controller('/orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  async healthCheck() {
    return this.ordersService.healthCheck();
  }

  @Post()
  async createOrder(@Body() body: CreateOrderRequest) {
    return this.ordersService.createOrder(body);
  }

  @Get()
  async getOrders() {
    return this.ordersService.getOrders();
  }
}
