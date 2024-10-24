import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";
import { Order } from "@prisma/client";
import { OrderRepository } from "./orders.repository";

@Injectable()
export class OrderService {
    constructor(private readonly orderRepository: OrderRepository) {}

    async findById(id: number): Promise<Order | null> {
        const exists = await this.orderRepository.exists(id);
        if (!exists) {
            throw new NotFoundException(`Order with id ${id} not found`);
        }

        return await this.orderRepository.findById(id);
    }

    async findAll(): Promise<Order[]> {
        try {
            return await this.orderRepository.findAll();
        } catch (error) {
            throw new NotFoundException(`Failed to find all Orders: ${error.message}`);
        }
    }

    async findAllByUser(userId: number): Promise<Order[]> {
        try {
            return await this.orderRepository.findAllByUser(userId);
        } catch (error) {
            throw new NotFoundException(`Failed to find all Orders: ${error.message}`);
        }
    }

    async create(data: CreateOrderDto, userId: number): Promise<Order> {
        try {
            return await this.orderRepository.create(data, userId);
        } catch (error) {
            throw new BadRequestException(`Failed to create Order: ${error.message}`);
        }
    }

    async update(orderId: number, data: UpdateOrderDto): Promise<Order> {
        const exists = await this.orderRepository.exists(orderId);
        if (!exists) {
            throw new NotFoundException(`Order with id ${orderId} not found`);
        }

        return await this.orderRepository.update(orderId, data);
    }

    async delete(orderId: number): Promise<Order> {
        const exists = await this.orderRepository.exists(orderId);
        if (!exists) {
            throw new NotFoundException(`Order with id ${orderId} not found`);
        }

        return await this.orderRepository.delete(orderId)
    }
}
