import { Execution } from './Execution';
import { ContextParentArg, NestedContextValues, nestContext } from './nestContext';
import { nestExecution } from './nestExecution';
import { parseExecutionsArg } from './parseExecutionsArg';

/**
 * An {@linkcode Execution} that allows for storing values and inheriting values and cancellation state
 * from parent contexts and/or executions.
 *
 * @param {object} values - Values that are specific to the context.
 * @param {ContextParentArg} parent - Parent(s) to inherit values and/or cancellation state from.
 * @class Context
 * @augments Execution
 * @typicalname context
 * @classdesc A cancelable that holds mutable values and can inherit from other contexts and executions.
 */
export class Context<V extends object = any> extends Execution {
  private _values?: V;
  private _parents?: Context[];

  constructor(values?: V, parent?: ContextParentArg<V>) {
    const parents = parseExecutionsArg(parent);

    super(parents);

    Object.defineProperty(this, '_values', {
      value: typeof values === 'object' && values !== null ? values : {},
      writable: false,
      enumerable: false,
    });

    nestContext({ parent: parents, child: this, skipNestExecution: true });
  }

  /**
   * Sets a value of the context. It will override any value with the same key of any parent context.
   *
   * @param {?} key - The key of the value to set.
   * @param {?} value - The value to set to the key.
   */
  set<K extends keyof V>(key: K, value: V[K]): void {
    this._values[key] = value;
  }

  /**
   * @param {?} key - The key of the value to delete. When deleted, the value will be inherited from any parent(s).
   * @description Deletes a value of the context.
   */
  delete<K extends keyof V>(key: K): void {
    delete this._values[key];
  }

  /**
   * @param {?} key - The key of the value to retrieve.
   * @returns {?} The value defined in the context or in any of its parent contexts.
   * @description Retrieves a value of the context.
   */
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

  /**
   * @param {?} key - The key of the value to retrieve.
   * @returns {Array<?>} The values of a specific key among this instance and its parents, wherever it is found to be defined.
   * @description Retrieves values defined in the context and in any of its parents.
   */
  getAll<K extends keyof V>(key: K): V[K][] {
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

  /**
   * @param {?} key - The key of the value to check whether it is defined.
   * @returns {boolean} Whether a value is defined in the context or in any of its parent contexts.
   * @description Whether a value is defined in the context or in any of its parent contexts.
   */
  has<K extends keyof V>(key: K): boolean {
    return (
      this.strictHas(key) || !!(this._parents && this._parents.find(parent => parent.has(key)))
    );
  }

  /**
   * @param {object} values - Values to attach to the nested context.
   * @returns {Context} A child context that inherits the cancellation state and values of this context
   * (as well as any additional parents specified.)
   * @description Nests the context.
   */
  nest(values?: Partial<V>): Context<V>;
  /**
   * @param {object} values - Values to attach to the nested context.
   * @returns {Context} A child context that inherits the cancellation state and values of this context
   * (as well as any additional parents specified.)
   * @description Nests the context.
   */
  nest<CV extends object>(values?: CV): Context<NestedContextValues<V, CV>>;
  nest<CV extends object>(values?: CV): Context<NestedContextValues<V, CV>> {
    return nestContext<V, CV, Context<NestedContextValues<V, CV>>>({
      parent: this,
      values,
    });
  }

  /**
   * Nests the context to a execution that inherits the cancellation state of the context.
   *
   * @returns {Execution} A child execution context that will be canceled whenever its parent is canceled, or when it is canceled itself.
   * Its state does not affect the state of its parent.
   */
  nestExecution(): Execution {
    return nestExecution({ parent: this });
  }

  /**
   * @param {?} key - The key to check whether it is defined in this context instance.
   * @returns {boolean} Whether a value with the specified key is defined in this context instance.
   * @description Checks whether a key is defined in this context instance.
   * @protected
   */
  protected strictHas<K extends keyof V>(key: K): boolean {
    return this._values.hasOwnProperty(key);
  }

  /**
   * @returns {string} A string representation of the context, which contains the stringified values
   * and a key that identifies the execution in the global execution context.
   * @protected
   */
  protected toString(): string {
    const valuesString = Context.stringifyValues(this._values);

    if (!valuesString) {
      return 'Context(' + this['_key'] + ')';
    }

    return 'Context(' + this['_key'] + ', ' + valuesString + ')';
  }

  /**
   * Formats a string representation of context values.
   *
   * @param {object} values - Values to stringify.
   * @returns {string} Stringified version of the values.
   */
  static stringifyValues(values: object): string {
    if (!values) {
      return '';
    }

    return JSON.stringify(values);
  }
}
