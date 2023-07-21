export interface ID {
  id: number;
}
export interface IPagOpt {
  offset: number;
  count: number;
}
export interface URL {
  url: string;
}
export interface Ok {
  ok: true;
}
export type Nullable<T> = T | null;
export type FakeNullable<T> = T | null;
