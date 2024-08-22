import { Module } from '@nestjs/common';
import { OrderService } from './orders.service';
import { OrderController } from './orders.controller';
import { OrderRepository } from './orders.repository';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [OrderService, OrderRepository, PrismaService],
  controllers: [OrderController]
})
export class OrderModule {}
