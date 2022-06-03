import { executionRun } from '../src';
import { Execution } from '../src/Execution';

describe('executionRun', () => {
  it('returns correctly synchronously without canceled execution', () => {
    const execution = new Execution();

    expect(executionRun(execution, () => 1)).toBe(1);
    expect(
      executionRun(
        execution,
        () => 1,
        i => i + 1,
      ),
    ).toBe(2);
  });

  it('returns correctly asynchronously without canceled execution', () => {
    const execution = new Execution();

    expect(executionRun(execution, () => resolveValueAfterTimeout(1, 100))).resolves.toBe(1);
    expect(
      executionRun(
        execution,
        () => resolveValueAfterTimeout(1, 50),
        i => resolveValueAfterTimeout(i + 1, 150),
        i => resolveValueAfterTimeout(i + 3, 100),
      ),
    ).resolves.toBe(5);
  }, 500);

  it('returns correctly asynchronously with canceled execution', () => {
    const execution = new Execution();

    const actions: [() => Promise<number>] = [
      () => resolveValueAfterTimeout(1, 5),
      (i: number) => resolveValueAfterTimeout(i + 4, 15),
      (i: number) => resolveValueAfterTimeout(i * 3, 10),
    ] as any;

    expect(executionRun(execution, ...actions)).resolves.toBe(15);

    setTimeout(function () {
      expect(executionRun(execution, ...actions)).resolves.toBe(undefined);

      setTimeout(function () {
        execution.cancel();
      }, 5);
    }, 50);
  }, 500);
});

function resolveValueAfterTimeout<T>(value: T, ms: number): Promise<T> {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve(value);
    }, ms);
  });
}
