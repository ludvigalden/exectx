import isPromise from 'is-promise';

/** An execution is a context-like object that holds information about an execution being canceled.
 * It is intended to be used for asynchronous actions that can be canceled at any point in the future.
 * An execution can be canceled using the `cancel` method and checked whether canceled using the `canceled` property.
 * Additional methods and properties for efficient usage of the `canceled` property are `onCanceled`, `run`, and `promise`. */
export class Execution {
  protected _key = Execution.generateKey();

  private _canceled?: boolean;
  private _cancellationListeners?: Set<ExecutionCanceledListener>;

  constructor(parent?: ExecutionParentArg) {
    delete this._canceled;
    delete this._cancellationListeners;

    Execution.nest({ parent, child: this });
  }

  /** Returns a child execution context that will be canceled whenever its parent is canceled, or when it is canceled itself.
   * Its state does not affect the state of its parent. */
  nest(): Execution {
    return new Execution(this);
  }

  /** Cancels the execution and notifies any listeners. It does not affect any parent executions.
   * Should only be used if the execution was constructed by you, or if you know what you're doing. */
  cancel() {
    if (this._canceled) {
      return;
    }

    this._canceled = true;

    if (!this._cancellationListeners) {
      return;
    }

    this._cancellationListeners.forEach(listener => listener());
    this._cancellationListeners.clear();
  }

  /** Listen to whenever the executions is canceled, and returns a function to stop listening.
   * If the execution is already canceled, the passed listener is called synchronously and the returned function does nothing. */
  onCanceled(listener: ExecutionCanceledListener): ExecutionCanceledUnsubscriber {
    if (typeof listener !== 'function') {
      return function noop() {
        return false;
      };
    } else if (this.canceled) {
      listener();

      return function noop() {
        return false;
      };
    }

    if (!this._cancellationListeners) {
      this._cancellationListeners = new Set();
    }

    this._cancellationListeners.add(listener);

    return () => {
      if (!this._cancellationListeners) {
        return false;
      }

      return this._cancellationListeners.delete(listener);
    };
  }

  /** Run actions for the execution. If any of the actions returns `undefined` or if the execution is canceled, the next action will not be run.
   * Every action inherits the value returned from the previous action (unless that value is `undefined`). */
  run<_1>(_1: () => _1 | void | Promise<_1 | void>): void | _1 | Promise<void | _1>;
  run<_1, _2>(
    _1: () => _1 | void | Promise<_1 | void>,
    _2: (_1: _1) => _2 | void | Promise<_2 | void>,
  ): _2 | void | Promise<_2 | void>;
  run<_1, _2, _3>(
    _1: () => _1 | void | Promise<_1 | void>,
    _2: (_1: _1) => _2 | void | Promise<_2 | void>,
    _3: (_2: _2) => _3 | void | Promise<_3 | void>,
  ): _3 | void | Promise<_3 | void>;
  run<_1, _2, _3, _4>(
    _1: () => _1 | void | Promise<_1 | void>,
    _2: (_1: _1) => _2 | void | Promise<_2 | void>,
    _3: (_2: _2) => _3 | void | Promise<_3 | void>,
    _4: (_3: _3) => _4 | void | Promise<_4 | void>,
  ): _4 | void | Promise<_4 | void>;
  run<_1, _2, _3, _4, _5>(
    _1: () => _1 | void | Promise<_1 | void>,
    _2: (_1: _1) => _2 | void | Promise<_2 | void>,
    _3: (_2: _2) => _3 | void | Promise<_3 | void>,
    _4: (_3: _3) => _4 | void | Promise<_4 | void>,
    _5: (_4: _4) => _5 | void | Promise<_5 | void>,
  ): _5 | void | Promise<_5 | void>;
  run<T>(...actions: any[]): void | T | Promise<void | T> {
    let unsubscribeCanceled: ExecutionCanceledUnsubscriber;
    let canceled = this.canceled;
    const canceledPromise = new Promise<void>(resolve => {
      unsubscribeCanceled = this.onCanceled(function () {
        canceled = true;
        resolve();
      });
    });

    function runAction(index: number, value: any): void | T | Promise<void | T> {
      if (canceled) {
        return;
      } else if (typeof actions[index] !== 'function') {
        unsubscribeCanceled();

        return value;
      }

      value = actions[index](value);

      if (isPromise(value)) {
        return Promise.race([
          canceledPromise,
          value.then(function (value) {
            if (canceled) {
              return;
            } else if (value === undefined) {
              unsubscribeCanceled();

              return;
            } else {
              return runAction(index + 1, value);
            }
          }),
        ]).catch(function (error) {
          unsubscribeCanceled();

          throw error;
        });
      } else {
        return runAction(index + 1, value);
      }
    }

    return runAction(0, undefined);
  }

