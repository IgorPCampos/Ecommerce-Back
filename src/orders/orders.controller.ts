// src/orders/orders.controller.ts
import { Controller, Get, Post, Body, Patch, Param, Put, Delete } from "@nestjs/common";
import { OrderService } from "./orders.service";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";
import { Order } from "@prisma/client";

@Controller("orders")
export class OrderController {
    constructor(private readonly orderService: OrderService) {}

    @Get(":id")
    async findById(@Param("id") id: number): Promise<Order | null> {
        return this.orderService.findById(+id);
    }

    @Get()
    async findAll(): Promise<Order[]> {
        return this.orderService.findAll();
    }

    @Post(":userId")
    create(@Body() createOrderDto: CreateOrderDto, @Param("userId") userId: number): Promise<Order | null> {
        return this.orderService.create(createOrderDto, +userId);
    }

    @Put(":id")
    update(@Param("id") orderId: number, @Body() updateOrderDto: UpdateOrderDto): Promise<Order | null> {
        return this.orderService.update(+orderId, updateOrderDto);
    }

    @Delete(":id")
    delete(@Param("id") orderId: number): Promise<Order | null> {
        return this.orderService.delete(+orderId);
    }

}
