import { Execution } from './Execution';

/**
 * Transforms a function so that it always receives an execution as the last argument and only runs the function for one execution at a time.
 * That is, if the function returned from `executionFunc(innerFunc)` is called with an execution, such as `(...args, executionA)`, and is later
 * called with a different execution before the previous call has finished (or the returned promise has been resolved), such as `(...args, executionB)`,
 * the execution passed to the `func` will be canceled. On the other hand, if it's called with the same `executionA`, the same value will be returned as
 * from the previous call.
 *
 * @param {InnerExecutionFunc} innerFunc - Function that receives the passed parameters and an execution as the final parameter.
 * @param {ExecutionFuncOptions} options - Options for the behaviour of the execution function. For instance, these
 * allow for using the previously returned value of the function if the arguments and the passed execution are deemed equal.
 * @returns {ExecutionFunc} The transformed execution func, which accepts an execution as the final optional parameter.
 */
export function executionFunc<A extends any[], RT, E extends Execution>(
  innerFunc: InnerExecutionFunc<A, RT, E>,
  options?: ExecutionFuncOptions<A, E>,
): ExecutionFunc<A, RT, E> {
  if (!options) {
    options = {};
  }

  const defaultExecution: () => ReturnType<E['nest']> =
    options.defaultExecution instanceof Execution
      ? function () {
          return (options.defaultExecution as E).nest() as ReturnType<E['nest']>;
        }
      : typeof options.defaultExecution === 'function'
      ? function () {
          return (options.defaultExecution as ExecutionGetter)().nest() as ReturnType<E['nest']>;
        }
      : function () {
          return new Execution() as ReturnType<E['nest']>;
        };

  let executionFunc: ExecutionFunc<A, RT, E>;

  if (options.equalArguments) {
    const isExecutionEqual: (a: E, b: E) => boolean = options.equalExecutions
      ? typeof options.equalExecutions === 'function'
        ? options.equalExecutions
        : function () {
            return true;
          }
      : Execution.isEqual;

    if (typeof options.equalArguments === 'function') {
      executionFunc = function (...params: [...params: A, execution: E]): RT {
        let execution: E = params[params.length - 1];

        if (!(execution instanceof Execution)) {
          execution = undefined;
        }

        if (!executionFunc.__params) {
          // first call, just call the function and define initial properties
        } else if (
          (!execution && executionFunc.__defaultExecution) ||
          (executionFunc._execution && isExecutionEqual(execution, executionFunc._execution))
        ) {
          // no execution was passed in both this and the previous call, the executions are equal, so check if arguments are equal
          if (
            execution
              ? (options.equalArguments as any)(
                  executionFunc.__params,
                  params.slice(0, params.length - 1),
                )
              : (options.equalArguments as any)(executionFunc.__params, params)
          ) {
            // return previously returned value
            return executionFunc.__returned;
          } else {
            // arguments are not equal, cancel previous execution
            executionFunc._execution.cancel();
          }
        }

        if (!execution) {
          execution = defaultExecution() as E;
          // the last argument is not an execution, so we assume it was not passed
          params.push(execution);
          executionFunc.__defaultExecution = true;
        } else {
          execution = execution.nest() as E;
          delete executionFunc.__defaultExecution;
          params[params.length - 1] = execution;
        }

        executionFunc._execution = execution;
        executionFunc.__params = params.slice(0, params.length - 1) as A;
        executionFunc.__returned = innerFunc(...params);

        return executionFunc.__returned;
      } as any;
    } else {
      // all arguments are deemed equal, so just validate executions
      executionFunc = function (...params: [...params: A, execution: E]): RT {
        let execution: E;

        if (params.length > 0) {
          execution = params.pop();

          if (!(execution instanceof Execution)) {
            params.push(execution);
            execution = undefined;
          }
        }

        if (
          (!execution && executionFunc.__defaultExecution) ||
          (executionFunc._execution && isExecutionEqual(execution, executionFunc._execution))
        ) {
          // no execution was passed in both this and the previous call, or the executions are equal, so just return previously returned value
          return executionFunc.__returned;
        } else {
          // the executions are not equal, so cancel the previous execution
          if (executionFunc._execution) {
            executionFunc._execution.cancel();
          }

          if (!execution) {
            execution = defaultExecution() as E;
            // the last argument is not an execution, so we assume it was not passed
            params.push(execution);
            executionFunc.__defaultExecution = true;
          } else {
            execution = execution.nest() as E;
            delete executionFunc.__defaultExecution;
            params[params.length - 1] = execution;
          }

          executionFunc._execution = execution;
          executionFunc.__returned = innerFunc(...params);

          return executionFunc.__returned;
        }
      } as any;
    }
  } else {
    executionFunc = function (...params: [...params: A, execution: E]): RT {
      // cancel the previous execution
      if (executionFunc._execution) {
        executionFunc._execution.cancel();
      }

      // get the new execution and mutate the arguments with the new execution
      let execution: E = params[params.length - 1];

      if (!(execution instanceof Execution)) {
        execution = defaultExecution() as E;
        executionFunc.__defaultExecution = true;
        // the last argument is not an execution, so we assume it was not passed
        params.push(execution);
      } else {
        // an execution was passed, so nest it and replace it in the arguments
        execution = execution.nest() as E;
        delete executionFunc.__defaultExecution;
        params[params.length - 1] = execution;
      }

      executionFunc._execution = execution;

      return innerFunc(...params);
    } as any;
  }

  return executionFunc;
}

