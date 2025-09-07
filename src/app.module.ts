import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './modules/products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { RubrosModule } from './modules/rubros/rubros.module';
import { CloudinaryModule } from './modules/cloudinary/cloudinary.module';
import { FilesModule } from './modules/files/files.module';
import { PedidosModule } from './modules/pedidos/pedidos.module';
import { UserModule } from './modules/user/user.module';
import { FeaturedProductsModule } from './modules/featured-products/featured-products.module';
import { AuthModule } from './modules/auth/auth.module';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: true,
    }),
    ProductsModule,
    RubrosModule,
    CloudinaryModule,
    FilesModule,
    PedidosModule,
    UserModule,
    FeaturedProductsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
