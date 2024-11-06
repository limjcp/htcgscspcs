
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
 * Model Student
 * 
 */
export type Student = $Result.DefaultSelection<Prisma.$StudentPayload>
/**
 * Model SchoolYear
 * 
 */
export type SchoolYear = $Result.DefaultSelection<Prisma.$SchoolYearPayload>
/**
 * Model Semester
 * 
 */
export type Semester = $Result.DefaultSelection<Prisma.$SemesterPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Gender: {
  MALE: 'MALE',
  FEMALE: 'FEMALE'
};

export type Gender = (typeof Gender)[keyof typeof Gender]


export const StudentStatus: {
  ENROLLED: 'ENROLLED',
  GRADUATED: 'GRADUATED',
  DROPPED: 'DROPPED',
  SUSPENDED: 'SUSPENDED'
};

export type StudentStatus = (typeof StudentStatus)[keyof typeof StudentStatus]

}

export type Gender = $Enums.Gender

export const Gender: typeof $Enums.Gender

export type StudentStatus = $Enums.StudentStatus

export const StudentStatus: typeof $Enums.StudentStatus

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Students
 * const students = await prisma.student.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
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
   * // Fetch zero or more Students
   * const students = await prisma.student.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

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


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.student`: Exposes CRUD operations for the **Student** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Students
    * const students = await prisma.student.findMany()
    * ```
    */
  get student(): Prisma.StudentDelegate<ExtArgs>;

  /**
   * `prisma.schoolYear`: Exposes CRUD operations for the **SchoolYear** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SchoolYears
    * const schoolYears = await prisma.schoolYear.findMany()
    * ```
    */
  get schoolYear(): Prisma.SchoolYearDelegate<ExtArgs>;

  /**
   * `prisma.semester`: Exposes CRUD operations for the **Semester** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Semesters
    * const semesters = await prisma.semester.findMany()
    * ```
    */
  get semester(): Prisma.SemesterDelegate<ExtArgs>;
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
  export import NotFoundError = runtime.NotFoundError

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
   * Prisma Client JS version: 5.21.1
   * Query Engine version: bf0e5e8a04cada8225617067eaa03d041e2bba36
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


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
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
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
    Student: 'Student',
    SchoolYear: 'SchoolYear',
    Semester: 'Semester'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "student" | "schoolYear" | "semester"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Student: {
        payload: Prisma.$StudentPayload<ExtArgs>
        fields: Prisma.StudentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.StudentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.StudentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>
          }
          findFirst: {
            args: Prisma.StudentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.StudentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>
          }
          findMany: {
            args: Prisma.StudentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>[]
          }
          create: {
            args: Prisma.StudentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>
          }
          createMany: {
            args: Prisma.StudentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.StudentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>
          }
          update: {
            args: Prisma.StudentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>
          }
          deleteMany: {
            args: Prisma.StudentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.StudentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.StudentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>
          }
          aggregate: {
            args: Prisma.StudentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateStudent>
          }
          groupBy: {
            args: Prisma.StudentGroupByArgs<ExtArgs>
            result: $Utils.Optional<StudentGroupByOutputType>[]
          }
          count: {
            args: Prisma.StudentCountArgs<ExtArgs>
            result: $Utils.Optional<StudentCountAggregateOutputType> | number
          }
        }
      }
      SchoolYear: {
        payload: Prisma.$SchoolYearPayload<ExtArgs>
        fields: Prisma.SchoolYearFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SchoolYearFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchoolYearPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SchoolYearFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchoolYearPayload>
          }
          findFirst: {
            args: Prisma.SchoolYearFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchoolYearPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SchoolYearFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchoolYearPayload>
          }
          findMany: {
            args: Prisma.SchoolYearFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchoolYearPayload>[]
          }
          create: {
            args: Prisma.SchoolYearCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchoolYearPayload>
          }
          createMany: {
            args: Prisma.SchoolYearCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.SchoolYearDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchoolYearPayload>
          }
          update: {
            args: Prisma.SchoolYearUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchoolYearPayload>
          }
          deleteMany: {
            args: Prisma.SchoolYearDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SchoolYearUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.SchoolYearUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchoolYearPayload>
          }
          aggregate: {
            args: Prisma.SchoolYearAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSchoolYear>
          }
          groupBy: {
            args: Prisma.SchoolYearGroupByArgs<ExtArgs>
            result: $Utils.Optional<SchoolYearGroupByOutputType>[]
          }
          count: {
            args: Prisma.SchoolYearCountArgs<ExtArgs>
            result: $Utils.Optional<SchoolYearCountAggregateOutputType> | number
          }
        }
      }
      Semester: {
        payload: Prisma.$SemesterPayload<ExtArgs>
        fields: Prisma.SemesterFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SemesterFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SemesterPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SemesterFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SemesterPayload>
          }
          findFirst: {
            args: Prisma.SemesterFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SemesterPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SemesterFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SemesterPayload>
          }
          findMany: {
            args: Prisma.SemesterFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SemesterPayload>[]
          }
          create: {
            args: Prisma.SemesterCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SemesterPayload>
          }
          createMany: {
            args: Prisma.SemesterCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.SemesterDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SemesterPayload>
          }
          update: {
            args: Prisma.SemesterUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SemesterPayload>
          }
          deleteMany: {
            args: Prisma.SemesterDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SemesterUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.SemesterUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SemesterPayload>
          }
          aggregate: {
            args: Prisma.SemesterAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSemester>
          }
          groupBy: {
            args: Prisma.SemesterGroupByArgs<ExtArgs>
            result: $Utils.Optional<SemesterGroupByOutputType>[]
          }
          count: {
            args: Prisma.SemesterCountArgs<ExtArgs>
            result: $Utils.Optional<SemesterCountAggregateOutputType> | number
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
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
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
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

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

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

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
   * Count Type SchoolYearCountOutputType
   */

  export type SchoolYearCountOutputType = {
    Semester: number
    Student: number
  }

  export type SchoolYearCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Semester?: boolean | SchoolYearCountOutputTypeCountSemesterArgs
    Student?: boolean | SchoolYearCountOutputTypeCountStudentArgs
  }

  // Custom InputTypes
  /**
   * SchoolYearCountOutputType without action
   */
  export type SchoolYearCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SchoolYearCountOutputType
     */
    select?: SchoolYearCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * SchoolYearCountOutputType without action
   */
  export type SchoolYearCountOutputTypeCountSemesterArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SemesterWhereInput
  }

  /**
   * SchoolYearCountOutputType without action
   */
  export type SchoolYearCountOutputTypeCountStudentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StudentWhereInput
  }


  /**
   * Count Type SemesterCountOutputType
   */

  export type SemesterCountOutputType = {
    Student: number
  }

  export type SemesterCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Student?: boolean | SemesterCountOutputTypeCountStudentArgs
  }

  // Custom InputTypes
  /**
   * SemesterCountOutputType without action
   */
  export type SemesterCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SemesterCountOutputType
     */
    select?: SemesterCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * SemesterCountOutputType without action
   */
  export type SemesterCountOutputTypeCountStudentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StudentWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Student
   */

  export type AggregateStudent = {
    _count: StudentCountAggregateOutputType | null
    _min: StudentMinAggregateOutputType | null
    _max: StudentMaxAggregateOutputType | null
  }

  export type StudentMinAggregateOutputType = {
    id: string | null
    studentId: string | null
    firstName: string | null
    middleName: string | null
    lastName: string | null
    email: string | null
    phone: string | null
    address: string | null
    dateOfBirth: Date | null
    gender: $Enums.Gender | null
    enrollmentYearId: string | null
    enrollmentSemesterId: string | null
    status: $Enums.StudentStatus | null
    program: string | null
  }

  export type StudentMaxAggregateOutputType = {
    id: string | null
    studentId: string | null
    firstName: string | null
    middleName: string | null
    lastName: string | null
    email: string | null
    phone: string | null
    address: string | null
    dateOfBirth: Date | null
    gender: $Enums.Gender | null
    enrollmentYearId: string | null
    enrollmentSemesterId: string | null
    status: $Enums.StudentStatus | null
    program: string | null
  }

  export type StudentCountAggregateOutputType = {
    id: number
    studentId: number
    firstName: number
    middleName: number
    lastName: number
    email: number
    phone: number
    address: number
    dateOfBirth: number
    gender: number
    enrollmentYearId: number
    enrollmentSemesterId: number
    status: number
    program: number
    _all: number
  }


  export type StudentMinAggregateInputType = {
    id?: true
    studentId?: true
    firstName?: true
    middleName?: true
    lastName?: true
    email?: true
    phone?: true
    address?: true
    dateOfBirth?: true
    gender?: true
    enrollmentYearId?: true
    enrollmentSemesterId?: true
    status?: true
    program?: true
  }

  export type StudentMaxAggregateInputType = {
    id?: true
    studentId?: true
    firstName?: true
    middleName?: true
    lastName?: true
    email?: true
    phone?: true
    address?: true
    dateOfBirth?: true
    gender?: true
    enrollmentYearId?: true
    enrollmentSemesterId?: true
    status?: true
    program?: true
  }

  export type StudentCountAggregateInputType = {
    id?: true
    studentId?: true
    firstName?: true
    middleName?: true
    lastName?: true
    email?: true
    phone?: true
    address?: true
    dateOfBirth?: true
    gender?: true
    enrollmentYearId?: true
    enrollmentSemesterId?: true
    status?: true
    program?: true
    _all?: true
  }

  export type StudentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Student to aggregate.
     */
    where?: StudentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Students to fetch.
     */
    orderBy?: StudentOrderByWithRelationInput | StudentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: StudentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Students from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Students.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Students
    **/
    _count?: true | StudentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: StudentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: StudentMaxAggregateInputType
  }

  export type GetStudentAggregateType<T extends StudentAggregateArgs> = {
        [P in keyof T & keyof AggregateStudent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStudent[P]>
      : GetScalarType<T[P], AggregateStudent[P]>
  }




  export type StudentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StudentWhereInput
    orderBy?: StudentOrderByWithAggregationInput | StudentOrderByWithAggregationInput[]
    by: StudentScalarFieldEnum[] | StudentScalarFieldEnum
    having?: StudentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: StudentCountAggregateInputType | true
    _min?: StudentMinAggregateInputType
    _max?: StudentMaxAggregateInputType
  }

  export type StudentGroupByOutputType = {
    id: string
    studentId: string
    firstName: string
    middleName: string | null
    lastName: string
    email: string
    phone: string
    address: string | null
    dateOfBirth: Date | null
    gender: $Enums.Gender
    enrollmentYearId: string
    enrollmentSemesterId: string
    status: $Enums.StudentStatus
    program: string
    _count: StudentCountAggregateOutputType | null
    _min: StudentMinAggregateOutputType | null
    _max: StudentMaxAggregateOutputType | null
  }

  type GetStudentGroupByPayload<T extends StudentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<StudentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof StudentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], StudentGroupByOutputType[P]>
            : GetScalarType<T[P], StudentGroupByOutputType[P]>
        }
      >
    >


  export type StudentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    studentId?: boolean
    firstName?: boolean
    middleName?: boolean
    lastName?: boolean
    email?: boolean
    phone?: boolean
    address?: boolean
    dateOfBirth?: boolean
    gender?: boolean
    enrollmentYearId?: boolean
    enrollmentSemesterId?: boolean
    status?: boolean
    program?: boolean
    enrollmentYear?: boolean | SchoolYearDefaultArgs<ExtArgs>
    enrollmentSemester?: boolean | SemesterDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["student"]>


  export type StudentSelectScalar = {
    id?: boolean
    studentId?: boolean
    firstName?: boolean
    middleName?: boolean
    lastName?: boolean
    email?: boolean
    phone?: boolean
    address?: boolean
    dateOfBirth?: boolean
    gender?: boolean
    enrollmentYearId?: boolean
    enrollmentSemesterId?: boolean
    status?: boolean
    program?: boolean
  }

  export type StudentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    enrollmentYear?: boolean | SchoolYearDefaultArgs<ExtArgs>
    enrollmentSemester?: boolean | SemesterDefaultArgs<ExtArgs>
  }

  export type $StudentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Student"
    objects: {
      enrollmentYear: Prisma.$SchoolYearPayload<ExtArgs>
      enrollmentSemester: Prisma.$SemesterPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      studentId: string
      firstName: string
      middleName: string | null
      lastName: string
      email: string
      phone: string
      address: string | null
      dateOfBirth: Date | null
      gender: $Enums.Gender
      enrollmentYearId: string
      enrollmentSemesterId: string
      status: $Enums.StudentStatus
      program: string
    }, ExtArgs["result"]["student"]>
    composites: {}
  }

  type StudentGetPayload<S extends boolean | null | undefined | StudentDefaultArgs> = $Result.GetResult<Prisma.$StudentPayload, S>

  type StudentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<StudentFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: StudentCountAggregateInputType | true
    }

  export interface StudentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Student'], meta: { name: 'Student' } }
    /**
     * Find zero or one Student that matches the filter.
     * @param {StudentFindUniqueArgs} args - Arguments to find a Student
     * @example
     * // Get one Student
     * const student = await prisma.student.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends StudentFindUniqueArgs>(args: SelectSubset<T, StudentFindUniqueArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Student that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {StudentFindUniqueOrThrowArgs} args - Arguments to find a Student
     * @example
     * // Get one Student
     * const student = await prisma.student.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends StudentFindUniqueOrThrowArgs>(args: SelectSubset<T, StudentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Student that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentFindFirstArgs} args - Arguments to find a Student
     * @example
     * // Get one Student
     * const student = await prisma.student.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends StudentFindFirstArgs>(args?: SelectSubset<T, StudentFindFirstArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Student that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentFindFirstOrThrowArgs} args - Arguments to find a Student
     * @example
     * // Get one Student
     * const student = await prisma.student.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends StudentFindFirstOrThrowArgs>(args?: SelectSubset<T, StudentFindFirstOrThrowArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Students that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Students
     * const students = await prisma.student.findMany()
     * 
     * // Get first 10 Students
     * const students = await prisma.student.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const studentWithIdOnly = await prisma.student.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends StudentFindManyArgs>(args?: SelectSubset<T, StudentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Student.
     * @param {StudentCreateArgs} args - Arguments to create a Student.
     * @example
     * // Create one Student
     * const Student = await prisma.student.create({
     *   data: {
     *     // ... data to create a Student
     *   }
     * })
     * 
     */
    create<T extends StudentCreateArgs>(args: SelectSubset<T, StudentCreateArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Students.
     * @param {StudentCreateManyArgs} args - Arguments to create many Students.
     * @example
     * // Create many Students
     * const student = await prisma.student.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends StudentCreateManyArgs>(args?: SelectSubset<T, StudentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Student.
     * @param {StudentDeleteArgs} args - Arguments to delete one Student.
     * @example
     * // Delete one Student
     * const Student = await prisma.student.delete({
     *   where: {
     *     // ... filter to delete one Student
     *   }
     * })
     * 
     */
    delete<T extends StudentDeleteArgs>(args: SelectSubset<T, StudentDeleteArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Student.
     * @param {StudentUpdateArgs} args - Arguments to update one Student.
     * @example
     * // Update one Student
     * const student = await prisma.student.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends StudentUpdateArgs>(args: SelectSubset<T, StudentUpdateArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Students.
     * @param {StudentDeleteManyArgs} args - Arguments to filter Students to delete.
     * @example
     * // Delete a few Students
     * const { count } = await prisma.student.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends StudentDeleteManyArgs>(args?: SelectSubset<T, StudentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Students.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Students
     * const student = await prisma.student.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends StudentUpdateManyArgs>(args: SelectSubset<T, StudentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Student.
     * @param {StudentUpsertArgs} args - Arguments to update or create a Student.
     * @example
     * // Update or create a Student
     * const student = await prisma.student.upsert({
     *   create: {
     *     // ... data to create a Student
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Student we want to update
     *   }
     * })
     */
    upsert<T extends StudentUpsertArgs>(args: SelectSubset<T, StudentUpsertArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Students.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentCountArgs} args - Arguments to filter Students to count.
     * @example
     * // Count the number of Students
     * const count = await prisma.student.count({
     *   where: {
     *     // ... the filter for the Students we want to count
     *   }
     * })
    **/
    count<T extends StudentCountArgs>(
      args?: Subset<T, StudentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], StudentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Student.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends StudentAggregateArgs>(args: Subset<T, StudentAggregateArgs>): Prisma.PrismaPromise<GetStudentAggregateType<T>>

    /**
     * Group by Student.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentGroupByArgs} args - Group by arguments.
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
      T extends StudentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: StudentGroupByArgs['orderBy'] }
        : { orderBy?: StudentGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, StudentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStudentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Student model
   */
  readonly fields: StudentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Student.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__StudentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    enrollmentYear<T extends SchoolYearDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SchoolYearDefaultArgs<ExtArgs>>): Prisma__SchoolYearClient<$Result.GetResult<Prisma.$SchoolYearPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    enrollmentSemester<T extends SemesterDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SemesterDefaultArgs<ExtArgs>>): Prisma__SemesterClient<$Result.GetResult<Prisma.$SemesterPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
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
   * Fields of the Student model
   */ 
  interface StudentFieldRefs {
    readonly id: FieldRef<"Student", 'String'>
    readonly studentId: FieldRef<"Student", 'String'>
    readonly firstName: FieldRef<"Student", 'String'>
    readonly middleName: FieldRef<"Student", 'String'>
    readonly lastName: FieldRef<"Student", 'String'>
    readonly email: FieldRef<"Student", 'String'>
    readonly phone: FieldRef<"Student", 'String'>
    readonly address: FieldRef<"Student", 'String'>
    readonly dateOfBirth: FieldRef<"Student", 'DateTime'>
    readonly gender: FieldRef<"Student", 'Gender'>
    readonly enrollmentYearId: FieldRef<"Student", 'String'>
    readonly enrollmentSemesterId: FieldRef<"Student", 'String'>
    readonly status: FieldRef<"Student", 'StudentStatus'>
    readonly program: FieldRef<"Student", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Student findUnique
   */
  export type StudentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * Filter, which Student to fetch.
     */
    where: StudentWhereUniqueInput
  }

  /**
   * Student findUniqueOrThrow
   */
  export type StudentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * Filter, which Student to fetch.
     */
    where: StudentWhereUniqueInput
  }

  /**
   * Student findFirst
   */
  export type StudentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * Filter, which Student to fetch.
     */
    where?: StudentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Students to fetch.
     */
    orderBy?: StudentOrderByWithRelationInput | StudentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Students.
     */
    cursor?: StudentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Students from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Students.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Students.
     */
    distinct?: StudentScalarFieldEnum | StudentScalarFieldEnum[]
  }

  /**
   * Student findFirstOrThrow
   */
  export type StudentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * Filter, which Student to fetch.
     */
    where?: StudentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Students to fetch.
     */
    orderBy?: StudentOrderByWithRelationInput | StudentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Students.
     */
    cursor?: StudentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Students from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Students.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Students.
     */
    distinct?: StudentScalarFieldEnum | StudentScalarFieldEnum[]
  }

  /**
   * Student findMany
   */
  export type StudentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * Filter, which Students to fetch.
     */
    where?: StudentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Students to fetch.
     */
    orderBy?: StudentOrderByWithRelationInput | StudentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Students.
     */
    cursor?: StudentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Students from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Students.
     */
    skip?: number
    distinct?: StudentScalarFieldEnum | StudentScalarFieldEnum[]
  }

  /**
   * Student create
   */
  export type StudentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * The data needed to create a Student.
     */
    data: XOR<StudentCreateInput, StudentUncheckedCreateInput>
  }

  /**
   * Student createMany
   */
  export type StudentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Students.
     */
    data: StudentCreateManyInput | StudentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Student update
   */
  export type StudentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * The data needed to update a Student.
     */
    data: XOR<StudentUpdateInput, StudentUncheckedUpdateInput>
    /**
     * Choose, which Student to update.
     */
    where: StudentWhereUniqueInput
  }

  /**
   * Student updateMany
   */
  export type StudentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Students.
     */
    data: XOR<StudentUpdateManyMutationInput, StudentUncheckedUpdateManyInput>
    /**
     * Filter which Students to update
     */
    where?: StudentWhereInput
  }

  /**
   * Student upsert
   */
  export type StudentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * The filter to search for the Student to update in case it exists.
     */
    where: StudentWhereUniqueInput
    /**
     * In case the Student found by the `where` argument doesn't exist, create a new Student with this data.
     */
    create: XOR<StudentCreateInput, StudentUncheckedCreateInput>
    /**
     * In case the Student was found with the provided `where` argument, update it with this data.
     */
    update: XOR<StudentUpdateInput, StudentUncheckedUpdateInput>
  }

  /**
   * Student delete
   */
  export type StudentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * Filter which Student to delete.
     */
    where: StudentWhereUniqueInput
  }

  /**
   * Student deleteMany
   */
  export type StudentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Students to delete
     */
    where?: StudentWhereInput
  }

  /**
   * Student without action
   */
  export type StudentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
  }


  /**
   * Model SchoolYear
   */

  export type AggregateSchoolYear = {
    _count: SchoolYearCountAggregateOutputType | null
    _min: SchoolYearMinAggregateOutputType | null
    _max: SchoolYearMaxAggregateOutputType | null
  }

  export type SchoolYearMinAggregateOutputType = {
    id: string | null
    year: string | null
    startDate: Date | null
    endDate: Date | null
  }

  export type SchoolYearMaxAggregateOutputType = {
    id: string | null
    year: string | null
    startDate: Date | null
    endDate: Date | null
  }

  export type SchoolYearCountAggregateOutputType = {
    id: number
    year: number
    startDate: number
    endDate: number
    _all: number
  }


  export type SchoolYearMinAggregateInputType = {
    id?: true
    year?: true
    startDate?: true
    endDate?: true
  }

  export type SchoolYearMaxAggregateInputType = {
    id?: true
    year?: true
    startDate?: true
    endDate?: true
  }

  export type SchoolYearCountAggregateInputType = {
    id?: true
    year?: true
    startDate?: true
    endDate?: true
    _all?: true
  }

  export type SchoolYearAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SchoolYear to aggregate.
     */
    where?: SchoolYearWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SchoolYears to fetch.
     */
    orderBy?: SchoolYearOrderByWithRelationInput | SchoolYearOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SchoolYearWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SchoolYears from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SchoolYears.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SchoolYears
    **/
    _count?: true | SchoolYearCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SchoolYearMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SchoolYearMaxAggregateInputType
  }

  export type GetSchoolYearAggregateType<T extends SchoolYearAggregateArgs> = {
        [P in keyof T & keyof AggregateSchoolYear]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSchoolYear[P]>
      : GetScalarType<T[P], AggregateSchoolYear[P]>
  }




  export type SchoolYearGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SchoolYearWhereInput
    orderBy?: SchoolYearOrderByWithAggregationInput | SchoolYearOrderByWithAggregationInput[]
    by: SchoolYearScalarFieldEnum[] | SchoolYearScalarFieldEnum
    having?: SchoolYearScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SchoolYearCountAggregateInputType | true
    _min?: SchoolYearMinAggregateInputType
    _max?: SchoolYearMaxAggregateInputType
  }

  export type SchoolYearGroupByOutputType = {
    id: string
    year: string
    startDate: Date | null
    endDate: Date | null
    _count: SchoolYearCountAggregateOutputType | null
    _min: SchoolYearMinAggregateOutputType | null
    _max: SchoolYearMaxAggregateOutputType | null
  }

  type GetSchoolYearGroupByPayload<T extends SchoolYearGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SchoolYearGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SchoolYearGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SchoolYearGroupByOutputType[P]>
            : GetScalarType<T[P], SchoolYearGroupByOutputType[P]>
        }
      >
    >


  export type SchoolYearSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    year?: boolean
    startDate?: boolean
    endDate?: boolean
    Semester?: boolean | SchoolYear$SemesterArgs<ExtArgs>
    Student?: boolean | SchoolYear$StudentArgs<ExtArgs>
    _count?: boolean | SchoolYearCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["schoolYear"]>


  export type SchoolYearSelectScalar = {
    id?: boolean
    year?: boolean
    startDate?: boolean
    endDate?: boolean
  }

  export type SchoolYearInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Semester?: boolean | SchoolYear$SemesterArgs<ExtArgs>
    Student?: boolean | SchoolYear$StudentArgs<ExtArgs>
    _count?: boolean | SchoolYearCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $SchoolYearPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SchoolYear"
    objects: {
      Semester: Prisma.$SemesterPayload<ExtArgs>[]
      Student: Prisma.$StudentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      year: string
      startDate: Date | null
      endDate: Date | null
    }, ExtArgs["result"]["schoolYear"]>
    composites: {}
  }

  type SchoolYearGetPayload<S extends boolean | null | undefined | SchoolYearDefaultArgs> = $Result.GetResult<Prisma.$SchoolYearPayload, S>

  type SchoolYearCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<SchoolYearFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: SchoolYearCountAggregateInputType | true
    }

  export interface SchoolYearDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SchoolYear'], meta: { name: 'SchoolYear' } }
    /**
     * Find zero or one SchoolYear that matches the filter.
     * @param {SchoolYearFindUniqueArgs} args - Arguments to find a SchoolYear
     * @example
     * // Get one SchoolYear
     * const schoolYear = await prisma.schoolYear.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SchoolYearFindUniqueArgs>(args: SelectSubset<T, SchoolYearFindUniqueArgs<ExtArgs>>): Prisma__SchoolYearClient<$Result.GetResult<Prisma.$SchoolYearPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one SchoolYear that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {SchoolYearFindUniqueOrThrowArgs} args - Arguments to find a SchoolYear
     * @example
     * // Get one SchoolYear
     * const schoolYear = await prisma.schoolYear.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SchoolYearFindUniqueOrThrowArgs>(args: SelectSubset<T, SchoolYearFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SchoolYearClient<$Result.GetResult<Prisma.$SchoolYearPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first SchoolYear that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SchoolYearFindFirstArgs} args - Arguments to find a SchoolYear
     * @example
     * // Get one SchoolYear
     * const schoolYear = await prisma.schoolYear.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SchoolYearFindFirstArgs>(args?: SelectSubset<T, SchoolYearFindFirstArgs<ExtArgs>>): Prisma__SchoolYearClient<$Result.GetResult<Prisma.$SchoolYearPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first SchoolYear that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SchoolYearFindFirstOrThrowArgs} args - Arguments to find a SchoolYear
     * @example
     * // Get one SchoolYear
     * const schoolYear = await prisma.schoolYear.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SchoolYearFindFirstOrThrowArgs>(args?: SelectSubset<T, SchoolYearFindFirstOrThrowArgs<ExtArgs>>): Prisma__SchoolYearClient<$Result.GetResult<Prisma.$SchoolYearPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more SchoolYears that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SchoolYearFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SchoolYears
     * const schoolYears = await prisma.schoolYear.findMany()
     * 
     * // Get first 10 SchoolYears
     * const schoolYears = await prisma.schoolYear.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const schoolYearWithIdOnly = await prisma.schoolYear.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SchoolYearFindManyArgs>(args?: SelectSubset<T, SchoolYearFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SchoolYearPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a SchoolYear.
     * @param {SchoolYearCreateArgs} args - Arguments to create a SchoolYear.
     * @example
     * // Create one SchoolYear
     * const SchoolYear = await prisma.schoolYear.create({
     *   data: {
     *     // ... data to create a SchoolYear
     *   }
     * })
     * 
     */
    create<T extends SchoolYearCreateArgs>(args: SelectSubset<T, SchoolYearCreateArgs<ExtArgs>>): Prisma__SchoolYearClient<$Result.GetResult<Prisma.$SchoolYearPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many SchoolYears.
     * @param {SchoolYearCreateManyArgs} args - Arguments to create many SchoolYears.
     * @example
     * // Create many SchoolYears
     * const schoolYear = await prisma.schoolYear.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SchoolYearCreateManyArgs>(args?: SelectSubset<T, SchoolYearCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a SchoolYear.
     * @param {SchoolYearDeleteArgs} args - Arguments to delete one SchoolYear.
     * @example
     * // Delete one SchoolYear
     * const SchoolYear = await prisma.schoolYear.delete({
     *   where: {
     *     // ... filter to delete one SchoolYear
     *   }
     * })
     * 
     */
    delete<T extends SchoolYearDeleteArgs>(args: SelectSubset<T, SchoolYearDeleteArgs<ExtArgs>>): Prisma__SchoolYearClient<$Result.GetResult<Prisma.$SchoolYearPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one SchoolYear.
     * @param {SchoolYearUpdateArgs} args - Arguments to update one SchoolYear.
     * @example
     * // Update one SchoolYear
     * const schoolYear = await prisma.schoolYear.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SchoolYearUpdateArgs>(args: SelectSubset<T, SchoolYearUpdateArgs<ExtArgs>>): Prisma__SchoolYearClient<$Result.GetResult<Prisma.$SchoolYearPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more SchoolYears.
     * @param {SchoolYearDeleteManyArgs} args - Arguments to filter SchoolYears to delete.
     * @example
     * // Delete a few SchoolYears
     * const { count } = await prisma.schoolYear.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SchoolYearDeleteManyArgs>(args?: SelectSubset<T, SchoolYearDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SchoolYears.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SchoolYearUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SchoolYears
     * const schoolYear = await prisma.schoolYear.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SchoolYearUpdateManyArgs>(args: SelectSubset<T, SchoolYearUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one SchoolYear.
     * @param {SchoolYearUpsertArgs} args - Arguments to update or create a SchoolYear.
     * @example
     * // Update or create a SchoolYear
     * const schoolYear = await prisma.schoolYear.upsert({
     *   create: {
     *     // ... data to create a SchoolYear
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SchoolYear we want to update
     *   }
     * })
     */
    upsert<T extends SchoolYearUpsertArgs>(args: SelectSubset<T, SchoolYearUpsertArgs<ExtArgs>>): Prisma__SchoolYearClient<$Result.GetResult<Prisma.$SchoolYearPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of SchoolYears.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SchoolYearCountArgs} args - Arguments to filter SchoolYears to count.
     * @example
     * // Count the number of SchoolYears
     * const count = await prisma.schoolYear.count({
     *   where: {
     *     // ... the filter for the SchoolYears we want to count
     *   }
     * })
    **/
    count<T extends SchoolYearCountArgs>(
      args?: Subset<T, SchoolYearCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SchoolYearCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SchoolYear.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SchoolYearAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends SchoolYearAggregateArgs>(args: Subset<T, SchoolYearAggregateArgs>): Prisma.PrismaPromise<GetSchoolYearAggregateType<T>>

    /**
     * Group by SchoolYear.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SchoolYearGroupByArgs} args - Group by arguments.
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
      T extends SchoolYearGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SchoolYearGroupByArgs['orderBy'] }
        : { orderBy?: SchoolYearGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, SchoolYearGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSchoolYearGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SchoolYear model
   */
  readonly fields: SchoolYearFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SchoolYear.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SchoolYearClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    Semester<T extends SchoolYear$SemesterArgs<ExtArgs> = {}>(args?: Subset<T, SchoolYear$SemesterArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SemesterPayload<ExtArgs>, T, "findMany"> | Null>
    Student<T extends SchoolYear$StudentArgs<ExtArgs> = {}>(args?: Subset<T, SchoolYear$StudentArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findMany"> | Null>
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
   * Fields of the SchoolYear model
   */ 
  interface SchoolYearFieldRefs {
    readonly id: FieldRef<"SchoolYear", 'String'>
    readonly year: FieldRef<"SchoolYear", 'String'>
    readonly startDate: FieldRef<"SchoolYear", 'DateTime'>
    readonly endDate: FieldRef<"SchoolYear", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SchoolYear findUnique
   */
  export type SchoolYearFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SchoolYear
     */
    select?: SchoolYearSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SchoolYearInclude<ExtArgs> | null
    /**
     * Filter, which SchoolYear to fetch.
     */
    where: SchoolYearWhereUniqueInput
  }

  /**
   * SchoolYear findUniqueOrThrow
   */
  export type SchoolYearFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SchoolYear
     */
    select?: SchoolYearSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SchoolYearInclude<ExtArgs> | null
    /**
     * Filter, which SchoolYear to fetch.
     */
    where: SchoolYearWhereUniqueInput
  }

  /**
   * SchoolYear findFirst
   */
  export type SchoolYearFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SchoolYear
     */
    select?: SchoolYearSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SchoolYearInclude<ExtArgs> | null
    /**
     * Filter, which SchoolYear to fetch.
     */
    where?: SchoolYearWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SchoolYears to fetch.
     */
    orderBy?: SchoolYearOrderByWithRelationInput | SchoolYearOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SchoolYears.
     */
    cursor?: SchoolYearWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SchoolYears from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SchoolYears.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SchoolYears.
     */
    distinct?: SchoolYearScalarFieldEnum | SchoolYearScalarFieldEnum[]
  }

  /**
   * SchoolYear findFirstOrThrow
   */
  export type SchoolYearFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SchoolYear
     */
    select?: SchoolYearSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SchoolYearInclude<ExtArgs> | null
    /**
     * Filter, which SchoolYear to fetch.
     */
    where?: SchoolYearWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SchoolYears to fetch.
     */
    orderBy?: SchoolYearOrderByWithRelationInput | SchoolYearOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SchoolYears.
     */
    cursor?: SchoolYearWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SchoolYears from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SchoolYears.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SchoolYears.
     */
    distinct?: SchoolYearScalarFieldEnum | SchoolYearScalarFieldEnum[]
  }

  /**
   * SchoolYear findMany
   */
  export type SchoolYearFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SchoolYear
     */
    select?: SchoolYearSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SchoolYearInclude<ExtArgs> | null
    /**
     * Filter, which SchoolYears to fetch.
     */
    where?: SchoolYearWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SchoolYears to fetch.
     */
    orderBy?: SchoolYearOrderByWithRelationInput | SchoolYearOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SchoolYears.
     */
    cursor?: SchoolYearWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SchoolYears from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SchoolYears.
     */
    skip?: number
    distinct?: SchoolYearScalarFieldEnum | SchoolYearScalarFieldEnum[]
  }

  /**
   * SchoolYear create
   */
  export type SchoolYearCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SchoolYear
     */
    select?: SchoolYearSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SchoolYearInclude<ExtArgs> | null
    /**
     * The data needed to create a SchoolYear.
     */
    data: XOR<SchoolYearCreateInput, SchoolYearUncheckedCreateInput>
  }

  /**
   * SchoolYear createMany
   */
  export type SchoolYearCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SchoolYears.
     */
    data: SchoolYearCreateManyInput | SchoolYearCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SchoolYear update
   */
  export type SchoolYearUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SchoolYear
     */
    select?: SchoolYearSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SchoolYearInclude<ExtArgs> | null
    /**
     * The data needed to update a SchoolYear.
     */
    data: XOR<SchoolYearUpdateInput, SchoolYearUncheckedUpdateInput>
    /**
     * Choose, which SchoolYear to update.
     */
    where: SchoolYearWhereUniqueInput
  }

  /**
   * SchoolYear updateMany
   */
  export type SchoolYearUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SchoolYears.
     */
    data: XOR<SchoolYearUpdateManyMutationInput, SchoolYearUncheckedUpdateManyInput>
    /**
     * Filter which SchoolYears to update
     */
    where?: SchoolYearWhereInput
  }

  /**
   * SchoolYear upsert
   */
  export type SchoolYearUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SchoolYear
     */
    select?: SchoolYearSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SchoolYearInclude<ExtArgs> | null
    /**
     * The filter to search for the SchoolYear to update in case it exists.
     */
    where: SchoolYearWhereUniqueInput
    /**
     * In case the SchoolYear found by the `where` argument doesn't exist, create a new SchoolYear with this data.
     */
    create: XOR<SchoolYearCreateInput, SchoolYearUncheckedCreateInput>
    /**
     * In case the SchoolYear was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SchoolYearUpdateInput, SchoolYearUncheckedUpdateInput>
  }

  /**
   * SchoolYear delete
   */
  export type SchoolYearDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SchoolYear
     */
    select?: SchoolYearSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SchoolYearInclude<ExtArgs> | null
    /**
     * Filter which SchoolYear to delete.
     */
    where: SchoolYearWhereUniqueInput
  }

  /**
   * SchoolYear deleteMany
   */
  export type SchoolYearDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SchoolYears to delete
     */
    where?: SchoolYearWhereInput
  }

  /**
   * SchoolYear.Semester
   */
  export type SchoolYear$SemesterArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Semester
     */
    select?: SemesterSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SemesterInclude<ExtArgs> | null
    where?: SemesterWhereInput
    orderBy?: SemesterOrderByWithRelationInput | SemesterOrderByWithRelationInput[]
    cursor?: SemesterWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SemesterScalarFieldEnum | SemesterScalarFieldEnum[]
  }

  /**
   * SchoolYear.Student
   */
  export type SchoolYear$StudentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    where?: StudentWhereInput
    orderBy?: StudentOrderByWithRelationInput | StudentOrderByWithRelationInput[]
    cursor?: StudentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: StudentScalarFieldEnum | StudentScalarFieldEnum[]
  }

  /**
   * SchoolYear without action
   */
  export type SchoolYearDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SchoolYear
     */
    select?: SchoolYearSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SchoolYearInclude<ExtArgs> | null
  }


  /**
   * Model Semester
   */

  export type AggregateSemester = {
    _count: SemesterCountAggregateOutputType | null
    _min: SemesterMinAggregateOutputType | null
    _max: SemesterMaxAggregateOutputType | null
  }

  export type SemesterMinAggregateOutputType = {
    id: string | null
    semester: string | null
    startDate: Date | null
    endDate: Date | null
    schoolYearId: string | null
  }

  export type SemesterMaxAggregateOutputType = {
    id: string | null
    semester: string | null
    startDate: Date | null
    endDate: Date | null
    schoolYearId: string | null
  }

  export type SemesterCountAggregateOutputType = {
    id: number
    semester: number
    startDate: number
    endDate: number
    schoolYearId: number
    _all: number
  }


  export type SemesterMinAggregateInputType = {
    id?: true
    semester?: true
    startDate?: true
    endDate?: true
    schoolYearId?: true
  }

  export type SemesterMaxAggregateInputType = {
    id?: true
    semester?: true
    startDate?: true
    endDate?: true
    schoolYearId?: true
  }

  export type SemesterCountAggregateInputType = {
    id?: true
    semester?: true
    startDate?: true
    endDate?: true
    schoolYearId?: true
    _all?: true
  }

  export type SemesterAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Semester to aggregate.
     */
    where?: SemesterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Semesters to fetch.
     */
    orderBy?: SemesterOrderByWithRelationInput | SemesterOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SemesterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Semesters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Semesters.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Semesters
    **/
    _count?: true | SemesterCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SemesterMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SemesterMaxAggregateInputType
  }

  export type GetSemesterAggregateType<T extends SemesterAggregateArgs> = {
        [P in keyof T & keyof AggregateSemester]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSemester[P]>
      : GetScalarType<T[P], AggregateSemester[P]>
  }




  export type SemesterGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SemesterWhereInput
    orderBy?: SemesterOrderByWithAggregationInput | SemesterOrderByWithAggregationInput[]
    by: SemesterScalarFieldEnum[] | SemesterScalarFieldEnum
    having?: SemesterScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SemesterCountAggregateInputType | true
    _min?: SemesterMinAggregateInputType
    _max?: SemesterMaxAggregateInputType
  }

  export type SemesterGroupByOutputType = {
    id: string
    semester: string
    startDate: Date | null
    endDate: Date | null
    schoolYearId: string
    _count: SemesterCountAggregateOutputType | null
    _min: SemesterMinAggregateOutputType | null
    _max: SemesterMaxAggregateOutputType | null
  }

  type GetSemesterGroupByPayload<T extends SemesterGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SemesterGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SemesterGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SemesterGroupByOutputType[P]>
            : GetScalarType<T[P], SemesterGroupByOutputType[P]>
        }
      >
    >


  export type SemesterSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    semester?: boolean
    startDate?: boolean
    endDate?: boolean
    schoolYearId?: boolean
    schoolYear?: boolean | SchoolYearDefaultArgs<ExtArgs>
    Student?: boolean | Semester$StudentArgs<ExtArgs>
    _count?: boolean | SemesterCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["semester"]>


  export type SemesterSelectScalar = {
    id?: boolean
    semester?: boolean
    startDate?: boolean
    endDate?: boolean
    schoolYearId?: boolean
  }

  export type SemesterInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    schoolYear?: boolean | SchoolYearDefaultArgs<ExtArgs>
    Student?: boolean | Semester$StudentArgs<ExtArgs>
    _count?: boolean | SemesterCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $SemesterPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Semester"
    objects: {
      schoolYear: Prisma.$SchoolYearPayload<ExtArgs>
      Student: Prisma.$StudentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      semester: string
      startDate: Date | null
      endDate: Date | null
      schoolYearId: string
    }, ExtArgs["result"]["semester"]>
    composites: {}
  }

  type SemesterGetPayload<S extends boolean | null | undefined | SemesterDefaultArgs> = $Result.GetResult<Prisma.$SemesterPayload, S>

  type SemesterCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<SemesterFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: SemesterCountAggregateInputType | true
    }

  export interface SemesterDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Semester'], meta: { name: 'Semester' } }
    /**
     * Find zero or one Semester that matches the filter.
     * @param {SemesterFindUniqueArgs} args - Arguments to find a Semester
     * @example
     * // Get one Semester
     * const semester = await prisma.semester.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SemesterFindUniqueArgs>(args: SelectSubset<T, SemesterFindUniqueArgs<ExtArgs>>): Prisma__SemesterClient<$Result.GetResult<Prisma.$SemesterPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Semester that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {SemesterFindUniqueOrThrowArgs} args - Arguments to find a Semester
     * @example
     * // Get one Semester
     * const semester = await prisma.semester.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SemesterFindUniqueOrThrowArgs>(args: SelectSubset<T, SemesterFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SemesterClient<$Result.GetResult<Prisma.$SemesterPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Semester that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SemesterFindFirstArgs} args - Arguments to find a Semester
     * @example
     * // Get one Semester
     * const semester = await prisma.semester.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SemesterFindFirstArgs>(args?: SelectSubset<T, SemesterFindFirstArgs<ExtArgs>>): Prisma__SemesterClient<$Result.GetResult<Prisma.$SemesterPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Semester that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SemesterFindFirstOrThrowArgs} args - Arguments to find a Semester
     * @example
     * // Get one Semester
     * const semester = await prisma.semester.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SemesterFindFirstOrThrowArgs>(args?: SelectSubset<T, SemesterFindFirstOrThrowArgs<ExtArgs>>): Prisma__SemesterClient<$Result.GetResult<Prisma.$SemesterPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Semesters that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SemesterFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Semesters
     * const semesters = await prisma.semester.findMany()
     * 
     * // Get first 10 Semesters
     * const semesters = await prisma.semester.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const semesterWithIdOnly = await prisma.semester.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SemesterFindManyArgs>(args?: SelectSubset<T, SemesterFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SemesterPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Semester.
     * @param {SemesterCreateArgs} args - Arguments to create a Semester.
     * @example
     * // Create one Semester
     * const Semester = await prisma.semester.create({
     *   data: {
     *     // ... data to create a Semester
     *   }
     * })
     * 
     */
    create<T extends SemesterCreateArgs>(args: SelectSubset<T, SemesterCreateArgs<ExtArgs>>): Prisma__SemesterClient<$Result.GetResult<Prisma.$SemesterPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Semesters.
     * @param {SemesterCreateManyArgs} args - Arguments to create many Semesters.
     * @example
     * // Create many Semesters
     * const semester = await prisma.semester.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SemesterCreateManyArgs>(args?: SelectSubset<T, SemesterCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Semester.
     * @param {SemesterDeleteArgs} args - Arguments to delete one Semester.
     * @example
     * // Delete one Semester
     * const Semester = await prisma.semester.delete({
     *   where: {
     *     // ... filter to delete one Semester
     *   }
     * })
     * 
     */
    delete<T extends SemesterDeleteArgs>(args: SelectSubset<T, SemesterDeleteArgs<ExtArgs>>): Prisma__SemesterClient<$Result.GetResult<Prisma.$SemesterPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Semester.
     * @param {SemesterUpdateArgs} args - Arguments to update one Semester.
     * @example
     * // Update one Semester
     * const semester = await prisma.semester.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SemesterUpdateArgs>(args: SelectSubset<T, SemesterUpdateArgs<ExtArgs>>): Prisma__SemesterClient<$Result.GetResult<Prisma.$SemesterPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Semesters.
     * @param {SemesterDeleteManyArgs} args - Arguments to filter Semesters to delete.
     * @example
     * // Delete a few Semesters
     * const { count } = await prisma.semester.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SemesterDeleteManyArgs>(args?: SelectSubset<T, SemesterDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Semesters.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SemesterUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Semesters
     * const semester = await prisma.semester.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SemesterUpdateManyArgs>(args: SelectSubset<T, SemesterUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Semester.
     * @param {SemesterUpsertArgs} args - Arguments to update or create a Semester.
     * @example
     * // Update or create a Semester
     * const semester = await prisma.semester.upsert({
     *   create: {
     *     // ... data to create a Semester
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Semester we want to update
     *   }
     * })
     */
    upsert<T extends SemesterUpsertArgs>(args: SelectSubset<T, SemesterUpsertArgs<ExtArgs>>): Prisma__SemesterClient<$Result.GetResult<Prisma.$SemesterPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Semesters.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SemesterCountArgs} args - Arguments to filter Semesters to count.
     * @example
     * // Count the number of Semesters
     * const count = await prisma.semester.count({
     *   where: {
     *     // ... the filter for the Semesters we want to count
     *   }
     * })
    **/
    count<T extends SemesterCountArgs>(
      args?: Subset<T, SemesterCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SemesterCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Semester.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SemesterAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends SemesterAggregateArgs>(args: Subset<T, SemesterAggregateArgs>): Prisma.PrismaPromise<GetSemesterAggregateType<T>>

    /**
     * Group by Semester.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SemesterGroupByArgs} args - Group by arguments.
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
      T extends SemesterGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SemesterGroupByArgs['orderBy'] }
        : { orderBy?: SemesterGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, SemesterGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSemesterGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Semester model
   */
  readonly fields: SemesterFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Semester.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SemesterClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    schoolYear<T extends SchoolYearDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SchoolYearDefaultArgs<ExtArgs>>): Prisma__SchoolYearClient<$Result.GetResult<Prisma.$SchoolYearPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    Student<T extends Semester$StudentArgs<ExtArgs> = {}>(args?: Subset<T, Semester$StudentArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findMany"> | Null>
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
   * Fields of the Semester model
   */ 
  interface SemesterFieldRefs {
    readonly id: FieldRef<"Semester", 'String'>
    readonly semester: FieldRef<"Semester", 'String'>
    readonly startDate: FieldRef<"Semester", 'DateTime'>
    readonly endDate: FieldRef<"Semester", 'DateTime'>
    readonly schoolYearId: FieldRef<"Semester", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Semester findUnique
   */
  export type SemesterFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Semester
     */
    select?: SemesterSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SemesterInclude<ExtArgs> | null
    /**
     * Filter, which Semester to fetch.
     */
    where: SemesterWhereUniqueInput
  }

  /**
   * Semester findUniqueOrThrow
   */
  export type SemesterFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Semester
     */
    select?: SemesterSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SemesterInclude<ExtArgs> | null
    /**
     * Filter, which Semester to fetch.
     */
    where: SemesterWhereUniqueInput
  }

  /**
   * Semester findFirst
   */
  export type SemesterFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Semester
     */
    select?: SemesterSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SemesterInclude<ExtArgs> | null
    /**
     * Filter, which Semester to fetch.
     */
    where?: SemesterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Semesters to fetch.
     */
    orderBy?: SemesterOrderByWithRelationInput | SemesterOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Semesters.
     */
    cursor?: SemesterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Semesters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Semesters.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Semesters.
     */
    distinct?: SemesterScalarFieldEnum | SemesterScalarFieldEnum[]
  }

  /**
   * Semester findFirstOrThrow
   */
  export type SemesterFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Semester
     */
    select?: SemesterSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SemesterInclude<ExtArgs> | null
    /**
     * Filter, which Semester to fetch.
     */
    where?: SemesterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Semesters to fetch.
     */
    orderBy?: SemesterOrderByWithRelationInput | SemesterOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Semesters.
     */
    cursor?: SemesterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Semesters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Semesters.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Semesters.
     */
    distinct?: SemesterScalarFieldEnum | SemesterScalarFieldEnum[]
  }

  /**
   * Semester findMany
   */
  export type SemesterFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Semester
     */
    select?: SemesterSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SemesterInclude<ExtArgs> | null
    /**
     * Filter, which Semesters to fetch.
     */
    where?: SemesterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Semesters to fetch.
     */
    orderBy?: SemesterOrderByWithRelationInput | SemesterOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Semesters.
     */
    cursor?: SemesterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Semesters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Semesters.
     */
    skip?: number
    distinct?: SemesterScalarFieldEnum | SemesterScalarFieldEnum[]
  }

  /**
   * Semester create
   */
  export type SemesterCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Semester
     */
    select?: SemesterSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SemesterInclude<ExtArgs> | null
    /**
     * The data needed to create a Semester.
     */
    data: XOR<SemesterCreateInput, SemesterUncheckedCreateInput>
  }

  /**
   * Semester createMany
   */
  export type SemesterCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Semesters.
     */
    data: SemesterCreateManyInput | SemesterCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Semester update
   */
  export type SemesterUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Semester
     */
    select?: SemesterSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SemesterInclude<ExtArgs> | null
    /**
     * The data needed to update a Semester.
     */
    data: XOR<SemesterUpdateInput, SemesterUncheckedUpdateInput>
    /**
     * Choose, which Semester to update.
     */
    where: SemesterWhereUniqueInput
  }

  /**
   * Semester updateMany
   */
  export type SemesterUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Semesters.
     */
    data: XOR<SemesterUpdateManyMutationInput, SemesterUncheckedUpdateManyInput>
    /**
     * Filter which Semesters to update
     */
    where?: SemesterWhereInput
  }

  /**
   * Semester upsert
   */
  export type SemesterUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Semester
     */
    select?: SemesterSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SemesterInclude<ExtArgs> | null
    /**
     * The filter to search for the Semester to update in case it exists.
     */
    where: SemesterWhereUniqueInput
    /**
     * In case the Semester found by the `where` argument doesn't exist, create a new Semester with this data.
     */
    create: XOR<SemesterCreateInput, SemesterUncheckedCreateInput>
    /**
     * In case the Semester was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SemesterUpdateInput, SemesterUncheckedUpdateInput>
  }

  /**
   * Semester delete
   */
  export type SemesterDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Semester
     */
    select?: SemesterSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SemesterInclude<ExtArgs> | null
    /**
     * Filter which Semester to delete.
     */
    where: SemesterWhereUniqueInput
  }

  /**
   * Semester deleteMany
   */
  export type SemesterDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Semesters to delete
     */
    where?: SemesterWhereInput
  }

  /**
   * Semester.Student
   */
  export type Semester$StudentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    where?: StudentWhereInput
    orderBy?: StudentOrderByWithRelationInput | StudentOrderByWithRelationInput[]
    cursor?: StudentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: StudentScalarFieldEnum | StudentScalarFieldEnum[]
  }

  /**
   * Semester without action
   */
  export type SemesterDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Semester
     */
    select?: SemesterSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SemesterInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const StudentScalarFieldEnum: {
    id: 'id',
    studentId: 'studentId',
    firstName: 'firstName',
    middleName: 'middleName',
    lastName: 'lastName',
    email: 'email',
    phone: 'phone',
    address: 'address',
    dateOfBirth: 'dateOfBirth',
    gender: 'gender',
    enrollmentYearId: 'enrollmentYearId',
    enrollmentSemesterId: 'enrollmentSemesterId',
    status: 'status',
    program: 'program'
  };

  export type StudentScalarFieldEnum = (typeof StudentScalarFieldEnum)[keyof typeof StudentScalarFieldEnum]


  export const SchoolYearScalarFieldEnum: {
    id: 'id',
    year: 'year',
    startDate: 'startDate',
    endDate: 'endDate'
  };

  export type SchoolYearScalarFieldEnum = (typeof SchoolYearScalarFieldEnum)[keyof typeof SchoolYearScalarFieldEnum]


  export const SemesterScalarFieldEnum: {
    id: 'id',
    semester: 'semester',
    startDate: 'startDate',
    endDate: 'endDate',
    schoolYearId: 'schoolYearId'
  };

  export type SemesterScalarFieldEnum = (typeof SemesterScalarFieldEnum)[keyof typeof SemesterScalarFieldEnum]


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
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Gender'
   */
  export type EnumGenderFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Gender'>
    


  /**
   * Reference to a field of type 'StudentStatus'
   */
  export type EnumStudentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'StudentStatus'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    
  /**
   * Deep Input Types
   */


  export type StudentWhereInput = {
    AND?: StudentWhereInput | StudentWhereInput[]
    OR?: StudentWhereInput[]
    NOT?: StudentWhereInput | StudentWhereInput[]
    id?: StringFilter<"Student"> | string
    studentId?: StringFilter<"Student"> | string
    firstName?: StringFilter<"Student"> | string
    middleName?: StringNullableFilter<"Student"> | string | null
    lastName?: StringFilter<"Student"> | string
    email?: StringFilter<"Student"> | string
    phone?: StringFilter<"Student"> | string
    address?: StringNullableFilter<"Student"> | string | null
    dateOfBirth?: DateTimeNullableFilter<"Student"> | Date | string | null
    gender?: EnumGenderFilter<"Student"> | $Enums.Gender
    enrollmentYearId?: StringFilter<"Student"> | string
    enrollmentSemesterId?: StringFilter<"Student"> | string
    status?: EnumStudentStatusFilter<"Student"> | $Enums.StudentStatus
    program?: StringFilter<"Student"> | string
    enrollmentYear?: XOR<SchoolYearRelationFilter, SchoolYearWhereInput>
    enrollmentSemester?: XOR<SemesterRelationFilter, SemesterWhereInput>
  }

  export type StudentOrderByWithRelationInput = {
    id?: SortOrder
    studentId?: SortOrder
    firstName?: SortOrder
    middleName?: SortOrderInput | SortOrder
    lastName?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    address?: SortOrderInput | SortOrder
    dateOfBirth?: SortOrderInput | SortOrder
    gender?: SortOrder
    enrollmentYearId?: SortOrder
    enrollmentSemesterId?: SortOrder
    status?: SortOrder
    program?: SortOrder
    enrollmentYear?: SchoolYearOrderByWithRelationInput
    enrollmentSemester?: SemesterOrderByWithRelationInput
  }

  export type StudentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    studentId?: string
    AND?: StudentWhereInput | StudentWhereInput[]
    OR?: StudentWhereInput[]
    NOT?: StudentWhereInput | StudentWhereInput[]
    firstName?: StringFilter<"Student"> | string
    middleName?: StringNullableFilter<"Student"> | string | null
    lastName?: StringFilter<"Student"> | string
    email?: StringFilter<"Student"> | string
    phone?: StringFilter<"Student"> | string
    address?: StringNullableFilter<"Student"> | string | null
    dateOfBirth?: DateTimeNullableFilter<"Student"> | Date | string | null
    gender?: EnumGenderFilter<"Student"> | $Enums.Gender
    enrollmentYearId?: StringFilter<"Student"> | string
    enrollmentSemesterId?: StringFilter<"Student"> | string
    status?: EnumStudentStatusFilter<"Student"> | $Enums.StudentStatus
    program?: StringFilter<"Student"> | string
    enrollmentYear?: XOR<SchoolYearRelationFilter, SchoolYearWhereInput>
    enrollmentSemester?: XOR<SemesterRelationFilter, SemesterWhereInput>
  }, "id" | "studentId">

  export type StudentOrderByWithAggregationInput = {
    id?: SortOrder
    studentId?: SortOrder
    firstName?: SortOrder
    middleName?: SortOrderInput | SortOrder
    lastName?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    address?: SortOrderInput | SortOrder
    dateOfBirth?: SortOrderInput | SortOrder
    gender?: SortOrder
    enrollmentYearId?: SortOrder
    enrollmentSemesterId?: SortOrder
    status?: SortOrder
    program?: SortOrder
    _count?: StudentCountOrderByAggregateInput
    _max?: StudentMaxOrderByAggregateInput
    _min?: StudentMinOrderByAggregateInput
  }

  export type StudentScalarWhereWithAggregatesInput = {
    AND?: StudentScalarWhereWithAggregatesInput | StudentScalarWhereWithAggregatesInput[]
    OR?: StudentScalarWhereWithAggregatesInput[]
    NOT?: StudentScalarWhereWithAggregatesInput | StudentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Student"> | string
    studentId?: StringWithAggregatesFilter<"Student"> | string
    firstName?: StringWithAggregatesFilter<"Student"> | string
    middleName?: StringNullableWithAggregatesFilter<"Student"> | string | null
    lastName?: StringWithAggregatesFilter<"Student"> | string
    email?: StringWithAggregatesFilter<"Student"> | string
    phone?: StringWithAggregatesFilter<"Student"> | string
    address?: StringNullableWithAggregatesFilter<"Student"> | string | null
    dateOfBirth?: DateTimeNullableWithAggregatesFilter<"Student"> | Date | string | null
    gender?: EnumGenderWithAggregatesFilter<"Student"> | $Enums.Gender
    enrollmentYearId?: StringWithAggregatesFilter<"Student"> | string
    enrollmentSemesterId?: StringWithAggregatesFilter<"Student"> | string
    status?: EnumStudentStatusWithAggregatesFilter<"Student"> | $Enums.StudentStatus
    program?: StringWithAggregatesFilter<"Student"> | string
  }

  export type SchoolYearWhereInput = {
    AND?: SchoolYearWhereInput | SchoolYearWhereInput[]
    OR?: SchoolYearWhereInput[]
    NOT?: SchoolYearWhereInput | SchoolYearWhereInput[]
    id?: StringFilter<"SchoolYear"> | string
    year?: StringFilter<"SchoolYear"> | string
    startDate?: DateTimeNullableFilter<"SchoolYear"> | Date | string | null
    endDate?: DateTimeNullableFilter<"SchoolYear"> | Date | string | null
    Semester?: SemesterListRelationFilter
    Student?: StudentListRelationFilter
  }

  export type SchoolYearOrderByWithRelationInput = {
    id?: SortOrder
    year?: SortOrder
    startDate?: SortOrderInput | SortOrder
    endDate?: SortOrderInput | SortOrder
    Semester?: SemesterOrderByRelationAggregateInput
    Student?: StudentOrderByRelationAggregateInput
  }

  export type SchoolYearWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SchoolYearWhereInput | SchoolYearWhereInput[]
    OR?: SchoolYearWhereInput[]
    NOT?: SchoolYearWhereInput | SchoolYearWhereInput[]
    year?: StringFilter<"SchoolYear"> | string
    startDate?: DateTimeNullableFilter<"SchoolYear"> | Date | string | null
    endDate?: DateTimeNullableFilter<"SchoolYear"> | Date | string | null
    Semester?: SemesterListRelationFilter
    Student?: StudentListRelationFilter
  }, "id">

  export type SchoolYearOrderByWithAggregationInput = {
    id?: SortOrder
    year?: SortOrder
    startDate?: SortOrderInput | SortOrder
    endDate?: SortOrderInput | SortOrder
    _count?: SchoolYearCountOrderByAggregateInput
    _max?: SchoolYearMaxOrderByAggregateInput
    _min?: SchoolYearMinOrderByAggregateInput
  }

  export type SchoolYearScalarWhereWithAggregatesInput = {
    AND?: SchoolYearScalarWhereWithAggregatesInput | SchoolYearScalarWhereWithAggregatesInput[]
    OR?: SchoolYearScalarWhereWithAggregatesInput[]
    NOT?: SchoolYearScalarWhereWithAggregatesInput | SchoolYearScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"SchoolYear"> | string
    year?: StringWithAggregatesFilter<"SchoolYear"> | string
    startDate?: DateTimeNullableWithAggregatesFilter<"SchoolYear"> | Date | string | null
    endDate?: DateTimeNullableWithAggregatesFilter<"SchoolYear"> | Date | string | null
  }

  export type SemesterWhereInput = {
    AND?: SemesterWhereInput | SemesterWhereInput[]
    OR?: SemesterWhereInput[]
    NOT?: SemesterWhereInput | SemesterWhereInput[]
    id?: StringFilter<"Semester"> | string
    semester?: StringFilter<"Semester"> | string
    startDate?: DateTimeNullableFilter<"Semester"> | Date | string | null
    endDate?: DateTimeNullableFilter<"Semester"> | Date | string | null
    schoolYearId?: StringFilter<"Semester"> | string
    schoolYear?: XOR<SchoolYearRelationFilter, SchoolYearWhereInput>
    Student?: StudentListRelationFilter
  }

  export type SemesterOrderByWithRelationInput = {
    id?: SortOrder
    semester?: SortOrder
    startDate?: SortOrderInput | SortOrder
    endDate?: SortOrderInput | SortOrder
    schoolYearId?: SortOrder
    schoolYear?: SchoolYearOrderByWithRelationInput
    Student?: StudentOrderByRelationAggregateInput
  }

  export type SemesterWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SemesterWhereInput | SemesterWhereInput[]
    OR?: SemesterWhereInput[]
    NOT?: SemesterWhereInput | SemesterWhereInput[]
    semester?: StringFilter<"Semester"> | string
    startDate?: DateTimeNullableFilter<"Semester"> | Date | string | null
    endDate?: DateTimeNullableFilter<"Semester"> | Date | string | null
    schoolYearId?: StringFilter<"Semester"> | string
    schoolYear?: XOR<SchoolYearRelationFilter, SchoolYearWhereInput>
    Student?: StudentListRelationFilter
  }, "id">

  export type SemesterOrderByWithAggregationInput = {
    id?: SortOrder
    semester?: SortOrder
    startDate?: SortOrderInput | SortOrder
    endDate?: SortOrderInput | SortOrder
    schoolYearId?: SortOrder
    _count?: SemesterCountOrderByAggregateInput
    _max?: SemesterMaxOrderByAggregateInput
    _min?: SemesterMinOrderByAggregateInput
  }

  export type SemesterScalarWhereWithAggregatesInput = {
    AND?: SemesterScalarWhereWithAggregatesInput | SemesterScalarWhereWithAggregatesInput[]
    OR?: SemesterScalarWhereWithAggregatesInput[]
    NOT?: SemesterScalarWhereWithAggregatesInput | SemesterScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Semester"> | string
    semester?: StringWithAggregatesFilter<"Semester"> | string
    startDate?: DateTimeNullableWithAggregatesFilter<"Semester"> | Date | string | null
    endDate?: DateTimeNullableWithAggregatesFilter<"Semester"> | Date | string | null
    schoolYearId?: StringWithAggregatesFilter<"Semester"> | string
  }

  export type StudentCreateInput = {
    id?: string
    studentId: string
    firstName: string
    middleName?: string | null
    lastName: string
    email: string
    phone: string
    address?: string | null
    dateOfBirth?: Date | string | null
    gender: $Enums.Gender
    status: $Enums.StudentStatus
    program: string
    enrollmentYear: SchoolYearCreateNestedOneWithoutStudentInput
    enrollmentSemester: SemesterCreateNestedOneWithoutStudentInput
  }

  export type StudentUncheckedCreateInput = {
    id?: string
    studentId: string
    firstName: string
    middleName?: string | null
    lastName: string
    email: string
    phone: string
    address?: string | null
    dateOfBirth?: Date | string | null
    gender: $Enums.Gender
    enrollmentYearId: string
    enrollmentSemesterId: string
    status: $Enums.StudentStatus
    program: string
  }

  export type StudentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    middleName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    status?: EnumStudentStatusFieldUpdateOperationsInput | $Enums.StudentStatus
    program?: StringFieldUpdateOperationsInput | string
    enrollmentYear?: SchoolYearUpdateOneRequiredWithoutStudentNestedInput
    enrollmentSemester?: SemesterUpdateOneRequiredWithoutStudentNestedInput
  }

  export type StudentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    middleName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    enrollmentYearId?: StringFieldUpdateOperationsInput | string
    enrollmentSemesterId?: StringFieldUpdateOperationsInput | string
    status?: EnumStudentStatusFieldUpdateOperationsInput | $Enums.StudentStatus
    program?: StringFieldUpdateOperationsInput | string
  }

  export type StudentCreateManyInput = {
    id?: string
    studentId: string
    firstName: string
    middleName?: string | null
    lastName: string
    email: string
    phone: string
    address?: string | null
    dateOfBirth?: Date | string | null
    gender: $Enums.Gender
    enrollmentYearId: string
    enrollmentSemesterId: string
    status: $Enums.StudentStatus
    program: string
  }

  export type StudentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    middleName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    status?: EnumStudentStatusFieldUpdateOperationsInput | $Enums.StudentStatus
    program?: StringFieldUpdateOperationsInput | string
  }

  export type StudentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    middleName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    enrollmentYearId?: StringFieldUpdateOperationsInput | string
    enrollmentSemesterId?: StringFieldUpdateOperationsInput | string
    status?: EnumStudentStatusFieldUpdateOperationsInput | $Enums.StudentStatus
    program?: StringFieldUpdateOperationsInput | string
  }

  export type SchoolYearCreateInput = {
    id?: string
    year: string
    startDate?: Date | string | null
    endDate?: Date | string | null
    Semester?: SemesterCreateNestedManyWithoutSchoolYearInput
    Student?: StudentCreateNestedManyWithoutEnrollmentYearInput
  }

  export type SchoolYearUncheckedCreateInput = {
    id?: string
    year: string
    startDate?: Date | string | null
    endDate?: Date | string | null
    Semester?: SemesterUncheckedCreateNestedManyWithoutSchoolYearInput
    Student?: StudentUncheckedCreateNestedManyWithoutEnrollmentYearInput
  }

  export type SchoolYearUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    year?: StringFieldUpdateOperationsInput | string
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    Semester?: SemesterUpdateManyWithoutSchoolYearNestedInput
    Student?: StudentUpdateManyWithoutEnrollmentYearNestedInput
  }

  export type SchoolYearUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    year?: StringFieldUpdateOperationsInput | string
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    Semester?: SemesterUncheckedUpdateManyWithoutSchoolYearNestedInput
    Student?: StudentUncheckedUpdateManyWithoutEnrollmentYearNestedInput
  }

  export type SchoolYearCreateManyInput = {
    id?: string
    year: string
    startDate?: Date | string | null
    endDate?: Date | string | null
  }

  export type SchoolYearUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    year?: StringFieldUpdateOperationsInput | string
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type SchoolYearUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    year?: StringFieldUpdateOperationsInput | string
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type SemesterCreateInput = {
    id?: string
    semester: string
    startDate?: Date | string | null
    endDate?: Date | string | null
    schoolYear: SchoolYearCreateNestedOneWithoutSemesterInput
    Student?: StudentCreateNestedManyWithoutEnrollmentSemesterInput
  }

  export type SemesterUncheckedCreateInput = {
    id?: string
    semester: string
    startDate?: Date | string | null
    endDate?: Date | string | null
    schoolYearId: string
    Student?: StudentUncheckedCreateNestedManyWithoutEnrollmentSemesterInput
  }

  export type SemesterUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    semester?: StringFieldUpdateOperationsInput | string
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    schoolYear?: SchoolYearUpdateOneRequiredWithoutSemesterNestedInput
    Student?: StudentUpdateManyWithoutEnrollmentSemesterNestedInput
  }

  export type SemesterUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    semester?: StringFieldUpdateOperationsInput | string
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    schoolYearId?: StringFieldUpdateOperationsInput | string
    Student?: StudentUncheckedUpdateManyWithoutEnrollmentSemesterNestedInput
  }

  export type SemesterCreateManyInput = {
    id?: string
    semester: string
    startDate?: Date | string | null
    endDate?: Date | string | null
    schoolYearId: string
  }

  export type SemesterUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    semester?: StringFieldUpdateOperationsInput | string
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type SemesterUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    semester?: StringFieldUpdateOperationsInput | string
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    schoolYearId?: StringFieldUpdateOperationsInput | string
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

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type EnumGenderFilter<$PrismaModel = never> = {
    equals?: $Enums.Gender | EnumGenderFieldRefInput<$PrismaModel>
    in?: $Enums.Gender[]
    notIn?: $Enums.Gender[]
    not?: NestedEnumGenderFilter<$PrismaModel> | $Enums.Gender
  }

  export type EnumStudentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.StudentStatus | EnumStudentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.StudentStatus[]
    notIn?: $Enums.StudentStatus[]
    not?: NestedEnumStudentStatusFilter<$PrismaModel> | $Enums.StudentStatus
  }

  export type SchoolYearRelationFilter = {
    is?: SchoolYearWhereInput
    isNot?: SchoolYearWhereInput
  }

  export type SemesterRelationFilter = {
    is?: SemesterWhereInput
    isNot?: SemesterWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type StudentCountOrderByAggregateInput = {
    id?: SortOrder
    studentId?: SortOrder
    firstName?: SortOrder
    middleName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    address?: SortOrder
    dateOfBirth?: SortOrder
    gender?: SortOrder
    enrollmentYearId?: SortOrder
    enrollmentSemesterId?: SortOrder
    status?: SortOrder
    program?: SortOrder
  }

  export type StudentMaxOrderByAggregateInput = {
    id?: SortOrder
    studentId?: SortOrder
    firstName?: SortOrder
    middleName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    address?: SortOrder
    dateOfBirth?: SortOrder
    gender?: SortOrder
    enrollmentYearId?: SortOrder
    enrollmentSemesterId?: SortOrder
    status?: SortOrder
    program?: SortOrder
  }

  export type StudentMinOrderByAggregateInput = {
    id?: SortOrder
    studentId?: SortOrder
    firstName?: SortOrder
    middleName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    address?: SortOrder
    dateOfBirth?: SortOrder
    gender?: SortOrder
    enrollmentYearId?: SortOrder
    enrollmentSemesterId?: SortOrder
    status?: SortOrder
    program?: SortOrder
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

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type EnumGenderWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Gender | EnumGenderFieldRefInput<$PrismaModel>
    in?: $Enums.Gender[]
    notIn?: $Enums.Gender[]
    not?: NestedEnumGenderWithAggregatesFilter<$PrismaModel> | $Enums.Gender
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumGenderFilter<$PrismaModel>
    _max?: NestedEnumGenderFilter<$PrismaModel>
  }

  export type EnumStudentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.StudentStatus | EnumStudentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.StudentStatus[]
    notIn?: $Enums.StudentStatus[]
    not?: NestedEnumStudentStatusWithAggregatesFilter<$PrismaModel> | $Enums.StudentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStudentStatusFilter<$PrismaModel>
    _max?: NestedEnumStudentStatusFilter<$PrismaModel>
  }

  export type SemesterListRelationFilter = {
    every?: SemesterWhereInput
    some?: SemesterWhereInput
    none?: SemesterWhereInput
  }

  export type StudentListRelationFilter = {
    every?: StudentWhereInput
    some?: StudentWhereInput
    none?: StudentWhereInput
  }

  export type SemesterOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type StudentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SchoolYearCountOrderByAggregateInput = {
    id?: SortOrder
    year?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
  }

  export type SchoolYearMaxOrderByAggregateInput = {
    id?: SortOrder
    year?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
  }

  export type SchoolYearMinOrderByAggregateInput = {
    id?: SortOrder
    year?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
  }

  export type SemesterCountOrderByAggregateInput = {
    id?: SortOrder
    semester?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    schoolYearId?: SortOrder
  }

  export type SemesterMaxOrderByAggregateInput = {
    id?: SortOrder
    semester?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    schoolYearId?: SortOrder
  }

  export type SemesterMinOrderByAggregateInput = {
    id?: SortOrder
    semester?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    schoolYearId?: SortOrder
  }

  export type SchoolYearCreateNestedOneWithoutStudentInput = {
    create?: XOR<SchoolYearCreateWithoutStudentInput, SchoolYearUncheckedCreateWithoutStudentInput>
    connectOrCreate?: SchoolYearCreateOrConnectWithoutStudentInput
    connect?: SchoolYearWhereUniqueInput
  }

  export type SemesterCreateNestedOneWithoutStudentInput = {
    create?: XOR<SemesterCreateWithoutStudentInput, SemesterUncheckedCreateWithoutStudentInput>
    connectOrCreate?: SemesterCreateOrConnectWithoutStudentInput
    connect?: SemesterWhereUniqueInput
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type EnumGenderFieldUpdateOperationsInput = {
    set?: $Enums.Gender
  }

  export type EnumStudentStatusFieldUpdateOperationsInput = {
    set?: $Enums.StudentStatus
  }

  export type SchoolYearUpdateOneRequiredWithoutStudentNestedInput = {
    create?: XOR<SchoolYearCreateWithoutStudentInput, SchoolYearUncheckedCreateWithoutStudentInput>
    connectOrCreate?: SchoolYearCreateOrConnectWithoutStudentInput
    upsert?: SchoolYearUpsertWithoutStudentInput
    connect?: SchoolYearWhereUniqueInput
    update?: XOR<XOR<SchoolYearUpdateToOneWithWhereWithoutStudentInput, SchoolYearUpdateWithoutStudentInput>, SchoolYearUncheckedUpdateWithoutStudentInput>
  }

  export type SemesterUpdateOneRequiredWithoutStudentNestedInput = {
    create?: XOR<SemesterCreateWithoutStudentInput, SemesterUncheckedCreateWithoutStudentInput>
    connectOrCreate?: SemesterCreateOrConnectWithoutStudentInput
    upsert?: SemesterUpsertWithoutStudentInput
    connect?: SemesterWhereUniqueInput
    update?: XOR<XOR<SemesterUpdateToOneWithWhereWithoutStudentInput, SemesterUpdateWithoutStudentInput>, SemesterUncheckedUpdateWithoutStudentInput>
  }

  export type SemesterCreateNestedManyWithoutSchoolYearInput = {
    create?: XOR<SemesterCreateWithoutSchoolYearInput, SemesterUncheckedCreateWithoutSchoolYearInput> | SemesterCreateWithoutSchoolYearInput[] | SemesterUncheckedCreateWithoutSchoolYearInput[]
    connectOrCreate?: SemesterCreateOrConnectWithoutSchoolYearInput | SemesterCreateOrConnectWithoutSchoolYearInput[]
    createMany?: SemesterCreateManySchoolYearInputEnvelope
    connect?: SemesterWhereUniqueInput | SemesterWhereUniqueInput[]
  }

  export type StudentCreateNestedManyWithoutEnrollmentYearInput = {
    create?: XOR<StudentCreateWithoutEnrollmentYearInput, StudentUncheckedCreateWithoutEnrollmentYearInput> | StudentCreateWithoutEnrollmentYearInput[] | StudentUncheckedCreateWithoutEnrollmentYearInput[]
    connectOrCreate?: StudentCreateOrConnectWithoutEnrollmentYearInput | StudentCreateOrConnectWithoutEnrollmentYearInput[]
    createMany?: StudentCreateManyEnrollmentYearInputEnvelope
    connect?: StudentWhereUniqueInput | StudentWhereUniqueInput[]
  }

  export type SemesterUncheckedCreateNestedManyWithoutSchoolYearInput = {
    create?: XOR<SemesterCreateWithoutSchoolYearInput, SemesterUncheckedCreateWithoutSchoolYearInput> | SemesterCreateWithoutSchoolYearInput[] | SemesterUncheckedCreateWithoutSchoolYearInput[]
    connectOrCreate?: SemesterCreateOrConnectWithoutSchoolYearInput | SemesterCreateOrConnectWithoutSchoolYearInput[]
    createMany?: SemesterCreateManySchoolYearInputEnvelope
    connect?: SemesterWhereUniqueInput | SemesterWhereUniqueInput[]
  }

  export type StudentUncheckedCreateNestedManyWithoutEnrollmentYearInput = {
    create?: XOR<StudentCreateWithoutEnrollmentYearInput, StudentUncheckedCreateWithoutEnrollmentYearInput> | StudentCreateWithoutEnrollmentYearInput[] | StudentUncheckedCreateWithoutEnrollmentYearInput[]
    connectOrCreate?: StudentCreateOrConnectWithoutEnrollmentYearInput | StudentCreateOrConnectWithoutEnrollmentYearInput[]
    createMany?: StudentCreateManyEnrollmentYearInputEnvelope
    connect?: StudentWhereUniqueInput | StudentWhereUniqueInput[]
  }

  export type SemesterUpdateManyWithoutSchoolYearNestedInput = {
    create?: XOR<SemesterCreateWithoutSchoolYearInput, SemesterUncheckedCreateWithoutSchoolYearInput> | SemesterCreateWithoutSchoolYearInput[] | SemesterUncheckedCreateWithoutSchoolYearInput[]
    connectOrCreate?: SemesterCreateOrConnectWithoutSchoolYearInput | SemesterCreateOrConnectWithoutSchoolYearInput[]
    upsert?: SemesterUpsertWithWhereUniqueWithoutSchoolYearInput | SemesterUpsertWithWhereUniqueWithoutSchoolYearInput[]
    createMany?: SemesterCreateManySchoolYearInputEnvelope
    set?: SemesterWhereUniqueInput | SemesterWhereUniqueInput[]
    disconnect?: SemesterWhereUniqueInput | SemesterWhereUniqueInput[]
    delete?: SemesterWhereUniqueInput | SemesterWhereUniqueInput[]
    connect?: SemesterWhereUniqueInput | SemesterWhereUniqueInput[]
    update?: SemesterUpdateWithWhereUniqueWithoutSchoolYearInput | SemesterUpdateWithWhereUniqueWithoutSchoolYearInput[]
    updateMany?: SemesterUpdateManyWithWhereWithoutSchoolYearInput | SemesterUpdateManyWithWhereWithoutSchoolYearInput[]
    deleteMany?: SemesterScalarWhereInput | SemesterScalarWhereInput[]
  }

  export type StudentUpdateManyWithoutEnrollmentYearNestedInput = {
    create?: XOR<StudentCreateWithoutEnrollmentYearInput, StudentUncheckedCreateWithoutEnrollmentYearInput> | StudentCreateWithoutEnrollmentYearInput[] | StudentUncheckedCreateWithoutEnrollmentYearInput[]
    connectOrCreate?: StudentCreateOrConnectWithoutEnrollmentYearInput | StudentCreateOrConnectWithoutEnrollmentYearInput[]
    upsert?: StudentUpsertWithWhereUniqueWithoutEnrollmentYearInput | StudentUpsertWithWhereUniqueWithoutEnrollmentYearInput[]
    createMany?: StudentCreateManyEnrollmentYearInputEnvelope
    set?: StudentWhereUniqueInput | StudentWhereUniqueInput[]
    disconnect?: StudentWhereUniqueInput | StudentWhereUniqueInput[]
    delete?: StudentWhereUniqueInput | StudentWhereUniqueInput[]
    connect?: StudentWhereUniqueInput | StudentWhereUniqueInput[]
    update?: StudentUpdateWithWhereUniqueWithoutEnrollmentYearInput | StudentUpdateWithWhereUniqueWithoutEnrollmentYearInput[]
    updateMany?: StudentUpdateManyWithWhereWithoutEnrollmentYearInput | StudentUpdateManyWithWhereWithoutEnrollmentYearInput[]
    deleteMany?: StudentScalarWhereInput | StudentScalarWhereInput[]
  }

  export type SemesterUncheckedUpdateManyWithoutSchoolYearNestedInput = {
    create?: XOR<SemesterCreateWithoutSchoolYearInput, SemesterUncheckedCreateWithoutSchoolYearInput> | SemesterCreateWithoutSchoolYearInput[] | SemesterUncheckedCreateWithoutSchoolYearInput[]
    connectOrCreate?: SemesterCreateOrConnectWithoutSchoolYearInput | SemesterCreateOrConnectWithoutSchoolYearInput[]
    upsert?: SemesterUpsertWithWhereUniqueWithoutSchoolYearInput | SemesterUpsertWithWhereUniqueWithoutSchoolYearInput[]
    createMany?: SemesterCreateManySchoolYearInputEnvelope
    set?: SemesterWhereUniqueInput | SemesterWhereUniqueInput[]
    disconnect?: SemesterWhereUniqueInput | SemesterWhereUniqueInput[]
    delete?: SemesterWhereUniqueInput | SemesterWhereUniqueInput[]
    connect?: SemesterWhereUniqueInput | SemesterWhereUniqueInput[]
    update?: SemesterUpdateWithWhereUniqueWithoutSchoolYearInput | SemesterUpdateWithWhereUniqueWithoutSchoolYearInput[]
    updateMany?: SemesterUpdateManyWithWhereWithoutSchoolYearInput | SemesterUpdateManyWithWhereWithoutSchoolYearInput[]
    deleteMany?: SemesterScalarWhereInput | SemesterScalarWhereInput[]
  }

  export type StudentUncheckedUpdateManyWithoutEnrollmentYearNestedInput = {
    create?: XOR<StudentCreateWithoutEnrollmentYearInput, StudentUncheckedCreateWithoutEnrollmentYearInput> | StudentCreateWithoutEnrollmentYearInput[] | StudentUncheckedCreateWithoutEnrollmentYearInput[]
    connectOrCreate?: StudentCreateOrConnectWithoutEnrollmentYearInput | StudentCreateOrConnectWithoutEnrollmentYearInput[]
    upsert?: StudentUpsertWithWhereUniqueWithoutEnrollmentYearInput | StudentUpsertWithWhereUniqueWithoutEnrollmentYearInput[]
    createMany?: StudentCreateManyEnrollmentYearInputEnvelope
    set?: StudentWhereUniqueInput | StudentWhereUniqueInput[]
    disconnect?: StudentWhereUniqueInput | StudentWhereUniqueInput[]
    delete?: StudentWhereUniqueInput | StudentWhereUniqueInput[]
    connect?: StudentWhereUniqueInput | StudentWhereUniqueInput[]
    update?: StudentUpdateWithWhereUniqueWithoutEnrollmentYearInput | StudentUpdateWithWhereUniqueWithoutEnrollmentYearInput[]
    updateMany?: StudentUpdateManyWithWhereWithoutEnrollmentYearInput | StudentUpdateManyWithWhereWithoutEnrollmentYearInput[]
    deleteMany?: StudentScalarWhereInput | StudentScalarWhereInput[]
  }

  export type SchoolYearCreateNestedOneWithoutSemesterInput = {
    create?: XOR<SchoolYearCreateWithoutSemesterInput, SchoolYearUncheckedCreateWithoutSemesterInput>
    connectOrCreate?: SchoolYearCreateOrConnectWithoutSemesterInput
    connect?: SchoolYearWhereUniqueInput
  }

  export type StudentCreateNestedManyWithoutEnrollmentSemesterInput = {
    create?: XOR<StudentCreateWithoutEnrollmentSemesterInput, StudentUncheckedCreateWithoutEnrollmentSemesterInput> | StudentCreateWithoutEnrollmentSemesterInput[] | StudentUncheckedCreateWithoutEnrollmentSemesterInput[]
    connectOrCreate?: StudentCreateOrConnectWithoutEnrollmentSemesterInput | StudentCreateOrConnectWithoutEnrollmentSemesterInput[]
    createMany?: StudentCreateManyEnrollmentSemesterInputEnvelope
    connect?: StudentWhereUniqueInput | StudentWhereUniqueInput[]
  }

  export type StudentUncheckedCreateNestedManyWithoutEnrollmentSemesterInput = {
    create?: XOR<StudentCreateWithoutEnrollmentSemesterInput, StudentUncheckedCreateWithoutEnrollmentSemesterInput> | StudentCreateWithoutEnrollmentSemesterInput[] | StudentUncheckedCreateWithoutEnrollmentSemesterInput[]
    connectOrCreate?: StudentCreateOrConnectWithoutEnrollmentSemesterInput | StudentCreateOrConnectWithoutEnrollmentSemesterInput[]
    createMany?: StudentCreateManyEnrollmentSemesterInputEnvelope
    connect?: StudentWhereUniqueInput | StudentWhereUniqueInput[]
  }

  export type SchoolYearUpdateOneRequiredWithoutSemesterNestedInput = {
    create?: XOR<SchoolYearCreateWithoutSemesterInput, SchoolYearUncheckedCreateWithoutSemesterInput>
    connectOrCreate?: SchoolYearCreateOrConnectWithoutSemesterInput
    upsert?: SchoolYearUpsertWithoutSemesterInput
    connect?: SchoolYearWhereUniqueInput
    update?: XOR<XOR<SchoolYearUpdateToOneWithWhereWithoutSemesterInput, SchoolYearUpdateWithoutSemesterInput>, SchoolYearUncheckedUpdateWithoutSemesterInput>
  }

  export type StudentUpdateManyWithoutEnrollmentSemesterNestedInput = {
    create?: XOR<StudentCreateWithoutEnrollmentSemesterInput, StudentUncheckedCreateWithoutEnrollmentSemesterInput> | StudentCreateWithoutEnrollmentSemesterInput[] | StudentUncheckedCreateWithoutEnrollmentSemesterInput[]
    connectOrCreate?: StudentCreateOrConnectWithoutEnrollmentSemesterInput | StudentCreateOrConnectWithoutEnrollmentSemesterInput[]
    upsert?: StudentUpsertWithWhereUniqueWithoutEnrollmentSemesterInput | StudentUpsertWithWhereUniqueWithoutEnrollmentSemesterInput[]
    createMany?: StudentCreateManyEnrollmentSemesterInputEnvelope
    set?: StudentWhereUniqueInput | StudentWhereUniqueInput[]
    disconnect?: StudentWhereUniqueInput | StudentWhereUniqueInput[]
    delete?: StudentWhereUniqueInput | StudentWhereUniqueInput[]
    connect?: StudentWhereUniqueInput | StudentWhereUniqueInput[]
    update?: StudentUpdateWithWhereUniqueWithoutEnrollmentSemesterInput | StudentUpdateWithWhereUniqueWithoutEnrollmentSemesterInput[]
    updateMany?: StudentUpdateManyWithWhereWithoutEnrollmentSemesterInput | StudentUpdateManyWithWhereWithoutEnrollmentSemesterInput[]
    deleteMany?: StudentScalarWhereInput | StudentScalarWhereInput[]
  }

  export type StudentUncheckedUpdateManyWithoutEnrollmentSemesterNestedInput = {
    create?: XOR<StudentCreateWithoutEnrollmentSemesterInput, StudentUncheckedCreateWithoutEnrollmentSemesterInput> | StudentCreateWithoutEnrollmentSemesterInput[] | StudentUncheckedCreateWithoutEnrollmentSemesterInput[]
    connectOrCreate?: StudentCreateOrConnectWithoutEnrollmentSemesterInput | StudentCreateOrConnectWithoutEnrollmentSemesterInput[]
    upsert?: StudentUpsertWithWhereUniqueWithoutEnrollmentSemesterInput | StudentUpsertWithWhereUniqueWithoutEnrollmentSemesterInput[]
    createMany?: StudentCreateManyEnrollmentSemesterInputEnvelope
    set?: StudentWhereUniqueInput | StudentWhereUniqueInput[]
    disconnect?: StudentWhereUniqueInput | StudentWhereUniqueInput[]
    delete?: StudentWhereUniqueInput | StudentWhereUniqueInput[]
    connect?: StudentWhereUniqueInput | StudentWhereUniqueInput[]
    update?: StudentUpdateWithWhereUniqueWithoutEnrollmentSemesterInput | StudentUpdateWithWhereUniqueWithoutEnrollmentSemesterInput[]
    updateMany?: StudentUpdateManyWithWhereWithoutEnrollmentSemesterInput | StudentUpdateManyWithWhereWithoutEnrollmentSemesterInput[]
    deleteMany?: StudentScalarWhereInput | StudentScalarWhereInput[]
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

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedEnumGenderFilter<$PrismaModel = never> = {
    equals?: $Enums.Gender | EnumGenderFieldRefInput<$PrismaModel>
    in?: $Enums.Gender[]
    notIn?: $Enums.Gender[]
    not?: NestedEnumGenderFilter<$PrismaModel> | $Enums.Gender
  }

  export type NestedEnumStudentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.StudentStatus | EnumStudentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.StudentStatus[]
    notIn?: $Enums.StudentStatus[]
    not?: NestedEnumStudentStatusFilter<$PrismaModel> | $Enums.StudentStatus
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

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedEnumGenderWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Gender | EnumGenderFieldRefInput<$PrismaModel>
    in?: $Enums.Gender[]
    notIn?: $Enums.Gender[]
    not?: NestedEnumGenderWithAggregatesFilter<$PrismaModel> | $Enums.Gender
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumGenderFilter<$PrismaModel>
    _max?: NestedEnumGenderFilter<$PrismaModel>
  }

  export type NestedEnumStudentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.StudentStatus | EnumStudentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.StudentStatus[]
    notIn?: $Enums.StudentStatus[]
    not?: NestedEnumStudentStatusWithAggregatesFilter<$PrismaModel> | $Enums.StudentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStudentStatusFilter<$PrismaModel>
    _max?: NestedEnumStudentStatusFilter<$PrismaModel>
  }

  export type SchoolYearCreateWithoutStudentInput = {
    id?: string
    year: string
    startDate?: Date | string | null
    endDate?: Date | string | null
    Semester?: SemesterCreateNestedManyWithoutSchoolYearInput
  }

  export type SchoolYearUncheckedCreateWithoutStudentInput = {
    id?: string
    year: string
    startDate?: Date | string | null
    endDate?: Date | string | null
    Semester?: SemesterUncheckedCreateNestedManyWithoutSchoolYearInput
  }

  export type SchoolYearCreateOrConnectWithoutStudentInput = {
    where: SchoolYearWhereUniqueInput
    create: XOR<SchoolYearCreateWithoutStudentInput, SchoolYearUncheckedCreateWithoutStudentInput>
  }

  export type SemesterCreateWithoutStudentInput = {
    id?: string
    semester: string
    startDate?: Date | string | null
    endDate?: Date | string | null
    schoolYear: SchoolYearCreateNestedOneWithoutSemesterInput
  }

  export type SemesterUncheckedCreateWithoutStudentInput = {
    id?: string
    semester: string
    startDate?: Date | string | null
    endDate?: Date | string | null
    schoolYearId: string
  }

  export type SemesterCreateOrConnectWithoutStudentInput = {
    where: SemesterWhereUniqueInput
    create: XOR<SemesterCreateWithoutStudentInput, SemesterUncheckedCreateWithoutStudentInput>
  }

  export type SchoolYearUpsertWithoutStudentInput = {
    update: XOR<SchoolYearUpdateWithoutStudentInput, SchoolYearUncheckedUpdateWithoutStudentInput>
    create: XOR<SchoolYearCreateWithoutStudentInput, SchoolYearUncheckedCreateWithoutStudentInput>
    where?: SchoolYearWhereInput
  }

  export type SchoolYearUpdateToOneWithWhereWithoutStudentInput = {
    where?: SchoolYearWhereInput
    data: XOR<SchoolYearUpdateWithoutStudentInput, SchoolYearUncheckedUpdateWithoutStudentInput>
  }

  export type SchoolYearUpdateWithoutStudentInput = {
    id?: StringFieldUpdateOperationsInput | string
    year?: StringFieldUpdateOperationsInput | string
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    Semester?: SemesterUpdateManyWithoutSchoolYearNestedInput
  }

  export type SchoolYearUncheckedUpdateWithoutStudentInput = {
    id?: StringFieldUpdateOperationsInput | string
    year?: StringFieldUpdateOperationsInput | string
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    Semester?: SemesterUncheckedUpdateManyWithoutSchoolYearNestedInput
  }

  export type SemesterUpsertWithoutStudentInput = {
    update: XOR<SemesterUpdateWithoutStudentInput, SemesterUncheckedUpdateWithoutStudentInput>
    create: XOR<SemesterCreateWithoutStudentInput, SemesterUncheckedCreateWithoutStudentInput>
    where?: SemesterWhereInput
  }

  export type SemesterUpdateToOneWithWhereWithoutStudentInput = {
    where?: SemesterWhereInput
    data: XOR<SemesterUpdateWithoutStudentInput, SemesterUncheckedUpdateWithoutStudentInput>
  }

  export type SemesterUpdateWithoutStudentInput = {
    id?: StringFieldUpdateOperationsInput | string
    semester?: StringFieldUpdateOperationsInput | string
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    schoolYear?: SchoolYearUpdateOneRequiredWithoutSemesterNestedInput
  }

  export type SemesterUncheckedUpdateWithoutStudentInput = {
    id?: StringFieldUpdateOperationsInput | string
    semester?: StringFieldUpdateOperationsInput | string
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    schoolYearId?: StringFieldUpdateOperationsInput | string
  }

  export type SemesterCreateWithoutSchoolYearInput = {
    id?: string
    semester: string
    startDate?: Date | string | null
    endDate?: Date | string | null
    Student?: StudentCreateNestedManyWithoutEnrollmentSemesterInput
  }

  export type SemesterUncheckedCreateWithoutSchoolYearInput = {
    id?: string
    semester: string
    startDate?: Date | string | null
    endDate?: Date | string | null
    Student?: StudentUncheckedCreateNestedManyWithoutEnrollmentSemesterInput
  }

  export type SemesterCreateOrConnectWithoutSchoolYearInput = {
    where: SemesterWhereUniqueInput
    create: XOR<SemesterCreateWithoutSchoolYearInput, SemesterUncheckedCreateWithoutSchoolYearInput>
  }

  export type SemesterCreateManySchoolYearInputEnvelope = {
    data: SemesterCreateManySchoolYearInput | SemesterCreateManySchoolYearInput[]
    skipDuplicates?: boolean
  }

  export type StudentCreateWithoutEnrollmentYearInput = {
    id?: string
    studentId: string
    firstName: string
    middleName?: string | null
    lastName: string
    email: string
    phone: string
    address?: string | null
    dateOfBirth?: Date | string | null
    gender: $Enums.Gender
    status: $Enums.StudentStatus
    program: string
    enrollmentSemester: SemesterCreateNestedOneWithoutStudentInput
  }

  export type StudentUncheckedCreateWithoutEnrollmentYearInput = {
    id?: string
    studentId: string
    firstName: string
    middleName?: string | null
    lastName: string
    email: string
    phone: string
    address?: string | null
    dateOfBirth?: Date | string | null
    gender: $Enums.Gender
    enrollmentSemesterId: string
    status: $Enums.StudentStatus
    program: string
  }

  export type StudentCreateOrConnectWithoutEnrollmentYearInput = {
    where: StudentWhereUniqueInput
    create: XOR<StudentCreateWithoutEnrollmentYearInput, StudentUncheckedCreateWithoutEnrollmentYearInput>
  }

  export type StudentCreateManyEnrollmentYearInputEnvelope = {
    data: StudentCreateManyEnrollmentYearInput | StudentCreateManyEnrollmentYearInput[]
    skipDuplicates?: boolean
  }

  export type SemesterUpsertWithWhereUniqueWithoutSchoolYearInput = {
    where: SemesterWhereUniqueInput
    update: XOR<SemesterUpdateWithoutSchoolYearInput, SemesterUncheckedUpdateWithoutSchoolYearInput>
    create: XOR<SemesterCreateWithoutSchoolYearInput, SemesterUncheckedCreateWithoutSchoolYearInput>
  }

  export type SemesterUpdateWithWhereUniqueWithoutSchoolYearInput = {
    where: SemesterWhereUniqueInput
    data: XOR<SemesterUpdateWithoutSchoolYearInput, SemesterUncheckedUpdateWithoutSchoolYearInput>
  }

  export type SemesterUpdateManyWithWhereWithoutSchoolYearInput = {
    where: SemesterScalarWhereInput
    data: XOR<SemesterUpdateManyMutationInput, SemesterUncheckedUpdateManyWithoutSchoolYearInput>
  }

  export type SemesterScalarWhereInput = {
    AND?: SemesterScalarWhereInput | SemesterScalarWhereInput[]
    OR?: SemesterScalarWhereInput[]
    NOT?: SemesterScalarWhereInput | SemesterScalarWhereInput[]
    id?: StringFilter<"Semester"> | string
    semester?: StringFilter<"Semester"> | string
    startDate?: DateTimeNullableFilter<"Semester"> | Date | string | null
    endDate?: DateTimeNullableFilter<"Semester"> | Date | string | null
    schoolYearId?: StringFilter<"Semester"> | string
  }

  export type StudentUpsertWithWhereUniqueWithoutEnrollmentYearInput = {
    where: StudentWhereUniqueInput
    update: XOR<StudentUpdateWithoutEnrollmentYearInput, StudentUncheckedUpdateWithoutEnrollmentYearInput>
    create: XOR<StudentCreateWithoutEnrollmentYearInput, StudentUncheckedCreateWithoutEnrollmentYearInput>
  }

  export type StudentUpdateWithWhereUniqueWithoutEnrollmentYearInput = {
    where: StudentWhereUniqueInput
    data: XOR<StudentUpdateWithoutEnrollmentYearInput, StudentUncheckedUpdateWithoutEnrollmentYearInput>
  }

  export type StudentUpdateManyWithWhereWithoutEnrollmentYearInput = {
    where: StudentScalarWhereInput
    data: XOR<StudentUpdateManyMutationInput, StudentUncheckedUpdateManyWithoutEnrollmentYearInput>
  }

  export type StudentScalarWhereInput = {
    AND?: StudentScalarWhereInput | StudentScalarWhereInput[]
    OR?: StudentScalarWhereInput[]
    NOT?: StudentScalarWhereInput | StudentScalarWhereInput[]
    id?: StringFilter<"Student"> | string
    studentId?: StringFilter<"Student"> | string
    firstName?: StringFilter<"Student"> | string
    middleName?: StringNullableFilter<"Student"> | string | null
    lastName?: StringFilter<"Student"> | string
    email?: StringFilter<"Student"> | string
    phone?: StringFilter<"Student"> | string
    address?: StringNullableFilter<"Student"> | string | null
    dateOfBirth?: DateTimeNullableFilter<"Student"> | Date | string | null
    gender?: EnumGenderFilter<"Student"> | $Enums.Gender
    enrollmentYearId?: StringFilter<"Student"> | string
    enrollmentSemesterId?: StringFilter<"Student"> | string
    status?: EnumStudentStatusFilter<"Student"> | $Enums.StudentStatus
    program?: StringFilter<"Student"> | string
  }

  export type SchoolYearCreateWithoutSemesterInput = {
    id?: string
    year: string
    startDate?: Date | string | null
    endDate?: Date | string | null
    Student?: StudentCreateNestedManyWithoutEnrollmentYearInput
  }

  export type SchoolYearUncheckedCreateWithoutSemesterInput = {
    id?: string
    year: string
    startDate?: Date | string | null
    endDate?: Date | string | null
    Student?: StudentUncheckedCreateNestedManyWithoutEnrollmentYearInput
  }

  export type SchoolYearCreateOrConnectWithoutSemesterInput = {
    where: SchoolYearWhereUniqueInput
    create: XOR<SchoolYearCreateWithoutSemesterInput, SchoolYearUncheckedCreateWithoutSemesterInput>
  }

  export type StudentCreateWithoutEnrollmentSemesterInput = {
    id?: string
    studentId: string
    firstName: string
    middleName?: string | null
    lastName: string
    email: string
    phone: string
    address?: string | null
    dateOfBirth?: Date | string | null
    gender: $Enums.Gender
    status: $Enums.StudentStatus
    program: string
    enrollmentYear: SchoolYearCreateNestedOneWithoutStudentInput
  }

  export type StudentUncheckedCreateWithoutEnrollmentSemesterInput = {
    id?: string
    studentId: string
    firstName: string
    middleName?: string | null
    lastName: string
    email: string
    phone: string
    address?: string | null
    dateOfBirth?: Date | string | null
    gender: $Enums.Gender
    enrollmentYearId: string
    status: $Enums.StudentStatus
    program: string
  }

  export type StudentCreateOrConnectWithoutEnrollmentSemesterInput = {
    where: StudentWhereUniqueInput
    create: XOR<StudentCreateWithoutEnrollmentSemesterInput, StudentUncheckedCreateWithoutEnrollmentSemesterInput>
  }

  export type StudentCreateManyEnrollmentSemesterInputEnvelope = {
    data: StudentCreateManyEnrollmentSemesterInput | StudentCreateManyEnrollmentSemesterInput[]
    skipDuplicates?: boolean
  }

  export type SchoolYearUpsertWithoutSemesterInput = {
    update: XOR<SchoolYearUpdateWithoutSemesterInput, SchoolYearUncheckedUpdateWithoutSemesterInput>
    create: XOR<SchoolYearCreateWithoutSemesterInput, SchoolYearUncheckedCreateWithoutSemesterInput>
    where?: SchoolYearWhereInput
  }

  export type SchoolYearUpdateToOneWithWhereWithoutSemesterInput = {
    where?: SchoolYearWhereInput
    data: XOR<SchoolYearUpdateWithoutSemesterInput, SchoolYearUncheckedUpdateWithoutSemesterInput>
  }

  export type SchoolYearUpdateWithoutSemesterInput = {
    id?: StringFieldUpdateOperationsInput | string
    year?: StringFieldUpdateOperationsInput | string
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    Student?: StudentUpdateManyWithoutEnrollmentYearNestedInput
  }

  export type SchoolYearUncheckedUpdateWithoutSemesterInput = {
    id?: StringFieldUpdateOperationsInput | string
    year?: StringFieldUpdateOperationsInput | string
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    Student?: StudentUncheckedUpdateManyWithoutEnrollmentYearNestedInput
  }

  export type StudentUpsertWithWhereUniqueWithoutEnrollmentSemesterInput = {
    where: StudentWhereUniqueInput
    update: XOR<StudentUpdateWithoutEnrollmentSemesterInput, StudentUncheckedUpdateWithoutEnrollmentSemesterInput>
    create: XOR<StudentCreateWithoutEnrollmentSemesterInput, StudentUncheckedCreateWithoutEnrollmentSemesterInput>
  }

  export type StudentUpdateWithWhereUniqueWithoutEnrollmentSemesterInput = {
    where: StudentWhereUniqueInput
    data: XOR<StudentUpdateWithoutEnrollmentSemesterInput, StudentUncheckedUpdateWithoutEnrollmentSemesterInput>
  }

  export type StudentUpdateManyWithWhereWithoutEnrollmentSemesterInput = {
    where: StudentScalarWhereInput
    data: XOR<StudentUpdateManyMutationInput, StudentUncheckedUpdateManyWithoutEnrollmentSemesterInput>
  }

  export type SemesterCreateManySchoolYearInput = {
    id?: string
    semester: string
    startDate?: Date | string | null
    endDate?: Date | string | null
  }

  export type StudentCreateManyEnrollmentYearInput = {
    id?: string
    studentId: string
    firstName: string
    middleName?: string | null
    lastName: string
    email: string
    phone: string
    address?: string | null
    dateOfBirth?: Date | string | null
    gender: $Enums.Gender
    enrollmentSemesterId: string
    status: $Enums.StudentStatus
    program: string
  }

  export type SemesterUpdateWithoutSchoolYearInput = {
    id?: StringFieldUpdateOperationsInput | string
    semester?: StringFieldUpdateOperationsInput | string
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    Student?: StudentUpdateManyWithoutEnrollmentSemesterNestedInput
  }

  export type SemesterUncheckedUpdateWithoutSchoolYearInput = {
    id?: StringFieldUpdateOperationsInput | string
    semester?: StringFieldUpdateOperationsInput | string
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    Student?: StudentUncheckedUpdateManyWithoutEnrollmentSemesterNestedInput
  }

  export type SemesterUncheckedUpdateManyWithoutSchoolYearInput = {
    id?: StringFieldUpdateOperationsInput | string
    semester?: StringFieldUpdateOperationsInput | string
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type StudentUpdateWithoutEnrollmentYearInput = {
    id?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    middleName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    status?: EnumStudentStatusFieldUpdateOperationsInput | $Enums.StudentStatus
    program?: StringFieldUpdateOperationsInput | string
    enrollmentSemester?: SemesterUpdateOneRequiredWithoutStudentNestedInput
  }

  export type StudentUncheckedUpdateWithoutEnrollmentYearInput = {
    id?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    middleName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    enrollmentSemesterId?: StringFieldUpdateOperationsInput | string
    status?: EnumStudentStatusFieldUpdateOperationsInput | $Enums.StudentStatus
    program?: StringFieldUpdateOperationsInput | string
  }

  export type StudentUncheckedUpdateManyWithoutEnrollmentYearInput = {
    id?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    middleName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    enrollmentSemesterId?: StringFieldUpdateOperationsInput | string
    status?: EnumStudentStatusFieldUpdateOperationsInput | $Enums.StudentStatus
    program?: StringFieldUpdateOperationsInput | string
  }

  export type StudentCreateManyEnrollmentSemesterInput = {
    id?: string
    studentId: string
    firstName: string
    middleName?: string | null
    lastName: string
    email: string
    phone: string
    address?: string | null
    dateOfBirth?: Date | string | null
    gender: $Enums.Gender
    enrollmentYearId: string
    status: $Enums.StudentStatus
    program: string
  }

  export type StudentUpdateWithoutEnrollmentSemesterInput = {
    id?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    middleName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    status?: EnumStudentStatusFieldUpdateOperationsInput | $Enums.StudentStatus
    program?: StringFieldUpdateOperationsInput | string
    enrollmentYear?: SchoolYearUpdateOneRequiredWithoutStudentNestedInput
  }

  export type StudentUncheckedUpdateWithoutEnrollmentSemesterInput = {
    id?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    middleName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    enrollmentYearId?: StringFieldUpdateOperationsInput | string
    status?: EnumStudentStatusFieldUpdateOperationsInput | $Enums.StudentStatus
    program?: StringFieldUpdateOperationsInput | string
  }

  export type StudentUncheckedUpdateManyWithoutEnrollmentSemesterInput = {
    id?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    middleName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    enrollmentYearId?: StringFieldUpdateOperationsInput | string
    status?: EnumStudentStatusFieldUpdateOperationsInput | $Enums.StudentStatus
    program?: StringFieldUpdateOperationsInput | string
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use SchoolYearCountOutputTypeDefaultArgs instead
     */
    export type SchoolYearCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = SchoolYearCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use SemesterCountOutputTypeDefaultArgs instead
     */
    export type SemesterCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = SemesterCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use StudentDefaultArgs instead
     */
    export type StudentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = StudentDefaultArgs<ExtArgs>
    /**
     * @deprecated Use SchoolYearDefaultArgs instead
     */
    export type SchoolYearArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = SchoolYearDefaultArgs<ExtArgs>
    /**
     * @deprecated Use SemesterDefaultArgs instead
     */
    export type SemesterArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = SemesterDefaultArgs<ExtArgs>

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