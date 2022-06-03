import isPromise from 'is-promise';

import { Execution } from './Execution';
import { ExecutionGetter } from './executionFunc';
import { ExecutionSlot } from './ExecutionSlot';

/**
 * Resolves the specified value and applies any specified options, such as formatting the resolved value,
 * handling interruptions, using default executions, nesting executions properly, and so on. It is useful
 * if you don't know if a value will be resolved synchronously or asynchronously, and returning a promise
 * in case any of the specified options leads to any asynchronicity. It can also be used as a tool
 * for resolving expensive values.
 *
 * @param {ExecutionResolveOptions} options - Specifies how to resolve the value and configures the use of executions.
 * @returns {RT | Promise<RT | void>} The resolved value, or undefined if the execution was canceled while resolving the value.
 * @template RT - The type of the returned value.
 */
export function executionResolve<T, RT = T, E extends Execution = Execution>(
  options: ExecutionResolveOptions<T, RT, E>,
): RT | Promise<RT | void> {
  if (!options) {
    options = {};
  }

  const execution: E =
    options.execution instanceof Execution
      ? options.execution
      : options.defaultExecution instanceof Execution
      ? (options.defaultExecution.nest() as E)
      : typeof options.defaultExecution === 'function'
      ? (options.defaultExecution().nest() as E)
      : (new Execution() as E);

  if (typeof options.getValue === 'function') {
    if (options.executionSlot && !options.executionSlot.canceled) {
      return options.executionSlot.promiseCanceled.then(function ():
        | void
        | RT
        | Promise<void | RT> {
        if (execution.canceled) {
          return;
        }

        return executionResolve({ ...options, execution });
      });
    } else {
      options.value = options.getValue(execution);
    }
  }

  if (!options.hasOwnProperty('value') && typeof options.getDefaultValue === 'function') {
    if (options.executionSlot && !options.executionSlot.canceled) {
      return options.executionSlot.promiseCanceled.then(function ():
        | void
        | RT
        | Promise<void | RT> {
        if (execution.canceled) {
          return;
        }

        return executionResolve({ ...options, execution });
      });
    } else {
      options.value = options.getDefaultValue(execution);
    }
  }

  if (options.executionSlot && !options.executionSlotReadonly) {
    options.executionSlot.set(execution);
  }

  if (typeof options.formatValue === 'function') {
    if (isPromise(options.value)) {
      options.value = options.value.then(value => {
        if (execution.canceled) {
          return value;
        }

        return options.formatValue(value, execution);
      });
    } else {
      options.value = options.formatValue(options.value, execution);
    }
  }

  if (isPromise(options.value)) {
    return options.value.then((resolvedValue): void | RT | Promise<void | RT> => {
      if (execution.canceled) {
        if (typeof options.onInterrupted === 'function') {
          return options.onInterrupted(resolvedValue, execution);
        }

        return;
      }

      if (typeof options.onResolved === 'function') {
        const returned = options.onResolved(resolvedValue, execution);

        if (isPromise(returned)) {
          return returned.finally(function () {
            execution.cancel();
          });
        } else {
          execution.cancel();

          return returned;
        }
      } else {
        execution.cancel();

        return resolvedValue as unknown as RT;
      }
    });
  } else {
    if (typeof options.onResolved === 'function') {
      const returned = options.onResolved(options.value, execution);

      if (isPromise(returned)) {
        return returned.finally(function () {
          execution.cancel();
        });
      } else {
        execution.cancel();

        return returned;
      }
    } else {
      execution.cancel();

      return options.value as unknown as RT;
    }
  }
}

/**
 * @see {@linkcode executionResolve}
 */
export interface ExecutionResolveOptions<T, RT = T, E extends Execution = Execution> {
  /** The value to resolve. */
  value?: T | Promise<T>;
  /**
   * Get the value to resolve functionally, accepting the execution. If defined along with an `executionSlot`,
   * the promise of the execution slot is resolved before calling the `getValue` function, if the execution has not been canceled during that time.
   */
  getValue?(execution: E): T | Promise<T>;
  /**
   * Get the default value to resolve functionally, accepting the execution, if no `getValue` or `value` is specified. If defined along with an `executionSlot`,
   * the promise of the execution slot is resolved before calling the `getDefaultValue` function, if the execution has not been canceled during that time.
   */
  getDefaultValue?(execution: E): T | Promise<T>;
  /** Format the value after it has been resolved. */
  formatValue?(value: T, execution: E): T | Promise<T>;
  /**
   * Called when the `value` has been resolved and the execution has not been canceled.
   * If the passed value is not a promise, `onResolved` is called synchronously.
   */
  onResolved?(value: T, execution: E): RT | Promise<RT>;
  /**
   * Called if the execution is canceled during the time the value is being resolved.
   * The passed execution is in all cases canceled.
   */
  onInterrupted?(value: T, execution: E): RT | Promise<RT>;
  /** If canceled during the time the passed value is being resolved, the `onResolved` function will never be called. */
  execution?: E;
  /**
   * If defined, the resolved execution will be set to the execution slot, and the `getValue` or `getDefaultValue` option will not be called
   * while the execution slot has a current not-canceled execution.
   */
  executionSlot?: ExecutionSlot;
  /**
   * Whether the resolved execution should not be set to the execution slot, i.e. the execution slot
   * will only be used to resolve the `getValue` function.
   */
  executionSlotReadonly?: boolean;
  /**
   * If the function is called without a defined execution, a fallback execution is defaulted to.
   * This defaults to a never-canceled execution, but can be overriden using this option.
   * As always, the execution is nested before being passed to the inner function.
   */
  defaultExecution?: E | ExecutionGetter<E>;
}
