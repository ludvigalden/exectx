import { Execution } from './Execution';

/** Makes a function that accepts an execution as the last parameter only run for one execution at a time.
 * That is, the execution passed to the function will be canceled if the function is called again
 * during the time its returned value is being resolved. Additionally, there are options that allows for
 * using the previously returned value of the function if the arguments and the passed execution are deemed equal. */
export function executionFunc<A extends any[], RT, E extends Execution>(
  func: (..._arguments: [..._arguments: A, execution: E]) => RT,
  options?: ExecutionFuncOptions<A, E>,
): ExecutionFunc<A, RT, E> {
  if (!options) {
    options = {};
  }

  const defaultExecution: () => ReturnType<E['nest']> = options.defaultExecution
    ? options.defaultExecution instanceof Execution
      ? function () {
          return (options.defaultExecution as E).nest() as ReturnType<E['nest']>;
        }
      : function () {
          return (options.defaultExecution as () => E)().nest() as ReturnType<E['nest']>;
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
      executionFunc = function (..._arguments: [..._arguments: A, execution: E]): RT {
        let execution: E = _arguments[_arguments.length - 1];
        if (!(execution instanceof Execution)) {
          execution = undefined;
        }

        if (!executionFunc.__arguments) {
          // first call, just call the function and define initial properties
        } else if (
          (!execution && executionFunc.__defaultExecution) ||
          (executionFunc._execution && isExecutionEqual(execution, executionFunc._execution))
        ) {
          // no execution was passed in both this and the previous call, the executions are equal, so check if arguments are equal
          if (
            execution
              ? (options.equalArguments as any)(
                  executionFunc.__arguments,
                  _arguments.slice(0, _arguments.length - 1),
                )
              : (options.equalArguments as any)(executionFunc.__arguments, _arguments)
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
          _arguments.push(execution);
          executionFunc.__defaultExecution = true;
        } else {
          execution = execution.nest() as E;
          delete executionFunc.__defaultExecution;
          _arguments[_arguments.length - 1] = execution;
        }

        executionFunc._execution = execution;
        executionFunc.__arguments = _arguments.slice(0, _arguments.length - 1) as A;
        executionFunc.__returned = func(..._arguments);

        return executionFunc.__returned;
      } as any;
    } else {
      // all arguments are deemed equal, so just validate executions
      executionFunc = function (..._arguments: [..._arguments: A, execution: E]): RT {
        let execution: E;
        if (_arguments.length > 0) {
          execution = _arguments.pop();

          if (!(execution instanceof Execution)) {
            _arguments.push(execution);
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
            _arguments.push(execution);
            executionFunc.__defaultExecution = true;
          } else {
            execution = execution.nest() as E;
            delete executionFunc.__defaultExecution;
            _arguments[_arguments.length - 1] = execution;
          }

          executionFunc._execution = execution;
          executionFunc.__returned = func(..._arguments);

          return executionFunc.__returned;
        }
      } as any;
    }
  } else {
    executionFunc = function (..._arguments: [..._arguments: A, execution: E]): RT {
      // cancel the previous execution
      if (executionFunc._execution) {
        executionFunc._execution.cancel();
      }

      // get the new execution and mutate the arguments with the new execution
      let execution: E = _arguments[_arguments.length - 1];
      if (!(execution instanceof Execution)) {
        execution = defaultExecution() as E;
        executionFunc.__defaultExecution = true;
        // the last argument is not an execution, so we assume it was not passed
        _arguments.push(execution);
      } else {
        // an execution was passed, so nest it and replace it in the arguments
        execution = execution.nest() as E;
        delete executionFunc.__defaultExecution;
        _arguments[_arguments.length - 1] = execution;
      }

      executionFunc._execution = execution;

      return func(..._arguments);
    } as any;
  }

  return executionFunc;
}

export interface ExecutionFunc<A extends any[], RT, E extends Execution> {
  (..._arguments: [..._arguments: A, execution?: E]): RT;

  _execution?: E;
  __defaultExecution?: boolean;
  __arguments?: A;
  __returned?: RT;
}

export interface ExecutionFuncOptions<A extends any[], E extends Execution> {
  /** If defined, every call to the function will be validated to see if the returned value
   * of the previous call should be returned, instead of calling the function again and
   * canceling the passed execution. It will only do this if the passed executions
   * are deemed equal (or are both undefined), though this can be configured using the `equalExecutions` option.
   * If set `true`, all parameters are deemed equal, and only the execution will be validated. */
  equalArguments?: boolean | void | ((a: A, b: A) => boolean);
  /** If `equalArguments` is defined, this option can determine whether two executions are equal.
   * If set `true`, all executions are deemed equal. */
  equalExecutions?: boolean | void | ((a: E, b: E) => boolean);
  /** If the function is called without a defined execution, a fallback execution is defaulted to.
   * This defaults to a never-canceled execution, but can be overriden using this option.
   * As always, the execution is nested before being passed to the inner function. */
  defaultExecution?: E | (() => E);
}
