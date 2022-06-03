import { Context } from './Context';
import { Execution } from './Execution';
import { nestExecution } from './nestExecution';
import { ExecutionsArg, parseExecutionsArg } from './parseExecutionsArg';

/**
 * Makes a child context that inherits cancellation-state and values from any number of parent(s).
 * It can be pre-constructed by specifying a `child` or constructed using a custom `constructor`.
 *
 * @param {NestContextOptions} options - Advanced options for nesting executions.
 * @returns {Execution} The nested execution.
 */
export function nestContext<
  PV extends object,
  V extends object = PV,
  T extends Context<NestedContextValues<PV, V>> = Context<NestedContextValues<PV, V>>,
>(options: NestContextOptions<PV, V, T>): T {
  const parents = parseExecutionsArg<Execution | Context>(options.parent);

  if (options.otherParents) {
    parents.push(
      ...parseExecutionsArg<Execution | Context>(options.otherParents.flat(1) as ExecutionsArg),
    );
  }

  if (!parents.length) {
    if (options.child) {
      return options.child;
    } else if (options.customConstructor) {
      return new options.customConstructor(options.values as V) as T;
    } else {
      return new Context(options.values as V) as T;
    }
  } else if (options.child) {
    if (!options.skipNestExecution) {
      nestExecution({
        parent: parents,
        child: options.child,
      });
    }

    // child inherits values from parent contexts
    const parentContexts = parents.filter(parent => parent instanceof Context) as Context<
      Partial<V>
    >[];

    if (parentContexts.length) {
      if (!options.child['_parents']) {
        Object.defineProperty(options.child, '_parents', {
          value: parentContexts,
          writable: false,
          enumerable: false,
        });
      } else {
        options.child['_parents'].push(...parentContexts);
      }
    }

    return options.child;
  } else if (options.customConstructor) {
    return new options.customConstructor(options.values as any, parents) as T;
  } else {
    return new Context(options.values as any, parents) as T;
  }
}

/**
 * @see {@linkcode nestContext}
 */
export interface NestContextOptions<
  PV extends object = any,
  V extends object = PV,
  T extends Context<NestedContextValues<PV, V>> = Context<NestedContextValues<PV, V>>,
> {
  /** Parent(s) to inherit values and/or cancellation state from. */
  parent?: ContextParentArg<PV>;
  /** Other parents to inherit values and/or cancellation state from. */
  otherParents?: ContextParentArg<V>[];
  /** Values to set to the nested context, which will replace values defined in parent contexts. */
  values?: V;
  /** Allows for nesting a pre-constructed context. */
  child?: T;
  /** Allows for using a custom constructor for the returned context. */
  customConstructor?: ContextConstructor<V>;
  /** Whether the cancellation-state should not be nested. */
  skipNestExecution?: boolean;
}

/**
 * Merged values of a nested context.
 */
export type NestedContextValues<PV extends object = any, V extends object = PV> = V & PV;
// export type NestedContextValues<PV extends object = any, V extends object = PV> = V & (PV extends V ? Omit<PV, keyof V> : PV);

/**
 * Parent(s) to inherit values and/or cancellation state from.
 */
export type ContextParent<V extends object> = Context<V> | Context<Partial<V>> | Execution;

/**
 * Specifies the type for the `parent` argument when constructing a context.
 *
 * Because of issues with type inference, the context parent can be any type of context
 * (with types of values that possibly does not match the types of values of the constructed child).
 * This may be fixed in the future, which is why the `V` generic should be specified, declaring the
 * type of values of the child context.
 */
export type ContextParentArg<V extends object = object> = ExecutionsArg<ContextParent<V>>;

/**
 * A constructor for a custom  context, which can be specified when nesting contexts.
 *
 * @param {object} values - Values that are specific to the context.
 * @param {ContextParentArg} parent - Parent(s) to inherit values and/or cancellation state from.
 */
export type ContextConstructor<V extends object = any, T extends Context<V> = Context<V>> = new (
  values?: V,
  parent?: ContextParentArg<V>,
) => T;
