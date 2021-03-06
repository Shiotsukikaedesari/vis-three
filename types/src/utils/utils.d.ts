export declare type DeepPartial<T> = T extends Function ? T : T extends object ? {
    [P in keyof T]?: DeepPartial<T[P]>;
} : T;
export declare type DeepRecord<T, K> = T extends Function ? K : T extends object ? {
    [P in keyof T]: DeepRecord<T[P], K>;
} : K;
export declare type DeepUnion<T, K> = T extends Function ? T : T extends object ? {
    [P in keyof T]: DeepUnion<T[P], K> | K;
} : T;
export declare type DeepIntersection<T, I> = T extends Function ? T : T extends object ? {
    [P in keyof T]: DeepIntersection<T[P], I>;
} & I : T;
export declare type ArrayToObject<A extends Array<any>> = {
    [P in keyof A]: A[P];
};
export declare type DeepArrayToObject<T> = T extends Function ? T : T extends object ? {
    [P in keyof T]: DeepArrayToObject<T[P]>;
} : T extends Array<any> ? ArrayToObject<T> : T;
export declare type IgnoreAttribute<O extends object> = DeepUnion<DeepPartial<DeepRecord<O, boolean>>, boolean>;
export declare function isValidKey(key: string | number | symbol, object: object): key is keyof typeof object;
export declare function isValidEnum(enumeration: object, value: string | number): boolean;
export declare function generateConfigFunction<T extends object>(config: T): (merge: T) => T;
/**
 * 同步对象
 * @param config 配置对象
 * @param target 目标对象
 * @param filter 过滤属性
 * @param callBack 回调
 */
export declare function syncObject<C extends object, T extends object>(config: C, target: T, filter?: IgnoreAttribute<C>, callBack?: Function): void;