  /** Returns a string representation of the execution, which contains a key that identifies
   * the execution in the global execution context. */
  protected toString() {
    return 'Execution(' + this._key + ')';
  }

  /** Returns a promise that resolves once the execution is canceled.
   * If the execution is already canceled, a resolved promise is returned. */
  get promiseCanceled(): Promise<void> {
    if (this.canceled) {
      return Promise.resolve();
    }

    return new Promise(resolve => this.onCanceled(resolve));
  }

  /** Whether the execution has been canceled. It can be checked manually in functions that accept
   * the execution as an argument in order to know whether to keep a process going, or if it should be canceled,
   * in order reduce the amount of uneccessary executions that lead to no effect. */
  get canceled() {
    return this._canceled === true;
  }

  static nest<T extends Execution, PT extends Execution>(options: NestExecutionOptions<T, PT>): T {
    const parents = Execution.parseParentArg(options.parent);
    if (!parents.length) {
      if (options.child) {
        return options.child;
      } else if (options.executionConstructor) {
        return new options.executionConstructor();
      } else {
        return new Execution() as T;
      }
    } else if (options.child) {
      parents.forEach(parent => {
        const unsubscribeCanceled = parent.onCanceled(function () {
          (options.child as T).cancel();
        });
        (options.child as T).onCanceled(unsubscribeCanceled);
      });

      return options.child;
    } else if (options.executionConstructor) {
      return new options.executionConstructor(parents);
    } else {
      return new Execution(parents) as T;
    }
  }

  static generateKey() {
    return keyIndex++;
  }

  static parseParentArg<T extends Execution>(arg: ExecutionParentArg<T> | Falsey): T[] {
    if (!arg) {
      return [];
    } else if (typeof (arg as Iterable<T>)[Symbol.iterator] === 'function') {
      return Array.from(arg as Iterable<T>).filter(v => v instanceof Execution);
    } else if (arg instanceof Execution) {
      return [arg];
    } else {
      return [];
    }
  }

  static isEqual(a: Execution, b: Execution): boolean {
    return a === b;
  }
}

/** A read-only variant of an execution. Currently only useful for typing purposes.
 * Removes the opportunity to cancel the execution. */
export interface ReadonlyExecution extends Omit<Execution, 'cancel'> {}

let keyIndex = -1;

export interface ExecutionCanceledListener {
  (): void;
}

export interface ExecutionCanceledUnsubscriber {
  (): boolean;
}

export type ExecutionParentArg<T extends Execution = Execution> = T | Iterable<T>;

export type ExecutionClass<
  T extends Execution = Execution,
  PT extends Execution = Execution,
> = new (parent?: ExecutionParentArg<PT>) => T;

export interface NestExecutionOptions<
  T extends Execution = Execution,
  PT extends Execution = Execution,
> {
  parent?: ExecutionParentArg<PT>;
  child?: T;
  executionConstructor?: ExecutionClass<T, PT>;
}

/** Any type that when constructed as a boolean resolves to `false`. */
export type Falsey = void | null | false | undefined;
