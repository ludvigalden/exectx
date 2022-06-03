import { Context } from 'exectx';
import { useContext as useReactContext } from 'react';

import { DefaultContextValues, ReactContext, defaultContext } from './createReactContext';

// eslint-disable-next-line @typescript-eslint/no-unused-vars

/**
 * React hook for consuming a provided {@linkcode Context}.
 *
 * @param {ReactContext} context - The React context to consume. Defaults to the {@linkcode defaultContext}.
 * @returns {Context} The consumed context.
 * @see {@linkcode ContextProvider}
 * @see {@linkcode createReactContext}
 */
export function useContext<V extends object = DefaultContextValues>(
  context: ReactContext<V> = defaultContext as any as ReactContext<V>,
): Context<V> {
  return useReactContext(context);
}
