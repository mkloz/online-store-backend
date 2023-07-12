import {
  Controller,
  Post,
  Param,
  Delete,
  UseInterceptors,
  HttpCode,
  HttpStatus,
  Get,
  UploadedFiles,
  ParseFilePipe,
  UseGuards,
} from '@nestjs/common';
import { FileService } from './file.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { IDDto } from 'src/common/dto/id.dto';
import { ApiCreateFiles } from './docs/api-create-files.decorator';
import { FilesValidator } from './validators/file.validator';
import { IFile } from './file.interface';
import { ApiRemoveFile } from './docs/api-remove-file.decorator';
import { ApiGetFile } from './docs/api-get-file.decorator';
import { ID } from 'src/common/common.interface';
import { ApiFile } from './docs/api-file.decorator';
import { RoleAuthGuard } from 'src/auth/guards/role-auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from '@prisma/client';

export const FILES_FIELD = 'files';
export const FIVE_MEGABYTES = 5000000;

@ApiFile()
@UseGuards(RoleAuthGuard)
@Controller('files')
export class FileController {
  public static TYPE_OF_FILES = [
    'image/png',
    'image/jpeg',
    'image/jpg',
    'image/svg',
    'image/svgz',
    'image/webp',
    'image/tiff',
    'image/tif',
    'image/bmp',
  ];
  public static MAX_FILE_SIZE = FIVE_MEGABYTES;
  public static MAX_COUNT_FILES = 10;

  public constructor(private readonly fileService: FileService) {}

  @Post()
  @Roles(Role.ADMIN)
  @ApiCreateFiles()
  @UseInterceptors(
    FilesInterceptor(FILES_FIELD, FileController.MAX_COUNT_FILES),
  )
  public create(
    @UploadedFiles(
      new ParseFilePipe({
        validators: [
          new FilesValidator({
            maxSize: FileController.MAX_FILE_SIZE,
            mimetypes: FileController.TYPE_OF_FILES,
          }),
        ],
      }),
    )
    files: Express.Multer.File[],
  ): Promise<IFile[]> {
    return this.fileService.add(files);
  }

  @Get(':id')
  @ApiGetFile()
  public get(@Param() dto: IDDto): Promise<IFile> {
    return this.fileService.getFile(dto.id);
  }

  @Delete(':id')
  @ApiRemoveFile()
  @Roles(Role.ADMIN)
  @HttpCode(HttpStatus.OK)
  public remove(@Param() { id }: IDDto): Promise<ID> {
    return this.fileService.remove(id);
  }
}
