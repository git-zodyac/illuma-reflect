import { OPTIONAL_PATH } from "./metadata";

/**
 * Constructor parameter decorator to mark a dependency as optional.
 * If the dependency cannot be resolved, `null` will be injected instead of throwing an error.
 *
 * @example
 * ```ts
 * @ReflectInjectable()
 * class MyService {
 *   constructor(
 *     @Optional() private optionalService?: OptionalService
 *   ) {}
 * }
 * ```
 */
export function Optional(): ParameterDecorator {
  return (
    target: any,
    propertyKey: string | symbol | undefined,
    parameterIndex: number,
  ) => {
    // Only support constructor parameters
    if (typeof propertyKey !== "undefined") {
      return target;
    }

    Reflect.defineMetadata(OPTIONAL_PATH, true, target, `param_${parameterIndex}`);

    return target;
  };
}
