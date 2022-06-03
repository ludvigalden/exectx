import isPromise from 'is-promise';

import { Execution, ExecutionCanceledUnsubscriber } from './Execution';

/**
 * Runs one or more actions for an execution and returns the value returned from the last action.
 *
 * @param {Execution} execution - Execution to attach to the run. If canceled during the run, the run is canceled and undefined is returned.
 * @param {function(): RunReturnValue<T>} action
 * @param {...function(T): RunReturnValue<T>} actions
 * @returns {RunReturnValue<T>} If the execution is canceled before the last action as finished, or if any of the run actions return undefined,
 * undefined is returned. Otherwise, the value returned from the last action is returned. If any of the run actions return a promise, a promise is returned.
 * @template T Value returned from any of the actions.
 */
export function executionRun<T>(
  execution: Execution,
  action: RootRunAction<T>,
  ...actions: RunAction<T, T>[]
): RunReturnValue<T>;
/**
 * Runs two or more actions for an execution and returns the value returned from the last action.
 *
 * @param {Execution} execution - Execution to attach to the run. If canceled during the run, the run is canceled and undefined is returned.
 * @param {function(): RunReturnValue<T1>} action_1 - First action to run.
 * @param {function(T1): RunReturnValue<T2>} action_2 - Second action to run, receiving the value of the first action.
 * @param {...function(T2): RunReturnValue<T2>} actions - Consecutive actions to run, receiving the value from the previously run action.
 * @returns {RunReturnValue<T2>} If the execution is canceled before the last action as finished, or if any of the run actions return undefined,
 * undefined is returned. Otherwise, the value returned from the last action is returned. If any of the run actions return a promise, a promise is returned.
 * @template T1 Value returned from the first action.
 * @template T2 Value returned from the second and the rest of the actions.
 * @ignore
 */
export function executionRun<T1, T2>(
  execution: Execution,
  action_1: RootRunAction<T1>,
  action_2: RunAction<T1, T2>,
  ...actions: RunAction<T2, T2>[]
): RunReturnValue<T2>;
/**
 * Runs three or more actions for an execution and returns the value returned from the last action.
 *
 * @param {Execution} execution - Execution to attach to the run. If canceled during the run, the run is canceled and undefined is returned.
 * @param {function(): RunReturnValue<T1>} action_1 - First action to run.
 * @param {function(T1): RunReturnValue<T2>} action_2 - Second action to run, receiving the value of the first action.
 * @param {function(T2): RunReturnValue<T3>} action_3 - Third action to run, receiving the value of the second action.
 * @param {...function(T3): RunReturnValue<T3>} actions - Consecutive actions to run, receiving the value from the previously run action.
 * @returns {RunReturnValue<T3>} If the execution is canceled before the last action as finished, or if any of the run actions return undefined,
 * undefined is returned. Otherwise, the value returned from the last action is returned. If any of the run actions return a promise, a promise is returned.
 * @template T1 Value returned from the first action.
 * @template T2 Value returned from the second action.
 * @template T3 Value returned from the third and the rest of the actions.
 * @ignore
 */
export function executionRun<T1, T2, T3>(
  execution: Execution,
  action_1: RootRunAction<T1>,
  action_2: RunAction<T1, T2>,
  action_3: RunAction<T2, T3>,
  ...actions: RunAction<T3, T3>[]
): RunReturnValue<T3>;
/**
 * Runs four or more actions for an execution and returns the value returned from the last action.
 *
 * @param {Execution} execution - Execution to attach to the run. If canceled during the run, the run is canceled and undefined is returned.
 * @param {function(): RunReturnValue<T1>} action_1 - First action to run.
 * @param {function(T1): RunReturnValue<T2>} action_2 - Second action to run, receiving the value of the first action.
 * @param {function(T2): RunReturnValue<T3>} action_3 - Third action to run, receiving the value of the second action.
 * @param {function(T3): RunReturnValue<T4>} action_4 - Fourth action to run, receiving the value of the third action.
 * @param {...function(T4): RunReturnValue<T4>} actions - Consecutive actions to run, receiving the value from the previously run action.
 * @returns {RunReturnValue<T4>} If the execution is canceled before the last action as finished, or if any of the run actions return undefined,
 * undefined is returned. Otherwise, the value returned from the last action is returned. If any of the run actions return a promise, a promise is returned.
 * @template T1 Value returned from the first action.
 * @template T2 Value returned from the second action.
 * @template T3 Value returned from the third action.
 * @template T4 Value returned from the fourth and the rest of the actions.
 * @ignore
 */
