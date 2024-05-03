import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, BadRequestException, UseInterceptors, Res } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express, Response } from 'express';


@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) { }

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get('posts/icon/:filename')
  async getFile(@Param('filename') filename: string, @Res() res: Response) {
    return res.sendFile(filename, { root: './uploads' })
  }

  @Post('upload-icon-category')
  @UseInterceptors(FileInterceptor("file", {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        const name: string = file.originalname.split('.')[0];
        const fileExtension: string = file.originalname.split('.')[1];
        const newFileName: string = name.split(" ").join("_") + "_" + Date.now() + "." + fileExtension;

        cb(null, newFileName)
      }
    })
  }))
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Body() body: any) {
    if (!file) {
      throw new BadRequestException("File not uploaded")
    } else {
      await this.categoriesService.update(body.id, {
        icon: `/posts/icon/${file.filename}`
      })
      const response = {
        filePath: `http://localhost:1337/categories/posts/icon/${file.filename}`

      };
      return response;
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoriesService.update(+id, updateCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(+id);
  }
}
