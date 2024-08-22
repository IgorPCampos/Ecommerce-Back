import { PartialType } from "@nestjs/mapped-types";
import { CreateOrderDto } from "./create-order.dto";
import { Type } from "class-transformer";
import { IsOptional, IsString, IsNumber, IsArray, ArrayNotEmpty, ValidateNested, IsInt, IsNotEmpty } from "class-validator";

class ProductOrderDto {
    @IsNotEmpty()
    @IsInt()
    productId: number;

    @IsNotEmpty()
    @IsInt()
    quantity: number;
}

export class UpdateOrderDto extends PartialType(CreateOrderDto) {

        @IsOptional()
        @IsString()
        address?: string;
    
        @IsOptional()
        @IsString()
        paymentMethod?: string;
    
        @IsOptional()
        @IsNumber()
        total?: number;
    
        @IsArray()
        @ArrayNotEmpty()
        @ValidateNested({ each: true })
        @Type(() => ProductOrderDto)
        orderItems: ProductOrderDto[];
    
}
