import { NestContextOptions, nestContext } from 'exectx';
import { createElement, useMemo, useContext as useReactContext } from 'react';
// @ts-ignore
// eslint-disable-next-line
import type { FunctionComponent } from 'react';

import { DefaultContextValues, ReactContext, defaultContext } from './createReactContext';

/**
 * Nests the consumed {@linkcode Context} of a React context and provides it.
 *
 * @type {FunctionComponent<ContextProviderProps>}
 */
export function ContextProvider<PV extends object = DefaultContextValues, V extends object = PV>(
  props: ContextProviderProps<V>,
): JSX.Element {
  const reactContext: ReactContext<V> = props.context || (defaultContext as any as ReactContext<V>);

  const context = useReactContext(reactContext);

  return createElement(reactContext.Provider, {
    value: useMemo(function () {
      return nestContext({ ...props, parent: context });
    }, (props.deps || []).concat(context)),
  });
}

/** @see {@linkcode ContextProvider} */
export interface ContextProviderProps<
  PV extends object = DefaultContextValues,
  V extends object = PV,
> extends Omit<NestContextOptions<PV, V>, 'parent' | 'child'> {
  /**
   * The context to provide and nest the consumed instance of.
   * If undefined, the {@linkcode defaultContext} will be used.
   */
  context?: ReactContext<V>;
  /**
   * When the identity of any of the `deps` array elements change,
   * the provided context will be re-constructed. If undefined, the provided
   * context will only be re-constructed when the consumed instance change.
   */
  deps?: readonly any[];
}
