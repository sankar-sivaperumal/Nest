import { Controller, Post, Param, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { fileservice } from './file.service';

@Controller('students')
export class filecontroller {
  constructor(private readonly filesvc: fileservice) {}

  @Post('upload/:id')
  @UseInterceptors(AnyFilesInterceptor({ dest: './files' })) 
  async uploadFiles(
    @Param('id') id: string,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.filesvc.updateFiles(Number(id), files);
  }
}
