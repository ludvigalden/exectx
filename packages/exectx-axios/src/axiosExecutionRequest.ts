import axios, { AxiosPromise, AxiosRequestConfig } from 'axios';
import { Execution } from 'exectx';

import { createAxiosCancelTokenSource } from './createAxiosCancelTokenSource';

/**
 * Makes a request using {@linkcode axios.request} and attaches the specified execution, which
 * will cancel the request whenever the execution is canceled.
 *
 * @param {AxiosExecutionRequestConfig<D>} config Axios request configuration that also accepts an execution.
 * @returns {AxiosPromise<D>} A promise that resolves the axios response.
 * @template D - Requested type of data.
 */
export function axiosExecutionRequest<D = any>(
  config: AxiosExecutionRequestConfig<D>,
): AxiosPromise<D> {
  const cancelTokenSource = createAxiosCancelTokenSource(config?.execution);

  return axios.request({
    ...config,
    cancelToken: cancelTokenSource.token,
  });
}

/**
 * @see {@linkcode axiosExecutionRequest}
 */
export interface AxiosExecutionRequestConfig<D = any>
  extends Omit<AxiosRequestConfig<D>, 'cancelToken'> {
  /**
   * The execution to attach to the request. When canceled, the request will also be canceled.
   */
  execution?: Execution;
}

/**
 * @external axios
 * @see https://github.com/axios/axios
 */
