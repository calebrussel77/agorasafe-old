/**
*Usefull to prettify more intersection types
* eg: type Intersected = {
    a: number;
} & {
    b: number;
} & {
    c: number;
}
}

Resolution: export type TResult = Prettify<Intersected>;
**/
export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};