/**
 * Function that receives the passed parameters and an execution as the final parameter.
 */
export type InnerExecutionFunc<A extends any[], RT, E extends Execution> = (
  ...params: [...params: A, execution: E]
) => RT;

/**
 * A function that accepts an execution as a final optional parameter, and have additional properties
 * defined for internal use by {@linkcode executionFunc}.
 */
export interface ExecutionFunc<A extends any[], RT, E extends Execution> {
  (...params: [...params: A, execution?: E]): RT;

  /** The most recently used execution. */
  _execution?: E;
  /** Whether most recently used execution was defaulted to. */
  __defaultExecution?: boolean;
  /** The most recently used params. */
  __params?: A;
  /** The most recently returned value. */
  __returned?: RT;
}

/**
 * @see {@linkcode executionFunc}
 */
export interface ExecutionFuncOptions<A extends any[], E extends Execution> {
  /**
   * If defined, every call to the function will be validated to see if the returned value
   * of the previous call should be returned, instead of calling the function again and
   * canceling the passed execution. It will only do this if the passed executions
   * are deemed equal (or are both undefined), though this can be configured using the `equalExecutions` option.
   * If set `true`, all parameters are deemed equal, and only the execution will be validated.
   */
  equalArguments?: boolean | ArgumentsEqualityChecker<A>;
  /**
   * Determines whether two executions are equal. If set `true`, all executions are deemed equal.
   */
  equalExecutions?: boolean | ExecutionEqualityChecker<E>;
  /**
   * If the function is called without a defined execution, a fallback execution is defaulted to.
   * This defaults to a never-canceled execution, but can be overriden using this option.
   * As always, the execution is nested before being passed to the inner function.
   */
  defaultExecution?: E | ExecutionGetter<E>;
}

/**
 * Function that returns an execution.
 */
export type ExecutionGetter<E extends Execution = Execution> = () => E;

/**
 * Determines whether two executions are equal.
 *
 * @param {Execution} a - Execution A.
 * @param {Execution} b - Execution B.
 * @returns {boolean} Whether the executions are equal.
 */
export type ExecutionEqualityChecker<E extends Execution = Execution> = (a: E, b: E) => boolean;

/**
 * Determines whether two executions are equal.
 *
 * @param {A} a - Parameters A.
 * @param {A} b - Parameters B.
 * @returns {boolean} Whether the arguments are equal.
 * @template A - Type of parameters.
 */
export type ArgumentsEqualityChecker<A extends any[]> = (a: A, b: A) => boolean;
