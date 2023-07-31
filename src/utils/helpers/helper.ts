import { queryDtoToQuery } from './query-dto-to-query.helper';

export class Helper {
  private static instance: Helper;
  constructor() {
    if (Helper.instance) {
      return Helper.instance;
    }
    Helper.instance = this;
  }
  static getInstance() {
    return Helper.instance;
  }
  public static queryDtoToQuery = queryDtoToQuery;
}
