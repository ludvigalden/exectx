import { nestExecution } from './nestExecution';
import { ExecutionsArg } from './parseExecutionsArg';

/**
 * An execution is a context-like object that holds information about an execution being canceled.
 * It is intended to be used for asynchronous actions that can be canceled at any point in the future.
 * An execution can be canceled using the `cancel` method and checked whether canceled using the `canceled` property.
 * Additional methods and properties for efficient usage of the `canceled` property are `onCanceled`, `run`, and `promise`.
 *
 * @param {ExecutionsArg} parent - Parent(s) to inherit cancellation state from.
 * @class Execution
 * @typicalname execution
 * @classdesc A cancelable that can inherit cancellation of other contexts and executions.
 */
export class Execution {
  protected _key = Execution.generateKey();

  private _canceled?: boolean;
  private _cancellationListeners?: Set<ExecutionCanceledListener>;

  constructor(parent?: ExecutionsArg) {
    delete this._canceled;
    delete this._cancellationListeners;

    nestExecution({ parent, child: this });
  }

  /**
   * @returns {Execution} A child execution context that will be canceled whenever its parent is canceled, or when it is canceled itself.
   * Its state does not affect the state of its parent.
   * @description Nests the execution.
   */
  nest(): Execution {
    return new Execution(this);
  }

  /**
   * Cancels the execution and notifies any listeners. It does not affect any parent executions.
   * Should only be used if the execution was constructed by you, or if you know what you're doing.
   */
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

  /**
   * Listens to whenever the execution is canceled.
   *
   * @param {ExecutionCanceledListener} listener - Called wheneer the execution is canceled.
   * If the execution is already canceled, the passed listener is called synchronously and the returned function does nothing.
   * @returns {ExecutionCanceledUnsubscriber} Unsubscriber for the listener.
   */
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

  /**
   * Returns a string representation of the execution.
   *
   * @returns {string} A string representation of the execution, which contains a key that identifies
   * the execution in the global execution context.
   * @protected
   */
  protected toString(): string {
    return 'Execution(' + this._key + ')';
  }

  /**
   * A promise that resolves whenever the execution is canceled, or if the execution is already canceled, a resolved promise.
   */
  get promiseCanceled(): Promise<void> {
    if (this.canceled) {
      return Promise.resolve();
    }

    return new Promise(resolve => this.onCanceled(resolve));
  }

  /**
   * Whether the execution has been canceled. It can be checked manually in functions that accept
   * the execution as an argument in order to know whether to keep a process going, or if it should be canceled,
   * in order reduce the amount of uneccessary executions that lead to no effect.
   *
   * @returns {boolean} Whether the execution has been canceled.
   */
  get canceled(): boolean {
    return this._canceled === true;
  }

  /**
   * @param {Execution} a - Execution A.
   * @param {Execution} b - Execution B.
   * @returns {boolean} Whether execution `a` and `b` are equal.
   * @description Whether two executions are equal to each other.
   */
  static isEqual(a: Execution, b: Execution): boolean {
    return a === b;
  }

  /**
   * @returns {number} A key unique for each execution in the execution context.
   * @description Generates a unique execution key.
   * @protected
   */
  protected static generateKey(): number {
    return keyIndex++;
  }
}

let keyIndex = -1;

/**
 * A read-only variant of an execution. Currently only useful for typing purposes.
 * Removes the opportunity to cancel the execution.
 */
export type ReadonlyExecution = Omit<Execution, 'cancel'>;

/**
 * Listener for when an execution is canceled.
 */
export type ExecutionCanceledListener = () => void;

/**
 * Unsubscriber for a listener for when an execution is canceled.
 *
 * @returns {boolean} Whether the listener was unsubscribed (not having previously been unsubscribed.)
 */
export type ExecutionCanceledUnsubscriber = () => boolean;
