import { Execution, nestExecution } from '../src';

describe('Execution', () => {
  describe('constructs correctly', () => {
    const execution = new Execution();

    test('execution has correct initial values', () => {
      expect(execution.canceled).toBe(false);
    });

    const childExecution = execution.nest();

    test('child execution has correct initial values', () => {
      expect(childExecution.canceled).toBe(false);
    });
  });

  // We test the `onCanceled` feature by using the `promise` getter, since this
  // is based on `onCanceled`, and we need to use promises for tests anyway.

  describe('promise resolves after being canceled', () => {
    const execution = new Execution();
    const childExecution = execution.nest();

    let executionPromiseResolved = false;

    test('execution promise resolves', () => {
      expect(
        execution.promiseCanceled.then(() => {
          executionPromiseResolved = true;
        }),
      ).resolves.toBeUndefined();
    }, 10);

    test('child execution promise resolves', () => {
      expect(childExecution.promiseCanceled).resolves.toBeUndefined();
    }, 10);

    test('child execution promise resolves after parent promise resolves', () => {
      expect(childExecution.promiseCanceled.then(() => executionPromiseResolved)).resolves.toBe(
        true,
      );
    }, 10);
  });

  describe('cancellation state changes correctly after being canceled', () => {
    const execution = new Execution();
    const childExecution = execution.nest();

    execution.cancel();

    test('execution has correct cancellation state after canceled', () => {
      expect(execution.canceled).toBe(true);
    });

    test('child execution has correct cancellation state after parent is canceled', () => {
      expect(childExecution.canceled).toBe(true);
    });
  });

  describe('promise resolves when execution is already canceled', () => {
    const execution = new Execution();
    const childExecution = execution.nest();

    execution.cancel();

    test('execution promise resolves after being canceled', () => {
      expect(execution.promiseCanceled).resolves.toBeUndefined();
    }, 10);

    test('child execution promise resolves after parent is canceled', () => {
      expect(childExecution.promiseCanceled).resolves.toBeUndefined();
    }, 10);
  });

  test('works with multiple nested layers', () => {
    const executions = [new Execution()];

    for (let i = 0; i < 10; i++) {
      executions.push(executions[i].nest());
    }

    executions[9].cancel();
    expect(executions[9].canceled).toBe(true);
    expect(executions[8].canceled).toBe(false);

    executions[7].cancel();
    expect(executions[9].canceled).toBe(true);
    expect(executions[8].canceled).toBe(true);
    expect(executions[7].canceled).toBe(true);
    expect(executions[6].canceled).toBe(false);

    executions[0].cancel();
    executions.forEach(execution => expect(execution.canceled).toBe(true));
  });

  describe('prototype.nest()', () => {
    class SpecialExecution extends Execution {}

    it('nests with special constructor', () => {
      const execution = new Execution();

      const childExecution = nestExecution({
        parent: execution,
        customConstructor: SpecialExecution,
      });

      expect(childExecution).toBeInstanceOf(SpecialExecution);
    });

    test('correct cancellation state with special constructor', () => {
      const execution = new Execution();

      const childExecution = nestExecution({
        parent: execution,
        customConstructor: SpecialExecution,
      });

      expect(execution.canceled).toBe(false);
      expect(childExecution.canceled).toBe(false);

      execution.cancel();

      expect(execution.canceled).toBe(true);
      expect(childExecution.canceled).toBe(true);
    });

    test('special constructor nests normal execution without overriden method', () => {
      expect(new SpecialExecution().nest()).not.toBeInstanceOf(SpecialExecution);
      expect(new SpecialExecution().nest()).toBeInstanceOf(Execution);
    });
  });
});
