
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Car
 * 
 */
export type Car = $Result.DefaultSelection<Prisma.$CarPayload>
/**
 * Model Partner
 * 
 */
export type Partner = $Result.DefaultSelection<Prisma.$PartnerPayload>
/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model WizardSession
 * 
 */
export type WizardSession = $Result.DefaultSelection<Prisma.$WizardSessionPayload>
/**
 * Model CatalogVisit
 * 
 */
export type CatalogVisit = $Result.DefaultSelection<Prisma.$CatalogVisitPayload>
/**
 * Model Lead
 * 
 */
export type Lead = $Result.DefaultSelection<Prisma.$LeadPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Cars
 * const cars = await prisma.car.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Cars
   * const cars = await prisma.car.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.car`: Exposes CRUD operations for the **Car** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Cars
    * const cars = await prisma.car.findMany()
    * ```
    */
  get car(): Prisma.CarDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.partner`: Exposes CRUD operations for the **Partner** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Partners
    * const partners = await prisma.partner.findMany()
    * ```
    */
  get partner(): Prisma.PartnerDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.wizardSession`: Exposes CRUD operations for the **WizardSession** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more WizardSessions
    * const wizardSessions = await prisma.wizardSession.findMany()
    * ```
    */
  get wizardSession(): Prisma.WizardSessionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.catalogVisit`: Exposes CRUD operations for the **CatalogVisit** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CatalogVisits
    * const catalogVisits = await prisma.catalogVisit.findMany()
    * ```
    */
  get catalogVisit(): Prisma.CatalogVisitDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.lead`: Exposes CRUD operations for the **Lead** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Leads
    * const leads = await prisma.lead.findMany()
    * ```
    */
  get lead(): Prisma.LeadDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.19.3
   * Query Engine version: c2990dca591cba766e3b7ef5d9e8a84796e47ab7
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Car: 'Car',
    Partner: 'Partner',
    User: 'User',
    WizardSession: 'WizardSession',
    CatalogVisit: 'CatalogVisit',
    Lead: 'Lead'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "car" | "partner" | "user" | "wizardSession" | "catalogVisit" | "lead"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Car: {
        payload: Prisma.$CarPayload<ExtArgs>
        fields: Prisma.CarFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CarFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CarPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CarFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CarPayload>
          }
          findFirst: {
            args: Prisma.CarFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CarPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CarFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CarPayload>
          }
          findMany: {
            args: Prisma.CarFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CarPayload>[]
          }
          create: {
            args: Prisma.CarCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CarPayload>
          }
          createMany: {
            args: Prisma.CarCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CarCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CarPayload>[]
          }
          delete: {
            args: Prisma.CarDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CarPayload>
          }
          update: {
            args: Prisma.CarUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CarPayload>
          }
          deleteMany: {
            args: Prisma.CarDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CarUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CarUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CarPayload>[]
          }
          upsert: {
            args: Prisma.CarUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CarPayload>
          }
          aggregate: {
            args: Prisma.CarAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCar>
          }
          groupBy: {
            args: Prisma.CarGroupByArgs<ExtArgs>
            result: $Utils.Optional<CarGroupByOutputType>[]
          }
          count: {
            args: Prisma.CarCountArgs<ExtArgs>
            result: $Utils.Optional<CarCountAggregateOutputType> | number
          }
        }
      }
      Partner: {
        payload: Prisma.$PartnerPayload<ExtArgs>
        fields: Prisma.PartnerFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PartnerFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartnerPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PartnerFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartnerPayload>
          }
          findFirst: {
            args: Prisma.PartnerFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartnerPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PartnerFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartnerPayload>
          }
          findMany: {
            args: Prisma.PartnerFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartnerPayload>[]
          }
          create: {
            args: Prisma.PartnerCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartnerPayload>
          }
          createMany: {
            args: Prisma.PartnerCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PartnerCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartnerPayload>[]
          }
          delete: {
            args: Prisma.PartnerDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartnerPayload>
          }
          update: {
            args: Prisma.PartnerUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartnerPayload>
          }
          deleteMany: {
            args: Prisma.PartnerDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PartnerUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PartnerUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartnerPayload>[]
          }
          upsert: {
            args: Prisma.PartnerUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartnerPayload>
          }
          aggregate: {
            args: Prisma.PartnerAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePartner>
          }
          groupBy: {
            args: Prisma.PartnerGroupByArgs<ExtArgs>
            result: $Utils.Optional<PartnerGroupByOutputType>[]
          }
          count: {
            args: Prisma.PartnerCountArgs<ExtArgs>
            result: $Utils.Optional<PartnerCountAggregateOutputType> | number
          }
        }
      }
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      WizardSession: {
        payload: Prisma.$WizardSessionPayload<ExtArgs>
        fields: Prisma.WizardSessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WizardSessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WizardSessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WizardSessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WizardSessionPayload>
          }
          findFirst: {
            args: Prisma.WizardSessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WizardSessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WizardSessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WizardSessionPayload>
          }
          findMany: {
            args: Prisma.WizardSessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WizardSessionPayload>[]
          }
          create: {
            args: Prisma.WizardSessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WizardSessionPayload>
          }
          createMany: {
            args: Prisma.WizardSessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.WizardSessionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WizardSessionPayload>[]
          }
          delete: {
            args: Prisma.WizardSessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WizardSessionPayload>
          }
          update: {
            args: Prisma.WizardSessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WizardSessionPayload>
          }
          deleteMany: {
            args: Prisma.WizardSessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WizardSessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.WizardSessionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WizardSessionPayload>[]
          }
          upsert: {
            args: Prisma.WizardSessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WizardSessionPayload>
          }
          aggregate: {
            args: Prisma.WizardSessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWizardSession>
          }
          groupBy: {
            args: Prisma.WizardSessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<WizardSessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.WizardSessionCountArgs<ExtArgs>
            result: $Utils.Optional<WizardSessionCountAggregateOutputType> | number
          }
        }
      }
      CatalogVisit: {
        payload: Prisma.$CatalogVisitPayload<ExtArgs>
        fields: Prisma.CatalogVisitFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CatalogVisitFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CatalogVisitPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CatalogVisitFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CatalogVisitPayload>
          }
          findFirst: {
            args: Prisma.CatalogVisitFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CatalogVisitPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CatalogVisitFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CatalogVisitPayload>
          }
          findMany: {
            args: Prisma.CatalogVisitFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CatalogVisitPayload>[]
          }
          create: {
            args: Prisma.CatalogVisitCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CatalogVisitPayload>
          }
          createMany: {
            args: Prisma.CatalogVisitCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CatalogVisitCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CatalogVisitPayload>[]
          }
          delete: {
            args: Prisma.CatalogVisitDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CatalogVisitPayload>
          }
          update: {
            args: Prisma.CatalogVisitUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CatalogVisitPayload>
          }
          deleteMany: {
            args: Prisma.CatalogVisitDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CatalogVisitUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CatalogVisitUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CatalogVisitPayload>[]
          }
          upsert: {
            args: Prisma.CatalogVisitUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CatalogVisitPayload>
          }
          aggregate: {
            args: Prisma.CatalogVisitAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCatalogVisit>
          }
          groupBy: {
            args: Prisma.CatalogVisitGroupByArgs<ExtArgs>
            result: $Utils.Optional<CatalogVisitGroupByOutputType>[]
          }
          count: {
            args: Prisma.CatalogVisitCountArgs<ExtArgs>
            result: $Utils.Optional<CatalogVisitCountAggregateOutputType> | number
          }
        }
      }
      Lead: {
        payload: Prisma.$LeadPayload<ExtArgs>
        fields: Prisma.LeadFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LeadFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LeadFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadPayload>
          }
          findFirst: {
            args: Prisma.LeadFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LeadFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadPayload>
          }
          findMany: {
            args: Prisma.LeadFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadPayload>[]
          }
          create: {
            args: Prisma.LeadCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadPayload>
          }
          createMany: {
            args: Prisma.LeadCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LeadCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadPayload>[]
          }
          delete: {
            args: Prisma.LeadDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadPayload>
          }
          update: {
            args: Prisma.LeadUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadPayload>
          }
          deleteMany: {
            args: Prisma.LeadDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LeadUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.LeadUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadPayload>[]
          }
          upsert: {
            args: Prisma.LeadUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadPayload>
          }
          aggregate: {
            args: Prisma.LeadAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLead>
          }
          groupBy: {
            args: Prisma.LeadGroupByArgs<ExtArgs>
            result: $Utils.Optional<LeadGroupByOutputType>[]
          }
          count: {
            args: Prisma.LeadCountArgs<ExtArgs>
            result: $Utils.Optional<LeadCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    car?: CarOmit
    partner?: PartnerOmit
    user?: UserOmit
    wizardSession?: WizardSessionOmit
    catalogVisit?: CatalogVisitOmit
    lead?: LeadOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type PartnerCountOutputType
   */

  export type PartnerCountOutputType = {
    cars: number
  }

  export type PartnerCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    cars?: boolean | PartnerCountOutputTypeCountCarsArgs
  }

  // Custom InputTypes
  /**
   * PartnerCountOutputType without action
   */
  export type PartnerCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PartnerCountOutputType
     */
    select?: PartnerCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PartnerCountOutputType without action
   */
  export type PartnerCountOutputTypeCountCarsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CarWhereInput
  }


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    catalogVisits: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    catalogVisits?: boolean | UserCountOutputTypeCountCatalogVisitsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountCatalogVisitsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CatalogVisitWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Car
   */

  export type AggregateCar = {
    _count: CarCountAggregateOutputType | null
    _avg: CarAvgAggregateOutputType | null
    _sum: CarSumAggregateOutputType | null
    _min: CarMinAggregateOutputType | null
    _max: CarMaxAggregateOutputType | null
  }

  export type CarAvgAggregateOutputType = {
    id: number | null
    price: number | null
    quantity: number | null
    priceOld: number | null
    engineVolume: number | null
    year: number | null
    enginePower: number | null
    monthlyPayment: number | null
    advancePayment: number | null
    mileage: number | null
    weight: number | null
    length: number | null
    width: number | null
    height: number | null
    partnerId: number | null
  }

  export type CarSumAggregateOutputType = {
    id: number | null
    price: number | null
    quantity: number | null
    priceOld: number | null
    engineVolume: number | null
    year: number | null
    enginePower: number | null
    monthlyPayment: number | null
    advancePayment: number | null
    mileage: number | null
    weight: number | null
    length: number | null
    width: number | null
    height: number | null
    partnerId: number | null
  }

  export type CarMinAggregateOutputType = {
    id: number | null
    uid: string | null
    brand: string | null
    sku: string | null
    mark: string | null
    category: string | null
    title: string | null
    description: string | null
    text: string | null
    photo: string | null
    video: string | null
    price: number | null
    quantity: number | null
    priceOld: number | null
    editions: string | null
    modifications: string | null
    externalId: string | null
    parentUid: string | null
    status: string | null
    bodyType: string | null
    engineType: string | null
    engineVolume: number | null
    transmission: string | null
    driveType: string | null
    year: number | null
    enginePower: number | null
    priceUSD: string | null
    monthlyPayment: number | null
    advancePayment: number | null
    countryOfOrigin: string | null
    mileage: number | null
    weight: number | null
    length: number | null
    width: number | null
    height: number | null
    partnerId: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CarMaxAggregateOutputType = {
    id: number | null
    uid: string | null
    brand: string | null
    sku: string | null
    mark: string | null
    category: string | null
    title: string | null
    description: string | null
    text: string | null
    photo: string | null
    video: string | null
    price: number | null
    quantity: number | null
    priceOld: number | null
    editions: string | null
    modifications: string | null
    externalId: string | null
    parentUid: string | null
    status: string | null
    bodyType: string | null
    engineType: string | null
    engineVolume: number | null
    transmission: string | null
    driveType: string | null
    year: number | null
    enginePower: number | null
    priceUSD: string | null
    monthlyPayment: number | null
    advancePayment: number | null
    countryOfOrigin: string | null
    mileage: number | null
    weight: number | null
    length: number | null
    width: number | null
    height: number | null
    partnerId: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CarCountAggregateOutputType = {
    id: number
    uid: number
    brand: number
    sku: number
    mark: number
    category: number
    title: number
    description: number
    text: number
    photo: number
    video: number
    price: number
    quantity: number
    priceOld: number
    editions: number
    modifications: number
    externalId: number
    parentUid: number
    status: number
    bodyType: number
    engineType: number
    engineVolume: number
    transmission: number
    driveType: number
    year: number
    enginePower: number
    priceUSD: number
    monthlyPayment: number
    advancePayment: number
    countryOfOrigin: number
    mileage: number
    weight: number
    length: number
    width: number
    height: number
    partnerId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CarAvgAggregateInputType = {
    id?: true
    price?: true
    quantity?: true
    priceOld?: true
    engineVolume?: true
    year?: true
    enginePower?: true
    monthlyPayment?: true
    advancePayment?: true
    mileage?: true
    weight?: true
    length?: true
    width?: true
    height?: true
    partnerId?: true
  }

  export type CarSumAggregateInputType = {
    id?: true
    price?: true
    quantity?: true
    priceOld?: true
    engineVolume?: true
    year?: true
    enginePower?: true
    monthlyPayment?: true
    advancePayment?: true
    mileage?: true
    weight?: true
    length?: true
    width?: true
    height?: true
    partnerId?: true
  }

  export type CarMinAggregateInputType = {
    id?: true
    uid?: true
    brand?: true
    sku?: true
    mark?: true
    category?: true
    title?: true
    description?: true
    text?: true
    photo?: true
    video?: true
    price?: true
    quantity?: true
    priceOld?: true
    editions?: true
    modifications?: true
    externalId?: true
    parentUid?: true
    status?: true
    bodyType?: true
    engineType?: true
    engineVolume?: true
    transmission?: true
    driveType?: true
    year?: true
    enginePower?: true
    priceUSD?: true
    monthlyPayment?: true
    advancePayment?: true
    countryOfOrigin?: true
    mileage?: true
    weight?: true
    length?: true
    width?: true
    height?: true
    partnerId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CarMaxAggregateInputType = {
    id?: true
    uid?: true
    brand?: true
    sku?: true
    mark?: true
    category?: true
    title?: true
    description?: true
    text?: true
    photo?: true
    video?: true
    price?: true
    quantity?: true
    priceOld?: true
    editions?: true
    modifications?: true
    externalId?: true
    parentUid?: true
    status?: true
    bodyType?: true
    engineType?: true
    engineVolume?: true
    transmission?: true
    driveType?: true
    year?: true
    enginePower?: true
    priceUSD?: true
    monthlyPayment?: true
    advancePayment?: true
    countryOfOrigin?: true
    mileage?: true
    weight?: true
    length?: true
    width?: true
    height?: true
    partnerId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CarCountAggregateInputType = {
    id?: true
    uid?: true
    brand?: true
    sku?: true
    mark?: true
    category?: true
    title?: true
    description?: true
    text?: true
    photo?: true
    video?: true
    price?: true
    quantity?: true
    priceOld?: true
    editions?: true
    modifications?: true
    externalId?: true
    parentUid?: true
    status?: true
    bodyType?: true
    engineType?: true
    engineVolume?: true
    transmission?: true
    driveType?: true
    year?: true
    enginePower?: true
    priceUSD?: true
    monthlyPayment?: true
    advancePayment?: true
    countryOfOrigin?: true
    mileage?: true
    weight?: true
    length?: true
    width?: true
    height?: true
    partnerId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CarAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Car to aggregate.
     */
    where?: CarWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Cars to fetch.
     */
    orderBy?: CarOrderByWithRelationInput | CarOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CarWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Cars from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Cars.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Cars
    **/
    _count?: true | CarCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CarAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CarSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CarMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CarMaxAggregateInputType
  }

  export type GetCarAggregateType<T extends CarAggregateArgs> = {
        [P in keyof T & keyof AggregateCar]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCar[P]>
      : GetScalarType<T[P], AggregateCar[P]>
  }




  export type CarGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CarWhereInput
    orderBy?: CarOrderByWithAggregationInput | CarOrderByWithAggregationInput[]
    by: CarScalarFieldEnum[] | CarScalarFieldEnum
    having?: CarScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CarCountAggregateInputType | true
    _avg?: CarAvgAggregateInputType
    _sum?: CarSumAggregateInputType
    _min?: CarMinAggregateInputType
    _max?: CarMaxAggregateInputType
  }

  export type CarGroupByOutputType = {
    id: number
    uid: string
    brand: string
    sku: string
    mark: string
    category: string
    title: string
    description: string
    text: string
    photo: string | null
    video: string | null
    price: number
    quantity: number
    priceOld: number | null
    editions: string | null
    modifications: string | null
    externalId: string | null
    parentUid: string | null
    status: string | null
    bodyType: string | null
    engineType: string
    engineVolume: number
    transmission: string
    driveType: string
    year: number
    enginePower: number
    priceUSD: string
    monthlyPayment: number | null
    advancePayment: number | null
    countryOfOrigin: string
    mileage: number
    weight: number
    length: number
    width: number
    height: number
    partnerId: number | null
    createdAt: Date
    updatedAt: Date
    _count: CarCountAggregateOutputType | null
    _avg: CarAvgAggregateOutputType | null
    _sum: CarSumAggregateOutputType | null
    _min: CarMinAggregateOutputType | null
    _max: CarMaxAggregateOutputType | null
  }

  type GetCarGroupByPayload<T extends CarGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CarGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CarGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CarGroupByOutputType[P]>
            : GetScalarType<T[P], CarGroupByOutputType[P]>
        }
      >
    >


  export type CarSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    uid?: boolean
    brand?: boolean
    sku?: boolean
    mark?: boolean
    category?: boolean
    title?: boolean
    description?: boolean
    text?: boolean
    photo?: boolean
    video?: boolean
    price?: boolean
    quantity?: boolean
    priceOld?: boolean
    editions?: boolean
    modifications?: boolean
    externalId?: boolean
    parentUid?: boolean
    status?: boolean
    bodyType?: boolean
    engineType?: boolean
    engineVolume?: boolean
    transmission?: boolean
    driveType?: boolean
    year?: boolean
    enginePower?: boolean
    priceUSD?: boolean
    monthlyPayment?: boolean
    advancePayment?: boolean
    countryOfOrigin?: boolean
    mileage?: boolean
    weight?: boolean
    length?: boolean
    width?: boolean
    height?: boolean
    partnerId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    partner?: boolean | Car$partnerArgs<ExtArgs>
  }, ExtArgs["result"]["car"]>

  export type CarSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    uid?: boolean
    brand?: boolean
    sku?: boolean
    mark?: boolean
    category?: boolean
    title?: boolean
    description?: boolean
    text?: boolean
    photo?: boolean
    video?: boolean
    price?: boolean
    quantity?: boolean
    priceOld?: boolean
    editions?: boolean
    modifications?: boolean
    externalId?: boolean
    parentUid?: boolean
    status?: boolean
    bodyType?: boolean
    engineType?: boolean
    engineVolume?: boolean
    transmission?: boolean
    driveType?: boolean
    year?: boolean
    enginePower?: boolean
    priceUSD?: boolean
    monthlyPayment?: boolean
    advancePayment?: boolean
    countryOfOrigin?: boolean
    mileage?: boolean
    weight?: boolean
    length?: boolean
    width?: boolean
    height?: boolean
    partnerId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    partner?: boolean | Car$partnerArgs<ExtArgs>
  }, ExtArgs["result"]["car"]>

  export type CarSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    uid?: boolean
    brand?: boolean
    sku?: boolean
    mark?: boolean
    category?: boolean
    title?: boolean
    description?: boolean
    text?: boolean
    photo?: boolean
    video?: boolean
    price?: boolean
    quantity?: boolean
    priceOld?: boolean
    editions?: boolean
    modifications?: boolean
    externalId?: boolean
    parentUid?: boolean
    status?: boolean
    bodyType?: boolean
    engineType?: boolean
    engineVolume?: boolean
    transmission?: boolean
    driveType?: boolean
    year?: boolean
    enginePower?: boolean
    priceUSD?: boolean
    monthlyPayment?: boolean
    advancePayment?: boolean
    countryOfOrigin?: boolean
    mileage?: boolean
    weight?: boolean
    length?: boolean
    width?: boolean
    height?: boolean
    partnerId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    partner?: boolean | Car$partnerArgs<ExtArgs>
  }, ExtArgs["result"]["car"]>

  export type CarSelectScalar = {
    id?: boolean
    uid?: boolean
    brand?: boolean
    sku?: boolean
    mark?: boolean
    category?: boolean
    title?: boolean
    description?: boolean
    text?: boolean
    photo?: boolean
    video?: boolean
    price?: boolean
    quantity?: boolean
    priceOld?: boolean
    editions?: boolean
    modifications?: boolean
    externalId?: boolean
    parentUid?: boolean
    status?: boolean
    bodyType?: boolean
    engineType?: boolean
    engineVolume?: boolean
    transmission?: boolean
    driveType?: boolean
    year?: boolean
    enginePower?: boolean
    priceUSD?: boolean
    monthlyPayment?: boolean
    advancePayment?: boolean
    countryOfOrigin?: boolean
    mileage?: boolean
    weight?: boolean
    length?: boolean
    width?: boolean
    height?: boolean
    partnerId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CarOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "uid" | "brand" | "sku" | "mark" | "category" | "title" | "description" | "text" | "photo" | "video" | "price" | "quantity" | "priceOld" | "editions" | "modifications" | "externalId" | "parentUid" | "status" | "bodyType" | "engineType" | "engineVolume" | "transmission" | "driveType" | "year" | "enginePower" | "priceUSD" | "monthlyPayment" | "advancePayment" | "countryOfOrigin" | "mileage" | "weight" | "length" | "width" | "height" | "partnerId" | "createdAt" | "updatedAt", ExtArgs["result"]["car"]>
  export type CarInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    partner?: boolean | Car$partnerArgs<ExtArgs>
  }
  export type CarIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    partner?: boolean | Car$partnerArgs<ExtArgs>
  }
  export type CarIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    partner?: boolean | Car$partnerArgs<ExtArgs>
  }

  export type $CarPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Car"
    objects: {
      partner: Prisma.$PartnerPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      uid: string
      brand: string
      sku: string
      mark: string
      category: string
      title: string
      description: string
      text: string
      photo: string | null
      video: string | null
      price: number
      quantity: number
      priceOld: number | null
      editions: string | null
      modifications: string | null
      externalId: string | null
      parentUid: string | null
      status: string | null
      bodyType: string | null
      engineType: string
      engineVolume: number
      transmission: string
      driveType: string
      year: number
      enginePower: number
      priceUSD: string
      monthlyPayment: number | null
      advancePayment: number | null
      countryOfOrigin: string
      mileage: number
      weight: number
      length: number
      width: number
      height: number
      partnerId: number | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["car"]>
    composites: {}
  }

  type CarGetPayload<S extends boolean | null | undefined | CarDefaultArgs> = $Result.GetResult<Prisma.$CarPayload, S>

  type CarCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CarFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CarCountAggregateInputType | true
    }

  export interface CarDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Car'], meta: { name: 'Car' } }
    /**
     * Find zero or one Car that matches the filter.
     * @param {CarFindUniqueArgs} args - Arguments to find a Car
     * @example
     * // Get one Car
     * const car = await prisma.car.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CarFindUniqueArgs>(args: SelectSubset<T, CarFindUniqueArgs<ExtArgs>>): Prisma__CarClient<$Result.GetResult<Prisma.$CarPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Car that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CarFindUniqueOrThrowArgs} args - Arguments to find a Car
     * @example
     * // Get one Car
     * const car = await prisma.car.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CarFindUniqueOrThrowArgs>(args: SelectSubset<T, CarFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CarClient<$Result.GetResult<Prisma.$CarPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Car that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CarFindFirstArgs} args - Arguments to find a Car
     * @example
     * // Get one Car
     * const car = await prisma.car.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CarFindFirstArgs>(args?: SelectSubset<T, CarFindFirstArgs<ExtArgs>>): Prisma__CarClient<$Result.GetResult<Prisma.$CarPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Car that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CarFindFirstOrThrowArgs} args - Arguments to find a Car
     * @example
     * // Get one Car
     * const car = await prisma.car.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CarFindFirstOrThrowArgs>(args?: SelectSubset<T, CarFindFirstOrThrowArgs<ExtArgs>>): Prisma__CarClient<$Result.GetResult<Prisma.$CarPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Cars that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CarFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Cars
     * const cars = await prisma.car.findMany()
     * 
     * // Get first 10 Cars
     * const cars = await prisma.car.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const carWithIdOnly = await prisma.car.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CarFindManyArgs>(args?: SelectSubset<T, CarFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CarPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Car.
     * @param {CarCreateArgs} args - Arguments to create a Car.
     * @example
     * // Create one Car
     * const Car = await prisma.car.create({
     *   data: {
     *     // ... data to create a Car
     *   }
     * })
     * 
     */
    create<T extends CarCreateArgs>(args: SelectSubset<T, CarCreateArgs<ExtArgs>>): Prisma__CarClient<$Result.GetResult<Prisma.$CarPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Cars.
     * @param {CarCreateManyArgs} args - Arguments to create many Cars.
     * @example
     * // Create many Cars
     * const car = await prisma.car.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CarCreateManyArgs>(args?: SelectSubset<T, CarCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Cars and returns the data saved in the database.
     * @param {CarCreateManyAndReturnArgs} args - Arguments to create many Cars.
     * @example
     * // Create many Cars
     * const car = await prisma.car.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Cars and only return the `id`
     * const carWithIdOnly = await prisma.car.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CarCreateManyAndReturnArgs>(args?: SelectSubset<T, CarCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CarPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Car.
     * @param {CarDeleteArgs} args - Arguments to delete one Car.
     * @example
     * // Delete one Car
     * const Car = await prisma.car.delete({
     *   where: {
     *     // ... filter to delete one Car
     *   }
     * })
     * 
     */
    delete<T extends CarDeleteArgs>(args: SelectSubset<T, CarDeleteArgs<ExtArgs>>): Prisma__CarClient<$Result.GetResult<Prisma.$CarPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Car.
     * @param {CarUpdateArgs} args - Arguments to update one Car.
     * @example
     * // Update one Car
     * const car = await prisma.car.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CarUpdateArgs>(args: SelectSubset<T, CarUpdateArgs<ExtArgs>>): Prisma__CarClient<$Result.GetResult<Prisma.$CarPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Cars.
     * @param {CarDeleteManyArgs} args - Arguments to filter Cars to delete.
     * @example
     * // Delete a few Cars
     * const { count } = await prisma.car.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CarDeleteManyArgs>(args?: SelectSubset<T, CarDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Cars.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CarUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Cars
     * const car = await prisma.car.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CarUpdateManyArgs>(args: SelectSubset<T, CarUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Cars and returns the data updated in the database.
     * @param {CarUpdateManyAndReturnArgs} args - Arguments to update many Cars.
     * @example
     * // Update many Cars
     * const car = await prisma.car.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Cars and only return the `id`
     * const carWithIdOnly = await prisma.car.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CarUpdateManyAndReturnArgs>(args: SelectSubset<T, CarUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CarPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Car.
     * @param {CarUpsertArgs} args - Arguments to update or create a Car.
     * @example
     * // Update or create a Car
     * const car = await prisma.car.upsert({
     *   create: {
     *     // ... data to create a Car
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Car we want to update
     *   }
     * })
     */
    upsert<T extends CarUpsertArgs>(args: SelectSubset<T, CarUpsertArgs<ExtArgs>>): Prisma__CarClient<$Result.GetResult<Prisma.$CarPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Cars.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CarCountArgs} args - Arguments to filter Cars to count.
     * @example
     * // Count the number of Cars
     * const count = await prisma.car.count({
     *   where: {
     *     // ... the filter for the Cars we want to count
     *   }
     * })
    **/
    count<T extends CarCountArgs>(
      args?: Subset<T, CarCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CarCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Car.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CarAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CarAggregateArgs>(args: Subset<T, CarAggregateArgs>): Prisma.PrismaPromise<GetCarAggregateType<T>>

    /**
     * Group by Car.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CarGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CarGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CarGroupByArgs['orderBy'] }
        : { orderBy?: CarGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CarGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCarGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Car model
   */
  readonly fields: CarFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Car.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CarClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    partner<T extends Car$partnerArgs<ExtArgs> = {}>(args?: Subset<T, Car$partnerArgs<ExtArgs>>): Prisma__PartnerClient<$Result.GetResult<Prisma.$PartnerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Car model
   */
  interface CarFieldRefs {
    readonly id: FieldRef<"Car", 'Int'>
    readonly uid: FieldRef<"Car", 'String'>
    readonly brand: FieldRef<"Car", 'String'>
    readonly sku: FieldRef<"Car", 'String'>
    readonly mark: FieldRef<"Car", 'String'>
    readonly category: FieldRef<"Car", 'String'>
    readonly title: FieldRef<"Car", 'String'>
    readonly description: FieldRef<"Car", 'String'>
    readonly text: FieldRef<"Car", 'String'>
    readonly photo: FieldRef<"Car", 'String'>
    readonly video: FieldRef<"Car", 'String'>
    readonly price: FieldRef<"Car", 'Float'>
    readonly quantity: FieldRef<"Car", 'Int'>
    readonly priceOld: FieldRef<"Car", 'Float'>
    readonly editions: FieldRef<"Car", 'String'>
    readonly modifications: FieldRef<"Car", 'String'>
    readonly externalId: FieldRef<"Car", 'String'>
    readonly parentUid: FieldRef<"Car", 'String'>
    readonly status: FieldRef<"Car", 'String'>
    readonly bodyType: FieldRef<"Car", 'String'>
    readonly engineType: FieldRef<"Car", 'String'>
    readonly engineVolume: FieldRef<"Car", 'Float'>
    readonly transmission: FieldRef<"Car", 'String'>
    readonly driveType: FieldRef<"Car", 'String'>
    readonly year: FieldRef<"Car", 'Int'>
    readonly enginePower: FieldRef<"Car", 'Float'>
    readonly priceUSD: FieldRef<"Car", 'String'>
    readonly monthlyPayment: FieldRef<"Car", 'Float'>
    readonly advancePayment: FieldRef<"Car", 'Float'>
    readonly countryOfOrigin: FieldRef<"Car", 'String'>
    readonly mileage: FieldRef<"Car", 'Int'>
    readonly weight: FieldRef<"Car", 'Float'>
    readonly length: FieldRef<"Car", 'Float'>
    readonly width: FieldRef<"Car", 'Float'>
    readonly height: FieldRef<"Car", 'Float'>
    readonly partnerId: FieldRef<"Car", 'Int'>
    readonly createdAt: FieldRef<"Car", 'DateTime'>
    readonly updatedAt: FieldRef<"Car", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Car findUnique
   */
  export type CarFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Car
     */
    select?: CarSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Car
     */
    omit?: CarOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CarInclude<ExtArgs> | null
    /**
     * Filter, which Car to fetch.
     */
    where: CarWhereUniqueInput
  }

  /**
   * Car findUniqueOrThrow
   */
  export type CarFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Car
     */
    select?: CarSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Car
     */
    omit?: CarOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CarInclude<ExtArgs> | null
    /**
     * Filter, which Car to fetch.
     */
    where: CarWhereUniqueInput
  }

  /**
   * Car findFirst
   */
  export type CarFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Car
     */
    select?: CarSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Car
     */
    omit?: CarOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CarInclude<ExtArgs> | null
    /**
     * Filter, which Car to fetch.
     */
    where?: CarWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Cars to fetch.
     */
    orderBy?: CarOrderByWithRelationInput | CarOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Cars.
     */
    cursor?: CarWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Cars from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Cars.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Cars.
     */
    distinct?: CarScalarFieldEnum | CarScalarFieldEnum[]
  }

  /**
   * Car findFirstOrThrow
   */
  export type CarFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Car
     */
    select?: CarSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Car
     */
    omit?: CarOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CarInclude<ExtArgs> | null
    /**
     * Filter, which Car to fetch.
     */
    where?: CarWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Cars to fetch.
     */
    orderBy?: CarOrderByWithRelationInput | CarOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Cars.
     */
    cursor?: CarWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Cars from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Cars.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Cars.
     */
    distinct?: CarScalarFieldEnum | CarScalarFieldEnum[]
  }

  /**
   * Car findMany
   */
  export type CarFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Car
     */
    select?: CarSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Car
     */
    omit?: CarOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CarInclude<ExtArgs> | null
    /**
     * Filter, which Cars to fetch.
     */
    where?: CarWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Cars to fetch.
     */
    orderBy?: CarOrderByWithRelationInput | CarOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Cars.
     */
    cursor?: CarWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Cars from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Cars.
     */
    skip?: number
    distinct?: CarScalarFieldEnum | CarScalarFieldEnum[]
  }

  /**
   * Car create
   */
  export type CarCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Car
     */
    select?: CarSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Car
     */
    omit?: CarOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CarInclude<ExtArgs> | null
    /**
     * The data needed to create a Car.
     */
    data: XOR<CarCreateInput, CarUncheckedCreateInput>
  }

  /**
   * Car createMany
   */
  export type CarCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Cars.
     */
    data: CarCreateManyInput | CarCreateManyInput[]
  }

  /**
   * Car createManyAndReturn
   */
  export type CarCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Car
     */
    select?: CarSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Car
     */
    omit?: CarOmit<ExtArgs> | null
    /**
     * The data used to create many Cars.
     */
    data: CarCreateManyInput | CarCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CarIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Car update
   */
  export type CarUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Car
     */
    select?: CarSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Car
     */
    omit?: CarOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CarInclude<ExtArgs> | null
    /**
     * The data needed to update a Car.
     */
    data: XOR<CarUpdateInput, CarUncheckedUpdateInput>
    /**
     * Choose, which Car to update.
     */
    where: CarWhereUniqueInput
  }

  /**
   * Car updateMany
   */
  export type CarUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Cars.
     */
    data: XOR<CarUpdateManyMutationInput, CarUncheckedUpdateManyInput>
    /**
     * Filter which Cars to update
     */
    where?: CarWhereInput
    /**
     * Limit how many Cars to update.
     */
    limit?: number
  }

  /**
   * Car updateManyAndReturn
   */
  export type CarUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Car
     */
    select?: CarSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Car
     */
    omit?: CarOmit<ExtArgs> | null
    /**
     * The data used to update Cars.
     */
    data: XOR<CarUpdateManyMutationInput, CarUncheckedUpdateManyInput>
    /**
     * Filter which Cars to update
     */
    where?: CarWhereInput
    /**
     * Limit how many Cars to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CarIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Car upsert
   */
  export type CarUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Car
     */
    select?: CarSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Car
     */
    omit?: CarOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CarInclude<ExtArgs> | null
    /**
     * The filter to search for the Car to update in case it exists.
     */
    where: CarWhereUniqueInput
    /**
     * In case the Car found by the `where` argument doesn't exist, create a new Car with this data.
     */
    create: XOR<CarCreateInput, CarUncheckedCreateInput>
    /**
     * In case the Car was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CarUpdateInput, CarUncheckedUpdateInput>
  }

  /**
   * Car delete
   */
  export type CarDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Car
     */
    select?: CarSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Car
     */
    omit?: CarOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CarInclude<ExtArgs> | null
    /**
     * Filter which Car to delete.
     */
    where: CarWhereUniqueInput
  }

  /**
   * Car deleteMany
   */
  export type CarDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Cars to delete
     */
    where?: CarWhereInput
    /**
     * Limit how many Cars to delete.
     */
    limit?: number
  }

  /**
   * Car.partner
   */
  export type Car$partnerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Partner
     */
    select?: PartnerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Partner
     */
    omit?: PartnerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartnerInclude<ExtArgs> | null
    where?: PartnerWhereInput
  }

  /**
   * Car without action
   */
  export type CarDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Car
     */
    select?: CarSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Car
     */
    omit?: CarOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CarInclude<ExtArgs> | null
  }


  /**
   * Model Partner
   */

  export type AggregatePartner = {
    _count: PartnerCountAggregateOutputType | null
    _avg: PartnerAvgAggregateOutputType | null
    _sum: PartnerSumAggregateOutputType | null
    _min: PartnerMinAggregateOutputType | null
    _max: PartnerMaxAggregateOutputType | null
  }

  export type PartnerAvgAggregateOutputType = {
    id: number | null
  }

  export type PartnerSumAggregateOutputType = {
    id: number | null
  }

  export type PartnerMinAggregateOutputType = {
    id: number | null
    slug: string | null
    name: string | null
    photo: string | null
    description: string | null
    active: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PartnerMaxAggregateOutputType = {
    id: number | null
    slug: string | null
    name: string | null
    photo: string | null
    description: string | null
    active: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PartnerCountAggregateOutputType = {
    id: number
    slug: number
    name: number
    photo: number
    description: number
    active: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PartnerAvgAggregateInputType = {
    id?: true
  }

  export type PartnerSumAggregateInputType = {
    id?: true
  }

  export type PartnerMinAggregateInputType = {
    id?: true
    slug?: true
    name?: true
    photo?: true
    description?: true
    active?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PartnerMaxAggregateInputType = {
    id?: true
    slug?: true
    name?: true
    photo?: true
    description?: true
    active?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PartnerCountAggregateInputType = {
    id?: true
    slug?: true
    name?: true
    photo?: true
    description?: true
    active?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PartnerAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Partner to aggregate.
     */
    where?: PartnerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Partners to fetch.
     */
    orderBy?: PartnerOrderByWithRelationInput | PartnerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PartnerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Partners from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Partners.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Partners
    **/
    _count?: true | PartnerCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PartnerAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PartnerSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PartnerMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PartnerMaxAggregateInputType
  }

  export type GetPartnerAggregateType<T extends PartnerAggregateArgs> = {
        [P in keyof T & keyof AggregatePartner]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePartner[P]>
      : GetScalarType<T[P], AggregatePartner[P]>
  }




  export type PartnerGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PartnerWhereInput
    orderBy?: PartnerOrderByWithAggregationInput | PartnerOrderByWithAggregationInput[]
    by: PartnerScalarFieldEnum[] | PartnerScalarFieldEnum
    having?: PartnerScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PartnerCountAggregateInputType | true
    _avg?: PartnerAvgAggregateInputType
    _sum?: PartnerSumAggregateInputType
    _min?: PartnerMinAggregateInputType
    _max?: PartnerMaxAggregateInputType
  }

  export type PartnerGroupByOutputType = {
    id: number
    slug: string
    name: string
    photo: string | null
    description: string
    active: boolean
    createdAt: Date
    updatedAt: Date
    _count: PartnerCountAggregateOutputType | null
    _avg: PartnerAvgAggregateOutputType | null
    _sum: PartnerSumAggregateOutputType | null
    _min: PartnerMinAggregateOutputType | null
    _max: PartnerMaxAggregateOutputType | null
  }

  type GetPartnerGroupByPayload<T extends PartnerGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PartnerGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PartnerGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PartnerGroupByOutputType[P]>
            : GetScalarType<T[P], PartnerGroupByOutputType[P]>
        }
      >
    >


  export type PartnerSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    slug?: boolean
    name?: boolean
    photo?: boolean
    description?: boolean
    active?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    cars?: boolean | Partner$carsArgs<ExtArgs>
    _count?: boolean | PartnerCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["partner"]>

  export type PartnerSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    slug?: boolean
    name?: boolean
    photo?: boolean
    description?: boolean
    active?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["partner"]>

  export type PartnerSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    slug?: boolean
    name?: boolean
    photo?: boolean
    description?: boolean
    active?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["partner"]>

  export type PartnerSelectScalar = {
    id?: boolean
    slug?: boolean
    name?: boolean
    photo?: boolean
    description?: boolean
    active?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PartnerOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "slug" | "name" | "photo" | "description" | "active" | "createdAt" | "updatedAt", ExtArgs["result"]["partner"]>
  export type PartnerInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    cars?: boolean | Partner$carsArgs<ExtArgs>
    _count?: boolean | PartnerCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PartnerIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type PartnerIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $PartnerPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Partner"
    objects: {
      cars: Prisma.$CarPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      slug: string
      name: string
      photo: string | null
      description: string
      active: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["partner"]>
    composites: {}
  }

  type PartnerGetPayload<S extends boolean | null | undefined | PartnerDefaultArgs> = $Result.GetResult<Prisma.$PartnerPayload, S>

  type PartnerCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PartnerFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PartnerCountAggregateInputType | true
    }

  export interface PartnerDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Partner'], meta: { name: 'Partner' } }
    /**
     * Find zero or one Partner that matches the filter.
     * @param {PartnerFindUniqueArgs} args - Arguments to find a Partner
     * @example
     * // Get one Partner
     * const partner = await prisma.partner.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PartnerFindUniqueArgs>(args: SelectSubset<T, PartnerFindUniqueArgs<ExtArgs>>): Prisma__PartnerClient<$Result.GetResult<Prisma.$PartnerPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Partner that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PartnerFindUniqueOrThrowArgs} args - Arguments to find a Partner
     * @example
     * // Get one Partner
     * const partner = await prisma.partner.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PartnerFindUniqueOrThrowArgs>(args: SelectSubset<T, PartnerFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PartnerClient<$Result.GetResult<Prisma.$PartnerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Partner that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PartnerFindFirstArgs} args - Arguments to find a Partner
     * @example
     * // Get one Partner
     * const partner = await prisma.partner.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PartnerFindFirstArgs>(args?: SelectSubset<T, PartnerFindFirstArgs<ExtArgs>>): Prisma__PartnerClient<$Result.GetResult<Prisma.$PartnerPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Partner that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PartnerFindFirstOrThrowArgs} args - Arguments to find a Partner
     * @example
     * // Get one Partner
     * const partner = await prisma.partner.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PartnerFindFirstOrThrowArgs>(args?: SelectSubset<T, PartnerFindFirstOrThrowArgs<ExtArgs>>): Prisma__PartnerClient<$Result.GetResult<Prisma.$PartnerPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Partners that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PartnerFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Partners
     * const partners = await prisma.partner.findMany()
     * 
     * // Get first 10 Partners
     * const partners = await prisma.partner.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const partnerWithIdOnly = await prisma.partner.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PartnerFindManyArgs>(args?: SelectSubset<T, PartnerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PartnerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Partner.
     * @param {PartnerCreateArgs} args - Arguments to create a Partner.
     * @example
     * // Create one Partner
     * const Partner = await prisma.partner.create({
     *   data: {
     *     // ... data to create a Partner
     *   }
     * })
     * 
     */
    create<T extends PartnerCreateArgs>(args: SelectSubset<T, PartnerCreateArgs<ExtArgs>>): Prisma__PartnerClient<$Result.GetResult<Prisma.$PartnerPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Partners.
     * @param {PartnerCreateManyArgs} args - Arguments to create many Partners.
     * @example
     * // Create many Partners
     * const partner = await prisma.partner.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PartnerCreateManyArgs>(args?: SelectSubset<T, PartnerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Partners and returns the data saved in the database.
     * @param {PartnerCreateManyAndReturnArgs} args - Arguments to create many Partners.
     * @example
     * // Create many Partners
     * const partner = await prisma.partner.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Partners and only return the `id`
     * const partnerWithIdOnly = await prisma.partner.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PartnerCreateManyAndReturnArgs>(args?: SelectSubset<T, PartnerCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PartnerPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Partner.
     * @param {PartnerDeleteArgs} args - Arguments to delete one Partner.
     * @example
     * // Delete one Partner
     * const Partner = await prisma.partner.delete({
     *   where: {
     *     // ... filter to delete one Partner
     *   }
     * })
     * 
     */
    delete<T extends PartnerDeleteArgs>(args: SelectSubset<T, PartnerDeleteArgs<ExtArgs>>): Prisma__PartnerClient<$Result.GetResult<Prisma.$PartnerPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Partner.
     * @param {PartnerUpdateArgs} args - Arguments to update one Partner.
     * @example
     * // Update one Partner
     * const partner = await prisma.partner.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PartnerUpdateArgs>(args: SelectSubset<T, PartnerUpdateArgs<ExtArgs>>): Prisma__PartnerClient<$Result.GetResult<Prisma.$PartnerPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Partners.
     * @param {PartnerDeleteManyArgs} args - Arguments to filter Partners to delete.
     * @example
     * // Delete a few Partners
     * const { count } = await prisma.partner.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PartnerDeleteManyArgs>(args?: SelectSubset<T, PartnerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Partners.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PartnerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Partners
     * const partner = await prisma.partner.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PartnerUpdateManyArgs>(args: SelectSubset<T, PartnerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Partners and returns the data updated in the database.
     * @param {PartnerUpdateManyAndReturnArgs} args - Arguments to update many Partners.
     * @example
     * // Update many Partners
     * const partner = await prisma.partner.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Partners and only return the `id`
     * const partnerWithIdOnly = await prisma.partner.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PartnerUpdateManyAndReturnArgs>(args: SelectSubset<T, PartnerUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PartnerPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Partner.
     * @param {PartnerUpsertArgs} args - Arguments to update or create a Partner.
     * @example
     * // Update or create a Partner
     * const partner = await prisma.partner.upsert({
     *   create: {
     *     // ... data to create a Partner
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Partner we want to update
     *   }
     * })
     */
    upsert<T extends PartnerUpsertArgs>(args: SelectSubset<T, PartnerUpsertArgs<ExtArgs>>): Prisma__PartnerClient<$Result.GetResult<Prisma.$PartnerPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Partners.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PartnerCountArgs} args - Arguments to filter Partners to count.
     * @example
     * // Count the number of Partners
     * const count = await prisma.partner.count({
     *   where: {
     *     // ... the filter for the Partners we want to count
     *   }
     * })
    **/
    count<T extends PartnerCountArgs>(
      args?: Subset<T, PartnerCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PartnerCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Partner.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PartnerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PartnerAggregateArgs>(args: Subset<T, PartnerAggregateArgs>): Prisma.PrismaPromise<GetPartnerAggregateType<T>>

    /**
     * Group by Partner.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PartnerGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PartnerGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PartnerGroupByArgs['orderBy'] }
        : { orderBy?: PartnerGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PartnerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPartnerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Partner model
   */
  readonly fields: PartnerFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Partner.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PartnerClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    cars<T extends Partner$carsArgs<ExtArgs> = {}>(args?: Subset<T, Partner$carsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CarPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Partner model
   */
  interface PartnerFieldRefs {
    readonly id: FieldRef<"Partner", 'Int'>
    readonly slug: FieldRef<"Partner", 'String'>
    readonly name: FieldRef<"Partner", 'String'>
    readonly photo: FieldRef<"Partner", 'String'>
    readonly description: FieldRef<"Partner", 'String'>
    readonly active: FieldRef<"Partner", 'Boolean'>
    readonly createdAt: FieldRef<"Partner", 'DateTime'>
    readonly updatedAt: FieldRef<"Partner", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Partner findUnique
   */
  export type PartnerFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Partner
     */
    select?: PartnerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Partner
     */
    omit?: PartnerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartnerInclude<ExtArgs> | null
    /**
     * Filter, which Partner to fetch.
     */
    where: PartnerWhereUniqueInput
  }

  /**
   * Partner findUniqueOrThrow
   */
  export type PartnerFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Partner
     */
    select?: PartnerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Partner
     */
    omit?: PartnerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartnerInclude<ExtArgs> | null
    /**
     * Filter, which Partner to fetch.
     */
    where: PartnerWhereUniqueInput
  }

  /**
   * Partner findFirst
   */
  export type PartnerFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Partner
     */
    select?: PartnerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Partner
     */
    omit?: PartnerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartnerInclude<ExtArgs> | null
    /**
     * Filter, which Partner to fetch.
     */
    where?: PartnerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Partners to fetch.
     */
    orderBy?: PartnerOrderByWithRelationInput | PartnerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Partners.
     */
    cursor?: PartnerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Partners from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Partners.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Partners.
     */
    distinct?: PartnerScalarFieldEnum | PartnerScalarFieldEnum[]
  }

  /**
   * Partner findFirstOrThrow
   */
  export type PartnerFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Partner
     */
    select?: PartnerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Partner
     */
    omit?: PartnerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartnerInclude<ExtArgs> | null
    /**
     * Filter, which Partner to fetch.
     */
    where?: PartnerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Partners to fetch.
     */
    orderBy?: PartnerOrderByWithRelationInput | PartnerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Partners.
     */
    cursor?: PartnerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Partners from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Partners.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Partners.
     */
    distinct?: PartnerScalarFieldEnum | PartnerScalarFieldEnum[]
  }

  /**
   * Partner findMany
   */
  export type PartnerFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Partner
     */
    select?: PartnerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Partner
     */
    omit?: PartnerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartnerInclude<ExtArgs> | null
    /**
     * Filter, which Partners to fetch.
     */
    where?: PartnerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Partners to fetch.
     */
    orderBy?: PartnerOrderByWithRelationInput | PartnerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Partners.
     */
    cursor?: PartnerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Partners from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Partners.
     */
    skip?: number
    distinct?: PartnerScalarFieldEnum | PartnerScalarFieldEnum[]
  }

  /**
   * Partner create
   */
  export type PartnerCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Partner
     */
    select?: PartnerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Partner
     */
    omit?: PartnerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartnerInclude<ExtArgs> | null
    /**
     * The data needed to create a Partner.
     */
    data: XOR<PartnerCreateInput, PartnerUncheckedCreateInput>
  }

  /**
   * Partner createMany
   */
  export type PartnerCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Partners.
     */
    data: PartnerCreateManyInput | PartnerCreateManyInput[]
  }

  /**
   * Partner createManyAndReturn
   */
  export type PartnerCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Partner
     */
    select?: PartnerSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Partner
     */
    omit?: PartnerOmit<ExtArgs> | null
    /**
     * The data used to create many Partners.
     */
    data: PartnerCreateManyInput | PartnerCreateManyInput[]
  }

  /**
   * Partner update
   */
  export type PartnerUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Partner
     */
    select?: PartnerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Partner
     */
    omit?: PartnerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartnerInclude<ExtArgs> | null
    /**
     * The data needed to update a Partner.
     */
    data: XOR<PartnerUpdateInput, PartnerUncheckedUpdateInput>
    /**
     * Choose, which Partner to update.
     */
    where: PartnerWhereUniqueInput
  }

  /**
   * Partner updateMany
   */
  export type PartnerUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Partners.
     */
    data: XOR<PartnerUpdateManyMutationInput, PartnerUncheckedUpdateManyInput>
    /**
     * Filter which Partners to update
     */
    where?: PartnerWhereInput
    /**
     * Limit how many Partners to update.
     */
    limit?: number
  }

  /**
   * Partner updateManyAndReturn
   */
  export type PartnerUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Partner
     */
    select?: PartnerSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Partner
     */
    omit?: PartnerOmit<ExtArgs> | null
    /**
     * The data used to update Partners.
     */
    data: XOR<PartnerUpdateManyMutationInput, PartnerUncheckedUpdateManyInput>
    /**
     * Filter which Partners to update
     */
    where?: PartnerWhereInput
    /**
     * Limit how many Partners to update.
     */
    limit?: number
  }

  /**
   * Partner upsert
   */
  export type PartnerUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Partner
     */
    select?: PartnerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Partner
     */
    omit?: PartnerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartnerInclude<ExtArgs> | null
    /**
     * The filter to search for the Partner to update in case it exists.
     */
    where: PartnerWhereUniqueInput
    /**
     * In case the Partner found by the `where` argument doesn't exist, create a new Partner with this data.
     */
    create: XOR<PartnerCreateInput, PartnerUncheckedCreateInput>
    /**
     * In case the Partner was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PartnerUpdateInput, PartnerUncheckedUpdateInput>
  }

  /**
   * Partner delete
   */
  export type PartnerDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Partner
     */
    select?: PartnerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Partner
     */
    omit?: PartnerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartnerInclude<ExtArgs> | null
    /**
     * Filter which Partner to delete.
     */
    where: PartnerWhereUniqueInput
  }

  /**
   * Partner deleteMany
   */
  export type PartnerDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Partners to delete
     */
    where?: PartnerWhereInput
    /**
     * Limit how many Partners to delete.
     */
    limit?: number
  }

  /**
   * Partner.cars
   */
  export type Partner$carsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Car
     */
    select?: CarSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Car
     */
    omit?: CarOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CarInclude<ExtArgs> | null
    where?: CarWhereInput
    orderBy?: CarOrderByWithRelationInput | CarOrderByWithRelationInput[]
    cursor?: CarWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CarScalarFieldEnum | CarScalarFieldEnum[]
  }

  /**
   * Partner without action
   */
  export type PartnerDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Partner
     */
    select?: PartnerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Partner
     */
    omit?: PartnerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartnerInclude<ExtArgs> | null
  }


  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    id: number | null
  }

  export type UserSumAggregateOutputType = {
    id: number | null
  }

  export type UserMinAggregateOutputType = {
    id: number | null
    telegramId: string | null
    username: string | null
    firstName: string | null
    lastName: string | null
    languageCode: string | null
    chatId: string | null
    isBot: boolean | null
    phone: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: number | null
    telegramId: string | null
    username: string | null
    firstName: string | null
    lastName: string | null
    languageCode: string | null
    chatId: string | null
    isBot: boolean | null
    phone: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    telegramId: number
    username: number
    firstName: number
    lastName: number
    languageCode: number
    chatId: number
    isBot: number
    phone: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    id?: true
  }

  export type UserSumAggregateInputType = {
    id?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    telegramId?: true
    username?: true
    firstName?: true
    lastName?: true
    languageCode?: true
    chatId?: true
    isBot?: true
    phone?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    telegramId?: true
    username?: true
    firstName?: true
    lastName?: true
    languageCode?: true
    chatId?: true
    isBot?: true
    phone?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    telegramId?: true
    username?: true
    firstName?: true
    lastName?: true
    languageCode?: true
    chatId?: true
    isBot?: true
    phone?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: number
    telegramId: string
    username: string | null
    firstName: string
    lastName: string | null
    languageCode: string
    chatId: string | null
    isBot: boolean
    phone: string | null
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    telegramId?: boolean
    username?: boolean
    firstName?: boolean
    lastName?: boolean
    languageCode?: boolean
    chatId?: boolean
    isBot?: boolean
    phone?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    catalogVisits?: boolean | User$catalogVisitsArgs<ExtArgs>
    wizardSession?: boolean | User$wizardSessionArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    telegramId?: boolean
    username?: boolean
    firstName?: boolean
    lastName?: boolean
    languageCode?: boolean
    chatId?: boolean
    isBot?: boolean
    phone?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    telegramId?: boolean
    username?: boolean
    firstName?: boolean
    lastName?: boolean
    languageCode?: boolean
    chatId?: boolean
    isBot?: boolean
    phone?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    telegramId?: boolean
    username?: boolean
    firstName?: boolean
    lastName?: boolean
    languageCode?: boolean
    chatId?: boolean
    isBot?: boolean
    phone?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "telegramId" | "username" | "firstName" | "lastName" | "languageCode" | "chatId" | "isBot" | "phone" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    catalogVisits?: boolean | User$catalogVisitsArgs<ExtArgs>
    wizardSession?: boolean | User$wizardSessionArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      catalogVisits: Prisma.$CatalogVisitPayload<ExtArgs>[]
      wizardSession: Prisma.$WizardSessionPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      telegramId: string
      username: string | null
      firstName: string
      lastName: string | null
      languageCode: string
      chatId: string | null
      isBot: boolean
      phone: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    catalogVisits<T extends User$catalogVisitsArgs<ExtArgs> = {}>(args?: Subset<T, User$catalogVisitsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CatalogVisitPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    wizardSession<T extends User$wizardSessionArgs<ExtArgs> = {}>(args?: Subset<T, User$wizardSessionArgs<ExtArgs>>): Prisma__WizardSessionClient<$Result.GetResult<Prisma.$WizardSessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'Int'>
    readonly telegramId: FieldRef<"User", 'String'>
    readonly username: FieldRef<"User", 'String'>
    readonly firstName: FieldRef<"User", 'String'>
    readonly lastName: FieldRef<"User", 'String'>
    readonly languageCode: FieldRef<"User", 'String'>
    readonly chatId: FieldRef<"User", 'String'>
    readonly isBot: FieldRef<"User", 'Boolean'>
    readonly phone: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.catalogVisits
   */
  export type User$catalogVisitsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CatalogVisit
     */
    select?: CatalogVisitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CatalogVisit
     */
    omit?: CatalogVisitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CatalogVisitInclude<ExtArgs> | null
    where?: CatalogVisitWhereInput
    orderBy?: CatalogVisitOrderByWithRelationInput | CatalogVisitOrderByWithRelationInput[]
    cursor?: CatalogVisitWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CatalogVisitScalarFieldEnum | CatalogVisitScalarFieldEnum[]
  }

  /**
   * User.wizardSession
   */
  export type User$wizardSessionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WizardSession
     */
    select?: WizardSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WizardSession
     */
    omit?: WizardSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WizardSessionInclude<ExtArgs> | null
    where?: WizardSessionWhereInput
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model WizardSession
   */

  export type AggregateWizardSession = {
    _count: WizardSessionCountAggregateOutputType | null
    _avg: WizardSessionAvgAggregateOutputType | null
    _sum: WizardSessionSumAggregateOutputType | null
    _min: WizardSessionMinAggregateOutputType | null
    _max: WizardSessionMaxAggregateOutputType | null
  }

  export type WizardSessionAvgAggregateOutputType = {
    id: number | null
    userId: number | null
    currentCarYear: number | null
    currentCarMileage: number | null
    currentCarPrice: number | null
    additionalCash: number | null
    monthlyPayment: number | null
    termMonths: number | null
    maxBudget: number | null
    totalStartBudget: number | null
    selectedCarId: number | null
    calculationsCount: number | null
  }

  export type WizardSessionSumAggregateOutputType = {
    id: number | null
    userId: number | null
    currentCarYear: number | null
    currentCarMileage: number | null
    currentCarPrice: number | null
    additionalCash: number | null
    monthlyPayment: number | null
    termMonths: number | null
    maxBudget: number | null
    totalStartBudget: number | null
    selectedCarId: number | null
    calculationsCount: number | null
  }

  export type WizardSessionMinAggregateOutputType = {
    id: number | null
    telegramId: string | null
    userId: number | null
    phone: string | null
    startOption: string | null
    currentCarBrand: string | null
    currentCarModel: string | null
    currentCarYear: number | null
    currentCarMileage: number | null
    currentCarPrice: number | null
    additionalCash: number | null
    monthlyPayment: number | null
    termMonths: number | null
    motivations: string | null
    bodyTypes: string | null
    brandPrefs: string | null
    maxBudget: number | null
    totalStartBudget: number | null
    selectedCarId: number | null
    selectedCarLabel: string | null
    currentStep: string | null
    bitrixStatus: string | null
    bitrixError: string | null
    funnelSteps: string | null
    calculationsCount: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type WizardSessionMaxAggregateOutputType = {
    id: number | null
    telegramId: string | null
    userId: number | null
    phone: string | null
    startOption: string | null
    currentCarBrand: string | null
    currentCarModel: string | null
    currentCarYear: number | null
    currentCarMileage: number | null
    currentCarPrice: number | null
    additionalCash: number | null
    monthlyPayment: number | null
    termMonths: number | null
    motivations: string | null
    bodyTypes: string | null
    brandPrefs: string | null
    maxBudget: number | null
    totalStartBudget: number | null
    selectedCarId: number | null
    selectedCarLabel: string | null
    currentStep: string | null
    bitrixStatus: string | null
    bitrixError: string | null
    funnelSteps: string | null
    calculationsCount: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type WizardSessionCountAggregateOutputType = {
    id: number
    telegramId: number
    userId: number
    phone: number
    startOption: number
    currentCarBrand: number
    currentCarModel: number
    currentCarYear: number
    currentCarMileage: number
    currentCarPrice: number
    additionalCash: number
    monthlyPayment: number
    termMonths: number
    motivations: number
    bodyTypes: number
    brandPrefs: number
    maxBudget: number
    totalStartBudget: number
    selectedCarId: number
    selectedCarLabel: number
    currentStep: number
    bitrixStatus: number
    bitrixError: number
    funnelSteps: number
    calculationsCount: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type WizardSessionAvgAggregateInputType = {
    id?: true
    userId?: true
    currentCarYear?: true
    currentCarMileage?: true
    currentCarPrice?: true
    additionalCash?: true
    monthlyPayment?: true
    termMonths?: true
    maxBudget?: true
    totalStartBudget?: true
    selectedCarId?: true
    calculationsCount?: true
  }

  export type WizardSessionSumAggregateInputType = {
    id?: true
    userId?: true
    currentCarYear?: true
    currentCarMileage?: true
    currentCarPrice?: true
    additionalCash?: true
    monthlyPayment?: true
    termMonths?: true
    maxBudget?: true
    totalStartBudget?: true
    selectedCarId?: true
    calculationsCount?: true
  }

  export type WizardSessionMinAggregateInputType = {
    id?: true
    telegramId?: true
    userId?: true
    phone?: true
    startOption?: true
    currentCarBrand?: true
    currentCarModel?: true
    currentCarYear?: true
    currentCarMileage?: true
    currentCarPrice?: true
    additionalCash?: true
    monthlyPayment?: true
    termMonths?: true
    motivations?: true
    bodyTypes?: true
    brandPrefs?: true
    maxBudget?: true
    totalStartBudget?: true
    selectedCarId?: true
    selectedCarLabel?: true
    currentStep?: true
    bitrixStatus?: true
    bitrixError?: true
    funnelSteps?: true
    calculationsCount?: true
    createdAt?: true
    updatedAt?: true
  }

  export type WizardSessionMaxAggregateInputType = {
    id?: true
    telegramId?: true
    userId?: true
    phone?: true
    startOption?: true
    currentCarBrand?: true
    currentCarModel?: true
    currentCarYear?: true
    currentCarMileage?: true
    currentCarPrice?: true
    additionalCash?: true
    monthlyPayment?: true
    termMonths?: true
    motivations?: true
    bodyTypes?: true
    brandPrefs?: true
    maxBudget?: true
    totalStartBudget?: true
    selectedCarId?: true
    selectedCarLabel?: true
    currentStep?: true
    bitrixStatus?: true
    bitrixError?: true
    funnelSteps?: true
    calculationsCount?: true
    createdAt?: true
    updatedAt?: true
  }

  export type WizardSessionCountAggregateInputType = {
    id?: true
    telegramId?: true
    userId?: true
    phone?: true
    startOption?: true
    currentCarBrand?: true
    currentCarModel?: true
    currentCarYear?: true
    currentCarMileage?: true
    currentCarPrice?: true
    additionalCash?: true
    monthlyPayment?: true
    termMonths?: true
    motivations?: true
    bodyTypes?: true
    brandPrefs?: true
    maxBudget?: true
    totalStartBudget?: true
    selectedCarId?: true
    selectedCarLabel?: true
    currentStep?: true
    bitrixStatus?: true
    bitrixError?: true
    funnelSteps?: true
    calculationsCount?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type WizardSessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WizardSession to aggregate.
     */
    where?: WizardSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WizardSessions to fetch.
     */
    orderBy?: WizardSessionOrderByWithRelationInput | WizardSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WizardSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WizardSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WizardSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned WizardSessions
    **/
    _count?: true | WizardSessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: WizardSessionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: WizardSessionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WizardSessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WizardSessionMaxAggregateInputType
  }

  export type GetWizardSessionAggregateType<T extends WizardSessionAggregateArgs> = {
        [P in keyof T & keyof AggregateWizardSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWizardSession[P]>
      : GetScalarType<T[P], AggregateWizardSession[P]>
  }




  export type WizardSessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WizardSessionWhereInput
    orderBy?: WizardSessionOrderByWithAggregationInput | WizardSessionOrderByWithAggregationInput[]
    by: WizardSessionScalarFieldEnum[] | WizardSessionScalarFieldEnum
    having?: WizardSessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WizardSessionCountAggregateInputType | true
    _avg?: WizardSessionAvgAggregateInputType
    _sum?: WizardSessionSumAggregateInputType
    _min?: WizardSessionMinAggregateInputType
    _max?: WizardSessionMaxAggregateInputType
  }

  export type WizardSessionGroupByOutputType = {
    id: number
    telegramId: string
    userId: number | null
    phone: string | null
    startOption: string | null
    currentCarBrand: string | null
    currentCarModel: string | null
    currentCarYear: number | null
    currentCarMileage: number | null
    currentCarPrice: number
    additionalCash: number
    monthlyPayment: number
    termMonths: number
    motivations: string
    bodyTypes: string
    brandPrefs: string
    maxBudget: number | null
    totalStartBudget: number | null
    selectedCarId: number | null
    selectedCarLabel: string | null
    currentStep: string
    bitrixStatus: string | null
    bitrixError: string | null
    funnelSteps: string
    calculationsCount: number
    createdAt: Date
    updatedAt: Date
    _count: WizardSessionCountAggregateOutputType | null
    _avg: WizardSessionAvgAggregateOutputType | null
    _sum: WizardSessionSumAggregateOutputType | null
    _min: WizardSessionMinAggregateOutputType | null
    _max: WizardSessionMaxAggregateOutputType | null
  }

  type GetWizardSessionGroupByPayload<T extends WizardSessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WizardSessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WizardSessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WizardSessionGroupByOutputType[P]>
            : GetScalarType<T[P], WizardSessionGroupByOutputType[P]>
        }
      >
    >


  export type WizardSessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    telegramId?: boolean
    userId?: boolean
    phone?: boolean
    startOption?: boolean
    currentCarBrand?: boolean
    currentCarModel?: boolean
    currentCarYear?: boolean
    currentCarMileage?: boolean
    currentCarPrice?: boolean
    additionalCash?: boolean
    monthlyPayment?: boolean
    termMonths?: boolean
    motivations?: boolean
    bodyTypes?: boolean
    brandPrefs?: boolean
    maxBudget?: boolean
    totalStartBudget?: boolean
    selectedCarId?: boolean
    selectedCarLabel?: boolean
    currentStep?: boolean
    bitrixStatus?: boolean
    bitrixError?: boolean
    funnelSteps?: boolean
    calculationsCount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | WizardSession$userArgs<ExtArgs>
  }, ExtArgs["result"]["wizardSession"]>

  export type WizardSessionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    telegramId?: boolean
    userId?: boolean
    phone?: boolean
    startOption?: boolean
    currentCarBrand?: boolean
    currentCarModel?: boolean
    currentCarYear?: boolean
    currentCarMileage?: boolean
    currentCarPrice?: boolean
    additionalCash?: boolean
    monthlyPayment?: boolean
    termMonths?: boolean
    motivations?: boolean
    bodyTypes?: boolean
    brandPrefs?: boolean
    maxBudget?: boolean
    totalStartBudget?: boolean
    selectedCarId?: boolean
    selectedCarLabel?: boolean
    currentStep?: boolean
    bitrixStatus?: boolean
    bitrixError?: boolean
    funnelSteps?: boolean
    calculationsCount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | WizardSession$userArgs<ExtArgs>
  }, ExtArgs["result"]["wizardSession"]>

  export type WizardSessionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    telegramId?: boolean
    userId?: boolean
    phone?: boolean
    startOption?: boolean
    currentCarBrand?: boolean
    currentCarModel?: boolean
    currentCarYear?: boolean
    currentCarMileage?: boolean
    currentCarPrice?: boolean
    additionalCash?: boolean
    monthlyPayment?: boolean
    termMonths?: boolean
    motivations?: boolean
    bodyTypes?: boolean
    brandPrefs?: boolean
    maxBudget?: boolean
    totalStartBudget?: boolean
    selectedCarId?: boolean
    selectedCarLabel?: boolean
    currentStep?: boolean
    bitrixStatus?: boolean
    bitrixError?: boolean
    funnelSteps?: boolean
    calculationsCount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | WizardSession$userArgs<ExtArgs>
  }, ExtArgs["result"]["wizardSession"]>

  export type WizardSessionSelectScalar = {
    id?: boolean
    telegramId?: boolean
    userId?: boolean
    phone?: boolean
    startOption?: boolean
    currentCarBrand?: boolean
    currentCarModel?: boolean
    currentCarYear?: boolean
    currentCarMileage?: boolean
    currentCarPrice?: boolean
    additionalCash?: boolean
    monthlyPayment?: boolean
    termMonths?: boolean
    motivations?: boolean
    bodyTypes?: boolean
    brandPrefs?: boolean
    maxBudget?: boolean
    totalStartBudget?: boolean
    selectedCarId?: boolean
    selectedCarLabel?: boolean
    currentStep?: boolean
    bitrixStatus?: boolean
    bitrixError?: boolean
    funnelSteps?: boolean
    calculationsCount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type WizardSessionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "telegramId" | "userId" | "phone" | "startOption" | "currentCarBrand" | "currentCarModel" | "currentCarYear" | "currentCarMileage" | "currentCarPrice" | "additionalCash" | "monthlyPayment" | "termMonths" | "motivations" | "bodyTypes" | "brandPrefs" | "maxBudget" | "totalStartBudget" | "selectedCarId" | "selectedCarLabel" | "currentStep" | "bitrixStatus" | "bitrixError" | "funnelSteps" | "calculationsCount" | "createdAt" | "updatedAt", ExtArgs["result"]["wizardSession"]>
  export type WizardSessionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | WizardSession$userArgs<ExtArgs>
  }
  export type WizardSessionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | WizardSession$userArgs<ExtArgs>
  }
  export type WizardSessionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | WizardSession$userArgs<ExtArgs>
  }

  export type $WizardSessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "WizardSession"
    objects: {
      user: Prisma.$UserPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      telegramId: string
      userId: number | null
      phone: string | null
      startOption: string | null
      currentCarBrand: string | null
      currentCarModel: string | null
      currentCarYear: number | null
      currentCarMileage: number | null
      currentCarPrice: number
      additionalCash: number
      monthlyPayment: number
      termMonths: number
      motivations: string
      bodyTypes: string
      brandPrefs: string
      maxBudget: number | null
      totalStartBudget: number | null
      selectedCarId: number | null
      selectedCarLabel: string | null
      currentStep: string
      bitrixStatus: string | null
      bitrixError: string | null
      funnelSteps: string
      calculationsCount: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["wizardSession"]>
    composites: {}
  }

  type WizardSessionGetPayload<S extends boolean | null | undefined | WizardSessionDefaultArgs> = $Result.GetResult<Prisma.$WizardSessionPayload, S>

  type WizardSessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<WizardSessionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: WizardSessionCountAggregateInputType | true
    }

  export interface WizardSessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['WizardSession'], meta: { name: 'WizardSession' } }
    /**
     * Find zero or one WizardSession that matches the filter.
     * @param {WizardSessionFindUniqueArgs} args - Arguments to find a WizardSession
     * @example
     * // Get one WizardSession
     * const wizardSession = await prisma.wizardSession.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WizardSessionFindUniqueArgs>(args: SelectSubset<T, WizardSessionFindUniqueArgs<ExtArgs>>): Prisma__WizardSessionClient<$Result.GetResult<Prisma.$WizardSessionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one WizardSession that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {WizardSessionFindUniqueOrThrowArgs} args - Arguments to find a WizardSession
     * @example
     * // Get one WizardSession
     * const wizardSession = await prisma.wizardSession.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WizardSessionFindUniqueOrThrowArgs>(args: SelectSubset<T, WizardSessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WizardSessionClient<$Result.GetResult<Prisma.$WizardSessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WizardSession that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WizardSessionFindFirstArgs} args - Arguments to find a WizardSession
     * @example
     * // Get one WizardSession
     * const wizardSession = await prisma.wizardSession.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WizardSessionFindFirstArgs>(args?: SelectSubset<T, WizardSessionFindFirstArgs<ExtArgs>>): Prisma__WizardSessionClient<$Result.GetResult<Prisma.$WizardSessionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WizardSession that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WizardSessionFindFirstOrThrowArgs} args - Arguments to find a WizardSession
     * @example
     * // Get one WizardSession
     * const wizardSession = await prisma.wizardSession.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WizardSessionFindFirstOrThrowArgs>(args?: SelectSubset<T, WizardSessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__WizardSessionClient<$Result.GetResult<Prisma.$WizardSessionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more WizardSessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WizardSessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all WizardSessions
     * const wizardSessions = await prisma.wizardSession.findMany()
     * 
     * // Get first 10 WizardSessions
     * const wizardSessions = await prisma.wizardSession.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const wizardSessionWithIdOnly = await prisma.wizardSession.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends WizardSessionFindManyArgs>(args?: SelectSubset<T, WizardSessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WizardSessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a WizardSession.
     * @param {WizardSessionCreateArgs} args - Arguments to create a WizardSession.
     * @example
     * // Create one WizardSession
     * const WizardSession = await prisma.wizardSession.create({
     *   data: {
     *     // ... data to create a WizardSession
     *   }
     * })
     * 
     */
    create<T extends WizardSessionCreateArgs>(args: SelectSubset<T, WizardSessionCreateArgs<ExtArgs>>): Prisma__WizardSessionClient<$Result.GetResult<Prisma.$WizardSessionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many WizardSessions.
     * @param {WizardSessionCreateManyArgs} args - Arguments to create many WizardSessions.
     * @example
     * // Create many WizardSessions
     * const wizardSession = await prisma.wizardSession.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WizardSessionCreateManyArgs>(args?: SelectSubset<T, WizardSessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many WizardSessions and returns the data saved in the database.
     * @param {WizardSessionCreateManyAndReturnArgs} args - Arguments to create many WizardSessions.
     * @example
     * // Create many WizardSessions
     * const wizardSession = await prisma.wizardSession.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many WizardSessions and only return the `id`
     * const wizardSessionWithIdOnly = await prisma.wizardSession.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends WizardSessionCreateManyAndReturnArgs>(args?: SelectSubset<T, WizardSessionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WizardSessionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a WizardSession.
     * @param {WizardSessionDeleteArgs} args - Arguments to delete one WizardSession.
     * @example
     * // Delete one WizardSession
     * const WizardSession = await prisma.wizardSession.delete({
     *   where: {
     *     // ... filter to delete one WizardSession
     *   }
     * })
     * 
     */
    delete<T extends WizardSessionDeleteArgs>(args: SelectSubset<T, WizardSessionDeleteArgs<ExtArgs>>): Prisma__WizardSessionClient<$Result.GetResult<Prisma.$WizardSessionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one WizardSession.
     * @param {WizardSessionUpdateArgs} args - Arguments to update one WizardSession.
     * @example
     * // Update one WizardSession
     * const wizardSession = await prisma.wizardSession.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WizardSessionUpdateArgs>(args: SelectSubset<T, WizardSessionUpdateArgs<ExtArgs>>): Prisma__WizardSessionClient<$Result.GetResult<Prisma.$WizardSessionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more WizardSessions.
     * @param {WizardSessionDeleteManyArgs} args - Arguments to filter WizardSessions to delete.
     * @example
     * // Delete a few WizardSessions
     * const { count } = await prisma.wizardSession.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WizardSessionDeleteManyArgs>(args?: SelectSubset<T, WizardSessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WizardSessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WizardSessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many WizardSessions
     * const wizardSession = await prisma.wizardSession.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WizardSessionUpdateManyArgs>(args: SelectSubset<T, WizardSessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WizardSessions and returns the data updated in the database.
     * @param {WizardSessionUpdateManyAndReturnArgs} args - Arguments to update many WizardSessions.
     * @example
     * // Update many WizardSessions
     * const wizardSession = await prisma.wizardSession.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more WizardSessions and only return the `id`
     * const wizardSessionWithIdOnly = await prisma.wizardSession.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends WizardSessionUpdateManyAndReturnArgs>(args: SelectSubset<T, WizardSessionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WizardSessionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one WizardSession.
     * @param {WizardSessionUpsertArgs} args - Arguments to update or create a WizardSession.
     * @example
     * // Update or create a WizardSession
     * const wizardSession = await prisma.wizardSession.upsert({
     *   create: {
     *     // ... data to create a WizardSession
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the WizardSession we want to update
     *   }
     * })
     */
    upsert<T extends WizardSessionUpsertArgs>(args: SelectSubset<T, WizardSessionUpsertArgs<ExtArgs>>): Prisma__WizardSessionClient<$Result.GetResult<Prisma.$WizardSessionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of WizardSessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WizardSessionCountArgs} args - Arguments to filter WizardSessions to count.
     * @example
     * // Count the number of WizardSessions
     * const count = await prisma.wizardSession.count({
     *   where: {
     *     // ... the filter for the WizardSessions we want to count
     *   }
     * })
    **/
    count<T extends WizardSessionCountArgs>(
      args?: Subset<T, WizardSessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WizardSessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a WizardSession.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WizardSessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends WizardSessionAggregateArgs>(args: Subset<T, WizardSessionAggregateArgs>): Prisma.PrismaPromise<GetWizardSessionAggregateType<T>>

    /**
     * Group by WizardSession.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WizardSessionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends WizardSessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WizardSessionGroupByArgs['orderBy'] }
        : { orderBy?: WizardSessionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, WizardSessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWizardSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the WizardSession model
   */
  readonly fields: WizardSessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for WizardSession.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WizardSessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends WizardSession$userArgs<ExtArgs> = {}>(args?: Subset<T, WizardSession$userArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the WizardSession model
   */
  interface WizardSessionFieldRefs {
    readonly id: FieldRef<"WizardSession", 'Int'>
    readonly telegramId: FieldRef<"WizardSession", 'String'>
    readonly userId: FieldRef<"WizardSession", 'Int'>
    readonly phone: FieldRef<"WizardSession", 'String'>
    readonly startOption: FieldRef<"WizardSession", 'String'>
    readonly currentCarBrand: FieldRef<"WizardSession", 'String'>
    readonly currentCarModel: FieldRef<"WizardSession", 'String'>
    readonly currentCarYear: FieldRef<"WizardSession", 'Int'>
    readonly currentCarMileage: FieldRef<"WizardSession", 'Int'>
    readonly currentCarPrice: FieldRef<"WizardSession", 'Float'>
    readonly additionalCash: FieldRef<"WizardSession", 'Float'>
    readonly monthlyPayment: FieldRef<"WizardSession", 'Float'>
    readonly termMonths: FieldRef<"WizardSession", 'Int'>
    readonly motivations: FieldRef<"WizardSession", 'String'>
    readonly bodyTypes: FieldRef<"WizardSession", 'String'>
    readonly brandPrefs: FieldRef<"WizardSession", 'String'>
    readonly maxBudget: FieldRef<"WizardSession", 'Float'>
    readonly totalStartBudget: FieldRef<"WizardSession", 'Float'>
    readonly selectedCarId: FieldRef<"WizardSession", 'Int'>
    readonly selectedCarLabel: FieldRef<"WizardSession", 'String'>
    readonly currentStep: FieldRef<"WizardSession", 'String'>
    readonly bitrixStatus: FieldRef<"WizardSession", 'String'>
    readonly bitrixError: FieldRef<"WizardSession", 'String'>
    readonly funnelSteps: FieldRef<"WizardSession", 'String'>
    readonly calculationsCount: FieldRef<"WizardSession", 'Int'>
    readonly createdAt: FieldRef<"WizardSession", 'DateTime'>
    readonly updatedAt: FieldRef<"WizardSession", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * WizardSession findUnique
   */
  export type WizardSessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WizardSession
     */
    select?: WizardSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WizardSession
     */
    omit?: WizardSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WizardSessionInclude<ExtArgs> | null
    /**
     * Filter, which WizardSession to fetch.
     */
    where: WizardSessionWhereUniqueInput
  }

  /**
   * WizardSession findUniqueOrThrow
   */
  export type WizardSessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WizardSession
     */
    select?: WizardSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WizardSession
     */
    omit?: WizardSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WizardSessionInclude<ExtArgs> | null
    /**
     * Filter, which WizardSession to fetch.
     */
    where: WizardSessionWhereUniqueInput
  }

  /**
   * WizardSession findFirst
   */
  export type WizardSessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WizardSession
     */
    select?: WizardSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WizardSession
     */
    omit?: WizardSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WizardSessionInclude<ExtArgs> | null
    /**
     * Filter, which WizardSession to fetch.
     */
    where?: WizardSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WizardSessions to fetch.
     */
    orderBy?: WizardSessionOrderByWithRelationInput | WizardSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WizardSessions.
     */
    cursor?: WizardSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WizardSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WizardSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WizardSessions.
     */
    distinct?: WizardSessionScalarFieldEnum | WizardSessionScalarFieldEnum[]
  }

  /**
   * WizardSession findFirstOrThrow
   */
  export type WizardSessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WizardSession
     */
    select?: WizardSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WizardSession
     */
    omit?: WizardSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WizardSessionInclude<ExtArgs> | null
    /**
     * Filter, which WizardSession to fetch.
     */
    where?: WizardSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WizardSessions to fetch.
     */
    orderBy?: WizardSessionOrderByWithRelationInput | WizardSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WizardSessions.
     */
    cursor?: WizardSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WizardSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WizardSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WizardSessions.
     */
    distinct?: WizardSessionScalarFieldEnum | WizardSessionScalarFieldEnum[]
  }

  /**
   * WizardSession findMany
   */
  export type WizardSessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WizardSession
     */
    select?: WizardSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WizardSession
     */
    omit?: WizardSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WizardSessionInclude<ExtArgs> | null
    /**
     * Filter, which WizardSessions to fetch.
     */
    where?: WizardSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WizardSessions to fetch.
     */
    orderBy?: WizardSessionOrderByWithRelationInput | WizardSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing WizardSessions.
     */
    cursor?: WizardSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WizardSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WizardSessions.
     */
    skip?: number
    distinct?: WizardSessionScalarFieldEnum | WizardSessionScalarFieldEnum[]
  }

  /**
   * WizardSession create
   */
  export type WizardSessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WizardSession
     */
    select?: WizardSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WizardSession
     */
    omit?: WizardSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WizardSessionInclude<ExtArgs> | null
    /**
     * The data needed to create a WizardSession.
     */
    data: XOR<WizardSessionCreateInput, WizardSessionUncheckedCreateInput>
  }

  /**
   * WizardSession createMany
   */
  export type WizardSessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many WizardSessions.
     */
    data: WizardSessionCreateManyInput | WizardSessionCreateManyInput[]
  }

  /**
   * WizardSession createManyAndReturn
   */
  export type WizardSessionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WizardSession
     */
    select?: WizardSessionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WizardSession
     */
    omit?: WizardSessionOmit<ExtArgs> | null
    /**
     * The data used to create many WizardSessions.
     */
    data: WizardSessionCreateManyInput | WizardSessionCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WizardSessionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * WizardSession update
   */
  export type WizardSessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WizardSession
     */
    select?: WizardSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WizardSession
     */
    omit?: WizardSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WizardSessionInclude<ExtArgs> | null
    /**
     * The data needed to update a WizardSession.
     */
    data: XOR<WizardSessionUpdateInput, WizardSessionUncheckedUpdateInput>
    /**
     * Choose, which WizardSession to update.
     */
    where: WizardSessionWhereUniqueInput
  }

  /**
   * WizardSession updateMany
   */
  export type WizardSessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update WizardSessions.
     */
    data: XOR<WizardSessionUpdateManyMutationInput, WizardSessionUncheckedUpdateManyInput>
    /**
     * Filter which WizardSessions to update
     */
    where?: WizardSessionWhereInput
    /**
     * Limit how many WizardSessions to update.
     */
    limit?: number
  }

  /**
   * WizardSession updateManyAndReturn
   */
  export type WizardSessionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WizardSession
     */
    select?: WizardSessionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WizardSession
     */
    omit?: WizardSessionOmit<ExtArgs> | null
    /**
     * The data used to update WizardSessions.
     */
    data: XOR<WizardSessionUpdateManyMutationInput, WizardSessionUncheckedUpdateManyInput>
    /**
     * Filter which WizardSessions to update
     */
    where?: WizardSessionWhereInput
    /**
     * Limit how many WizardSessions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WizardSessionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * WizardSession upsert
   */
  export type WizardSessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WizardSession
     */
    select?: WizardSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WizardSession
     */
    omit?: WizardSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WizardSessionInclude<ExtArgs> | null
    /**
     * The filter to search for the WizardSession to update in case it exists.
     */
    where: WizardSessionWhereUniqueInput
    /**
     * In case the WizardSession found by the `where` argument doesn't exist, create a new WizardSession with this data.
     */
    create: XOR<WizardSessionCreateInput, WizardSessionUncheckedCreateInput>
    /**
     * In case the WizardSession was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WizardSessionUpdateInput, WizardSessionUncheckedUpdateInput>
  }

  /**
   * WizardSession delete
   */
  export type WizardSessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WizardSession
     */
    select?: WizardSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WizardSession
     */
    omit?: WizardSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WizardSessionInclude<ExtArgs> | null
    /**
     * Filter which WizardSession to delete.
     */
    where: WizardSessionWhereUniqueInput
  }

  /**
   * WizardSession deleteMany
   */
  export type WizardSessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WizardSessions to delete
     */
    where?: WizardSessionWhereInput
    /**
     * Limit how many WizardSessions to delete.
     */
    limit?: number
  }

  /**
   * WizardSession.user
   */
  export type WizardSession$userArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * WizardSession without action
   */
  export type WizardSessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WizardSession
     */
    select?: WizardSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WizardSession
     */
    omit?: WizardSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WizardSessionInclude<ExtArgs> | null
  }


  /**
   * Model CatalogVisit
   */

  export type AggregateCatalogVisit = {
    _count: CatalogVisitCountAggregateOutputType | null
    _avg: CatalogVisitAvgAggregateOutputType | null
    _sum: CatalogVisitSumAggregateOutputType | null
    _min: CatalogVisitMinAggregateOutputType | null
    _max: CatalogVisitMaxAggregateOutputType | null
  }

  export type CatalogVisitAvgAggregateOutputType = {
    id: number | null
    userId: number | null
  }

  export type CatalogVisitSumAggregateOutputType = {
    id: number | null
    userId: number | null
  }

  export type CatalogVisitMinAggregateOutputType = {
    id: number | null
    userId: number | null
    phone: string | null
    username: string | null
    firstName: string | null
    lastName: string | null
    userAgent: string | null
    ipAddress: string | null
    visitedAt: Date | null
    createdAt: Date | null
  }

  export type CatalogVisitMaxAggregateOutputType = {
    id: number | null
    userId: number | null
    phone: string | null
    username: string | null
    firstName: string | null
    lastName: string | null
    userAgent: string | null
    ipAddress: string | null
    visitedAt: Date | null
    createdAt: Date | null
  }

  export type CatalogVisitCountAggregateOutputType = {
    id: number
    userId: number
    phone: number
    username: number
    firstName: number
    lastName: number
    userAgent: number
    ipAddress: number
    visitedAt: number
    createdAt: number
    _all: number
  }


  export type CatalogVisitAvgAggregateInputType = {
    id?: true
    userId?: true
  }

  export type CatalogVisitSumAggregateInputType = {
    id?: true
    userId?: true
  }

  export type CatalogVisitMinAggregateInputType = {
    id?: true
    userId?: true
    phone?: true
    username?: true
    firstName?: true
    lastName?: true
    userAgent?: true
    ipAddress?: true
    visitedAt?: true
    createdAt?: true
  }

  export type CatalogVisitMaxAggregateInputType = {
    id?: true
    userId?: true
    phone?: true
    username?: true
    firstName?: true
    lastName?: true
    userAgent?: true
    ipAddress?: true
    visitedAt?: true
    createdAt?: true
  }

  export type CatalogVisitCountAggregateInputType = {
    id?: true
    userId?: true
    phone?: true
    username?: true
    firstName?: true
    lastName?: true
    userAgent?: true
    ipAddress?: true
    visitedAt?: true
    createdAt?: true
    _all?: true
  }

  export type CatalogVisitAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CatalogVisit to aggregate.
     */
    where?: CatalogVisitWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CatalogVisits to fetch.
     */
    orderBy?: CatalogVisitOrderByWithRelationInput | CatalogVisitOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CatalogVisitWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CatalogVisits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CatalogVisits.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CatalogVisits
    **/
    _count?: true | CatalogVisitCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CatalogVisitAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CatalogVisitSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CatalogVisitMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CatalogVisitMaxAggregateInputType
  }

  export type GetCatalogVisitAggregateType<T extends CatalogVisitAggregateArgs> = {
        [P in keyof T & keyof AggregateCatalogVisit]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCatalogVisit[P]>
      : GetScalarType<T[P], AggregateCatalogVisit[P]>
  }




  export type CatalogVisitGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CatalogVisitWhereInput
    orderBy?: CatalogVisitOrderByWithAggregationInput | CatalogVisitOrderByWithAggregationInput[]
    by: CatalogVisitScalarFieldEnum[] | CatalogVisitScalarFieldEnum
    having?: CatalogVisitScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CatalogVisitCountAggregateInputType | true
    _avg?: CatalogVisitAvgAggregateInputType
    _sum?: CatalogVisitSumAggregateInputType
    _min?: CatalogVisitMinAggregateInputType
    _max?: CatalogVisitMaxAggregateInputType
  }

  export type CatalogVisitGroupByOutputType = {
    id: number
    userId: number | null
    phone: string | null
    username: string | null
    firstName: string | null
    lastName: string | null
    userAgent: string | null
    ipAddress: string | null
    visitedAt: Date
    createdAt: Date
    _count: CatalogVisitCountAggregateOutputType | null
    _avg: CatalogVisitAvgAggregateOutputType | null
    _sum: CatalogVisitSumAggregateOutputType | null
    _min: CatalogVisitMinAggregateOutputType | null
    _max: CatalogVisitMaxAggregateOutputType | null
  }

  type GetCatalogVisitGroupByPayload<T extends CatalogVisitGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CatalogVisitGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CatalogVisitGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CatalogVisitGroupByOutputType[P]>
            : GetScalarType<T[P], CatalogVisitGroupByOutputType[P]>
        }
      >
    >


  export type CatalogVisitSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    phone?: boolean
    username?: boolean
    firstName?: boolean
    lastName?: boolean
    userAgent?: boolean
    ipAddress?: boolean
    visitedAt?: boolean
    createdAt?: boolean
    user?: boolean | CatalogVisit$userArgs<ExtArgs>
  }, ExtArgs["result"]["catalogVisit"]>

  export type CatalogVisitSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    phone?: boolean
    username?: boolean
    firstName?: boolean
    lastName?: boolean
    userAgent?: boolean
    ipAddress?: boolean
    visitedAt?: boolean
    createdAt?: boolean
    user?: boolean | CatalogVisit$userArgs<ExtArgs>
  }, ExtArgs["result"]["catalogVisit"]>

  export type CatalogVisitSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    phone?: boolean
    username?: boolean
    firstName?: boolean
    lastName?: boolean
    userAgent?: boolean
    ipAddress?: boolean
    visitedAt?: boolean
    createdAt?: boolean
    user?: boolean | CatalogVisit$userArgs<ExtArgs>
  }, ExtArgs["result"]["catalogVisit"]>

  export type CatalogVisitSelectScalar = {
    id?: boolean
    userId?: boolean
    phone?: boolean
    username?: boolean
    firstName?: boolean
    lastName?: boolean
    userAgent?: boolean
    ipAddress?: boolean
    visitedAt?: boolean
    createdAt?: boolean
  }

  export type CatalogVisitOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "phone" | "username" | "firstName" | "lastName" | "userAgent" | "ipAddress" | "visitedAt" | "createdAt", ExtArgs["result"]["catalogVisit"]>
  export type CatalogVisitInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | CatalogVisit$userArgs<ExtArgs>
  }
  export type CatalogVisitIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | CatalogVisit$userArgs<ExtArgs>
  }
  export type CatalogVisitIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | CatalogVisit$userArgs<ExtArgs>
  }

  export type $CatalogVisitPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CatalogVisit"
    objects: {
      user: Prisma.$UserPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userId: number | null
      phone: string | null
      username: string | null
      firstName: string | null
      lastName: string | null
      userAgent: string | null
      ipAddress: string | null
      visitedAt: Date
      createdAt: Date
    }, ExtArgs["result"]["catalogVisit"]>
    composites: {}
  }

  type CatalogVisitGetPayload<S extends boolean | null | undefined | CatalogVisitDefaultArgs> = $Result.GetResult<Prisma.$CatalogVisitPayload, S>

  type CatalogVisitCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CatalogVisitFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CatalogVisitCountAggregateInputType | true
    }

  export interface CatalogVisitDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CatalogVisit'], meta: { name: 'CatalogVisit' } }
    /**
     * Find zero or one CatalogVisit that matches the filter.
     * @param {CatalogVisitFindUniqueArgs} args - Arguments to find a CatalogVisit
     * @example
     * // Get one CatalogVisit
     * const catalogVisit = await prisma.catalogVisit.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CatalogVisitFindUniqueArgs>(args: SelectSubset<T, CatalogVisitFindUniqueArgs<ExtArgs>>): Prisma__CatalogVisitClient<$Result.GetResult<Prisma.$CatalogVisitPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CatalogVisit that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CatalogVisitFindUniqueOrThrowArgs} args - Arguments to find a CatalogVisit
     * @example
     * // Get one CatalogVisit
     * const catalogVisit = await prisma.catalogVisit.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CatalogVisitFindUniqueOrThrowArgs>(args: SelectSubset<T, CatalogVisitFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CatalogVisitClient<$Result.GetResult<Prisma.$CatalogVisitPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CatalogVisit that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CatalogVisitFindFirstArgs} args - Arguments to find a CatalogVisit
     * @example
     * // Get one CatalogVisit
     * const catalogVisit = await prisma.catalogVisit.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CatalogVisitFindFirstArgs>(args?: SelectSubset<T, CatalogVisitFindFirstArgs<ExtArgs>>): Prisma__CatalogVisitClient<$Result.GetResult<Prisma.$CatalogVisitPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CatalogVisit that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CatalogVisitFindFirstOrThrowArgs} args - Arguments to find a CatalogVisit
     * @example
     * // Get one CatalogVisit
     * const catalogVisit = await prisma.catalogVisit.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CatalogVisitFindFirstOrThrowArgs>(args?: SelectSubset<T, CatalogVisitFindFirstOrThrowArgs<ExtArgs>>): Prisma__CatalogVisitClient<$Result.GetResult<Prisma.$CatalogVisitPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CatalogVisits that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CatalogVisitFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CatalogVisits
     * const catalogVisits = await prisma.catalogVisit.findMany()
     * 
     * // Get first 10 CatalogVisits
     * const catalogVisits = await prisma.catalogVisit.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const catalogVisitWithIdOnly = await prisma.catalogVisit.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CatalogVisitFindManyArgs>(args?: SelectSubset<T, CatalogVisitFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CatalogVisitPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CatalogVisit.
     * @param {CatalogVisitCreateArgs} args - Arguments to create a CatalogVisit.
     * @example
     * // Create one CatalogVisit
     * const CatalogVisit = await prisma.catalogVisit.create({
     *   data: {
     *     // ... data to create a CatalogVisit
     *   }
     * })
     * 
     */
    create<T extends CatalogVisitCreateArgs>(args: SelectSubset<T, CatalogVisitCreateArgs<ExtArgs>>): Prisma__CatalogVisitClient<$Result.GetResult<Prisma.$CatalogVisitPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CatalogVisits.
     * @param {CatalogVisitCreateManyArgs} args - Arguments to create many CatalogVisits.
     * @example
     * // Create many CatalogVisits
     * const catalogVisit = await prisma.catalogVisit.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CatalogVisitCreateManyArgs>(args?: SelectSubset<T, CatalogVisitCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CatalogVisits and returns the data saved in the database.
     * @param {CatalogVisitCreateManyAndReturnArgs} args - Arguments to create many CatalogVisits.
     * @example
     * // Create many CatalogVisits
     * const catalogVisit = await prisma.catalogVisit.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CatalogVisits and only return the `id`
     * const catalogVisitWithIdOnly = await prisma.catalogVisit.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CatalogVisitCreateManyAndReturnArgs>(args?: SelectSubset<T, CatalogVisitCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CatalogVisitPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a CatalogVisit.
     * @param {CatalogVisitDeleteArgs} args - Arguments to delete one CatalogVisit.
     * @example
     * // Delete one CatalogVisit
     * const CatalogVisit = await prisma.catalogVisit.delete({
     *   where: {
     *     // ... filter to delete one CatalogVisit
     *   }
     * })
     * 
     */
    delete<T extends CatalogVisitDeleteArgs>(args: SelectSubset<T, CatalogVisitDeleteArgs<ExtArgs>>): Prisma__CatalogVisitClient<$Result.GetResult<Prisma.$CatalogVisitPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CatalogVisit.
     * @param {CatalogVisitUpdateArgs} args - Arguments to update one CatalogVisit.
     * @example
     * // Update one CatalogVisit
     * const catalogVisit = await prisma.catalogVisit.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CatalogVisitUpdateArgs>(args: SelectSubset<T, CatalogVisitUpdateArgs<ExtArgs>>): Prisma__CatalogVisitClient<$Result.GetResult<Prisma.$CatalogVisitPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CatalogVisits.
     * @param {CatalogVisitDeleteManyArgs} args - Arguments to filter CatalogVisits to delete.
     * @example
     * // Delete a few CatalogVisits
     * const { count } = await prisma.catalogVisit.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CatalogVisitDeleteManyArgs>(args?: SelectSubset<T, CatalogVisitDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CatalogVisits.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CatalogVisitUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CatalogVisits
     * const catalogVisit = await prisma.catalogVisit.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CatalogVisitUpdateManyArgs>(args: SelectSubset<T, CatalogVisitUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CatalogVisits and returns the data updated in the database.
     * @param {CatalogVisitUpdateManyAndReturnArgs} args - Arguments to update many CatalogVisits.
     * @example
     * // Update many CatalogVisits
     * const catalogVisit = await prisma.catalogVisit.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CatalogVisits and only return the `id`
     * const catalogVisitWithIdOnly = await prisma.catalogVisit.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CatalogVisitUpdateManyAndReturnArgs>(args: SelectSubset<T, CatalogVisitUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CatalogVisitPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one CatalogVisit.
     * @param {CatalogVisitUpsertArgs} args - Arguments to update or create a CatalogVisit.
     * @example
     * // Update or create a CatalogVisit
     * const catalogVisit = await prisma.catalogVisit.upsert({
     *   create: {
     *     // ... data to create a CatalogVisit
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CatalogVisit we want to update
     *   }
     * })
     */
    upsert<T extends CatalogVisitUpsertArgs>(args: SelectSubset<T, CatalogVisitUpsertArgs<ExtArgs>>): Prisma__CatalogVisitClient<$Result.GetResult<Prisma.$CatalogVisitPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CatalogVisits.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CatalogVisitCountArgs} args - Arguments to filter CatalogVisits to count.
     * @example
     * // Count the number of CatalogVisits
     * const count = await prisma.catalogVisit.count({
     *   where: {
     *     // ... the filter for the CatalogVisits we want to count
     *   }
     * })
    **/
    count<T extends CatalogVisitCountArgs>(
      args?: Subset<T, CatalogVisitCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CatalogVisitCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CatalogVisit.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CatalogVisitAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CatalogVisitAggregateArgs>(args: Subset<T, CatalogVisitAggregateArgs>): Prisma.PrismaPromise<GetCatalogVisitAggregateType<T>>

    /**
     * Group by CatalogVisit.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CatalogVisitGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CatalogVisitGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CatalogVisitGroupByArgs['orderBy'] }
        : { orderBy?: CatalogVisitGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CatalogVisitGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCatalogVisitGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CatalogVisit model
   */
  readonly fields: CatalogVisitFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CatalogVisit.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CatalogVisitClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends CatalogVisit$userArgs<ExtArgs> = {}>(args?: Subset<T, CatalogVisit$userArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CatalogVisit model
   */
  interface CatalogVisitFieldRefs {
    readonly id: FieldRef<"CatalogVisit", 'Int'>
    readonly userId: FieldRef<"CatalogVisit", 'Int'>
    readonly phone: FieldRef<"CatalogVisit", 'String'>
    readonly username: FieldRef<"CatalogVisit", 'String'>
    readonly firstName: FieldRef<"CatalogVisit", 'String'>
    readonly lastName: FieldRef<"CatalogVisit", 'String'>
    readonly userAgent: FieldRef<"CatalogVisit", 'String'>
    readonly ipAddress: FieldRef<"CatalogVisit", 'String'>
    readonly visitedAt: FieldRef<"CatalogVisit", 'DateTime'>
    readonly createdAt: FieldRef<"CatalogVisit", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CatalogVisit findUnique
   */
  export type CatalogVisitFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CatalogVisit
     */
    select?: CatalogVisitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CatalogVisit
     */
    omit?: CatalogVisitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CatalogVisitInclude<ExtArgs> | null
    /**
     * Filter, which CatalogVisit to fetch.
     */
    where: CatalogVisitWhereUniqueInput
  }

  /**
   * CatalogVisit findUniqueOrThrow
   */
  export type CatalogVisitFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CatalogVisit
     */
    select?: CatalogVisitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CatalogVisit
     */
    omit?: CatalogVisitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CatalogVisitInclude<ExtArgs> | null
    /**
     * Filter, which CatalogVisit to fetch.
     */
    where: CatalogVisitWhereUniqueInput
  }

  /**
   * CatalogVisit findFirst
   */
  export type CatalogVisitFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CatalogVisit
     */
    select?: CatalogVisitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CatalogVisit
     */
    omit?: CatalogVisitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CatalogVisitInclude<ExtArgs> | null
    /**
     * Filter, which CatalogVisit to fetch.
     */
    where?: CatalogVisitWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CatalogVisits to fetch.
     */
    orderBy?: CatalogVisitOrderByWithRelationInput | CatalogVisitOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CatalogVisits.
     */
    cursor?: CatalogVisitWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CatalogVisits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CatalogVisits.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CatalogVisits.
     */
    distinct?: CatalogVisitScalarFieldEnum | CatalogVisitScalarFieldEnum[]
  }

  /**
   * CatalogVisit findFirstOrThrow
   */
  export type CatalogVisitFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CatalogVisit
     */
    select?: CatalogVisitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CatalogVisit
     */
    omit?: CatalogVisitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CatalogVisitInclude<ExtArgs> | null
    /**
     * Filter, which CatalogVisit to fetch.
     */
    where?: CatalogVisitWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CatalogVisits to fetch.
     */
    orderBy?: CatalogVisitOrderByWithRelationInput | CatalogVisitOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CatalogVisits.
     */
    cursor?: CatalogVisitWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CatalogVisits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CatalogVisits.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CatalogVisits.
     */
    distinct?: CatalogVisitScalarFieldEnum | CatalogVisitScalarFieldEnum[]
  }

  /**
   * CatalogVisit findMany
   */
  export type CatalogVisitFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CatalogVisit
     */
    select?: CatalogVisitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CatalogVisit
     */
    omit?: CatalogVisitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CatalogVisitInclude<ExtArgs> | null
    /**
     * Filter, which CatalogVisits to fetch.
     */
    where?: CatalogVisitWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CatalogVisits to fetch.
     */
    orderBy?: CatalogVisitOrderByWithRelationInput | CatalogVisitOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CatalogVisits.
     */
    cursor?: CatalogVisitWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CatalogVisits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CatalogVisits.
     */
    skip?: number
    distinct?: CatalogVisitScalarFieldEnum | CatalogVisitScalarFieldEnum[]
  }

  /**
   * CatalogVisit create
   */
  export type CatalogVisitCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CatalogVisit
     */
    select?: CatalogVisitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CatalogVisit
     */
    omit?: CatalogVisitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CatalogVisitInclude<ExtArgs> | null
    /**
     * The data needed to create a CatalogVisit.
     */
    data?: XOR<CatalogVisitCreateInput, CatalogVisitUncheckedCreateInput>
  }

  /**
   * CatalogVisit createMany
   */
  export type CatalogVisitCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CatalogVisits.
     */
    data: CatalogVisitCreateManyInput | CatalogVisitCreateManyInput[]
  }

  /**
   * CatalogVisit createManyAndReturn
   */
  export type CatalogVisitCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CatalogVisit
     */
    select?: CatalogVisitSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CatalogVisit
     */
    omit?: CatalogVisitOmit<ExtArgs> | null
    /**
     * The data used to create many CatalogVisits.
     */
    data: CatalogVisitCreateManyInput | CatalogVisitCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CatalogVisitIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CatalogVisit update
   */
  export type CatalogVisitUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CatalogVisit
     */
    select?: CatalogVisitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CatalogVisit
     */
    omit?: CatalogVisitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CatalogVisitInclude<ExtArgs> | null
    /**
     * The data needed to update a CatalogVisit.
     */
    data: XOR<CatalogVisitUpdateInput, CatalogVisitUncheckedUpdateInput>
    /**
     * Choose, which CatalogVisit to update.
     */
    where: CatalogVisitWhereUniqueInput
  }

  /**
   * CatalogVisit updateMany
   */
  export type CatalogVisitUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CatalogVisits.
     */
    data: XOR<CatalogVisitUpdateManyMutationInput, CatalogVisitUncheckedUpdateManyInput>
    /**
     * Filter which CatalogVisits to update
     */
    where?: CatalogVisitWhereInput
    /**
     * Limit how many CatalogVisits to update.
     */
    limit?: number
  }

  /**
   * CatalogVisit updateManyAndReturn
   */
  export type CatalogVisitUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CatalogVisit
     */
    select?: CatalogVisitSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CatalogVisit
     */
    omit?: CatalogVisitOmit<ExtArgs> | null
    /**
     * The data used to update CatalogVisits.
     */
    data: XOR<CatalogVisitUpdateManyMutationInput, CatalogVisitUncheckedUpdateManyInput>
    /**
     * Filter which CatalogVisits to update
     */
    where?: CatalogVisitWhereInput
    /**
     * Limit how many CatalogVisits to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CatalogVisitIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * CatalogVisit upsert
   */
  export type CatalogVisitUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CatalogVisit
     */
    select?: CatalogVisitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CatalogVisit
     */
    omit?: CatalogVisitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CatalogVisitInclude<ExtArgs> | null
    /**
     * The filter to search for the CatalogVisit to update in case it exists.
     */
    where: CatalogVisitWhereUniqueInput
    /**
     * In case the CatalogVisit found by the `where` argument doesn't exist, create a new CatalogVisit with this data.
     */
    create: XOR<CatalogVisitCreateInput, CatalogVisitUncheckedCreateInput>
    /**
     * In case the CatalogVisit was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CatalogVisitUpdateInput, CatalogVisitUncheckedUpdateInput>
  }

  /**
   * CatalogVisit delete
   */
  export type CatalogVisitDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CatalogVisit
     */
    select?: CatalogVisitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CatalogVisit
     */
    omit?: CatalogVisitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CatalogVisitInclude<ExtArgs> | null
    /**
     * Filter which CatalogVisit to delete.
     */
    where: CatalogVisitWhereUniqueInput
  }

  /**
   * CatalogVisit deleteMany
   */
  export type CatalogVisitDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CatalogVisits to delete
     */
    where?: CatalogVisitWhereInput
    /**
     * Limit how many CatalogVisits to delete.
     */
    limit?: number
  }

  /**
   * CatalogVisit.user
   */
  export type CatalogVisit$userArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * CatalogVisit without action
   */
  export type CatalogVisitDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CatalogVisit
     */
    select?: CatalogVisitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CatalogVisit
     */
    omit?: CatalogVisitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CatalogVisitInclude<ExtArgs> | null
  }


  /**
   * Model Lead
   */

  export type AggregateLead = {
    _count: LeadCountAggregateOutputType | null
    _avg: LeadAvgAggregateOutputType | null
    _sum: LeadSumAggregateOutputType | null
    _min: LeadMinAggregateOutputType | null
    _max: LeadMaxAggregateOutputType | null
  }

  export type LeadAvgAggregateOutputType = {
    id: number | null
    carId: number | null
    bitrixLeadId: number | null
  }

  export type LeadSumAggregateOutputType = {
    id: number | null
    carId: number | null
    bitrixLeadId: number | null
  }

  export type LeadMinAggregateOutputType = {
    id: number | null
    name: string | null
    phone: string | null
    message: string | null
    source: string | null
    status: string | null
    carId: number | null
    carLabel: string | null
    telegramId: string | null
    telegramUsername: string | null
    bitrixLeadId: number | null
    bitrixStatus: string | null
    meta: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type LeadMaxAggregateOutputType = {
    id: number | null
    name: string | null
    phone: string | null
    message: string | null
    source: string | null
    status: string | null
    carId: number | null
    carLabel: string | null
    telegramId: string | null
    telegramUsername: string | null
    bitrixLeadId: number | null
    bitrixStatus: string | null
    meta: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type LeadCountAggregateOutputType = {
    id: number
    name: number
    phone: number
    message: number
    source: number
    status: number
    carId: number
    carLabel: number
    telegramId: number
    telegramUsername: number
    bitrixLeadId: number
    bitrixStatus: number
    meta: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type LeadAvgAggregateInputType = {
    id?: true
    carId?: true
    bitrixLeadId?: true
  }

  export type LeadSumAggregateInputType = {
    id?: true
    carId?: true
    bitrixLeadId?: true
  }

  export type LeadMinAggregateInputType = {
    id?: true
    name?: true
    phone?: true
    message?: true
    source?: true
    status?: true
    carId?: true
    carLabel?: true
    telegramId?: true
    telegramUsername?: true
    bitrixLeadId?: true
    bitrixStatus?: true
    meta?: true
    createdAt?: true
    updatedAt?: true
  }

  export type LeadMaxAggregateInputType = {
    id?: true
    name?: true
    phone?: true
    message?: true
    source?: true
    status?: true
    carId?: true
    carLabel?: true
    telegramId?: true
    telegramUsername?: true
    bitrixLeadId?: true
    bitrixStatus?: true
    meta?: true
    createdAt?: true
    updatedAt?: true
  }

  export type LeadCountAggregateInputType = {
    id?: true
    name?: true
    phone?: true
    message?: true
    source?: true
    status?: true
    carId?: true
    carLabel?: true
    telegramId?: true
    telegramUsername?: true
    bitrixLeadId?: true
    bitrixStatus?: true
    meta?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type LeadAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Lead to aggregate.
     */
    where?: LeadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Leads to fetch.
     */
    orderBy?: LeadOrderByWithRelationInput | LeadOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LeadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Leads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Leads.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Leads
    **/
    _count?: true | LeadCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: LeadAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: LeadSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LeadMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LeadMaxAggregateInputType
  }

  export type GetLeadAggregateType<T extends LeadAggregateArgs> = {
        [P in keyof T & keyof AggregateLead]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLead[P]>
      : GetScalarType<T[P], AggregateLead[P]>
  }




  export type LeadGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LeadWhereInput
    orderBy?: LeadOrderByWithAggregationInput | LeadOrderByWithAggregationInput[]
    by: LeadScalarFieldEnum[] | LeadScalarFieldEnum
    having?: LeadScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LeadCountAggregateInputType | true
    _avg?: LeadAvgAggregateInputType
    _sum?: LeadSumAggregateInputType
    _min?: LeadMinAggregateInputType
    _max?: LeadMaxAggregateInputType
  }

  export type LeadGroupByOutputType = {
    id: number
    name: string
    phone: string
    message: string | null
    source: string
    status: string
    carId: number | null
    carLabel: string | null
    telegramId: string | null
    telegramUsername: string | null
    bitrixLeadId: number | null
    bitrixStatus: string | null
    meta: string | null
    createdAt: Date
    updatedAt: Date
    _count: LeadCountAggregateOutputType | null
    _avg: LeadAvgAggregateOutputType | null
    _sum: LeadSumAggregateOutputType | null
    _min: LeadMinAggregateOutputType | null
    _max: LeadMaxAggregateOutputType | null
  }

  type GetLeadGroupByPayload<T extends LeadGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LeadGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LeadGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LeadGroupByOutputType[P]>
            : GetScalarType<T[P], LeadGroupByOutputType[P]>
        }
      >
    >


  export type LeadSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    phone?: boolean
    message?: boolean
    source?: boolean
    status?: boolean
    carId?: boolean
    carLabel?: boolean
    telegramId?: boolean
    telegramUsername?: boolean
    bitrixLeadId?: boolean
    bitrixStatus?: boolean
    meta?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["lead"]>

  export type LeadSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    phone?: boolean
    message?: boolean
    source?: boolean
    status?: boolean
    carId?: boolean
    carLabel?: boolean
    telegramId?: boolean
    telegramUsername?: boolean
    bitrixLeadId?: boolean
    bitrixStatus?: boolean
    meta?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["lead"]>

  export type LeadSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    phone?: boolean
    message?: boolean
    source?: boolean
    status?: boolean
    carId?: boolean
    carLabel?: boolean
    telegramId?: boolean
    telegramUsername?: boolean
    bitrixLeadId?: boolean
    bitrixStatus?: boolean
    meta?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["lead"]>

  export type LeadSelectScalar = {
    id?: boolean
    name?: boolean
    phone?: boolean
    message?: boolean
    source?: boolean
    status?: boolean
    carId?: boolean
    carLabel?: boolean
    telegramId?: boolean
    telegramUsername?: boolean
    bitrixLeadId?: boolean
    bitrixStatus?: boolean
    meta?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type LeadOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "phone" | "message" | "source" | "status" | "carId" | "carLabel" | "telegramId" | "telegramUsername" | "bitrixLeadId" | "bitrixStatus" | "meta" | "createdAt" | "updatedAt", ExtArgs["result"]["lead"]>

  export type $LeadPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Lead"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      phone: string
      message: string | null
      source: string
      status: string
      carId: number | null
      carLabel: string | null
      telegramId: string | null
      telegramUsername: string | null
      bitrixLeadId: number | null
      bitrixStatus: string | null
      meta: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["lead"]>
    composites: {}
  }

  type LeadGetPayload<S extends boolean | null | undefined | LeadDefaultArgs> = $Result.GetResult<Prisma.$LeadPayload, S>

  type LeadCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<LeadFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LeadCountAggregateInputType | true
    }

  export interface LeadDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Lead'], meta: { name: 'Lead' } }
    /**
     * Find zero or one Lead that matches the filter.
     * @param {LeadFindUniqueArgs} args - Arguments to find a Lead
     * @example
     * // Get one Lead
     * const lead = await prisma.lead.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LeadFindUniqueArgs>(args: SelectSubset<T, LeadFindUniqueArgs<ExtArgs>>): Prisma__LeadClient<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Lead that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LeadFindUniqueOrThrowArgs} args - Arguments to find a Lead
     * @example
     * // Get one Lead
     * const lead = await prisma.lead.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LeadFindUniqueOrThrowArgs>(args: SelectSubset<T, LeadFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LeadClient<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Lead that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeadFindFirstArgs} args - Arguments to find a Lead
     * @example
     * // Get one Lead
     * const lead = await prisma.lead.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LeadFindFirstArgs>(args?: SelectSubset<T, LeadFindFirstArgs<ExtArgs>>): Prisma__LeadClient<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Lead that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeadFindFirstOrThrowArgs} args - Arguments to find a Lead
     * @example
     * // Get one Lead
     * const lead = await prisma.lead.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LeadFindFirstOrThrowArgs>(args?: SelectSubset<T, LeadFindFirstOrThrowArgs<ExtArgs>>): Prisma__LeadClient<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Leads that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeadFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Leads
     * const leads = await prisma.lead.findMany()
     * 
     * // Get first 10 Leads
     * const leads = await prisma.lead.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const leadWithIdOnly = await prisma.lead.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LeadFindManyArgs>(args?: SelectSubset<T, LeadFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Lead.
     * @param {LeadCreateArgs} args - Arguments to create a Lead.
     * @example
     * // Create one Lead
     * const Lead = await prisma.lead.create({
     *   data: {
     *     // ... data to create a Lead
     *   }
     * })
     * 
     */
    create<T extends LeadCreateArgs>(args: SelectSubset<T, LeadCreateArgs<ExtArgs>>): Prisma__LeadClient<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Leads.
     * @param {LeadCreateManyArgs} args - Arguments to create many Leads.
     * @example
     * // Create many Leads
     * const lead = await prisma.lead.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LeadCreateManyArgs>(args?: SelectSubset<T, LeadCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Leads and returns the data saved in the database.
     * @param {LeadCreateManyAndReturnArgs} args - Arguments to create many Leads.
     * @example
     * // Create many Leads
     * const lead = await prisma.lead.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Leads and only return the `id`
     * const leadWithIdOnly = await prisma.lead.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LeadCreateManyAndReturnArgs>(args?: SelectSubset<T, LeadCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Lead.
     * @param {LeadDeleteArgs} args - Arguments to delete one Lead.
     * @example
     * // Delete one Lead
     * const Lead = await prisma.lead.delete({
     *   where: {
     *     // ... filter to delete one Lead
     *   }
     * })
     * 
     */
    delete<T extends LeadDeleteArgs>(args: SelectSubset<T, LeadDeleteArgs<ExtArgs>>): Prisma__LeadClient<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Lead.
     * @param {LeadUpdateArgs} args - Arguments to update one Lead.
     * @example
     * // Update one Lead
     * const lead = await prisma.lead.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LeadUpdateArgs>(args: SelectSubset<T, LeadUpdateArgs<ExtArgs>>): Prisma__LeadClient<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Leads.
     * @param {LeadDeleteManyArgs} args - Arguments to filter Leads to delete.
     * @example
     * // Delete a few Leads
     * const { count } = await prisma.lead.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LeadDeleteManyArgs>(args?: SelectSubset<T, LeadDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Leads.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeadUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Leads
     * const lead = await prisma.lead.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LeadUpdateManyArgs>(args: SelectSubset<T, LeadUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Leads and returns the data updated in the database.
     * @param {LeadUpdateManyAndReturnArgs} args - Arguments to update many Leads.
     * @example
     * // Update many Leads
     * const lead = await prisma.lead.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Leads and only return the `id`
     * const leadWithIdOnly = await prisma.lead.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends LeadUpdateManyAndReturnArgs>(args: SelectSubset<T, LeadUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Lead.
     * @param {LeadUpsertArgs} args - Arguments to update or create a Lead.
     * @example
     * // Update or create a Lead
     * const lead = await prisma.lead.upsert({
     *   create: {
     *     // ... data to create a Lead
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Lead we want to update
     *   }
     * })
     */
    upsert<T extends LeadUpsertArgs>(args: SelectSubset<T, LeadUpsertArgs<ExtArgs>>): Prisma__LeadClient<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Leads.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeadCountArgs} args - Arguments to filter Leads to count.
     * @example
     * // Count the number of Leads
     * const count = await prisma.lead.count({
     *   where: {
     *     // ... the filter for the Leads we want to count
     *   }
     * })
    **/
    count<T extends LeadCountArgs>(
      args?: Subset<T, LeadCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LeadCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Lead.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeadAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LeadAggregateArgs>(args: Subset<T, LeadAggregateArgs>): Prisma.PrismaPromise<GetLeadAggregateType<T>>

    /**
     * Group by Lead.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeadGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends LeadGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LeadGroupByArgs['orderBy'] }
        : { orderBy?: LeadGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LeadGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLeadGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Lead model
   */
  readonly fields: LeadFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Lead.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LeadClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Lead model
   */
  interface LeadFieldRefs {
    readonly id: FieldRef<"Lead", 'Int'>
    readonly name: FieldRef<"Lead", 'String'>
    readonly phone: FieldRef<"Lead", 'String'>
    readonly message: FieldRef<"Lead", 'String'>
    readonly source: FieldRef<"Lead", 'String'>
    readonly status: FieldRef<"Lead", 'String'>
    readonly carId: FieldRef<"Lead", 'Int'>
    readonly carLabel: FieldRef<"Lead", 'String'>
    readonly telegramId: FieldRef<"Lead", 'String'>
    readonly telegramUsername: FieldRef<"Lead", 'String'>
    readonly bitrixLeadId: FieldRef<"Lead", 'Int'>
    readonly bitrixStatus: FieldRef<"Lead", 'String'>
    readonly meta: FieldRef<"Lead", 'String'>
    readonly createdAt: FieldRef<"Lead", 'DateTime'>
    readonly updatedAt: FieldRef<"Lead", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Lead findUnique
   */
  export type LeadFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lead
     */
    omit?: LeadOmit<ExtArgs> | null
    /**
     * Filter, which Lead to fetch.
     */
    where: LeadWhereUniqueInput
  }

  /**
   * Lead findUniqueOrThrow
   */
  export type LeadFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lead
     */
    omit?: LeadOmit<ExtArgs> | null
    /**
     * Filter, which Lead to fetch.
     */
    where: LeadWhereUniqueInput
  }

  /**
   * Lead findFirst
   */
  export type LeadFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lead
     */
    omit?: LeadOmit<ExtArgs> | null
    /**
     * Filter, which Lead to fetch.
     */
    where?: LeadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Leads to fetch.
     */
    orderBy?: LeadOrderByWithRelationInput | LeadOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Leads.
     */
    cursor?: LeadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Leads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Leads.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Leads.
     */
    distinct?: LeadScalarFieldEnum | LeadScalarFieldEnum[]
  }

  /**
   * Lead findFirstOrThrow
   */
  export type LeadFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lead
     */
    omit?: LeadOmit<ExtArgs> | null
    /**
     * Filter, which Lead to fetch.
     */
    where?: LeadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Leads to fetch.
     */
    orderBy?: LeadOrderByWithRelationInput | LeadOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Leads.
     */
    cursor?: LeadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Leads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Leads.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Leads.
     */
    distinct?: LeadScalarFieldEnum | LeadScalarFieldEnum[]
  }

  /**
   * Lead findMany
   */
  export type LeadFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lead
     */
    omit?: LeadOmit<ExtArgs> | null
    /**
     * Filter, which Leads to fetch.
     */
    where?: LeadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Leads to fetch.
     */
    orderBy?: LeadOrderByWithRelationInput | LeadOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Leads.
     */
    cursor?: LeadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Leads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Leads.
     */
    skip?: number
    distinct?: LeadScalarFieldEnum | LeadScalarFieldEnum[]
  }

  /**
   * Lead create
   */
  export type LeadCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lead
     */
    omit?: LeadOmit<ExtArgs> | null
    /**
     * The data needed to create a Lead.
     */
    data: XOR<LeadCreateInput, LeadUncheckedCreateInput>
  }

  /**
   * Lead createMany
   */
  export type LeadCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Leads.
     */
    data: LeadCreateManyInput | LeadCreateManyInput[]
  }

  /**
   * Lead createManyAndReturn
   */
  export type LeadCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Lead
     */
    omit?: LeadOmit<ExtArgs> | null
    /**
     * The data used to create many Leads.
     */
    data: LeadCreateManyInput | LeadCreateManyInput[]
  }

  /**
   * Lead update
   */
  export type LeadUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lead
     */
    omit?: LeadOmit<ExtArgs> | null
    /**
     * The data needed to update a Lead.
     */
    data: XOR<LeadUpdateInput, LeadUncheckedUpdateInput>
    /**
     * Choose, which Lead to update.
     */
    where: LeadWhereUniqueInput
  }

  /**
   * Lead updateMany
   */
  export type LeadUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Leads.
     */
    data: XOR<LeadUpdateManyMutationInput, LeadUncheckedUpdateManyInput>
    /**
     * Filter which Leads to update
     */
    where?: LeadWhereInput
    /**
     * Limit how many Leads to update.
     */
    limit?: number
  }

  /**
   * Lead updateManyAndReturn
   */
  export type LeadUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Lead
     */
    omit?: LeadOmit<ExtArgs> | null
    /**
     * The data used to update Leads.
     */
    data: XOR<LeadUpdateManyMutationInput, LeadUncheckedUpdateManyInput>
    /**
     * Filter which Leads to update
     */
    where?: LeadWhereInput
    /**
     * Limit how many Leads to update.
     */
    limit?: number
  }

  /**
   * Lead upsert
   */
  export type LeadUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lead
     */
    omit?: LeadOmit<ExtArgs> | null
    /**
     * The filter to search for the Lead to update in case it exists.
     */
    where: LeadWhereUniqueInput
    /**
     * In case the Lead found by the `where` argument doesn't exist, create a new Lead with this data.
     */
    create: XOR<LeadCreateInput, LeadUncheckedCreateInput>
    /**
     * In case the Lead was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LeadUpdateInput, LeadUncheckedUpdateInput>
  }

  /**
   * Lead delete
   */
  export type LeadDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lead
     */
    omit?: LeadOmit<ExtArgs> | null
    /**
     * Filter which Lead to delete.
     */
    where: LeadWhereUniqueInput
  }

  /**
   * Lead deleteMany
   */
  export type LeadDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Leads to delete
     */
    where?: LeadWhereInput
    /**
     * Limit how many Leads to delete.
     */
    limit?: number
  }

  /**
   * Lead without action
   */
  export type LeadDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lead
     */
    omit?: LeadOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const CarScalarFieldEnum: {
    id: 'id',
    uid: 'uid',
    brand: 'brand',
    sku: 'sku',
    mark: 'mark',
    category: 'category',
    title: 'title',
    description: 'description',
    text: 'text',
    photo: 'photo',
    video: 'video',
    price: 'price',
    quantity: 'quantity',
    priceOld: 'priceOld',
    editions: 'editions',
    modifications: 'modifications',
    externalId: 'externalId',
    parentUid: 'parentUid',
    status: 'status',
    bodyType: 'bodyType',
    engineType: 'engineType',
    engineVolume: 'engineVolume',
    transmission: 'transmission',
    driveType: 'driveType',
    year: 'year',
    enginePower: 'enginePower',
    priceUSD: 'priceUSD',
    monthlyPayment: 'monthlyPayment',
    advancePayment: 'advancePayment',
    countryOfOrigin: 'countryOfOrigin',
    mileage: 'mileage',
    weight: 'weight',
    length: 'length',
    width: 'width',
    height: 'height',
    partnerId: 'partnerId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CarScalarFieldEnum = (typeof CarScalarFieldEnum)[keyof typeof CarScalarFieldEnum]


  export const PartnerScalarFieldEnum: {
    id: 'id',
    slug: 'slug',
    name: 'name',
    photo: 'photo',
    description: 'description',
    active: 'active',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PartnerScalarFieldEnum = (typeof PartnerScalarFieldEnum)[keyof typeof PartnerScalarFieldEnum]


  export const UserScalarFieldEnum: {
    id: 'id',
    telegramId: 'telegramId',
    username: 'username',
    firstName: 'firstName',
    lastName: 'lastName',
    languageCode: 'languageCode',
    chatId: 'chatId',
    isBot: 'isBot',
    phone: 'phone',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const WizardSessionScalarFieldEnum: {
    id: 'id',
    telegramId: 'telegramId',
    userId: 'userId',
    phone: 'phone',
    startOption: 'startOption',
    currentCarBrand: 'currentCarBrand',
    currentCarModel: 'currentCarModel',
    currentCarYear: 'currentCarYear',
    currentCarMileage: 'currentCarMileage',
    currentCarPrice: 'currentCarPrice',
    additionalCash: 'additionalCash',
    monthlyPayment: 'monthlyPayment',
    termMonths: 'termMonths',
    motivations: 'motivations',
    bodyTypes: 'bodyTypes',
    brandPrefs: 'brandPrefs',
    maxBudget: 'maxBudget',
    totalStartBudget: 'totalStartBudget',
    selectedCarId: 'selectedCarId',
    selectedCarLabel: 'selectedCarLabel',
    currentStep: 'currentStep',
    bitrixStatus: 'bitrixStatus',
    bitrixError: 'bitrixError',
    funnelSteps: 'funnelSteps',
    calculationsCount: 'calculationsCount',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type WizardSessionScalarFieldEnum = (typeof WizardSessionScalarFieldEnum)[keyof typeof WizardSessionScalarFieldEnum]


  export const CatalogVisitScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    phone: 'phone',
    username: 'username',
    firstName: 'firstName',
    lastName: 'lastName',
    userAgent: 'userAgent',
    ipAddress: 'ipAddress',
    visitedAt: 'visitedAt',
    createdAt: 'createdAt'
  };

  export type CatalogVisitScalarFieldEnum = (typeof CatalogVisitScalarFieldEnum)[keyof typeof CatalogVisitScalarFieldEnum]


  export const LeadScalarFieldEnum: {
    id: 'id',
    name: 'name',
    phone: 'phone',
    message: 'message',
    source: 'source',
    status: 'status',
    carId: 'carId',
    carLabel: 'carLabel',
    telegramId: 'telegramId',
    telegramUsername: 'telegramUsername',
    bitrixLeadId: 'bitrixLeadId',
    bitrixStatus: 'bitrixStatus',
    meta: 'meta',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type LeadScalarFieldEnum = (typeof LeadScalarFieldEnum)[keyof typeof LeadScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    
  /**
   * Deep Input Types
   */


  export type CarWhereInput = {
    AND?: CarWhereInput | CarWhereInput[]
    OR?: CarWhereInput[]
    NOT?: CarWhereInput | CarWhereInput[]
    id?: IntFilter<"Car"> | number
    uid?: StringFilter<"Car"> | string
    brand?: StringFilter<"Car"> | string
    sku?: StringFilter<"Car"> | string
    mark?: StringFilter<"Car"> | string
    category?: StringFilter<"Car"> | string
    title?: StringFilter<"Car"> | string
    description?: StringFilter<"Car"> | string
    text?: StringFilter<"Car"> | string
    photo?: StringNullableFilter<"Car"> | string | null
    video?: StringNullableFilter<"Car"> | string | null
    price?: FloatFilter<"Car"> | number
    quantity?: IntFilter<"Car"> | number
    priceOld?: FloatNullableFilter<"Car"> | number | null
    editions?: StringNullableFilter<"Car"> | string | null
    modifications?: StringNullableFilter<"Car"> | string | null
    externalId?: StringNullableFilter<"Car"> | string | null
    parentUid?: StringNullableFilter<"Car"> | string | null
    status?: StringNullableFilter<"Car"> | string | null
    bodyType?: StringNullableFilter<"Car"> | string | null
    engineType?: StringFilter<"Car"> | string
    engineVolume?: FloatFilter<"Car"> | number
    transmission?: StringFilter<"Car"> | string
    driveType?: StringFilter<"Car"> | string
    year?: IntFilter<"Car"> | number
    enginePower?: FloatFilter<"Car"> | number
    priceUSD?: StringFilter<"Car"> | string
    monthlyPayment?: FloatNullableFilter<"Car"> | number | null
    advancePayment?: FloatNullableFilter<"Car"> | number | null
    countryOfOrigin?: StringFilter<"Car"> | string
    mileage?: IntFilter<"Car"> | number
    weight?: FloatFilter<"Car"> | number
    length?: FloatFilter<"Car"> | number
    width?: FloatFilter<"Car"> | number
    height?: FloatFilter<"Car"> | number
    partnerId?: IntNullableFilter<"Car"> | number | null
    createdAt?: DateTimeFilter<"Car"> | Date | string
    updatedAt?: DateTimeFilter<"Car"> | Date | string
    partner?: XOR<PartnerNullableScalarRelationFilter, PartnerWhereInput> | null
  }

  export type CarOrderByWithRelationInput = {
    id?: SortOrder
    uid?: SortOrder
    brand?: SortOrder
    sku?: SortOrder
    mark?: SortOrder
    category?: SortOrder
    title?: SortOrder
    description?: SortOrder
    text?: SortOrder
    photo?: SortOrderInput | SortOrder
    video?: SortOrderInput | SortOrder
    price?: SortOrder
    quantity?: SortOrder
    priceOld?: SortOrderInput | SortOrder
    editions?: SortOrderInput | SortOrder
    modifications?: SortOrderInput | SortOrder
    externalId?: SortOrderInput | SortOrder
    parentUid?: SortOrderInput | SortOrder
    status?: SortOrderInput | SortOrder
    bodyType?: SortOrderInput | SortOrder
    engineType?: SortOrder
    engineVolume?: SortOrder
    transmission?: SortOrder
    driveType?: SortOrder
    year?: SortOrder
    enginePower?: SortOrder
    priceUSD?: SortOrder
    monthlyPayment?: SortOrderInput | SortOrder
    advancePayment?: SortOrderInput | SortOrder
    countryOfOrigin?: SortOrder
    mileage?: SortOrder
    weight?: SortOrder
    length?: SortOrder
    width?: SortOrder
    height?: SortOrder
    partnerId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    partner?: PartnerOrderByWithRelationInput
  }

  export type CarWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    uid?: string
    AND?: CarWhereInput | CarWhereInput[]
    OR?: CarWhereInput[]
    NOT?: CarWhereInput | CarWhereInput[]
    brand?: StringFilter<"Car"> | string
    sku?: StringFilter<"Car"> | string
    mark?: StringFilter<"Car"> | string
    category?: StringFilter<"Car"> | string
    title?: StringFilter<"Car"> | string
    description?: StringFilter<"Car"> | string
    text?: StringFilter<"Car"> | string
    photo?: StringNullableFilter<"Car"> | string | null
    video?: StringNullableFilter<"Car"> | string | null
    price?: FloatFilter<"Car"> | number
    quantity?: IntFilter<"Car"> | number
    priceOld?: FloatNullableFilter<"Car"> | number | null
    editions?: StringNullableFilter<"Car"> | string | null
    modifications?: StringNullableFilter<"Car"> | string | null
    externalId?: StringNullableFilter<"Car"> | string | null
    parentUid?: StringNullableFilter<"Car"> | string | null
    status?: StringNullableFilter<"Car"> | string | null
    bodyType?: StringNullableFilter<"Car"> | string | null
    engineType?: StringFilter<"Car"> | string
    engineVolume?: FloatFilter<"Car"> | number
    transmission?: StringFilter<"Car"> | string
    driveType?: StringFilter<"Car"> | string
    year?: IntFilter<"Car"> | number
    enginePower?: FloatFilter<"Car"> | number
    priceUSD?: StringFilter<"Car"> | string
    monthlyPayment?: FloatNullableFilter<"Car"> | number | null
    advancePayment?: FloatNullableFilter<"Car"> | number | null
    countryOfOrigin?: StringFilter<"Car"> | string
    mileage?: IntFilter<"Car"> | number
    weight?: FloatFilter<"Car"> | number
    length?: FloatFilter<"Car"> | number
    width?: FloatFilter<"Car"> | number
    height?: FloatFilter<"Car"> | number
    partnerId?: IntNullableFilter<"Car"> | number | null
    createdAt?: DateTimeFilter<"Car"> | Date | string
    updatedAt?: DateTimeFilter<"Car"> | Date | string
    partner?: XOR<PartnerNullableScalarRelationFilter, PartnerWhereInput> | null
  }, "id" | "uid">

  export type CarOrderByWithAggregationInput = {
    id?: SortOrder
    uid?: SortOrder
    brand?: SortOrder
    sku?: SortOrder
    mark?: SortOrder
    category?: SortOrder
    title?: SortOrder
    description?: SortOrder
    text?: SortOrder
    photo?: SortOrderInput | SortOrder
    video?: SortOrderInput | SortOrder
    price?: SortOrder
    quantity?: SortOrder
    priceOld?: SortOrderInput | SortOrder
    editions?: SortOrderInput | SortOrder
    modifications?: SortOrderInput | SortOrder
    externalId?: SortOrderInput | SortOrder
    parentUid?: SortOrderInput | SortOrder
    status?: SortOrderInput | SortOrder
    bodyType?: SortOrderInput | SortOrder
    engineType?: SortOrder
    engineVolume?: SortOrder
    transmission?: SortOrder
    driveType?: SortOrder
    year?: SortOrder
    enginePower?: SortOrder
    priceUSD?: SortOrder
    monthlyPayment?: SortOrderInput | SortOrder
    advancePayment?: SortOrderInput | SortOrder
    countryOfOrigin?: SortOrder
    mileage?: SortOrder
    weight?: SortOrder
    length?: SortOrder
    width?: SortOrder
    height?: SortOrder
    partnerId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CarCountOrderByAggregateInput
    _avg?: CarAvgOrderByAggregateInput
    _max?: CarMaxOrderByAggregateInput
    _min?: CarMinOrderByAggregateInput
    _sum?: CarSumOrderByAggregateInput
  }

  export type CarScalarWhereWithAggregatesInput = {
    AND?: CarScalarWhereWithAggregatesInput | CarScalarWhereWithAggregatesInput[]
    OR?: CarScalarWhereWithAggregatesInput[]
    NOT?: CarScalarWhereWithAggregatesInput | CarScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Car"> | number
    uid?: StringWithAggregatesFilter<"Car"> | string
    brand?: StringWithAggregatesFilter<"Car"> | string
    sku?: StringWithAggregatesFilter<"Car"> | string
    mark?: StringWithAggregatesFilter<"Car"> | string
    category?: StringWithAggregatesFilter<"Car"> | string
    title?: StringWithAggregatesFilter<"Car"> | string
    description?: StringWithAggregatesFilter<"Car"> | string
    text?: StringWithAggregatesFilter<"Car"> | string
    photo?: StringNullableWithAggregatesFilter<"Car"> | string | null
    video?: StringNullableWithAggregatesFilter<"Car"> | string | null
    price?: FloatWithAggregatesFilter<"Car"> | number
    quantity?: IntWithAggregatesFilter<"Car"> | number
    priceOld?: FloatNullableWithAggregatesFilter<"Car"> | number | null
    editions?: StringNullableWithAggregatesFilter<"Car"> | string | null
    modifications?: StringNullableWithAggregatesFilter<"Car"> | string | null
    externalId?: StringNullableWithAggregatesFilter<"Car"> | string | null
    parentUid?: StringNullableWithAggregatesFilter<"Car"> | string | null
    status?: StringNullableWithAggregatesFilter<"Car"> | string | null
    bodyType?: StringNullableWithAggregatesFilter<"Car"> | string | null
    engineType?: StringWithAggregatesFilter<"Car"> | string
    engineVolume?: FloatWithAggregatesFilter<"Car"> | number
    transmission?: StringWithAggregatesFilter<"Car"> | string
    driveType?: StringWithAggregatesFilter<"Car"> | string
    year?: IntWithAggregatesFilter<"Car"> | number
    enginePower?: FloatWithAggregatesFilter<"Car"> | number
    priceUSD?: StringWithAggregatesFilter<"Car"> | string
    monthlyPayment?: FloatNullableWithAggregatesFilter<"Car"> | number | null
    advancePayment?: FloatNullableWithAggregatesFilter<"Car"> | number | null
    countryOfOrigin?: StringWithAggregatesFilter<"Car"> | string
    mileage?: IntWithAggregatesFilter<"Car"> | number
    weight?: FloatWithAggregatesFilter<"Car"> | number
    length?: FloatWithAggregatesFilter<"Car"> | number
    width?: FloatWithAggregatesFilter<"Car"> | number
    height?: FloatWithAggregatesFilter<"Car"> | number
    partnerId?: IntNullableWithAggregatesFilter<"Car"> | number | null
    createdAt?: DateTimeWithAggregatesFilter<"Car"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Car"> | Date | string
  }

  export type PartnerWhereInput = {
    AND?: PartnerWhereInput | PartnerWhereInput[]
    OR?: PartnerWhereInput[]
    NOT?: PartnerWhereInput | PartnerWhereInput[]
    id?: IntFilter<"Partner"> | number
    slug?: StringFilter<"Partner"> | string
    name?: StringFilter<"Partner"> | string
    photo?: StringNullableFilter<"Partner"> | string | null
    description?: StringFilter<"Partner"> | string
    active?: BoolFilter<"Partner"> | boolean
    createdAt?: DateTimeFilter<"Partner"> | Date | string
    updatedAt?: DateTimeFilter<"Partner"> | Date | string
    cars?: CarListRelationFilter
  }

  export type PartnerOrderByWithRelationInput = {
    id?: SortOrder
    slug?: SortOrder
    name?: SortOrder
    photo?: SortOrderInput | SortOrder
    description?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    cars?: CarOrderByRelationAggregateInput
  }

  export type PartnerWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    slug?: string
    AND?: PartnerWhereInput | PartnerWhereInput[]
    OR?: PartnerWhereInput[]
    NOT?: PartnerWhereInput | PartnerWhereInput[]
    name?: StringFilter<"Partner"> | string
    photo?: StringNullableFilter<"Partner"> | string | null
    description?: StringFilter<"Partner"> | string
    active?: BoolFilter<"Partner"> | boolean
    createdAt?: DateTimeFilter<"Partner"> | Date | string
    updatedAt?: DateTimeFilter<"Partner"> | Date | string
    cars?: CarListRelationFilter
  }, "id" | "slug">

  export type PartnerOrderByWithAggregationInput = {
    id?: SortOrder
    slug?: SortOrder
    name?: SortOrder
    photo?: SortOrderInput | SortOrder
    description?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PartnerCountOrderByAggregateInput
    _avg?: PartnerAvgOrderByAggregateInput
    _max?: PartnerMaxOrderByAggregateInput
    _min?: PartnerMinOrderByAggregateInput
    _sum?: PartnerSumOrderByAggregateInput
  }

  export type PartnerScalarWhereWithAggregatesInput = {
    AND?: PartnerScalarWhereWithAggregatesInput | PartnerScalarWhereWithAggregatesInput[]
    OR?: PartnerScalarWhereWithAggregatesInput[]
    NOT?: PartnerScalarWhereWithAggregatesInput | PartnerScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Partner"> | number
    slug?: StringWithAggregatesFilter<"Partner"> | string
    name?: StringWithAggregatesFilter<"Partner"> | string
    photo?: StringNullableWithAggregatesFilter<"Partner"> | string | null
    description?: StringWithAggregatesFilter<"Partner"> | string
    active?: BoolWithAggregatesFilter<"Partner"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Partner"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Partner"> | Date | string
  }

  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: IntFilter<"User"> | number
    telegramId?: StringFilter<"User"> | string
    username?: StringNullableFilter<"User"> | string | null
    firstName?: StringFilter<"User"> | string
    lastName?: StringNullableFilter<"User"> | string | null
    languageCode?: StringFilter<"User"> | string
    chatId?: StringNullableFilter<"User"> | string | null
    isBot?: BoolFilter<"User"> | boolean
    phone?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    catalogVisits?: CatalogVisitListRelationFilter
    wizardSession?: XOR<WizardSessionNullableScalarRelationFilter, WizardSessionWhereInput> | null
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    telegramId?: SortOrder
    username?: SortOrderInput | SortOrder
    firstName?: SortOrder
    lastName?: SortOrderInput | SortOrder
    languageCode?: SortOrder
    chatId?: SortOrderInput | SortOrder
    isBot?: SortOrder
    phone?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    catalogVisits?: CatalogVisitOrderByRelationAggregateInput
    wizardSession?: WizardSessionOrderByWithRelationInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    telegramId?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    username?: StringNullableFilter<"User"> | string | null
    firstName?: StringFilter<"User"> | string
    lastName?: StringNullableFilter<"User"> | string | null
    languageCode?: StringFilter<"User"> | string
    chatId?: StringNullableFilter<"User"> | string | null
    isBot?: BoolFilter<"User"> | boolean
    phone?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    catalogVisits?: CatalogVisitListRelationFilter
    wizardSession?: XOR<WizardSessionNullableScalarRelationFilter, WizardSessionWhereInput> | null
  }, "id" | "telegramId">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    telegramId?: SortOrder
    username?: SortOrderInput | SortOrder
    firstName?: SortOrder
    lastName?: SortOrderInput | SortOrder
    languageCode?: SortOrder
    chatId?: SortOrderInput | SortOrder
    isBot?: SortOrder
    phone?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"User"> | number
    telegramId?: StringWithAggregatesFilter<"User"> | string
    username?: StringNullableWithAggregatesFilter<"User"> | string | null
    firstName?: StringWithAggregatesFilter<"User"> | string
    lastName?: StringNullableWithAggregatesFilter<"User"> | string | null
    languageCode?: StringWithAggregatesFilter<"User"> | string
    chatId?: StringNullableWithAggregatesFilter<"User"> | string | null
    isBot?: BoolWithAggregatesFilter<"User"> | boolean
    phone?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type WizardSessionWhereInput = {
    AND?: WizardSessionWhereInput | WizardSessionWhereInput[]
    OR?: WizardSessionWhereInput[]
    NOT?: WizardSessionWhereInput | WizardSessionWhereInput[]
    id?: IntFilter<"WizardSession"> | number
    telegramId?: StringFilter<"WizardSession"> | string
    userId?: IntNullableFilter<"WizardSession"> | number | null
    phone?: StringNullableFilter<"WizardSession"> | string | null
    startOption?: StringNullableFilter<"WizardSession"> | string | null
    currentCarBrand?: StringNullableFilter<"WizardSession"> | string | null
    currentCarModel?: StringNullableFilter<"WizardSession"> | string | null
    currentCarYear?: IntNullableFilter<"WizardSession"> | number | null
    currentCarMileage?: IntNullableFilter<"WizardSession"> | number | null
    currentCarPrice?: FloatFilter<"WizardSession"> | number
    additionalCash?: FloatFilter<"WizardSession"> | number
    monthlyPayment?: FloatFilter<"WizardSession"> | number
    termMonths?: IntFilter<"WizardSession"> | number
    motivations?: StringFilter<"WizardSession"> | string
    bodyTypes?: StringFilter<"WizardSession"> | string
    brandPrefs?: StringFilter<"WizardSession"> | string
    maxBudget?: FloatNullableFilter<"WizardSession"> | number | null
    totalStartBudget?: FloatNullableFilter<"WizardSession"> | number | null
    selectedCarId?: IntNullableFilter<"WizardSession"> | number | null
    selectedCarLabel?: StringNullableFilter<"WizardSession"> | string | null
    currentStep?: StringFilter<"WizardSession"> | string
    bitrixStatus?: StringNullableFilter<"WizardSession"> | string | null
    bitrixError?: StringNullableFilter<"WizardSession"> | string | null
    funnelSteps?: StringFilter<"WizardSession"> | string
    calculationsCount?: IntFilter<"WizardSession"> | number
    createdAt?: DateTimeFilter<"WizardSession"> | Date | string
    updatedAt?: DateTimeFilter<"WizardSession"> | Date | string
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }

  export type WizardSessionOrderByWithRelationInput = {
    id?: SortOrder
    telegramId?: SortOrder
    userId?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    startOption?: SortOrderInput | SortOrder
    currentCarBrand?: SortOrderInput | SortOrder
    currentCarModel?: SortOrderInput | SortOrder
    currentCarYear?: SortOrderInput | SortOrder
    currentCarMileage?: SortOrderInput | SortOrder
    currentCarPrice?: SortOrder
    additionalCash?: SortOrder
    monthlyPayment?: SortOrder
    termMonths?: SortOrder
    motivations?: SortOrder
    bodyTypes?: SortOrder
    brandPrefs?: SortOrder
    maxBudget?: SortOrderInput | SortOrder
    totalStartBudget?: SortOrderInput | SortOrder
    selectedCarId?: SortOrderInput | SortOrder
    selectedCarLabel?: SortOrderInput | SortOrder
    currentStep?: SortOrder
    bitrixStatus?: SortOrderInput | SortOrder
    bitrixError?: SortOrderInput | SortOrder
    funnelSteps?: SortOrder
    calculationsCount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type WizardSessionWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    telegramId?: string
    userId?: number
    AND?: WizardSessionWhereInput | WizardSessionWhereInput[]
    OR?: WizardSessionWhereInput[]
    NOT?: WizardSessionWhereInput | WizardSessionWhereInput[]
    phone?: StringNullableFilter<"WizardSession"> | string | null
    startOption?: StringNullableFilter<"WizardSession"> | string | null
    currentCarBrand?: StringNullableFilter<"WizardSession"> | string | null
    currentCarModel?: StringNullableFilter<"WizardSession"> | string | null
    currentCarYear?: IntNullableFilter<"WizardSession"> | number | null
    currentCarMileage?: IntNullableFilter<"WizardSession"> | number | null
    currentCarPrice?: FloatFilter<"WizardSession"> | number
    additionalCash?: FloatFilter<"WizardSession"> | number
    monthlyPayment?: FloatFilter<"WizardSession"> | number
    termMonths?: IntFilter<"WizardSession"> | number
    motivations?: StringFilter<"WizardSession"> | string
    bodyTypes?: StringFilter<"WizardSession"> | string
    brandPrefs?: StringFilter<"WizardSession"> | string
    maxBudget?: FloatNullableFilter<"WizardSession"> | number | null
    totalStartBudget?: FloatNullableFilter<"WizardSession"> | number | null
    selectedCarId?: IntNullableFilter<"WizardSession"> | number | null
    selectedCarLabel?: StringNullableFilter<"WizardSession"> | string | null
    currentStep?: StringFilter<"WizardSession"> | string
    bitrixStatus?: StringNullableFilter<"WizardSession"> | string | null
    bitrixError?: StringNullableFilter<"WizardSession"> | string | null
    funnelSteps?: StringFilter<"WizardSession"> | string
    calculationsCount?: IntFilter<"WizardSession"> | number
    createdAt?: DateTimeFilter<"WizardSession"> | Date | string
    updatedAt?: DateTimeFilter<"WizardSession"> | Date | string
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }, "id" | "telegramId" | "userId">

  export type WizardSessionOrderByWithAggregationInput = {
    id?: SortOrder
    telegramId?: SortOrder
    userId?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    startOption?: SortOrderInput | SortOrder
    currentCarBrand?: SortOrderInput | SortOrder
    currentCarModel?: SortOrderInput | SortOrder
    currentCarYear?: SortOrderInput | SortOrder
    currentCarMileage?: SortOrderInput | SortOrder
    currentCarPrice?: SortOrder
    additionalCash?: SortOrder
    monthlyPayment?: SortOrder
    termMonths?: SortOrder
    motivations?: SortOrder
    bodyTypes?: SortOrder
    brandPrefs?: SortOrder
    maxBudget?: SortOrderInput | SortOrder
    totalStartBudget?: SortOrderInput | SortOrder
    selectedCarId?: SortOrderInput | SortOrder
    selectedCarLabel?: SortOrderInput | SortOrder
    currentStep?: SortOrder
    bitrixStatus?: SortOrderInput | SortOrder
    bitrixError?: SortOrderInput | SortOrder
    funnelSteps?: SortOrder
    calculationsCount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: WizardSessionCountOrderByAggregateInput
    _avg?: WizardSessionAvgOrderByAggregateInput
    _max?: WizardSessionMaxOrderByAggregateInput
    _min?: WizardSessionMinOrderByAggregateInput
    _sum?: WizardSessionSumOrderByAggregateInput
  }

  export type WizardSessionScalarWhereWithAggregatesInput = {
    AND?: WizardSessionScalarWhereWithAggregatesInput | WizardSessionScalarWhereWithAggregatesInput[]
    OR?: WizardSessionScalarWhereWithAggregatesInput[]
    NOT?: WizardSessionScalarWhereWithAggregatesInput | WizardSessionScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"WizardSession"> | number
    telegramId?: StringWithAggregatesFilter<"WizardSession"> | string
    userId?: IntNullableWithAggregatesFilter<"WizardSession"> | number | null
    phone?: StringNullableWithAggregatesFilter<"WizardSession"> | string | null
    startOption?: StringNullableWithAggregatesFilter<"WizardSession"> | string | null
    currentCarBrand?: StringNullableWithAggregatesFilter<"WizardSession"> | string | null
    currentCarModel?: StringNullableWithAggregatesFilter<"WizardSession"> | string | null
    currentCarYear?: IntNullableWithAggregatesFilter<"WizardSession"> | number | null
    currentCarMileage?: IntNullableWithAggregatesFilter<"WizardSession"> | number | null
    currentCarPrice?: FloatWithAggregatesFilter<"WizardSession"> | number
    additionalCash?: FloatWithAggregatesFilter<"WizardSession"> | number
    monthlyPayment?: FloatWithAggregatesFilter<"WizardSession"> | number
    termMonths?: IntWithAggregatesFilter<"WizardSession"> | number
    motivations?: StringWithAggregatesFilter<"WizardSession"> | string
    bodyTypes?: StringWithAggregatesFilter<"WizardSession"> | string
    brandPrefs?: StringWithAggregatesFilter<"WizardSession"> | string
    maxBudget?: FloatNullableWithAggregatesFilter<"WizardSession"> | number | null
    totalStartBudget?: FloatNullableWithAggregatesFilter<"WizardSession"> | number | null
    selectedCarId?: IntNullableWithAggregatesFilter<"WizardSession"> | number | null
    selectedCarLabel?: StringNullableWithAggregatesFilter<"WizardSession"> | string | null
    currentStep?: StringWithAggregatesFilter<"WizardSession"> | string
    bitrixStatus?: StringNullableWithAggregatesFilter<"WizardSession"> | string | null
    bitrixError?: StringNullableWithAggregatesFilter<"WizardSession"> | string | null
    funnelSteps?: StringWithAggregatesFilter<"WizardSession"> | string
    calculationsCount?: IntWithAggregatesFilter<"WizardSession"> | number
    createdAt?: DateTimeWithAggregatesFilter<"WizardSession"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"WizardSession"> | Date | string
  }

  export type CatalogVisitWhereInput = {
    AND?: CatalogVisitWhereInput | CatalogVisitWhereInput[]
    OR?: CatalogVisitWhereInput[]
    NOT?: CatalogVisitWhereInput | CatalogVisitWhereInput[]
    id?: IntFilter<"CatalogVisit"> | number
    userId?: IntNullableFilter<"CatalogVisit"> | number | null
    phone?: StringNullableFilter<"CatalogVisit"> | string | null
    username?: StringNullableFilter<"CatalogVisit"> | string | null
    firstName?: StringNullableFilter<"CatalogVisit"> | string | null
    lastName?: StringNullableFilter<"CatalogVisit"> | string | null
    userAgent?: StringNullableFilter<"CatalogVisit"> | string | null
    ipAddress?: StringNullableFilter<"CatalogVisit"> | string | null
    visitedAt?: DateTimeFilter<"CatalogVisit"> | Date | string
    createdAt?: DateTimeFilter<"CatalogVisit"> | Date | string
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }

  export type CatalogVisitOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    username?: SortOrderInput | SortOrder
    firstName?: SortOrderInput | SortOrder
    lastName?: SortOrderInput | SortOrder
    userAgent?: SortOrderInput | SortOrder
    ipAddress?: SortOrderInput | SortOrder
    visitedAt?: SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type CatalogVisitWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: CatalogVisitWhereInput | CatalogVisitWhereInput[]
    OR?: CatalogVisitWhereInput[]
    NOT?: CatalogVisitWhereInput | CatalogVisitWhereInput[]
    userId?: IntNullableFilter<"CatalogVisit"> | number | null
    phone?: StringNullableFilter<"CatalogVisit"> | string | null
    username?: StringNullableFilter<"CatalogVisit"> | string | null
    firstName?: StringNullableFilter<"CatalogVisit"> | string | null
    lastName?: StringNullableFilter<"CatalogVisit"> | string | null
    userAgent?: StringNullableFilter<"CatalogVisit"> | string | null
    ipAddress?: StringNullableFilter<"CatalogVisit"> | string | null
    visitedAt?: DateTimeFilter<"CatalogVisit"> | Date | string
    createdAt?: DateTimeFilter<"CatalogVisit"> | Date | string
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }, "id">

  export type CatalogVisitOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    username?: SortOrderInput | SortOrder
    firstName?: SortOrderInput | SortOrder
    lastName?: SortOrderInput | SortOrder
    userAgent?: SortOrderInput | SortOrder
    ipAddress?: SortOrderInput | SortOrder
    visitedAt?: SortOrder
    createdAt?: SortOrder
    _count?: CatalogVisitCountOrderByAggregateInput
    _avg?: CatalogVisitAvgOrderByAggregateInput
    _max?: CatalogVisitMaxOrderByAggregateInput
    _min?: CatalogVisitMinOrderByAggregateInput
    _sum?: CatalogVisitSumOrderByAggregateInput
  }

  export type CatalogVisitScalarWhereWithAggregatesInput = {
    AND?: CatalogVisitScalarWhereWithAggregatesInput | CatalogVisitScalarWhereWithAggregatesInput[]
    OR?: CatalogVisitScalarWhereWithAggregatesInput[]
    NOT?: CatalogVisitScalarWhereWithAggregatesInput | CatalogVisitScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"CatalogVisit"> | number
    userId?: IntNullableWithAggregatesFilter<"CatalogVisit"> | number | null
    phone?: StringNullableWithAggregatesFilter<"CatalogVisit"> | string | null
    username?: StringNullableWithAggregatesFilter<"CatalogVisit"> | string | null
    firstName?: StringNullableWithAggregatesFilter<"CatalogVisit"> | string | null
    lastName?: StringNullableWithAggregatesFilter<"CatalogVisit"> | string | null
    userAgent?: StringNullableWithAggregatesFilter<"CatalogVisit"> | string | null
    ipAddress?: StringNullableWithAggregatesFilter<"CatalogVisit"> | string | null
    visitedAt?: DateTimeWithAggregatesFilter<"CatalogVisit"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"CatalogVisit"> | Date | string
  }

  export type LeadWhereInput = {
    AND?: LeadWhereInput | LeadWhereInput[]
    OR?: LeadWhereInput[]
    NOT?: LeadWhereInput | LeadWhereInput[]
    id?: IntFilter<"Lead"> | number
    name?: StringFilter<"Lead"> | string
    phone?: StringFilter<"Lead"> | string
    message?: StringNullableFilter<"Lead"> | string | null
    source?: StringFilter<"Lead"> | string
    status?: StringFilter<"Lead"> | string
    carId?: IntNullableFilter<"Lead"> | number | null
    carLabel?: StringNullableFilter<"Lead"> | string | null
    telegramId?: StringNullableFilter<"Lead"> | string | null
    telegramUsername?: StringNullableFilter<"Lead"> | string | null
    bitrixLeadId?: IntNullableFilter<"Lead"> | number | null
    bitrixStatus?: StringNullableFilter<"Lead"> | string | null
    meta?: StringNullableFilter<"Lead"> | string | null
    createdAt?: DateTimeFilter<"Lead"> | Date | string
    updatedAt?: DateTimeFilter<"Lead"> | Date | string
  }

  export type LeadOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    phone?: SortOrder
    message?: SortOrderInput | SortOrder
    source?: SortOrder
    status?: SortOrder
    carId?: SortOrderInput | SortOrder
    carLabel?: SortOrderInput | SortOrder
    telegramId?: SortOrderInput | SortOrder
    telegramUsername?: SortOrderInput | SortOrder
    bitrixLeadId?: SortOrderInput | SortOrder
    bitrixStatus?: SortOrderInput | SortOrder
    meta?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LeadWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: LeadWhereInput | LeadWhereInput[]
    OR?: LeadWhereInput[]
    NOT?: LeadWhereInput | LeadWhereInput[]
    name?: StringFilter<"Lead"> | string
    phone?: StringFilter<"Lead"> | string
    message?: StringNullableFilter<"Lead"> | string | null
    source?: StringFilter<"Lead"> | string
    status?: StringFilter<"Lead"> | string
    carId?: IntNullableFilter<"Lead"> | number | null
    carLabel?: StringNullableFilter<"Lead"> | string | null
    telegramId?: StringNullableFilter<"Lead"> | string | null
    telegramUsername?: StringNullableFilter<"Lead"> | string | null
    bitrixLeadId?: IntNullableFilter<"Lead"> | number | null
    bitrixStatus?: StringNullableFilter<"Lead"> | string | null
    meta?: StringNullableFilter<"Lead"> | string | null
    createdAt?: DateTimeFilter<"Lead"> | Date | string
    updatedAt?: DateTimeFilter<"Lead"> | Date | string
  }, "id">

  export type LeadOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    phone?: SortOrder
    message?: SortOrderInput | SortOrder
    source?: SortOrder
    status?: SortOrder
    carId?: SortOrderInput | SortOrder
    carLabel?: SortOrderInput | SortOrder
    telegramId?: SortOrderInput | SortOrder
    telegramUsername?: SortOrderInput | SortOrder
    bitrixLeadId?: SortOrderInput | SortOrder
    bitrixStatus?: SortOrderInput | SortOrder
    meta?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: LeadCountOrderByAggregateInput
    _avg?: LeadAvgOrderByAggregateInput
    _max?: LeadMaxOrderByAggregateInput
    _min?: LeadMinOrderByAggregateInput
    _sum?: LeadSumOrderByAggregateInput
  }

  export type LeadScalarWhereWithAggregatesInput = {
    AND?: LeadScalarWhereWithAggregatesInput | LeadScalarWhereWithAggregatesInput[]
    OR?: LeadScalarWhereWithAggregatesInput[]
    NOT?: LeadScalarWhereWithAggregatesInput | LeadScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Lead"> | number
    name?: StringWithAggregatesFilter<"Lead"> | string
    phone?: StringWithAggregatesFilter<"Lead"> | string
    message?: StringNullableWithAggregatesFilter<"Lead"> | string | null
    source?: StringWithAggregatesFilter<"Lead"> | string
    status?: StringWithAggregatesFilter<"Lead"> | string
    carId?: IntNullableWithAggregatesFilter<"Lead"> | number | null
    carLabel?: StringNullableWithAggregatesFilter<"Lead"> | string | null
    telegramId?: StringNullableWithAggregatesFilter<"Lead"> | string | null
    telegramUsername?: StringNullableWithAggregatesFilter<"Lead"> | string | null
    bitrixLeadId?: IntNullableWithAggregatesFilter<"Lead"> | number | null
    bitrixStatus?: StringNullableWithAggregatesFilter<"Lead"> | string | null
    meta?: StringNullableWithAggregatesFilter<"Lead"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Lead"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Lead"> | Date | string
  }

  export type CarCreateInput = {
    uid: string
    brand: string
    sku?: string
    mark: string
    category?: string
    title: string
    description?: string
    text?: string
    photo?: string | null
    video?: string | null
    price?: number
    quantity?: number
    priceOld?: number | null
    editions?: string | null
    modifications?: string | null
    externalId?: string | null
    parentUid?: string | null
    status?: string | null
    bodyType?: string | null
    engineType?: string
    engineVolume?: number
    transmission?: string
    driveType?: string
    year?: number
    enginePower?: number
    priceUSD?: string
    monthlyPayment?: number | null
    advancePayment?: number | null
    countryOfOrigin?: string
    mileage?: number
    weight?: number
    length?: number
    width?: number
    height?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    partner?: PartnerCreateNestedOneWithoutCarsInput
  }

  export type CarUncheckedCreateInput = {
    id?: number
    uid: string
    brand: string
    sku?: string
    mark: string
    category?: string
    title: string
    description?: string
    text?: string
    photo?: string | null
    video?: string | null
    price?: number
    quantity?: number
    priceOld?: number | null
    editions?: string | null
    modifications?: string | null
    externalId?: string | null
    parentUid?: string | null
    status?: string | null
    bodyType?: string | null
    engineType?: string
    engineVolume?: number
    transmission?: string
    driveType?: string
    year?: number
    enginePower?: number
    priceUSD?: string
    monthlyPayment?: number | null
    advancePayment?: number | null
    countryOfOrigin?: string
    mileage?: number
    weight?: number
    length?: number
    width?: number
    height?: number
    partnerId?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CarUpdateInput = {
    uid?: StringFieldUpdateOperationsInput | string
    brand?: StringFieldUpdateOperationsInput | string
    sku?: StringFieldUpdateOperationsInput | string
    mark?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    photo?: NullableStringFieldUpdateOperationsInput | string | null
    video?: NullableStringFieldUpdateOperationsInput | string | null
    price?: FloatFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
    priceOld?: NullableFloatFieldUpdateOperationsInput | number | null
    editions?: NullableStringFieldUpdateOperationsInput | string | null
    modifications?: NullableStringFieldUpdateOperationsInput | string | null
    externalId?: NullableStringFieldUpdateOperationsInput | string | null
    parentUid?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    bodyType?: NullableStringFieldUpdateOperationsInput | string | null
    engineType?: StringFieldUpdateOperationsInput | string
    engineVolume?: FloatFieldUpdateOperationsInput | number
    transmission?: StringFieldUpdateOperationsInput | string
    driveType?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    enginePower?: FloatFieldUpdateOperationsInput | number
    priceUSD?: StringFieldUpdateOperationsInput | string
    monthlyPayment?: NullableFloatFieldUpdateOperationsInput | number | null
    advancePayment?: NullableFloatFieldUpdateOperationsInput | number | null
    countryOfOrigin?: StringFieldUpdateOperationsInput | string
    mileage?: IntFieldUpdateOperationsInput | number
    weight?: FloatFieldUpdateOperationsInput | number
    length?: FloatFieldUpdateOperationsInput | number
    width?: FloatFieldUpdateOperationsInput | number
    height?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    partner?: PartnerUpdateOneWithoutCarsNestedInput
  }

  export type CarUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    uid?: StringFieldUpdateOperationsInput | string
    brand?: StringFieldUpdateOperationsInput | string
    sku?: StringFieldUpdateOperationsInput | string
    mark?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    photo?: NullableStringFieldUpdateOperationsInput | string | null
    video?: NullableStringFieldUpdateOperationsInput | string | null
    price?: FloatFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
    priceOld?: NullableFloatFieldUpdateOperationsInput | number | null
    editions?: NullableStringFieldUpdateOperationsInput | string | null
    modifications?: NullableStringFieldUpdateOperationsInput | string | null
    externalId?: NullableStringFieldUpdateOperationsInput | string | null
    parentUid?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    bodyType?: NullableStringFieldUpdateOperationsInput | string | null
    engineType?: StringFieldUpdateOperationsInput | string
    engineVolume?: FloatFieldUpdateOperationsInput | number
    transmission?: StringFieldUpdateOperationsInput | string
    driveType?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    enginePower?: FloatFieldUpdateOperationsInput | number
    priceUSD?: StringFieldUpdateOperationsInput | string
    monthlyPayment?: NullableFloatFieldUpdateOperationsInput | number | null
    advancePayment?: NullableFloatFieldUpdateOperationsInput | number | null
    countryOfOrigin?: StringFieldUpdateOperationsInput | string
    mileage?: IntFieldUpdateOperationsInput | number
    weight?: FloatFieldUpdateOperationsInput | number
    length?: FloatFieldUpdateOperationsInput | number
    width?: FloatFieldUpdateOperationsInput | number
    height?: FloatFieldUpdateOperationsInput | number
    partnerId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CarCreateManyInput = {
    id?: number
    uid: string
    brand: string
    sku?: string
    mark: string
    category?: string
    title: string
    description?: string
    text?: string
    photo?: string | null
    video?: string | null
    price?: number
    quantity?: number
    priceOld?: number | null
    editions?: string | null
    modifications?: string | null
    externalId?: string | null
    parentUid?: string | null
    status?: string | null
    bodyType?: string | null
    engineType?: string
    engineVolume?: number
    transmission?: string
    driveType?: string
    year?: number
    enginePower?: number
    priceUSD?: string
    monthlyPayment?: number | null
    advancePayment?: number | null
    countryOfOrigin?: string
    mileage?: number
    weight?: number
    length?: number
    width?: number
    height?: number
    partnerId?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CarUpdateManyMutationInput = {
    uid?: StringFieldUpdateOperationsInput | string
    brand?: StringFieldUpdateOperationsInput | string
    sku?: StringFieldUpdateOperationsInput | string
    mark?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    photo?: NullableStringFieldUpdateOperationsInput | string | null
    video?: NullableStringFieldUpdateOperationsInput | string | null
    price?: FloatFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
    priceOld?: NullableFloatFieldUpdateOperationsInput | number | null
    editions?: NullableStringFieldUpdateOperationsInput | string | null
    modifications?: NullableStringFieldUpdateOperationsInput | string | null
    externalId?: NullableStringFieldUpdateOperationsInput | string | null
    parentUid?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    bodyType?: NullableStringFieldUpdateOperationsInput | string | null
    engineType?: StringFieldUpdateOperationsInput | string
    engineVolume?: FloatFieldUpdateOperationsInput | number
    transmission?: StringFieldUpdateOperationsInput | string
    driveType?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    enginePower?: FloatFieldUpdateOperationsInput | number
    priceUSD?: StringFieldUpdateOperationsInput | string
    monthlyPayment?: NullableFloatFieldUpdateOperationsInput | number | null
    advancePayment?: NullableFloatFieldUpdateOperationsInput | number | null
    countryOfOrigin?: StringFieldUpdateOperationsInput | string
    mileage?: IntFieldUpdateOperationsInput | number
    weight?: FloatFieldUpdateOperationsInput | number
    length?: FloatFieldUpdateOperationsInput | number
    width?: FloatFieldUpdateOperationsInput | number
    height?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CarUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    uid?: StringFieldUpdateOperationsInput | string
    brand?: StringFieldUpdateOperationsInput | string
    sku?: StringFieldUpdateOperationsInput | string
    mark?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    photo?: NullableStringFieldUpdateOperationsInput | string | null
    video?: NullableStringFieldUpdateOperationsInput | string | null
    price?: FloatFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
    priceOld?: NullableFloatFieldUpdateOperationsInput | number | null
    editions?: NullableStringFieldUpdateOperationsInput | string | null
    modifications?: NullableStringFieldUpdateOperationsInput | string | null
    externalId?: NullableStringFieldUpdateOperationsInput | string | null
    parentUid?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    bodyType?: NullableStringFieldUpdateOperationsInput | string | null
    engineType?: StringFieldUpdateOperationsInput | string
    engineVolume?: FloatFieldUpdateOperationsInput | number
    transmission?: StringFieldUpdateOperationsInput | string
    driveType?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    enginePower?: FloatFieldUpdateOperationsInput | number
    priceUSD?: StringFieldUpdateOperationsInput | string
    monthlyPayment?: NullableFloatFieldUpdateOperationsInput | number | null
    advancePayment?: NullableFloatFieldUpdateOperationsInput | number | null
    countryOfOrigin?: StringFieldUpdateOperationsInput | string
    mileage?: IntFieldUpdateOperationsInput | number
    weight?: FloatFieldUpdateOperationsInput | number
    length?: FloatFieldUpdateOperationsInput | number
    width?: FloatFieldUpdateOperationsInput | number
    height?: FloatFieldUpdateOperationsInput | number
    partnerId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PartnerCreateInput = {
    slug: string
    name?: string
    photo?: string | null
    description?: string
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    cars?: CarCreateNestedManyWithoutPartnerInput
  }

  export type PartnerUncheckedCreateInput = {
    id?: number
    slug: string
    name?: string
    photo?: string | null
    description?: string
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    cars?: CarUncheckedCreateNestedManyWithoutPartnerInput
  }

  export type PartnerUpdateInput = {
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    photo?: NullableStringFieldUpdateOperationsInput | string | null
    description?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cars?: CarUpdateManyWithoutPartnerNestedInput
  }

  export type PartnerUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    photo?: NullableStringFieldUpdateOperationsInput | string | null
    description?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cars?: CarUncheckedUpdateManyWithoutPartnerNestedInput
  }

  export type PartnerCreateManyInput = {
    id?: number
    slug: string
    name?: string
    photo?: string | null
    description?: string
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PartnerUpdateManyMutationInput = {
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    photo?: NullableStringFieldUpdateOperationsInput | string | null
    description?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PartnerUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    photo?: NullableStringFieldUpdateOperationsInput | string | null
    description?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateInput = {
    telegramId: string
    username?: string | null
    firstName: string
    lastName?: string | null
    languageCode: string
    chatId?: string | null
    isBot: boolean
    phone?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    catalogVisits?: CatalogVisitCreateNestedManyWithoutUserInput
    wizardSession?: WizardSessionCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: number
    telegramId: string
    username?: string | null
    firstName: string
    lastName?: string | null
    languageCode: string
    chatId?: string | null
    isBot: boolean
    phone?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    catalogVisits?: CatalogVisitUncheckedCreateNestedManyWithoutUserInput
    wizardSession?: WizardSessionUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserUpdateInput = {
    telegramId?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    languageCode?: StringFieldUpdateOperationsInput | string
    chatId?: NullableStringFieldUpdateOperationsInput | string | null
    isBot?: BoolFieldUpdateOperationsInput | boolean
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    catalogVisits?: CatalogVisitUpdateManyWithoutUserNestedInput
    wizardSession?: WizardSessionUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    telegramId?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    languageCode?: StringFieldUpdateOperationsInput | string
    chatId?: NullableStringFieldUpdateOperationsInput | string | null
    isBot?: BoolFieldUpdateOperationsInput | boolean
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    catalogVisits?: CatalogVisitUncheckedUpdateManyWithoutUserNestedInput
    wizardSession?: WizardSessionUncheckedUpdateOneWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: number
    telegramId: string
    username?: string | null
    firstName: string
    lastName?: string | null
    languageCode: string
    chatId?: string | null
    isBot: boolean
    phone?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    telegramId?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    languageCode?: StringFieldUpdateOperationsInput | string
    chatId?: NullableStringFieldUpdateOperationsInput | string | null
    isBot?: BoolFieldUpdateOperationsInput | boolean
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    telegramId?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    languageCode?: StringFieldUpdateOperationsInput | string
    chatId?: NullableStringFieldUpdateOperationsInput | string | null
    isBot?: BoolFieldUpdateOperationsInput | boolean
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WizardSessionCreateInput = {
    telegramId: string
    phone?: string | null
    startOption?: string | null
    currentCarBrand?: string | null
    currentCarModel?: string | null
    currentCarYear?: number | null
    currentCarMileage?: number | null
    currentCarPrice?: number
    additionalCash?: number
    monthlyPayment?: number
    termMonths?: number
    motivations?: string
    bodyTypes?: string
    brandPrefs?: string
    maxBudget?: number | null
    totalStartBudget?: number | null
    selectedCarId?: number | null
    selectedCarLabel?: string | null
    currentStep?: string
    bitrixStatus?: string | null
    bitrixError?: string | null
    funnelSteps?: string
    calculationsCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    user?: UserCreateNestedOneWithoutWizardSessionInput
  }

  export type WizardSessionUncheckedCreateInput = {
    id?: number
    telegramId: string
    userId?: number | null
    phone?: string | null
    startOption?: string | null
    currentCarBrand?: string | null
    currentCarModel?: string | null
    currentCarYear?: number | null
    currentCarMileage?: number | null
    currentCarPrice?: number
    additionalCash?: number
    monthlyPayment?: number
    termMonths?: number
    motivations?: string
    bodyTypes?: string
    brandPrefs?: string
    maxBudget?: number | null
    totalStartBudget?: number | null
    selectedCarId?: number | null
    selectedCarLabel?: string | null
    currentStep?: string
    bitrixStatus?: string | null
    bitrixError?: string | null
    funnelSteps?: string
    calculationsCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WizardSessionUpdateInput = {
    telegramId?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    startOption?: NullableStringFieldUpdateOperationsInput | string | null
    currentCarBrand?: NullableStringFieldUpdateOperationsInput | string | null
    currentCarModel?: NullableStringFieldUpdateOperationsInput | string | null
    currentCarYear?: NullableIntFieldUpdateOperationsInput | number | null
    currentCarMileage?: NullableIntFieldUpdateOperationsInput | number | null
    currentCarPrice?: FloatFieldUpdateOperationsInput | number
    additionalCash?: FloatFieldUpdateOperationsInput | number
    monthlyPayment?: FloatFieldUpdateOperationsInput | number
    termMonths?: IntFieldUpdateOperationsInput | number
    motivations?: StringFieldUpdateOperationsInput | string
    bodyTypes?: StringFieldUpdateOperationsInput | string
    brandPrefs?: StringFieldUpdateOperationsInput | string
    maxBudget?: NullableFloatFieldUpdateOperationsInput | number | null
    totalStartBudget?: NullableFloatFieldUpdateOperationsInput | number | null
    selectedCarId?: NullableIntFieldUpdateOperationsInput | number | null
    selectedCarLabel?: NullableStringFieldUpdateOperationsInput | string | null
    currentStep?: StringFieldUpdateOperationsInput | string
    bitrixStatus?: NullableStringFieldUpdateOperationsInput | string | null
    bitrixError?: NullableStringFieldUpdateOperationsInput | string | null
    funnelSteps?: StringFieldUpdateOperationsInput | string
    calculationsCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutWizardSessionNestedInput
  }

  export type WizardSessionUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    telegramId?: StringFieldUpdateOperationsInput | string
    userId?: NullableIntFieldUpdateOperationsInput | number | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    startOption?: NullableStringFieldUpdateOperationsInput | string | null
    currentCarBrand?: NullableStringFieldUpdateOperationsInput | string | null
    currentCarModel?: NullableStringFieldUpdateOperationsInput | string | null
    currentCarYear?: NullableIntFieldUpdateOperationsInput | number | null
    currentCarMileage?: NullableIntFieldUpdateOperationsInput | number | null
    currentCarPrice?: FloatFieldUpdateOperationsInput | number
    additionalCash?: FloatFieldUpdateOperationsInput | number
    monthlyPayment?: FloatFieldUpdateOperationsInput | number
    termMonths?: IntFieldUpdateOperationsInput | number
    motivations?: StringFieldUpdateOperationsInput | string
    bodyTypes?: StringFieldUpdateOperationsInput | string
    brandPrefs?: StringFieldUpdateOperationsInput | string
    maxBudget?: NullableFloatFieldUpdateOperationsInput | number | null
    totalStartBudget?: NullableFloatFieldUpdateOperationsInput | number | null
    selectedCarId?: NullableIntFieldUpdateOperationsInput | number | null
    selectedCarLabel?: NullableStringFieldUpdateOperationsInput | string | null
    currentStep?: StringFieldUpdateOperationsInput | string
    bitrixStatus?: NullableStringFieldUpdateOperationsInput | string | null
    bitrixError?: NullableStringFieldUpdateOperationsInput | string | null
    funnelSteps?: StringFieldUpdateOperationsInput | string
    calculationsCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WizardSessionCreateManyInput = {
    id?: number
    telegramId: string
    userId?: number | null
    phone?: string | null
    startOption?: string | null
    currentCarBrand?: string | null
    currentCarModel?: string | null
    currentCarYear?: number | null
    currentCarMileage?: number | null
    currentCarPrice?: number
    additionalCash?: number
    monthlyPayment?: number
    termMonths?: number
    motivations?: string
    bodyTypes?: string
    brandPrefs?: string
    maxBudget?: number | null
    totalStartBudget?: number | null
    selectedCarId?: number | null
    selectedCarLabel?: string | null
    currentStep?: string
    bitrixStatus?: string | null
    bitrixError?: string | null
    funnelSteps?: string
    calculationsCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WizardSessionUpdateManyMutationInput = {
    telegramId?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    startOption?: NullableStringFieldUpdateOperationsInput | string | null
    currentCarBrand?: NullableStringFieldUpdateOperationsInput | string | null
    currentCarModel?: NullableStringFieldUpdateOperationsInput | string | null
    currentCarYear?: NullableIntFieldUpdateOperationsInput | number | null
    currentCarMileage?: NullableIntFieldUpdateOperationsInput | number | null
    currentCarPrice?: FloatFieldUpdateOperationsInput | number
    additionalCash?: FloatFieldUpdateOperationsInput | number
    monthlyPayment?: FloatFieldUpdateOperationsInput | number
    termMonths?: IntFieldUpdateOperationsInput | number
    motivations?: StringFieldUpdateOperationsInput | string
    bodyTypes?: StringFieldUpdateOperationsInput | string
    brandPrefs?: StringFieldUpdateOperationsInput | string
    maxBudget?: NullableFloatFieldUpdateOperationsInput | number | null
    totalStartBudget?: NullableFloatFieldUpdateOperationsInput | number | null
    selectedCarId?: NullableIntFieldUpdateOperationsInput | number | null
    selectedCarLabel?: NullableStringFieldUpdateOperationsInput | string | null
    currentStep?: StringFieldUpdateOperationsInput | string
    bitrixStatus?: NullableStringFieldUpdateOperationsInput | string | null
    bitrixError?: NullableStringFieldUpdateOperationsInput | string | null
    funnelSteps?: StringFieldUpdateOperationsInput | string
    calculationsCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WizardSessionUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    telegramId?: StringFieldUpdateOperationsInput | string
    userId?: NullableIntFieldUpdateOperationsInput | number | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    startOption?: NullableStringFieldUpdateOperationsInput | string | null
    currentCarBrand?: NullableStringFieldUpdateOperationsInput | string | null
    currentCarModel?: NullableStringFieldUpdateOperationsInput | string | null
    currentCarYear?: NullableIntFieldUpdateOperationsInput | number | null
    currentCarMileage?: NullableIntFieldUpdateOperationsInput | number | null
    currentCarPrice?: FloatFieldUpdateOperationsInput | number
    additionalCash?: FloatFieldUpdateOperationsInput | number
    monthlyPayment?: FloatFieldUpdateOperationsInput | number
    termMonths?: IntFieldUpdateOperationsInput | number
    motivations?: StringFieldUpdateOperationsInput | string
    bodyTypes?: StringFieldUpdateOperationsInput | string
    brandPrefs?: StringFieldUpdateOperationsInput | string
    maxBudget?: NullableFloatFieldUpdateOperationsInput | number | null
    totalStartBudget?: NullableFloatFieldUpdateOperationsInput | number | null
    selectedCarId?: NullableIntFieldUpdateOperationsInput | number | null
    selectedCarLabel?: NullableStringFieldUpdateOperationsInput | string | null
    currentStep?: StringFieldUpdateOperationsInput | string
    bitrixStatus?: NullableStringFieldUpdateOperationsInput | string | null
    bitrixError?: NullableStringFieldUpdateOperationsInput | string | null
    funnelSteps?: StringFieldUpdateOperationsInput | string
    calculationsCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CatalogVisitCreateInput = {
    phone?: string | null
    username?: string | null
    firstName?: string | null
    lastName?: string | null
    userAgent?: string | null
    ipAddress?: string | null
    visitedAt?: Date | string
    createdAt?: Date | string
    user?: UserCreateNestedOneWithoutCatalogVisitsInput
  }

  export type CatalogVisitUncheckedCreateInput = {
    id?: number
    userId?: number | null
    phone?: string | null
    username?: string | null
    firstName?: string | null
    lastName?: string | null
    userAgent?: string | null
    ipAddress?: string | null
    visitedAt?: Date | string
    createdAt?: Date | string
  }

  export type CatalogVisitUpdateInput = {
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    visitedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutCatalogVisitsNestedInput
  }

  export type CatalogVisitUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: NullableIntFieldUpdateOperationsInput | number | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    visitedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CatalogVisitCreateManyInput = {
    id?: number
    userId?: number | null
    phone?: string | null
    username?: string | null
    firstName?: string | null
    lastName?: string | null
    userAgent?: string | null
    ipAddress?: string | null
    visitedAt?: Date | string
    createdAt?: Date | string
  }

  export type CatalogVisitUpdateManyMutationInput = {
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    visitedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CatalogVisitUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: NullableIntFieldUpdateOperationsInput | number | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    visitedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LeadCreateInput = {
    name: string
    phone: string
    message?: string | null
    source: string
    status?: string
    carId?: number | null
    carLabel?: string | null
    telegramId?: string | null
    telegramUsername?: string | null
    bitrixLeadId?: number | null
    bitrixStatus?: string | null
    meta?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LeadUncheckedCreateInput = {
    id?: number
    name: string
    phone: string
    message?: string | null
    source: string
    status?: string
    carId?: number | null
    carLabel?: string | null
    telegramId?: string | null
    telegramUsername?: string | null
    bitrixLeadId?: number | null
    bitrixStatus?: string | null
    meta?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LeadUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    message?: NullableStringFieldUpdateOperationsInput | string | null
    source?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    carId?: NullableIntFieldUpdateOperationsInput | number | null
    carLabel?: NullableStringFieldUpdateOperationsInput | string | null
    telegramId?: NullableStringFieldUpdateOperationsInput | string | null
    telegramUsername?: NullableStringFieldUpdateOperationsInput | string | null
    bitrixLeadId?: NullableIntFieldUpdateOperationsInput | number | null
    bitrixStatus?: NullableStringFieldUpdateOperationsInput | string | null
    meta?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LeadUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    message?: NullableStringFieldUpdateOperationsInput | string | null
    source?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    carId?: NullableIntFieldUpdateOperationsInput | number | null
    carLabel?: NullableStringFieldUpdateOperationsInput | string | null
    telegramId?: NullableStringFieldUpdateOperationsInput | string | null
    telegramUsername?: NullableStringFieldUpdateOperationsInput | string | null
    bitrixLeadId?: NullableIntFieldUpdateOperationsInput | number | null
    bitrixStatus?: NullableStringFieldUpdateOperationsInput | string | null
    meta?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LeadCreateManyInput = {
    id?: number
    name: string
    phone: string
    message?: string | null
    source: string
    status?: string
    carId?: number | null
    carLabel?: string | null
    telegramId?: string | null
    telegramUsername?: string | null
    bitrixLeadId?: number | null
    bitrixStatus?: string | null
    meta?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LeadUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    message?: NullableStringFieldUpdateOperationsInput | string | null
    source?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    carId?: NullableIntFieldUpdateOperationsInput | number | null
    carLabel?: NullableStringFieldUpdateOperationsInput | string | null
    telegramId?: NullableStringFieldUpdateOperationsInput | string | null
    telegramUsername?: NullableStringFieldUpdateOperationsInput | string | null
    bitrixLeadId?: NullableIntFieldUpdateOperationsInput | number | null
    bitrixStatus?: NullableStringFieldUpdateOperationsInput | string | null
    meta?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LeadUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    message?: NullableStringFieldUpdateOperationsInput | string | null
    source?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    carId?: NullableIntFieldUpdateOperationsInput | number | null
    carLabel?: NullableStringFieldUpdateOperationsInput | string | null
    telegramId?: NullableStringFieldUpdateOperationsInput | string | null
    telegramUsername?: NullableStringFieldUpdateOperationsInput | string | null
    bitrixLeadId?: NullableIntFieldUpdateOperationsInput | number | null
    bitrixStatus?: NullableStringFieldUpdateOperationsInput | string | null
    meta?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type PartnerNullableScalarRelationFilter = {
    is?: PartnerWhereInput | null
    isNot?: PartnerWhereInput | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type CarCountOrderByAggregateInput = {
    id?: SortOrder
    uid?: SortOrder
    brand?: SortOrder
    sku?: SortOrder
    mark?: SortOrder
    category?: SortOrder
    title?: SortOrder
    description?: SortOrder
    text?: SortOrder
    photo?: SortOrder
    video?: SortOrder
    price?: SortOrder
    quantity?: SortOrder
    priceOld?: SortOrder
    editions?: SortOrder
    modifications?: SortOrder
    externalId?: SortOrder
    parentUid?: SortOrder
    status?: SortOrder
    bodyType?: SortOrder
    engineType?: SortOrder
    engineVolume?: SortOrder
    transmission?: SortOrder
    driveType?: SortOrder
    year?: SortOrder
    enginePower?: SortOrder
    priceUSD?: SortOrder
    monthlyPayment?: SortOrder
    advancePayment?: SortOrder
    countryOfOrigin?: SortOrder
    mileage?: SortOrder
    weight?: SortOrder
    length?: SortOrder
    width?: SortOrder
    height?: SortOrder
    partnerId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CarAvgOrderByAggregateInput = {
    id?: SortOrder
    price?: SortOrder
    quantity?: SortOrder
    priceOld?: SortOrder
    engineVolume?: SortOrder
    year?: SortOrder
    enginePower?: SortOrder
    monthlyPayment?: SortOrder
    advancePayment?: SortOrder
    mileage?: SortOrder
    weight?: SortOrder
    length?: SortOrder
    width?: SortOrder
    height?: SortOrder
    partnerId?: SortOrder
  }

  export type CarMaxOrderByAggregateInput = {
    id?: SortOrder
    uid?: SortOrder
    brand?: SortOrder
    sku?: SortOrder
    mark?: SortOrder
    category?: SortOrder
    title?: SortOrder
    description?: SortOrder
    text?: SortOrder
    photo?: SortOrder
    video?: SortOrder
    price?: SortOrder
    quantity?: SortOrder
    priceOld?: SortOrder
    editions?: SortOrder
    modifications?: SortOrder
    externalId?: SortOrder
    parentUid?: SortOrder
    status?: SortOrder
    bodyType?: SortOrder
    engineType?: SortOrder
    engineVolume?: SortOrder
    transmission?: SortOrder
    driveType?: SortOrder
    year?: SortOrder
    enginePower?: SortOrder
    priceUSD?: SortOrder
    monthlyPayment?: SortOrder
    advancePayment?: SortOrder
    countryOfOrigin?: SortOrder
    mileage?: SortOrder
    weight?: SortOrder
    length?: SortOrder
    width?: SortOrder
    height?: SortOrder
    partnerId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CarMinOrderByAggregateInput = {
    id?: SortOrder
    uid?: SortOrder
    brand?: SortOrder
    sku?: SortOrder
    mark?: SortOrder
    category?: SortOrder
    title?: SortOrder
    description?: SortOrder
    text?: SortOrder
    photo?: SortOrder
    video?: SortOrder
    price?: SortOrder
    quantity?: SortOrder
    priceOld?: SortOrder
    editions?: SortOrder
    modifications?: SortOrder
    externalId?: SortOrder
    parentUid?: SortOrder
    status?: SortOrder
    bodyType?: SortOrder
    engineType?: SortOrder
    engineVolume?: SortOrder
    transmission?: SortOrder
    driveType?: SortOrder
    year?: SortOrder
    enginePower?: SortOrder
    priceUSD?: SortOrder
    monthlyPayment?: SortOrder
    advancePayment?: SortOrder
    countryOfOrigin?: SortOrder
    mileage?: SortOrder
    weight?: SortOrder
    length?: SortOrder
    width?: SortOrder
    height?: SortOrder
    partnerId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CarSumOrderByAggregateInput = {
    id?: SortOrder
    price?: SortOrder
    quantity?: SortOrder
    priceOld?: SortOrder
    engineVolume?: SortOrder
    year?: SortOrder
    enginePower?: SortOrder
    monthlyPayment?: SortOrder
    advancePayment?: SortOrder
    mileage?: SortOrder
    weight?: SortOrder
    length?: SortOrder
    width?: SortOrder
    height?: SortOrder
    partnerId?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type CarListRelationFilter = {
    every?: CarWhereInput
    some?: CarWhereInput
    none?: CarWhereInput
  }

  export type CarOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PartnerCountOrderByAggregateInput = {
    id?: SortOrder
    slug?: SortOrder
    name?: SortOrder
    photo?: SortOrder
    description?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PartnerAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type PartnerMaxOrderByAggregateInput = {
    id?: SortOrder
    slug?: SortOrder
    name?: SortOrder
    photo?: SortOrder
    description?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PartnerMinOrderByAggregateInput = {
    id?: SortOrder
    slug?: SortOrder
    name?: SortOrder
    photo?: SortOrder
    description?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PartnerSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type CatalogVisitListRelationFilter = {
    every?: CatalogVisitWhereInput
    some?: CatalogVisitWhereInput
    none?: CatalogVisitWhereInput
  }

  export type WizardSessionNullableScalarRelationFilter = {
    is?: WizardSessionWhereInput | null
    isNot?: WizardSessionWhereInput | null
  }

  export type CatalogVisitOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    telegramId?: SortOrder
    username?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    languageCode?: SortOrder
    chatId?: SortOrder
    isBot?: SortOrder
    phone?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    telegramId?: SortOrder
    username?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    languageCode?: SortOrder
    chatId?: SortOrder
    isBot?: SortOrder
    phone?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    telegramId?: SortOrder
    username?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    languageCode?: SortOrder
    chatId?: SortOrder
    isBot?: SortOrder
    phone?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type WizardSessionCountOrderByAggregateInput = {
    id?: SortOrder
    telegramId?: SortOrder
    userId?: SortOrder
    phone?: SortOrder
    startOption?: SortOrder
    currentCarBrand?: SortOrder
    currentCarModel?: SortOrder
    currentCarYear?: SortOrder
    currentCarMileage?: SortOrder
    currentCarPrice?: SortOrder
    additionalCash?: SortOrder
    monthlyPayment?: SortOrder
    termMonths?: SortOrder
    motivations?: SortOrder
    bodyTypes?: SortOrder
    brandPrefs?: SortOrder
    maxBudget?: SortOrder
    totalStartBudget?: SortOrder
    selectedCarId?: SortOrder
    selectedCarLabel?: SortOrder
    currentStep?: SortOrder
    bitrixStatus?: SortOrder
    bitrixError?: SortOrder
    funnelSteps?: SortOrder
    calculationsCount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type WizardSessionAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    currentCarYear?: SortOrder
    currentCarMileage?: SortOrder
    currentCarPrice?: SortOrder
    additionalCash?: SortOrder
    monthlyPayment?: SortOrder
    termMonths?: SortOrder
    maxBudget?: SortOrder
    totalStartBudget?: SortOrder
    selectedCarId?: SortOrder
    calculationsCount?: SortOrder
  }

  export type WizardSessionMaxOrderByAggregateInput = {
    id?: SortOrder
    telegramId?: SortOrder
    userId?: SortOrder
    phone?: SortOrder
    startOption?: SortOrder
    currentCarBrand?: SortOrder
    currentCarModel?: SortOrder
    currentCarYear?: SortOrder
    currentCarMileage?: SortOrder
    currentCarPrice?: SortOrder
    additionalCash?: SortOrder
    monthlyPayment?: SortOrder
    termMonths?: SortOrder
    motivations?: SortOrder
    bodyTypes?: SortOrder
    brandPrefs?: SortOrder
    maxBudget?: SortOrder
    totalStartBudget?: SortOrder
    selectedCarId?: SortOrder
    selectedCarLabel?: SortOrder
    currentStep?: SortOrder
    bitrixStatus?: SortOrder
    bitrixError?: SortOrder
    funnelSteps?: SortOrder
    calculationsCount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type WizardSessionMinOrderByAggregateInput = {
    id?: SortOrder
    telegramId?: SortOrder
    userId?: SortOrder
    phone?: SortOrder
    startOption?: SortOrder
    currentCarBrand?: SortOrder
    currentCarModel?: SortOrder
    currentCarYear?: SortOrder
    currentCarMileage?: SortOrder
    currentCarPrice?: SortOrder
    additionalCash?: SortOrder
    monthlyPayment?: SortOrder
    termMonths?: SortOrder
    motivations?: SortOrder
    bodyTypes?: SortOrder
    brandPrefs?: SortOrder
    maxBudget?: SortOrder
    totalStartBudget?: SortOrder
    selectedCarId?: SortOrder
    selectedCarLabel?: SortOrder
    currentStep?: SortOrder
    bitrixStatus?: SortOrder
    bitrixError?: SortOrder
    funnelSteps?: SortOrder
    calculationsCount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type WizardSessionSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    currentCarYear?: SortOrder
    currentCarMileage?: SortOrder
    currentCarPrice?: SortOrder
    additionalCash?: SortOrder
    monthlyPayment?: SortOrder
    termMonths?: SortOrder
    maxBudget?: SortOrder
    totalStartBudget?: SortOrder
    selectedCarId?: SortOrder
    calculationsCount?: SortOrder
  }

  export type CatalogVisitCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    phone?: SortOrder
    username?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    userAgent?: SortOrder
    ipAddress?: SortOrder
    visitedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type CatalogVisitAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
  }

  export type CatalogVisitMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    phone?: SortOrder
    username?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    userAgent?: SortOrder
    ipAddress?: SortOrder
    visitedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type CatalogVisitMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    phone?: SortOrder
    username?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    userAgent?: SortOrder
    ipAddress?: SortOrder
    visitedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type CatalogVisitSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
  }

  export type LeadCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    phone?: SortOrder
    message?: SortOrder
    source?: SortOrder
    status?: SortOrder
    carId?: SortOrder
    carLabel?: SortOrder
    telegramId?: SortOrder
    telegramUsername?: SortOrder
    bitrixLeadId?: SortOrder
    bitrixStatus?: SortOrder
    meta?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LeadAvgOrderByAggregateInput = {
    id?: SortOrder
    carId?: SortOrder
    bitrixLeadId?: SortOrder
  }

  export type LeadMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    phone?: SortOrder
    message?: SortOrder
    source?: SortOrder
    status?: SortOrder
    carId?: SortOrder
    carLabel?: SortOrder
    telegramId?: SortOrder
    telegramUsername?: SortOrder
    bitrixLeadId?: SortOrder
    bitrixStatus?: SortOrder
    meta?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LeadMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    phone?: SortOrder
    message?: SortOrder
    source?: SortOrder
    status?: SortOrder
    carId?: SortOrder
    carLabel?: SortOrder
    telegramId?: SortOrder
    telegramUsername?: SortOrder
    bitrixLeadId?: SortOrder
    bitrixStatus?: SortOrder
    meta?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LeadSumOrderByAggregateInput = {
    id?: SortOrder
    carId?: SortOrder
    bitrixLeadId?: SortOrder
  }

  export type PartnerCreateNestedOneWithoutCarsInput = {
    create?: XOR<PartnerCreateWithoutCarsInput, PartnerUncheckedCreateWithoutCarsInput>
    connectOrCreate?: PartnerCreateOrConnectWithoutCarsInput
    connect?: PartnerWhereUniqueInput
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type PartnerUpdateOneWithoutCarsNestedInput = {
    create?: XOR<PartnerCreateWithoutCarsInput, PartnerUncheckedCreateWithoutCarsInput>
    connectOrCreate?: PartnerCreateOrConnectWithoutCarsInput
    upsert?: PartnerUpsertWithoutCarsInput
    disconnect?: PartnerWhereInput | boolean
    delete?: PartnerWhereInput | boolean
    connect?: PartnerWhereUniqueInput
    update?: XOR<XOR<PartnerUpdateToOneWithWhereWithoutCarsInput, PartnerUpdateWithoutCarsInput>, PartnerUncheckedUpdateWithoutCarsInput>
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type CarCreateNestedManyWithoutPartnerInput = {
    create?: XOR<CarCreateWithoutPartnerInput, CarUncheckedCreateWithoutPartnerInput> | CarCreateWithoutPartnerInput[] | CarUncheckedCreateWithoutPartnerInput[]
    connectOrCreate?: CarCreateOrConnectWithoutPartnerInput | CarCreateOrConnectWithoutPartnerInput[]
    createMany?: CarCreateManyPartnerInputEnvelope
    connect?: CarWhereUniqueInput | CarWhereUniqueInput[]
  }

  export type CarUncheckedCreateNestedManyWithoutPartnerInput = {
    create?: XOR<CarCreateWithoutPartnerInput, CarUncheckedCreateWithoutPartnerInput> | CarCreateWithoutPartnerInput[] | CarUncheckedCreateWithoutPartnerInput[]
    connectOrCreate?: CarCreateOrConnectWithoutPartnerInput | CarCreateOrConnectWithoutPartnerInput[]
    createMany?: CarCreateManyPartnerInputEnvelope
    connect?: CarWhereUniqueInput | CarWhereUniqueInput[]
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type CarUpdateManyWithoutPartnerNestedInput = {
    create?: XOR<CarCreateWithoutPartnerInput, CarUncheckedCreateWithoutPartnerInput> | CarCreateWithoutPartnerInput[] | CarUncheckedCreateWithoutPartnerInput[]
    connectOrCreate?: CarCreateOrConnectWithoutPartnerInput | CarCreateOrConnectWithoutPartnerInput[]
    upsert?: CarUpsertWithWhereUniqueWithoutPartnerInput | CarUpsertWithWhereUniqueWithoutPartnerInput[]
    createMany?: CarCreateManyPartnerInputEnvelope
    set?: CarWhereUniqueInput | CarWhereUniqueInput[]
    disconnect?: CarWhereUniqueInput | CarWhereUniqueInput[]
    delete?: CarWhereUniqueInput | CarWhereUniqueInput[]
    connect?: CarWhereUniqueInput | CarWhereUniqueInput[]
    update?: CarUpdateWithWhereUniqueWithoutPartnerInput | CarUpdateWithWhereUniqueWithoutPartnerInput[]
    updateMany?: CarUpdateManyWithWhereWithoutPartnerInput | CarUpdateManyWithWhereWithoutPartnerInput[]
    deleteMany?: CarScalarWhereInput | CarScalarWhereInput[]
  }

  export type CarUncheckedUpdateManyWithoutPartnerNestedInput = {
    create?: XOR<CarCreateWithoutPartnerInput, CarUncheckedCreateWithoutPartnerInput> | CarCreateWithoutPartnerInput[] | CarUncheckedCreateWithoutPartnerInput[]
    connectOrCreate?: CarCreateOrConnectWithoutPartnerInput | CarCreateOrConnectWithoutPartnerInput[]
    upsert?: CarUpsertWithWhereUniqueWithoutPartnerInput | CarUpsertWithWhereUniqueWithoutPartnerInput[]
    createMany?: CarCreateManyPartnerInputEnvelope
    set?: CarWhereUniqueInput | CarWhereUniqueInput[]
    disconnect?: CarWhereUniqueInput | CarWhereUniqueInput[]
    delete?: CarWhereUniqueInput | CarWhereUniqueInput[]
    connect?: CarWhereUniqueInput | CarWhereUniqueInput[]
    update?: CarUpdateWithWhereUniqueWithoutPartnerInput | CarUpdateWithWhereUniqueWithoutPartnerInput[]
    updateMany?: CarUpdateManyWithWhereWithoutPartnerInput | CarUpdateManyWithWhereWithoutPartnerInput[]
    deleteMany?: CarScalarWhereInput | CarScalarWhereInput[]
  }

  export type CatalogVisitCreateNestedManyWithoutUserInput = {
    create?: XOR<CatalogVisitCreateWithoutUserInput, CatalogVisitUncheckedCreateWithoutUserInput> | CatalogVisitCreateWithoutUserInput[] | CatalogVisitUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CatalogVisitCreateOrConnectWithoutUserInput | CatalogVisitCreateOrConnectWithoutUserInput[]
    createMany?: CatalogVisitCreateManyUserInputEnvelope
    connect?: CatalogVisitWhereUniqueInput | CatalogVisitWhereUniqueInput[]
  }

  export type WizardSessionCreateNestedOneWithoutUserInput = {
    create?: XOR<WizardSessionCreateWithoutUserInput, WizardSessionUncheckedCreateWithoutUserInput>
    connectOrCreate?: WizardSessionCreateOrConnectWithoutUserInput
    connect?: WizardSessionWhereUniqueInput
  }

  export type CatalogVisitUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<CatalogVisitCreateWithoutUserInput, CatalogVisitUncheckedCreateWithoutUserInput> | CatalogVisitCreateWithoutUserInput[] | CatalogVisitUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CatalogVisitCreateOrConnectWithoutUserInput | CatalogVisitCreateOrConnectWithoutUserInput[]
    createMany?: CatalogVisitCreateManyUserInputEnvelope
    connect?: CatalogVisitWhereUniqueInput | CatalogVisitWhereUniqueInput[]
  }

  export type WizardSessionUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<WizardSessionCreateWithoutUserInput, WizardSessionUncheckedCreateWithoutUserInput>
    connectOrCreate?: WizardSessionCreateOrConnectWithoutUserInput
    connect?: WizardSessionWhereUniqueInput
  }

  export type CatalogVisitUpdateManyWithoutUserNestedInput = {
    create?: XOR<CatalogVisitCreateWithoutUserInput, CatalogVisitUncheckedCreateWithoutUserInput> | CatalogVisitCreateWithoutUserInput[] | CatalogVisitUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CatalogVisitCreateOrConnectWithoutUserInput | CatalogVisitCreateOrConnectWithoutUserInput[]
    upsert?: CatalogVisitUpsertWithWhereUniqueWithoutUserInput | CatalogVisitUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: CatalogVisitCreateManyUserInputEnvelope
    set?: CatalogVisitWhereUniqueInput | CatalogVisitWhereUniqueInput[]
    disconnect?: CatalogVisitWhereUniqueInput | CatalogVisitWhereUniqueInput[]
    delete?: CatalogVisitWhereUniqueInput | CatalogVisitWhereUniqueInput[]
    connect?: CatalogVisitWhereUniqueInput | CatalogVisitWhereUniqueInput[]
    update?: CatalogVisitUpdateWithWhereUniqueWithoutUserInput | CatalogVisitUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: CatalogVisitUpdateManyWithWhereWithoutUserInput | CatalogVisitUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: CatalogVisitScalarWhereInput | CatalogVisitScalarWhereInput[]
  }

  export type WizardSessionUpdateOneWithoutUserNestedInput = {
    create?: XOR<WizardSessionCreateWithoutUserInput, WizardSessionUncheckedCreateWithoutUserInput>
    connectOrCreate?: WizardSessionCreateOrConnectWithoutUserInput
    upsert?: WizardSessionUpsertWithoutUserInput
    disconnect?: WizardSessionWhereInput | boolean
    delete?: WizardSessionWhereInput | boolean
    connect?: WizardSessionWhereUniqueInput
    update?: XOR<XOR<WizardSessionUpdateToOneWithWhereWithoutUserInput, WizardSessionUpdateWithoutUserInput>, WizardSessionUncheckedUpdateWithoutUserInput>
  }

  export type CatalogVisitUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<CatalogVisitCreateWithoutUserInput, CatalogVisitUncheckedCreateWithoutUserInput> | CatalogVisitCreateWithoutUserInput[] | CatalogVisitUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CatalogVisitCreateOrConnectWithoutUserInput | CatalogVisitCreateOrConnectWithoutUserInput[]
    upsert?: CatalogVisitUpsertWithWhereUniqueWithoutUserInput | CatalogVisitUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: CatalogVisitCreateManyUserInputEnvelope
    set?: CatalogVisitWhereUniqueInput | CatalogVisitWhereUniqueInput[]
    disconnect?: CatalogVisitWhereUniqueInput | CatalogVisitWhereUniqueInput[]
    delete?: CatalogVisitWhereUniqueInput | CatalogVisitWhereUniqueInput[]
    connect?: CatalogVisitWhereUniqueInput | CatalogVisitWhereUniqueInput[]
    update?: CatalogVisitUpdateWithWhereUniqueWithoutUserInput | CatalogVisitUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: CatalogVisitUpdateManyWithWhereWithoutUserInput | CatalogVisitUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: CatalogVisitScalarWhereInput | CatalogVisitScalarWhereInput[]
  }

  export type WizardSessionUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<WizardSessionCreateWithoutUserInput, WizardSessionUncheckedCreateWithoutUserInput>
    connectOrCreate?: WizardSessionCreateOrConnectWithoutUserInput
    upsert?: WizardSessionUpsertWithoutUserInput
    disconnect?: WizardSessionWhereInput | boolean
    delete?: WizardSessionWhereInput | boolean
    connect?: WizardSessionWhereUniqueInput
    update?: XOR<XOR<WizardSessionUpdateToOneWithWhereWithoutUserInput, WizardSessionUpdateWithoutUserInput>, WizardSessionUncheckedUpdateWithoutUserInput>
  }

  export type UserCreateNestedOneWithoutWizardSessionInput = {
    create?: XOR<UserCreateWithoutWizardSessionInput, UserUncheckedCreateWithoutWizardSessionInput>
    connectOrCreate?: UserCreateOrConnectWithoutWizardSessionInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneWithoutWizardSessionNestedInput = {
    create?: XOR<UserCreateWithoutWizardSessionInput, UserUncheckedCreateWithoutWizardSessionInput>
    connectOrCreate?: UserCreateOrConnectWithoutWizardSessionInput
    upsert?: UserUpsertWithoutWizardSessionInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutWizardSessionInput, UserUpdateWithoutWizardSessionInput>, UserUncheckedUpdateWithoutWizardSessionInput>
  }

  export type UserCreateNestedOneWithoutCatalogVisitsInput = {
    create?: XOR<UserCreateWithoutCatalogVisitsInput, UserUncheckedCreateWithoutCatalogVisitsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCatalogVisitsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneWithoutCatalogVisitsNestedInput = {
    create?: XOR<UserCreateWithoutCatalogVisitsInput, UserUncheckedCreateWithoutCatalogVisitsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCatalogVisitsInput
    upsert?: UserUpsertWithoutCatalogVisitsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCatalogVisitsInput, UserUpdateWithoutCatalogVisitsInput>, UserUncheckedUpdateWithoutCatalogVisitsInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type PartnerCreateWithoutCarsInput = {
    slug: string
    name?: string
    photo?: string | null
    description?: string
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PartnerUncheckedCreateWithoutCarsInput = {
    id?: number
    slug: string
    name?: string
    photo?: string | null
    description?: string
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PartnerCreateOrConnectWithoutCarsInput = {
    where: PartnerWhereUniqueInput
    create: XOR<PartnerCreateWithoutCarsInput, PartnerUncheckedCreateWithoutCarsInput>
  }

  export type PartnerUpsertWithoutCarsInput = {
    update: XOR<PartnerUpdateWithoutCarsInput, PartnerUncheckedUpdateWithoutCarsInput>
    create: XOR<PartnerCreateWithoutCarsInput, PartnerUncheckedCreateWithoutCarsInput>
    where?: PartnerWhereInput
  }

  export type PartnerUpdateToOneWithWhereWithoutCarsInput = {
    where?: PartnerWhereInput
    data: XOR<PartnerUpdateWithoutCarsInput, PartnerUncheckedUpdateWithoutCarsInput>
  }

  export type PartnerUpdateWithoutCarsInput = {
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    photo?: NullableStringFieldUpdateOperationsInput | string | null
    description?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PartnerUncheckedUpdateWithoutCarsInput = {
    id?: IntFieldUpdateOperationsInput | number
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    photo?: NullableStringFieldUpdateOperationsInput | string | null
    description?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CarCreateWithoutPartnerInput = {
    uid: string
    brand: string
    sku?: string
    mark: string
    category?: string
    title: string
    description?: string
    text?: string
    photo?: string | null
    video?: string | null
    price?: number
    quantity?: number
    priceOld?: number | null
    editions?: string | null
    modifications?: string | null
    externalId?: string | null
    parentUid?: string | null
    status?: string | null
    bodyType?: string | null
    engineType?: string
    engineVolume?: number
    transmission?: string
    driveType?: string
    year?: number
    enginePower?: number
    priceUSD?: string
    monthlyPayment?: number | null
    advancePayment?: number | null
    countryOfOrigin?: string
    mileage?: number
    weight?: number
    length?: number
    width?: number
    height?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CarUncheckedCreateWithoutPartnerInput = {
    id?: number
    uid: string
    brand: string
    sku?: string
    mark: string
    category?: string
    title: string
    description?: string
    text?: string
    photo?: string | null
    video?: string | null
    price?: number
    quantity?: number
    priceOld?: number | null
    editions?: string | null
    modifications?: string | null
    externalId?: string | null
    parentUid?: string | null
    status?: string | null
    bodyType?: string | null
    engineType?: string
    engineVolume?: number
    transmission?: string
    driveType?: string
    year?: number
    enginePower?: number
    priceUSD?: string
    monthlyPayment?: number | null
    advancePayment?: number | null
    countryOfOrigin?: string
    mileage?: number
    weight?: number
    length?: number
    width?: number
    height?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CarCreateOrConnectWithoutPartnerInput = {
    where: CarWhereUniqueInput
    create: XOR<CarCreateWithoutPartnerInput, CarUncheckedCreateWithoutPartnerInput>
  }

  export type CarCreateManyPartnerInputEnvelope = {
    data: CarCreateManyPartnerInput | CarCreateManyPartnerInput[]
  }

  export type CarUpsertWithWhereUniqueWithoutPartnerInput = {
    where: CarWhereUniqueInput
    update: XOR<CarUpdateWithoutPartnerInput, CarUncheckedUpdateWithoutPartnerInput>
    create: XOR<CarCreateWithoutPartnerInput, CarUncheckedCreateWithoutPartnerInput>
  }

  export type CarUpdateWithWhereUniqueWithoutPartnerInput = {
    where: CarWhereUniqueInput
    data: XOR<CarUpdateWithoutPartnerInput, CarUncheckedUpdateWithoutPartnerInput>
  }

  export type CarUpdateManyWithWhereWithoutPartnerInput = {
    where: CarScalarWhereInput
    data: XOR<CarUpdateManyMutationInput, CarUncheckedUpdateManyWithoutPartnerInput>
  }

  export type CarScalarWhereInput = {
    AND?: CarScalarWhereInput | CarScalarWhereInput[]
    OR?: CarScalarWhereInput[]
    NOT?: CarScalarWhereInput | CarScalarWhereInput[]
    id?: IntFilter<"Car"> | number
    uid?: StringFilter<"Car"> | string
    brand?: StringFilter<"Car"> | string
    sku?: StringFilter<"Car"> | string
    mark?: StringFilter<"Car"> | string
    category?: StringFilter<"Car"> | string
    title?: StringFilter<"Car"> | string
    description?: StringFilter<"Car"> | string
    text?: StringFilter<"Car"> | string
    photo?: StringNullableFilter<"Car"> | string | null
    video?: StringNullableFilter<"Car"> | string | null
    price?: FloatFilter<"Car"> | number
    quantity?: IntFilter<"Car"> | number
    priceOld?: FloatNullableFilter<"Car"> | number | null
    editions?: StringNullableFilter<"Car"> | string | null
    modifications?: StringNullableFilter<"Car"> | string | null
    externalId?: StringNullableFilter<"Car"> | string | null
    parentUid?: StringNullableFilter<"Car"> | string | null
    status?: StringNullableFilter<"Car"> | string | null
    bodyType?: StringNullableFilter<"Car"> | string | null
    engineType?: StringFilter<"Car"> | string
    engineVolume?: FloatFilter<"Car"> | number
    transmission?: StringFilter<"Car"> | string
    driveType?: StringFilter<"Car"> | string
    year?: IntFilter<"Car"> | number
    enginePower?: FloatFilter<"Car"> | number
    priceUSD?: StringFilter<"Car"> | string
    monthlyPayment?: FloatNullableFilter<"Car"> | number | null
    advancePayment?: FloatNullableFilter<"Car"> | number | null
    countryOfOrigin?: StringFilter<"Car"> | string
    mileage?: IntFilter<"Car"> | number
    weight?: FloatFilter<"Car"> | number
    length?: FloatFilter<"Car"> | number
    width?: FloatFilter<"Car"> | number
    height?: FloatFilter<"Car"> | number
    partnerId?: IntNullableFilter<"Car"> | number | null
    createdAt?: DateTimeFilter<"Car"> | Date | string
    updatedAt?: DateTimeFilter<"Car"> | Date | string
  }

  export type CatalogVisitCreateWithoutUserInput = {
    phone?: string | null
    username?: string | null
    firstName?: string | null
    lastName?: string | null
    userAgent?: string | null
    ipAddress?: string | null
    visitedAt?: Date | string
    createdAt?: Date | string
  }

  export type CatalogVisitUncheckedCreateWithoutUserInput = {
    id?: number
    phone?: string | null
    username?: string | null
    firstName?: string | null
    lastName?: string | null
    userAgent?: string | null
    ipAddress?: string | null
    visitedAt?: Date | string
    createdAt?: Date | string
  }

  export type CatalogVisitCreateOrConnectWithoutUserInput = {
    where: CatalogVisitWhereUniqueInput
    create: XOR<CatalogVisitCreateWithoutUserInput, CatalogVisitUncheckedCreateWithoutUserInput>
  }

  export type CatalogVisitCreateManyUserInputEnvelope = {
    data: CatalogVisitCreateManyUserInput | CatalogVisitCreateManyUserInput[]
  }

  export type WizardSessionCreateWithoutUserInput = {
    telegramId: string
    phone?: string | null
    startOption?: string | null
    currentCarBrand?: string | null
    currentCarModel?: string | null
    currentCarYear?: number | null
    currentCarMileage?: number | null
    currentCarPrice?: number
    additionalCash?: number
    monthlyPayment?: number
    termMonths?: number
    motivations?: string
    bodyTypes?: string
    brandPrefs?: string
    maxBudget?: number | null
    totalStartBudget?: number | null
    selectedCarId?: number | null
    selectedCarLabel?: string | null
    currentStep?: string
    bitrixStatus?: string | null
    bitrixError?: string | null
    funnelSteps?: string
    calculationsCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WizardSessionUncheckedCreateWithoutUserInput = {
    id?: number
    telegramId: string
    phone?: string | null
    startOption?: string | null
    currentCarBrand?: string | null
    currentCarModel?: string | null
    currentCarYear?: number | null
    currentCarMileage?: number | null
    currentCarPrice?: number
    additionalCash?: number
    monthlyPayment?: number
    termMonths?: number
    motivations?: string
    bodyTypes?: string
    brandPrefs?: string
    maxBudget?: number | null
    totalStartBudget?: number | null
    selectedCarId?: number | null
    selectedCarLabel?: string | null
    currentStep?: string
    bitrixStatus?: string | null
    bitrixError?: string | null
    funnelSteps?: string
    calculationsCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WizardSessionCreateOrConnectWithoutUserInput = {
    where: WizardSessionWhereUniqueInput
    create: XOR<WizardSessionCreateWithoutUserInput, WizardSessionUncheckedCreateWithoutUserInput>
  }

  export type CatalogVisitUpsertWithWhereUniqueWithoutUserInput = {
    where: CatalogVisitWhereUniqueInput
    update: XOR<CatalogVisitUpdateWithoutUserInput, CatalogVisitUncheckedUpdateWithoutUserInput>
    create: XOR<CatalogVisitCreateWithoutUserInput, CatalogVisitUncheckedCreateWithoutUserInput>
  }

  export type CatalogVisitUpdateWithWhereUniqueWithoutUserInput = {
    where: CatalogVisitWhereUniqueInput
    data: XOR<CatalogVisitUpdateWithoutUserInput, CatalogVisitUncheckedUpdateWithoutUserInput>
  }

  export type CatalogVisitUpdateManyWithWhereWithoutUserInput = {
    where: CatalogVisitScalarWhereInput
    data: XOR<CatalogVisitUpdateManyMutationInput, CatalogVisitUncheckedUpdateManyWithoutUserInput>
  }

  export type CatalogVisitScalarWhereInput = {
    AND?: CatalogVisitScalarWhereInput | CatalogVisitScalarWhereInput[]
    OR?: CatalogVisitScalarWhereInput[]
    NOT?: CatalogVisitScalarWhereInput | CatalogVisitScalarWhereInput[]
    id?: IntFilter<"CatalogVisit"> | number
    userId?: IntNullableFilter<"CatalogVisit"> | number | null
    phone?: StringNullableFilter<"CatalogVisit"> | string | null
    username?: StringNullableFilter<"CatalogVisit"> | string | null
    firstName?: StringNullableFilter<"CatalogVisit"> | string | null
    lastName?: StringNullableFilter<"CatalogVisit"> | string | null
    userAgent?: StringNullableFilter<"CatalogVisit"> | string | null
    ipAddress?: StringNullableFilter<"CatalogVisit"> | string | null
    visitedAt?: DateTimeFilter<"CatalogVisit"> | Date | string
    createdAt?: DateTimeFilter<"CatalogVisit"> | Date | string
  }

  export type WizardSessionUpsertWithoutUserInput = {
    update: XOR<WizardSessionUpdateWithoutUserInput, WizardSessionUncheckedUpdateWithoutUserInput>
    create: XOR<WizardSessionCreateWithoutUserInput, WizardSessionUncheckedCreateWithoutUserInput>
    where?: WizardSessionWhereInput
  }

  export type WizardSessionUpdateToOneWithWhereWithoutUserInput = {
    where?: WizardSessionWhereInput
    data: XOR<WizardSessionUpdateWithoutUserInput, WizardSessionUncheckedUpdateWithoutUserInput>
  }

  export type WizardSessionUpdateWithoutUserInput = {
    telegramId?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    startOption?: NullableStringFieldUpdateOperationsInput | string | null
    currentCarBrand?: NullableStringFieldUpdateOperationsInput | string | null
    currentCarModel?: NullableStringFieldUpdateOperationsInput | string | null
    currentCarYear?: NullableIntFieldUpdateOperationsInput | number | null
    currentCarMileage?: NullableIntFieldUpdateOperationsInput | number | null
    currentCarPrice?: FloatFieldUpdateOperationsInput | number
    additionalCash?: FloatFieldUpdateOperationsInput | number
    monthlyPayment?: FloatFieldUpdateOperationsInput | number
    termMonths?: IntFieldUpdateOperationsInput | number
    motivations?: StringFieldUpdateOperationsInput | string
    bodyTypes?: StringFieldUpdateOperationsInput | string
    brandPrefs?: StringFieldUpdateOperationsInput | string
    maxBudget?: NullableFloatFieldUpdateOperationsInput | number | null
    totalStartBudget?: NullableFloatFieldUpdateOperationsInput | number | null
    selectedCarId?: NullableIntFieldUpdateOperationsInput | number | null
    selectedCarLabel?: NullableStringFieldUpdateOperationsInput | string | null
    currentStep?: StringFieldUpdateOperationsInput | string
    bitrixStatus?: NullableStringFieldUpdateOperationsInput | string | null
    bitrixError?: NullableStringFieldUpdateOperationsInput | string | null
    funnelSteps?: StringFieldUpdateOperationsInput | string
    calculationsCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WizardSessionUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    telegramId?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    startOption?: NullableStringFieldUpdateOperationsInput | string | null
    currentCarBrand?: NullableStringFieldUpdateOperationsInput | string | null
    currentCarModel?: NullableStringFieldUpdateOperationsInput | string | null
    currentCarYear?: NullableIntFieldUpdateOperationsInput | number | null
    currentCarMileage?: NullableIntFieldUpdateOperationsInput | number | null
    currentCarPrice?: FloatFieldUpdateOperationsInput | number
    additionalCash?: FloatFieldUpdateOperationsInput | number
    monthlyPayment?: FloatFieldUpdateOperationsInput | number
    termMonths?: IntFieldUpdateOperationsInput | number
    motivations?: StringFieldUpdateOperationsInput | string
    bodyTypes?: StringFieldUpdateOperationsInput | string
    brandPrefs?: StringFieldUpdateOperationsInput | string
    maxBudget?: NullableFloatFieldUpdateOperationsInput | number | null
    totalStartBudget?: NullableFloatFieldUpdateOperationsInput | number | null
    selectedCarId?: NullableIntFieldUpdateOperationsInput | number | null
    selectedCarLabel?: NullableStringFieldUpdateOperationsInput | string | null
    currentStep?: StringFieldUpdateOperationsInput | string
    bitrixStatus?: NullableStringFieldUpdateOperationsInput | string | null
    bitrixError?: NullableStringFieldUpdateOperationsInput | string | null
    funnelSteps?: StringFieldUpdateOperationsInput | string
    calculationsCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateWithoutWizardSessionInput = {
    telegramId: string
    username?: string | null
    firstName: string
    lastName?: string | null
    languageCode: string
    chatId?: string | null
    isBot: boolean
    phone?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    catalogVisits?: CatalogVisitCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutWizardSessionInput = {
    id?: number
    telegramId: string
    username?: string | null
    firstName: string
    lastName?: string | null
    languageCode: string
    chatId?: string | null
    isBot: boolean
    phone?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    catalogVisits?: CatalogVisitUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutWizardSessionInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutWizardSessionInput, UserUncheckedCreateWithoutWizardSessionInput>
  }

  export type UserUpsertWithoutWizardSessionInput = {
    update: XOR<UserUpdateWithoutWizardSessionInput, UserUncheckedUpdateWithoutWizardSessionInput>
    create: XOR<UserCreateWithoutWizardSessionInput, UserUncheckedCreateWithoutWizardSessionInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutWizardSessionInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutWizardSessionInput, UserUncheckedUpdateWithoutWizardSessionInput>
  }

  export type UserUpdateWithoutWizardSessionInput = {
    telegramId?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    languageCode?: StringFieldUpdateOperationsInput | string
    chatId?: NullableStringFieldUpdateOperationsInput | string | null
    isBot?: BoolFieldUpdateOperationsInput | boolean
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    catalogVisits?: CatalogVisitUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutWizardSessionInput = {
    id?: IntFieldUpdateOperationsInput | number
    telegramId?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    languageCode?: StringFieldUpdateOperationsInput | string
    chatId?: NullableStringFieldUpdateOperationsInput | string | null
    isBot?: BoolFieldUpdateOperationsInput | boolean
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    catalogVisits?: CatalogVisitUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutCatalogVisitsInput = {
    telegramId: string
    username?: string | null
    firstName: string
    lastName?: string | null
    languageCode: string
    chatId?: string | null
    isBot: boolean
    phone?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    wizardSession?: WizardSessionCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateWithoutCatalogVisitsInput = {
    id?: number
    telegramId: string
    username?: string | null
    firstName: string
    lastName?: string | null
    languageCode: string
    chatId?: string | null
    isBot: boolean
    phone?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    wizardSession?: WizardSessionUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserCreateOrConnectWithoutCatalogVisitsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCatalogVisitsInput, UserUncheckedCreateWithoutCatalogVisitsInput>
  }

  export type UserUpsertWithoutCatalogVisitsInput = {
    update: XOR<UserUpdateWithoutCatalogVisitsInput, UserUncheckedUpdateWithoutCatalogVisitsInput>
    create: XOR<UserCreateWithoutCatalogVisitsInput, UserUncheckedCreateWithoutCatalogVisitsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCatalogVisitsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCatalogVisitsInput, UserUncheckedUpdateWithoutCatalogVisitsInput>
  }

  export type UserUpdateWithoutCatalogVisitsInput = {
    telegramId?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    languageCode?: StringFieldUpdateOperationsInput | string
    chatId?: NullableStringFieldUpdateOperationsInput | string | null
    isBot?: BoolFieldUpdateOperationsInput | boolean
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    wizardSession?: WizardSessionUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutCatalogVisitsInput = {
    id?: IntFieldUpdateOperationsInput | number
    telegramId?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    languageCode?: StringFieldUpdateOperationsInput | string
    chatId?: NullableStringFieldUpdateOperationsInput | string | null
    isBot?: BoolFieldUpdateOperationsInput | boolean
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    wizardSession?: WizardSessionUncheckedUpdateOneWithoutUserNestedInput
  }

  export type CarCreateManyPartnerInput = {
    id?: number
    uid: string
    brand: string
    sku?: string
    mark: string
    category?: string
    title: string
    description?: string
    text?: string
    photo?: string | null
    video?: string | null
    price?: number
    quantity?: number
    priceOld?: number | null
    editions?: string | null
    modifications?: string | null
    externalId?: string | null
    parentUid?: string | null
    status?: string | null
    bodyType?: string | null
    engineType?: string
    engineVolume?: number
    transmission?: string
    driveType?: string
    year?: number
    enginePower?: number
    priceUSD?: string
    monthlyPayment?: number | null
    advancePayment?: number | null
    countryOfOrigin?: string
    mileage?: number
    weight?: number
    length?: number
    width?: number
    height?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CarUpdateWithoutPartnerInput = {
    uid?: StringFieldUpdateOperationsInput | string
    brand?: StringFieldUpdateOperationsInput | string
    sku?: StringFieldUpdateOperationsInput | string
    mark?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    photo?: NullableStringFieldUpdateOperationsInput | string | null
    video?: NullableStringFieldUpdateOperationsInput | string | null
    price?: FloatFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
    priceOld?: NullableFloatFieldUpdateOperationsInput | number | null
    editions?: NullableStringFieldUpdateOperationsInput | string | null
    modifications?: NullableStringFieldUpdateOperationsInput | string | null
    externalId?: NullableStringFieldUpdateOperationsInput | string | null
    parentUid?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    bodyType?: NullableStringFieldUpdateOperationsInput | string | null
    engineType?: StringFieldUpdateOperationsInput | string
    engineVolume?: FloatFieldUpdateOperationsInput | number
    transmission?: StringFieldUpdateOperationsInput | string
    driveType?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    enginePower?: FloatFieldUpdateOperationsInput | number
    priceUSD?: StringFieldUpdateOperationsInput | string
    monthlyPayment?: NullableFloatFieldUpdateOperationsInput | number | null
    advancePayment?: NullableFloatFieldUpdateOperationsInput | number | null
    countryOfOrigin?: StringFieldUpdateOperationsInput | string
    mileage?: IntFieldUpdateOperationsInput | number
    weight?: FloatFieldUpdateOperationsInput | number
    length?: FloatFieldUpdateOperationsInput | number
    width?: FloatFieldUpdateOperationsInput | number
    height?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CarUncheckedUpdateWithoutPartnerInput = {
    id?: IntFieldUpdateOperationsInput | number
    uid?: StringFieldUpdateOperationsInput | string
    brand?: StringFieldUpdateOperationsInput | string
    sku?: StringFieldUpdateOperationsInput | string
    mark?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    photo?: NullableStringFieldUpdateOperationsInput | string | null
    video?: NullableStringFieldUpdateOperationsInput | string | null
    price?: FloatFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
    priceOld?: NullableFloatFieldUpdateOperationsInput | number | null
    editions?: NullableStringFieldUpdateOperationsInput | string | null
    modifications?: NullableStringFieldUpdateOperationsInput | string | null
    externalId?: NullableStringFieldUpdateOperationsInput | string | null
    parentUid?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    bodyType?: NullableStringFieldUpdateOperationsInput | string | null
    engineType?: StringFieldUpdateOperationsInput | string
    engineVolume?: FloatFieldUpdateOperationsInput | number
    transmission?: StringFieldUpdateOperationsInput | string
    driveType?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    enginePower?: FloatFieldUpdateOperationsInput | number
    priceUSD?: StringFieldUpdateOperationsInput | string
    monthlyPayment?: NullableFloatFieldUpdateOperationsInput | number | null
    advancePayment?: NullableFloatFieldUpdateOperationsInput | number | null
    countryOfOrigin?: StringFieldUpdateOperationsInput | string
    mileage?: IntFieldUpdateOperationsInput | number
    weight?: FloatFieldUpdateOperationsInput | number
    length?: FloatFieldUpdateOperationsInput | number
    width?: FloatFieldUpdateOperationsInput | number
    height?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CarUncheckedUpdateManyWithoutPartnerInput = {
    id?: IntFieldUpdateOperationsInput | number
    uid?: StringFieldUpdateOperationsInput | string
    brand?: StringFieldUpdateOperationsInput | string
    sku?: StringFieldUpdateOperationsInput | string
    mark?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    photo?: NullableStringFieldUpdateOperationsInput | string | null
    video?: NullableStringFieldUpdateOperationsInput | string | null
    price?: FloatFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
    priceOld?: NullableFloatFieldUpdateOperationsInput | number | null
    editions?: NullableStringFieldUpdateOperationsInput | string | null
    modifications?: NullableStringFieldUpdateOperationsInput | string | null
    externalId?: NullableStringFieldUpdateOperationsInput | string | null
    parentUid?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    bodyType?: NullableStringFieldUpdateOperationsInput | string | null
    engineType?: StringFieldUpdateOperationsInput | string
    engineVolume?: FloatFieldUpdateOperationsInput | number
    transmission?: StringFieldUpdateOperationsInput | string
    driveType?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    enginePower?: FloatFieldUpdateOperationsInput | number
    priceUSD?: StringFieldUpdateOperationsInput | string
    monthlyPayment?: NullableFloatFieldUpdateOperationsInput | number | null
    advancePayment?: NullableFloatFieldUpdateOperationsInput | number | null
    countryOfOrigin?: StringFieldUpdateOperationsInput | string
    mileage?: IntFieldUpdateOperationsInput | number
    weight?: FloatFieldUpdateOperationsInput | number
    length?: FloatFieldUpdateOperationsInput | number
    width?: FloatFieldUpdateOperationsInput | number
    height?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CatalogVisitCreateManyUserInput = {
    id?: number
    phone?: string | null
    username?: string | null
    firstName?: string | null
    lastName?: string | null
    userAgent?: string | null
    ipAddress?: string | null
    visitedAt?: Date | string
    createdAt?: Date | string
  }

  export type CatalogVisitUpdateWithoutUserInput = {
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    visitedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CatalogVisitUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    visitedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CatalogVisitUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    visitedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}