import { Execution } from './Execution';
import { ExecutionsArg, parseExecutionsArg } from './parseExecutionsArg';

/**
 * Makes a child execution that inherits cancellation-state from any number of parent(s).
 * It can be pre-constructed by specifying a `child` or constructed using a `customConstructor`.
 *
 * @param {NestExecutionOptions} options - Advanced options for nesting executions.
 * @returns {Execution} The nested execution.
 */
export function nestExecution<T extends Execution, PT extends Execution>(
  options: NestExecutionOptions<T, PT>,
): T {
  const parents = parseExecutionsArg(options.parent);

  if (!parents.length) {
    if (options.child) {
      return options.child;
    } else if (options.customConstructor) {
      return new options.customConstructor();
    } else {
      return new Execution() as T;
    }
  } else if (options.child) {
    parents.forEach(parent => {
      const unsubscribeCanceled = parent.onCanceled(function () {
        (options.child as T).cancel();
      });

      (options.child as T).onCanceled(unsubscribeCanceled);
    });

    return options.child;
  } else if (options.customConstructor) {
    return new options.customConstructor(parents);
  } else {
    return new Execution(parents) as T;
  }
}

/**
 * @see {@linkcode nestExecution}
 */
export interface NestExecutionOptions<
  T extends Execution = Execution,
  PT extends Execution = Execution,
> {
  /** Parent(s) to inherit cancellation state from. */
  parent?: ExecutionsArg<PT>;
  /**
   * The child to pass cancellation state from any specified parent(s) to.
   * The same instance will be returned if defined.
   */
  child?: T;
  /**
   * A custom execution constructor,
   * which will be used to construct the nested execution if `child` is null.
   */
  customConstructor?: ExecutionConstructor<T, PT>;
}

/**
 * A constructor for a custom execution, which can be specified when nesting executions.
 *
 * @param {ExecutionsArg} parent - Parent(s) to inherit cancellation state from.
 */
export type ExecutionConstructor<
  T extends Execution = Execution,
  PT extends Execution = Execution,
> = new (parent?: ExecutionsArg<PT>) => T;
