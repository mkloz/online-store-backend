import { extractDatabaseComponents, extractTokenFromHeader } from '.';

export class Extractor {
  private static instance: Extractor;
  constructor() {
    if (Extractor.instance) {
      return Extractor.instance;
    }
    Extractor.instance = this;
  }
  static extractBearerToken = extractTokenFromHeader;
  static extractDatabaseConfig = extractDatabaseComponents;
}
