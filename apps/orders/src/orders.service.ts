import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { CreateOrderRequest } from './dto/create-order.request';
import { OrdersRepository } from './orders.repository';
import { BILLING_SERVICE } from '@app/common';

@Injectable()
export class OrdersService {
  constructor(
    private readonly orderRepository: OrdersRepository,
    @Inject(BILLING_SERVICE) private billingClient: ClientProxy,
  ) {}

  healthCheck(): string {
    return 'Health Check!';
  }

  async createOrder(request: CreateOrderRequest, authentication: string) {
    const session = await this.orderRepository.startTransaction();
    try {
      const order = await this.orderRepository.create(request, { session });
      await lastValueFrom(
        this.billingClient.emit('order_created', {
          request: request,
          Authentication: authentication,
        }),
      );
      await session.commitTransaction();

      return order;
    } catch (error) {
      await session.abortTransaction();
      throw error;
    }
  }

  async getOrders() {
    return await this.orderRepository.find({});
  }
}