export function executionRun<T1, T2, T3, T4>(
  execution: Execution,
  action_1: RootRunAction<T1>,
  action_2: RunAction<T1, T2>,
  action_3: RunAction<T2, T3>,
  action_4: RunAction<T3, T4>,
  ...actions: RunAction<T4, T4>[]
): RunReturnValue<T4>;
/**
 * Runs five or more actions for an execution and returns the value returned from the last action.
 *
 * @param {Execution} execution - Execution to attach to the run. If canceled during the run, the run is canceled and undefined is returned.
 * @param {function(): RunReturnValue<T1>} action_1 - First action to run.
 * @param {function(T1): RunReturnValue<T2>} action_2 - Second action to run, receiving the value of the first action.
 * @param {function(T2): RunReturnValue<T3>} action_3 - Third action to run, receiving the value of the second action.
 * @param {function(T3): RunReturnValue<T4>} action_4 - Fourth action to run, receiving the value of the third action.
 * @param {function(T4): RunReturnValue<T5>} action_5 - Fifth action to run, receiving the value of the fouth action.
 * @param {...function(T5): RunReturnValue<T5>} actions - Consecutive actions to run, receiving the value from the previously run action.
 * @returns {RunReturnValue<T5>} If the execution is canceled before the last action as finished, or if any of the run actions return undefined,
 * undefined is returned. Otherwise, the value returned from the last action is returned. If any of the run actions return a promise, a promise is returned.
 * @template T1 Value returned from the first action.
 * @template T2 Value returned from the second action.
 * @template T3 Value returned from the third action.
 * @template T4 Value returned from the fourth action.
 * @template T5 Value returned from the fifth and the rest of the actions.
 * @ignore
 */
export function executionRun<T1, T2, T3, T4, T5>(
  execution: Execution,
  action_1: RootRunAction<T1>,
  action_2: RunAction<T1, T2>,
  action_3: RunAction<T2, T3>,
  action_4: RunAction<T3, T4>,
  action_5: RunAction<T4, T5>,
  ...actions: RunAction<T5, T5>[]
): RunReturnValue<T5>;

/**
 * Runs one or more actions for an execution and returns the value returned from the last action.
 *
 * @param {Execution} execution - Execution to attach to the run. If canceled during the run, the run is canceled and undefined is returned.
 * @param {...function(T): RunReturnValue<T>} actions - Consecutive actions to run, receiving the value from the previously run action.
 * @returns {RunReturnValue<T>} If the execution is canceled before the last action as finished, or if any of the run actions return undefined,
 * undefined is returned. Otherwise, the value returned from the last action is returned. If any of the run actions return a promise, a promise is returned.
 * @template T Value returned from any of the actions.
 */
export function executionRun<T>(
  execution: Execution,
  ...actions: RunAction<T | undefined, T>[]
): RunReturnValue<T> {
  let unsubscribeCanceled: ExecutionCanceledUnsubscriber;
  let canceled = execution.canceled;

  const canceledPromise = new Promise<void>(function (resolve) {
    unsubscribeCanceled = execution.onCanceled(function () {
      canceled = true;
      resolve();
    });
  });

  /**
   * @param {number} index - The index of the action to run
   * @param {?} value - The value returned from the previously run action.
   * @returns {RunReturnValue<T>} Value to pass to the next action or return from the original callee.
   * @ignore
   */
  function runAction(index: number, value: any): RunReturnValue<T> {
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

/**
 * A consecutive action to be used by {@linkcode executionRun}.
 *
 * @param {T1} value - The value returned from the previously run action.
 * @returns {RunReturnValue<T2>} The value to pass to the next action unless undefined.
 * @template T1 - The value returned from the previous action.
 * @template T2 - The value passed to the next action.
 */
export type RunAction<T1, T2> = (value: T1) => RunReturnValue<T2>;

/**
 * The first action to be used by {@linkcode executionRun}.
 *
 * @returns {RunReturnValue<T>} The value to pass to the next action unless undefined.
 * @template T - The value passed to the next action.
 */
export type RootRunAction<T> = () => RunReturnValue<T>;

/**
 * The return value used by {@linkcode executionRun}.
 */
export type RunReturnValue<T> = T | void | Promise<T | void>;
