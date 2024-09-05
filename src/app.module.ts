import { Module } from "@nestjs/common";
import { UsersModule } from "./users/users.module";
import { ProductsModule } from "./products/products.module";
import { PrismaModule } from "./prisma/prisma.module";
import { CategoriesModule } from "./categories/categories.module";
import { AuthModule } from "./auth/auth.module";
import { OrderModule } from './orders/orders.module';
import { FileModule } from './files/files.module';

@Module({
    imports: [UsersModule, ProductsModule, PrismaModule, CategoriesModule, AuthModule, OrderModule, FileModule],
    controllers: [],
    providers: [],
    exports: []
})
export class AppModule {}
