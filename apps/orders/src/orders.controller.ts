import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { CreateOrderRequest } from './dto/create-order.request';
import { OrdersService } from './orders.service';
import { JwtAuthGuard } from '@app/common';

@Controller('/orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  async healthCheck() {
    return this.ordersService.healthCheck();
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async createOrder(@Req() req: any, @Body() body: CreateOrderRequest) {
    return this.ordersService.createOrder(body, req.cookies?.Authentication);
  }

  @Get()
  async getOrders() {
    return this.ordersService.getOrders();
  }
}
