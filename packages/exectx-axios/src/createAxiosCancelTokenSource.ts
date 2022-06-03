import axios, { CancelTokenSource } from 'axios';
import { Execution } from 'exectx';

/**
 * Creates a {@linkcode CancelTokenSource} based on an execution for use with {@linkcode axios}.
 *
 * @param {Execution} execution - The execution from which to inherit cancellation state from.
 * @returns {CancelTokenSource} The cancel token to be used with {@linkcode axios}.
 */
export function createAxiosCancelTokenSource(execution?: Execution): CancelTokenSource {
  if (!(execution instanceof Execution)) {
    execution = new Execution();
  }

  // eslint-disable-next-line import/no-named-as-default-member
  const source = axios.CancelToken.source();
  const sourceCanceler = source.cancel;

  const unsubscribeCancellation = execution.onCanceled(function cancelAxiosRequest() {
    source.cancel(String(execution) + ' canceled');
  });

  source.cancel = function cancelSourceAndExecution(message) {
    unsubscribeCancellation();
    execution.cancel();
    sourceCanceler(message);
  };

  return source;
}

/**
 * @external axios
 * @see https://github.com/axios/axios
 */
