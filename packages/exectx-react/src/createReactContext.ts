import { Context, ContextParentArg } from 'exectx';
import { Context as BaseReactContext, createContext as createReactContext } from 'react';

// eslint-disable-next-line @typescript-eslint/no-unused-vars

/**
 * Creates a React context for a {@linkcode Context}.
 * It can be nested using the {@linkcode ContextProvider}.
 *
 * @param {V} values - Default values to set to the root context.
 * @param {ContextParentArg<V>} parent - arent(s) to inherit values and/or cancellation state from.
 * @returns {ReactContext<V>} The created React context.
 * @template V
 */
export function createContext<V extends object>(
  values?: V,
  parent?: ContextParentArg<V>,
): ReactContext<V> {
  const root = new Context(values, parent);
  const reactContext: ReactContext<V> = createReactContext<Context<V>>(root) as ReactContext<V>;

  reactContext.displayName = root['toString']();
  reactContext.root = root;

  return reactContext;
}

/**
 * React context that also have a `root` specified, which will be the consumed {@linkcode Context}
 * unless it has been nested using the {@linkcode ContextProvider}.
 */
export interface ReactContext<V extends object> extends BaseReactContext<Context<V>> {
  /** The root {@linkcode Context} that will be nested and consumed by React tree descendants. */
  root: Context<V>;
}

/**
 * The default React context values. They can be overriden like so:
 *
 * ```typescript
 * declare module 'exectx-react' {
 *   interface DefaultContextValues {
 *     role?: 'admin' | 'guest';
 *   }
 * }
 * ```
 */
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface DefaultContextValues {}

/**
 * The default React context that is used.
 */
export const defaultContext = createContext<DefaultContextValues>();
