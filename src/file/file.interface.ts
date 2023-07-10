import { ID } from 'src/common/common.interface';

export interface IFile extends IDiscriptionsFile, ID {}
export interface IDiscriptionsFile {
  name: string;
  url: string;
}
export type IFileWithoutRelations = IFile;
