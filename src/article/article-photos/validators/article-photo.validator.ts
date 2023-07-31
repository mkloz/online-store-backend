import { FileValidator } from '@nestjs/common';
import { IFile } from '@nestjs/common/pipes/file/interfaces';
interface ValidationOptions {
  maxSize: number;
  mimetypes: string[];
}

export class FilesValidator extends FileValidator {
  constructor(readonly validationOptions: ValidationOptions) {
    super(validationOptions);
  }

  public isValid(file?: IFile): boolean | Promise<boolean> {
    if (!this.validationOptions || !file) return true;

    const isValiableSize = file.size <= this.validationOptions.maxSize;
    const isValiableType = this.validationOptions.mimetypes.includes(
      file.mimetype,
    );
    return isValiableSize && isValiableType;
  }

  public buildErrorMessage(): string {
    return 'Invalid file';
  }
}
