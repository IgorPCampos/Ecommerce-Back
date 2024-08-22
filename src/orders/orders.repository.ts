import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { Order } from "@prisma/client";
import { CreateOrderDto } from "./dto/create-Order.dto";
import { UpdateOrderDto } from "./dto/update-Order.dto";

interface OrderItemsDto {
    orderItems: {
        productId: number;
        quantity: number;
    }[];
}

@Injectable()
export class OrderRepository {
    constructor(private prisma: PrismaService) {}

    async exists(id: number): Promise<boolean> {
        const count = await this.prisma.order.count({
            where: {
                id
            }
        });
        return count > 0;
    }

    async findById(id: number): Promise<Order> {
        return this.prisma.order.findUnique({
            where: { id },
            include: {
                orderItems: {
                    include: {
                        product: true
                    }
                }
            }
        });
    }

    async findAll(): Promise<Order[]> {
        return this.prisma.order.findMany({
            include: {
                orderItems: {
                    include: {
                        product: true
                    }
                },
                user: true
            }
        });
    }

    async calculateTotalPrice(dto: OrderItemsDto) {
        let total = 0;

        for (const product of dto.orderItems) {
            const productData = await this.prisma.product.findUnique({
                where: { id: product.productId }
            });

            if (productData) {
                total += productData.price * product.quantity;
            }
        }
        return total;
    }

    async create(createOrderDto: CreateOrderDto, userId: number) {
        const total = await this.calculateTotalPrice(createOrderDto);

        return this.prisma.order.create({
            data: {
                ...createOrderDto,
                total,
                userId,
                orderItems: {
                    create: createOrderDto.orderItems.map((product) => ({
                        productId: product.productId,
                        quantity: product.quantity
                    }))
                }
            }
        });
    }

    async update(orderId: number, updateOrderDto: UpdateOrderDto) {
        const total = await this.calculateTotalPrice(updateOrderDto);

        return this.prisma.order.update({
            where: { id: orderId },
            data: {
                ...updateOrderDto,
                total,
                orderItems: {
                    upsert: updateOrderDto.orderItems.map((product) => ({
                        where: {
                            productId_orderId: { productId: product.productId, orderId: orderId }
                        },
                        create: {
                            productId: product.productId,
                            quantity: product.quantity
                        },
                        update: {
                            quantity: product.quantity
                        }
                    }))
                }
            }
        });
    }

    async delete(orderId: number): Promise<Order> {
        await this.prisma.orderItem.deleteMany({
            where: { orderId: orderId }
        });

        return this.prisma.order.delete({
            where: { id: orderId }
        });
    }
}
