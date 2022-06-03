import { Execution } from './Execution';

/**
 * Parses loosely specified executions into an array of valid executions.
 *
 * @param {ExecutionsArg} arg - Loosely specified execution(s).
 * @returns {Execution[]} Array of valid executions.
 */
export function parseExecutionsArg<T extends Execution = Execution>(arg?: ExecutionsArg<T>): T[] {
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

/**
 * Loosely specifies one or more executions, which can also be undefined or otherwise falsey.
 */
export type ExecutionsArg<T extends Execution = Execution> =
  | T
  | void
  | null
  | false
  | undefined
  | Iterable<T | void | null | false | undefined>
  | Iterable<T>;
