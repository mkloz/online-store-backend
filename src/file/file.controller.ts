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
  Logger,
} from '@nestjs/common';
import { FileService } from './file.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { IDDto } from 'src/common/dto/id.dto';
import { ApiExtraModels, ApiTags } from '@nestjs/swagger';
// import { RoleAuthGuard } from 'src/auth/guards/role-auth.guard';
// import { Role } from 'src/auth/role/helpers/role.enum';
// import { Roles } from 'src/auth/role/roles.decorator';
import { File } from './file.entity';
import { ApiCreateFiles } from './docs/api-create-files.decorator';
import { FilesValidator } from './validators/file.validator';
import { IFile } from './file.interface';
import { ApiRemoveFile } from './docs/api-remove-file.decorator';
import { ApiGetFile } from './docs/api-get-file.decorator';
import { ID } from 'src/common/common.interface';
import { json } from 'stream/consumers';

export const FILES_FIELD = 'files';
export const FIVE_MEGABYTES = 5000000;

// @ApiBearerAuth()
@ApiTags('Work with files')
@ApiExtraModels(File)
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
  @ApiCreateFiles()
  // @Roles(Role.ADMIN)
  // @UseGuards(RoleAuthGuard)
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
  // @Roles(Role.USER, Role.ADMIN)
  // @UseGuards(RoleAuthGuard)
  public get(@Param() dto: IDDto): Promise<IFile> {
    return this.fileService.getFile(dto.id);
  }

  @Delete(':id')
  @ApiRemoveFile()
  @HttpCode(HttpStatus.OK)
  // @Roles(Role.ADMIN)
  // @UseGuards(RoleAuthGuard)
  public remove(@Param() { id }: IDDto): Promise<ID> {
    return this.fileService.remove(id);
  }
}
