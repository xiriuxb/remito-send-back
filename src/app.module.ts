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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
