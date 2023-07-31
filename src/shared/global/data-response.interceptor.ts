import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

export interface Data<T> {
  data: T;
}

@Injectable()
export class DataResponseInterceptor<T> implements NestInterceptor<T, Data<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Data<T>> {
    return next.handle().pipe(map((data) => ({ data })));
  }
}
