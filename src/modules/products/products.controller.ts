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
  UseGuards,
  UploadedFiles,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateImageDto, UpdateProductDto } from './dto/update-product.dto';
import {
  QueryCatalogProductDto,
  QueryProductDto,
} from './dto/query-product.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOkResponse,
  ApiResponse,
} from '@nestjs/swagger';
import {
  CatalogResponseDto,
  PaginatedProductsCursorResponseDto,
  PaginatedProductsNormalResponseDto,
} from './dto/catalog-response.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

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
        validators: [new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 5 })],
        fileIsRequired: false,
      }),
    )
    file?: Express.Multer.File,
  ) {
    return this.productsService.create(createProductDto, file);
  }

  @Get('/catalog')
  @ApiOkResponse({ type: PaginatedProductsCursorResponseDto })
  findAllCatalog(@Query() queryParams: QueryCatalogProductDto) {
    return this.productsService.findAllCursorPaginated(queryParams);
  }

  @Get('/featured')
  @ApiOkResponse({ type: CatalogResponseDto, isArray: true })
  getFeaturedProducts() {
    return this.productsService.getFeaturedProducts();
  }

  @Get('/all')
  @ApiOkResponse({ type: CatalogResponseDto, isArray: true })
  findAllNoLimit() {
    return this.productsService.findAllNoLimit();
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
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiBody({ type: UpdateProductDto })
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.updateData(id, updateProductDto);
  }

  @Patch(':id/image')
  @UseInterceptors(FileInterceptor('imagen'))
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UpdateImageDto })
  updateImage(
    @Param('id') id: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 5 })],
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.productsService.updateImage(id, file);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }

  @Post('upload-images-by-filename')
  @UseInterceptors(FilesInterceptor('imagenes', 20)) // máximo 20 archivos
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiConsumes('multipart/form-data')
  @ApiResponse({
    status: 200,
    description: 'Imágenes procesadas',
    schema: {
      type: 'object',
      properties: {
        ok: { type: 'boolean' },
        results: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              productId: { type: 'string' },
              success: { type: 'boolean' },
              message: { type: 'string' },
              imageUrl: { type: 'string', nullable: true },
            },
          },
        },
        summary: {
          type: 'object',
          properties: {
            total: { type: 'number' },
            successful: { type: 'number' },
            failed: { type: 'number' },
          },
        },
      },
    },
  })
  async uploadMultipleImagesByFilename(
    @UploadedFiles(
      new ParseFilePipe({
        validators: [new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 5 })],
      }),
    )
    files: Express.Multer.File[],
  ) {
    return this.productsService.uploadMultipleImagesByFilename(files);
  }
}
