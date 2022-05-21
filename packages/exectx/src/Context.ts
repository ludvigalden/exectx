import { Execution, ExecutionParentArg, NestExecutionOptions } from './Execution';

/** An execution that allows storing values and inheriting values and cancellation from parent contexts or executions. */
export class Context<V extends object = any> extends Execution {
  private _values?: V;
  private _parents?: Context[];

  constructor(values?: V, parent?: ContextParentArg<V>) {
    const parents = Context.parseParentArg(parent);

    super(parents);

    Object.defineProperty(this, '_values', {
      value: typeof values === 'object' && values !== null ? values : {},
      writable: false,
      enumerable: false,
    });

    Context.nest({ parent: parents, child: this, skipNestExecution: true });
  }

  set<K extends keyof V>(key: K, value: V[K]): this {
    this._values[key] = value;

    return this;
  }

  get<K extends keyof V>(key: K): V[K] {
    if (this.strictHas(key)) {
      return this._values[key];
    } else if (this._parents) {
      const foundParent = this._parents.find(parent => parent.has(key));
      if (foundParent) {
        return foundParent.get(key);
      }
    }

    return undefined;
  }

  has<K extends keyof V>(key: K): boolean {
    return (
      this.strictHas(key) || !!(this._parents && this._parents.find(parent => parent.has(key)))
    );
  }

  /** Returns a child context that inherits the cancellation state and values of this context (as well as any additional parents specified). */
  nest(values?: Partial<V>, ...otherParents: ContextParent<V>[]): Context<V>;
  nest<CV extends object>(
    values?: CV,
    ...otherParents: ContextParent<CV>[]
  ): Context<NestedContextValues<V, CV>>;
  nest<CV extends object>(
    values?: CV,
    ...otherParents: ContextParent<CV>[]
  ): Context<NestedContextValues<V, CV>> {
    return Context.nest<V, CV, Context<NestedContextValues<V, CV>>>({
      parent: this,
      otherParents,
      values,
      contextConstructor: Context,
    });
  }

  nestExecution() {
    return Execution.nest({ parent: this });
  }

  /** Returns all the values of a specific key among this instance and its parents, where it is defined. */
  protected getAll<K extends keyof V>(key: K): V[K][] {
    const properties: V[K][] = [];

    if (this.strictHas(key)) {
      properties.push(this.get(key));
    }

    if (this._parents) {
      this._parents.forEach(parent => {
        properties.push(...parent.getAll(key));
      });
    }

    return properties;
  }

  protected strictHas<K extends keyof V>(key: K): boolean {
    return this._values.hasOwnProperty(key);
  }

  protected toString() {
    const valuesString = Context.stringifyValues(this._values);
    if (!valuesString) {
      return 'Context(' + this['_key'] + ')';
    }

    return 'Context(' + this['_key'] + ', ' + valuesString + ')';
  }

  static nest<
    PV extends object,
    V extends object,
    T extends Context<NestedContextValues<PV, V>> = Context<NestedContextValues<PV, V>>,
  >(options: NestContextOptions<PV, V, T>): T;
  static nest<T extends Execution, PT extends Execution>(options: NestExecutionOptions<T, PT>): T;
  static nest<
    PV extends object,
    V extends object,
    T extends Context<NestedContextValues<PV, V>> = Context<NestedContextValues<PV, V>>,
  >(options: NestContextOptions<PV, V, T>): T {
    const parents = Execution.parseParentArg(options.parent);
    if (options.otherParents) {
      parents.push(
        ...Execution.parseParentArg(options.otherParents.flat(1) as Context<Partial<V>>[]),
      );
    }

    if (!parents.length) {
      if (options.child) {
        return options.child;
      } else if (options.contextConstructor) {
        return new options.contextConstructor(options.values as V) as T;
      } else {
        return new Context(options.values as V) as T;
      }
    } else if (options.child) {
      if (!options.skipNestExecution) {
        Execution.nest({
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
    } else if (options.contextConstructor) {
      return new options.contextConstructor(options.values as any, parents) as T;
    } else {
      return new Context(options.values as any, parents) as T;
    }
  }

  static stringifyValues(values: object): string {
    if (!values) {
      return '';
    }

    return JSON.stringify(values);
  }
}

export interface NestContextOptions<
  PV extends object = any,
  V extends object = PV,
  T extends Context<NestedContextValues<PV, V>> = Context<NestedContextValues<PV, V>>,
> extends NestExecutionOptions<T, ContextParent<V>> {
  parent?: ContextParentArg<V>;
  otherParents?: ContextParentArg<V>[];
  values?: V;
  child?: T;
  contextConstructor?: ContextClass<V>;
  skipNestExecution?: boolean;
}

export type ContextParent<V extends object> = Context<V> | Context<Partial<V>> | Execution;

export type NestedContextValues<PV extends object = any, V extends object = PV> = V & PV;
// export type NestedContextValues<PV extends object = any, V extends object = PV> = V & (PV extends V ? Omit<PV, keyof V> : PV);

/**
 * Specifies the type for the `parent` argument when constructing a context.
 *
 * Because of issues with type inference, the context parent can be any type of context
 * (with types of values that possibly does not match the types of values of the constructed child).
 * This may be fixed in the future, which is why the `V` generic should be specified, declaring the
 * type of values of the child context.
 */
export type ContextParentArg<V extends object> = ExecutionParentArg<ContextParent<V>>;

export type Class<T = any, A extends any[] = any[]> = new (...arguments_: A) => T;

export type ContextClass<V extends object = any, T extends Context<V> = Context<V>> = new (
  values?: V,
  parent?: ContextParentArg<V>,
) => T;
