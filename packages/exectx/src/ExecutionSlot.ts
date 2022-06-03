import { Execution, ExecutionCanceledListener, ExecutionCanceledUnsubscriber } from './Execution';
import { ExecutionsArg } from './parseExecutionsArg';

/**
 * It is oftentime useful to declare a slot for a category of executions. For instance, a service might have
 * a method that uses an execution but that should only be processing once. It simply features that if there is a current
 * pending execution in the slot when a new execution is set, the previous execution is set canceled.
 *
 * @param {ExecutionsArg} parent - Parent(s) to inherit cancellation state from.
 * @class ExecutionSlot
 * @augments Execution
 * @typicalname executionSlot
 * @classdesc A cancelable that holds one execution simultaneously and cancels executions when replaced.
 */
export class ExecutionSlot<T extends Execution = Execution> extends Execution {
  protected _current: T | undefined;

  constructor(parent?: ExecutionsArg) {
    super(parent);

    delete this._current;
  }

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

    if (!this['_cancellationListeners']) {
      this['_cancellationListeners'] = new Set();
    }

    if (!this._current['_cancellationListeners']) {
      this._current['_cancellationListeners'] = new Set();
    }

    this['_cancellationListeners'].add(listener);

    this._current['_cancellationListeners'].add(listener);

    return () => {
      if (this._current && this._current['_cancellationListeners']) {
        this._current['_cancellationListeners'].delete(listener);
      }

      if (this['_cancellationListeners']) {
        this['_cancellationListeners'].delete(listener);

        return true;
      }

      return false;
    };
  }

  /**
   * Set the current execution of the execution slot. If there already is a defined execution that is not
   * equal to the passed execution, that execution is set canceled. If no execution is passed, a new one is constructed.
   * It returns the set execution.
   *
   * @param {Execution} execution - The execution to replace the current execution of the execution slot with.
   * @returns {Execution} The set execution.
   */
  set(execution: T = new Execution() as T): T {
    if (this._current !== execution) {
      if (this['_cancellationListeners']) {
        if (execution.canceled) {
          // remove current cancellation listeners if the set execution is canceled
          this['_cancellationListeners'].forEach(listener => {
            this._current['_cancellationListeners'].delete(listener);
            listener();
          });
          delete this['_cancellationListeners'];
        } else {
          if (!execution['_cancellationListeners']) {
            execution['_cancellationListeners'] = new Set();
          }

          // remove cancellation listeners from current execution and add to the new execution
          this['_cancellationListeners'].forEach(listener => {
            this._current['_cancellationListeners'].delete(listener);
            execution['_cancellationListeners'].add(listener);
          });
        }
      }

      if (this._current) {
        this._current.cancel();
      }

      this._current = execution;
    }

    return execution;
  }

  /**
   * If defined, cancels the current execution, and removes it from the execution slot.
   */
  cancel() {
    if (this._current) {
      this._current.cancel();
      delete this['_cancellationListeners'];
      this._current = undefined;
    }
  }

  /**
   * @returns {string} A string representation of the execution slot, which contains a key that identifies
   * the execution in the global execution context.
   */
  protected toString() {
    if (this._current) {
      return 'ExecutionSlot(' + this['_key'] + ':' + this._current['_key'] + ')';
    }

    return 'ExecutionSlot(' + this['_key'] + ')';
  }

  /**
   * The current execution of the execution slot.
   *
   * @returns {Execution} The current execution of the execution slot.
   */
  get current(): T {
    return this._current;
  }

  /**
   * Whether the currently defined execution is canceled or if there is no execution currently defined.
   */
  get canceled(): boolean {
    return this._current ? this._current.canceled : true;
  }

  /**
   * A promise that is resolved when the `canceled`-state of the execution slot returns false.
   * That is, it does not simply return the promise for the `canceled`-state of the currently defined execution.
   * If the execution slot is currently canceled, a resolved promise is returned.
   */
  get promiseCanceled(): Promise<void> {
    if (this.canceled) {
      return Promise.resolve();
    }

    return new Promise(resolve => this.onCanceled(resolve));
  }
}
