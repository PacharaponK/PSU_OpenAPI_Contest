import { Controller, Get, Post, Body, Param, Delete, Put, Res, BadRequestException, UploadedFile, UseInterceptors, ClassSerializerInterceptor, SerializeOptions } from '@nestjs/common';
import { FormsService } from './forms.service';
import { CreateFormDto } from './dto/create-form.dto';
import { UpdateFormDto } from './dto/update-form.dto';
import { Response } from 'express';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('forms')
export class FormsController {
  constructor(private readonly formsService: FormsService) { }

  @Post()
  create(@Body() createFormDto: CreateFormDto) {
    return this.formsService.create(createFormDto);
  }

  @Post('upload-pdf-form')
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
    let id = null
    if (!body.id) {
      const form = await this.formsService.findByName(body.name);
      id = form[0].id
    }
    else {
      id = body.id
    }

    if (!file) {
      throw new BadRequestException("File not uploaded")
    } else {
      await this.formsService.update(id, {
        pdfURL: `/posts/pdf/${file.filename}`
      })
      const response = {
        filePath: `http://localhost:1337/forms/posts/pdf/${file.filename}`

      };
      return response;
    }
  }

  @Get()
  findAll() {
    return this.formsService.findAll();
  }

  @Get('posts/pdf/:filename')
  async getFile(@Param('filename') filename: string, @Res() res: Response) {
    return res.sendFile(filename, { root: './uploads' })
  }

  @SerializeOptions({ groups: ['detail'] })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.formsService.findOne(+id);
  }

  @SerializeOptions({ groups: ['detail'] })
  @Put(':id')
  update(@Param('id') id: string, @Body() updateFormDto: UpdateFormDto) {
    return this.formsService.update(+id, {
      ...updateFormDto,
      updateDate: new Date().toISOString()
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.formsService.remove(+id);
  }
}
