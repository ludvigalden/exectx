import { Execution, ExecutionResolveOptions, executionResolve } from 'exectx';
import isPromise from 'is-promise';
import { useRef } from 'react';
import { useClearedMemo } from 'use-cleared-memo';
import { useForceUpdate } from 'use-safe-force-update';

import { useExecutionSlot } from './useExecutionSlot';

/**
 * React hook for using a resolved value and cancelling any pending resolution of the value when the component unmounts
 * or when any of the specified `deps` change.
 *
 * @param {ExecutionResolveOptions} options - Specifies how to resolve the value and configures the use of executions.
 * If an `executionSlot` is specified, it will be canceled when the component unmounts or when the `deps` change.
 * @param {ReadonlyArray} deps - When identities of the `deps` change, the value will be resolved again. Should be defined
 * if the `options` depend on any changing value.
 * @returns {RT | undefined} The resolved value, or undefined if it's currently being resolved.
 * @template RT - The type of the resolved value.
 */
export function useResolvedValue<T, RT = T, E extends Execution = Execution>(
  options: ExecutionResolveOptions<T, RT, E>,
  deps?: readonly any[],
): RT | undefined {
  const resolvedValue = useRef<RT | undefined>();
  const forceUpdate = useForceUpdate();
  const executionSlot = options?.executionSlot || useExecutionSlot();

  useClearedMemo(
    function resolveValue() {
      const value = executionResolve({ ...options, executionSlot });

      if (isPromise(value)) {
        const execution = executionSlot.current;

        value.then(function (value) {
          if (execution.canceled) {
            return;
          }

          if (resolvedValue.current !== value) {
            resolvedValue.current = value as RT;
            forceUpdate();
          }
        });
      }
    },
    function cancelExecution() {
      executionSlot.cancel();
    },
    deps,
    [executionSlot],
  );

  return resolvedValue.current;
}
