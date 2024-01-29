import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi';
import { DatabaseModule } from './database/database.module';
import { CategoryModule } from './categories/category.module';
import { UserModule } from './user/user.module';
import { OrderModule } from './order/order.module';
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env',
            validationSchema: Joi.object({
                POSTGRES_HOST: Joi.string(),
                POSTGRES_PORT: Joi.number(),
                POSTGRES_USER: Joi.string(),
                POSTGRES_PASSWORD: Joi.string(),
                POSTGRES_DB: Joi.string(),
                PORT: Joi.number(),
            }),
        }),
        ProductModule,
        DatabaseModule,
        CategoryModule,
        UserModule,
        OrderModule,
        // AuthModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule { 

}
