import { Execution, ExecutionSlot, ExecutionsArg } from 'exectx';
import { useClearedMemo } from 'use-cleared-memo';

/**
 * React hook for using an {@linkcode ExecutionSlot} that is canceled when the component is unmounted or when the `deps` change.
 *
 * @param {ExecutionsArg} parent - If defined, the returned execution slot will be nested from the specified parent(s).
 * If specified as an array and the `deps` are undefined, make sure to memoize the array.
 * @param {ReadonlyArray} deps - When identities of the `deps` change, the execution slot will be reconstructed.
 * @returns {ExecutionSlot} The constructed execution slot.
 */
export function useExecutionSlot<T extends Execution = Execution>(
  parent?: ExecutionsArg,
  deps: readonly any[] = [parent],
): ExecutionSlot<T> {
  return useClearedMemo(
    function constructExecution() {
      return new ExecutionSlot<T>(parent);
    },
    function cancelExecutionSlot(execution) {
      execution.cancel();
    },
    deps,
  );
}
