import { BadRequestException, Body, Controller, Get, Param, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('uploadFile')
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
  uploadFile(@UploadedFile() file: Express.Multer.File, @Body() body:any) {
    console.log(body);
    
    if (!file) {
      throw new BadRequestException("File not uploaded")
    } else {
      const response = {
        filePath: `http://localhost:1337/posts/pdf/${file.filename}`
      };
      return response;
    }
  }

  @Get('posts/pdf/:filename')
  async getFile(@Param('filename') filename: string, @Res() res: Response) {
    return res.sendFile(filename, {root: './uploads'}) 
  }
}
