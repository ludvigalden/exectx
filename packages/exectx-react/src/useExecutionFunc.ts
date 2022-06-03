import {
  Execution,
  ExecutionFunc,
  ExecutionFuncOptions,
  InnerExecutionFunc,
  executionFunc,
} from 'exectx';
import { useClearedMemo } from 'use-cleared-memo';

/**
 * React hook for using an execution-dependent function and cancel any pending call when the component is unmounted.
 *
 * @param {InnerExecutionFunc} innerFunc - Function that receives the passed parameters and an execution as the final parameter.
 * @param {ExecutionFuncOptions} options - Options for the behaviour of the execution function. For instance, these allow for
 * using the previously returned value of the function if the arguments and the passed execution are deemed equal.
 * @param {ReadonlyArray} deps - When identities of the `deps` change, the execution func will be reconstructed, so make
 * sure to specify these if the `innerFunc` or `options` depend on any changing variable.
 * @returns {ExecutionFunc} The transformed execution func, which accepts an execution as the final optional parameter.
 */
export function useExecutionFunc<A extends any[], RT, E extends Execution>(
  innerFunc: InnerExecutionFunc<A, RT, E>,
  options?: ExecutionFuncOptions<A, E>,
  deps?: readonly any[],
): ExecutionFunc<A, RT, E> {
  return useClearedMemo(
    function constructExecution() {
      return executionFunc(innerFunc, options);
    },
    function cancelExecution(func) {
      if (func._execution) {
        func._execution.cancel();
      }
    },
    deps,
  );
}
