import { Execution, ExecutionsArg } from 'exectx';
import { useClearedMemo } from 'use-cleared-memo';

/**
 * React hook for using an {@linkcode Execution} that is canceled when the component is unmounted.
 *
 * @param {ExecutionsArg} parent - If defined, the returned execution will be nested from the specified parent(s).
 * If specified as an array and the `deps` are undefined, make sure to memoize the array.
 * @param {ReadonlyArray} deps - When identities of the `deps` change, the execution will be reconstructed.
 * @returns {Execution} The constructed execution.
 */
export function useExecution(parent?: ExecutionsArg, deps: readonly any[] = [parent]): Execution {
  return useClearedMemo(
    function constructExecution() {
      return new Execution(parent);
    },
    function cancelExecution(execution) {
      execution.cancel();
    },
    deps,
  );
}
