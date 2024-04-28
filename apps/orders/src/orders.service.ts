import { Injectable } from '@nestjs/common';
import { CreateOrderRequest } from './dto/create-order.request';
import { OrdersRepository } from './orders.repository';

@Injectable()
export class OrdersService {
  constructor(private readonly orderRepository: OrdersRepository) {}
  healthCheck(): string {
    return 'Hello World!';
  }

  async createOrder(request: CreateOrderRequest) {
    // await this.orderRepository.createOrder(body);
    return 'Order created';
  }

  async getOrders() {
    return await this.orderRepository.find({});
  }
}
