import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateImageDto, UpdateProductDto } from './dto/update-product.dto';
import {
  QueryCatalogProductDto,
  QueryProductDto,
} from './dto/query-product.dto';
import { ApiBody, ApiConsumes, ApiOkResponse } from '@nestjs/swagger';
import {
  PaginatedProductsCursorResponseDto,
  PaginatedProductsNormalResponseDto,
} from './dto/catalog-response.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('imagen'))
  @ApiConsumes('multipart/form-data')
  create(
    @Body() createProductDto: CreateProductDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [new MaxFileSizeValidator({ maxSize: 10000 })],
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.productsService.create(createProductDto, file);
  }

  @Get('/catalog')
  @ApiOkResponse({ type: PaginatedProductsCursorResponseDto })
  findAllCatalog(@Query() queryParams: QueryCatalogProductDto) {
    return this.productsService.findAllCursorPaginated(queryParams);
  }

  @Get()
  @ApiOkResponse({ type: PaginatedProductsNormalResponseDto })
  findAll(@Query() queryParams: QueryProductDto) {
    return this.productsService.findAll(queryParams);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  @ApiBody({ type: UpdateProductDto })
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.updateData(id, updateProductDto);
  }

  @Patch(':id/image')
  @UseInterceptors(FileInterceptor('imagen'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UpdateImageDto })
  updateImage(
    @Param('id') id: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [new MaxFileSizeValidator({ maxSize: 10000 })],
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.productsService.updateImage(id, file);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
