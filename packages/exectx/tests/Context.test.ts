import { Context, ContextParent, NestedContextValues } from '../src/Context';
import { Execution } from '../src/Execution';

describe('Context', () => {
  describe('constructs correctly', () => {
    const context = new Context({ name: 'exectx' });

    it('has correct initial values', () => {
      expect(context.canceled).toBe(false);
      expect(context.get('name')).toBe('exectx');
    });

    const childContext = context.nest({ founded: 2022 });

    test('child has correct initial values', () => {
      expect(childContext.canceled).toBe(false);
      expect(childContext.get('name')).toBe('exectx');
      expect(childContext.get('founded')).toBe(2022);
    });
  });

  describe('inherits cancellation state from execution', () => {
    it('has correct initial cancellation state', () => {
      const execution = new Execution();
      const context = new Context({ name: 'exectx' }, execution);
      const childContext = context.nest({ founded: 2022 });

      expect(execution.canceled).toBe(false);
      expect(context.canceled).toBe(false);
      expect(childContext.canceled).toBe(false);
    });

    it('has correct initial cancellation state', () => {
      const execution = new Execution();
      const context = new Context({ name: 'exectx' }, execution);
      const childContext = context.nest({ founded: 2022 });

      execution.cancel();

      expect(execution.canceled).toBe(true);
      expect(context.canceled).toBe(true);
      expect(childContext.canceled).toBe(true);
    });
  });

  describe('custom constructors', () => {
    interface LocationValues {
      pathname: string;
      query?: string;
    }

    interface DeepLocationValues extends LocationValues {
      index: number;
    }

    class Location<V extends LocationValues = LocationValues> extends Context<V> {
      nest(values?: Partial<V>, ...otherParents: ContextParent<V>[]): Location<V>;
      nest<CV extends object>(
        values?: CV,
        ...otherParents: ContextParent<CV>[]
      ): Location<NestedContextValues<V, CV>>;
      nest<CV extends object>(
        values?: CV,
        ...otherParents: ContextParent<CV>[]
      ): Location<NestedContextValues<V, CV>> {
        return Context.nest<V, CV, Location<NestedContextValues<V, CV>>>({
          parent: this,
          otherParents,
          values,
          contextConstructor: Location as any,
        });
      }

      get pathname(): string {
        return this.get('pathname');
      }
    }

    class DeepLocation extends Location<DeepLocationValues> {
      nest(
        values?: Partial<DeepLocationValues>,
        ...otherParents: ContextParent<DeepLocationValues>[]
      ): DeepLocation {
        return Context.nest<DeepLocationValues, Partial<DeepLocationValues>, DeepLocation>({
          parent: this,
          otherParents,
          values,
          contextConstructor: DeepLocation as any,
        });
      }

      get index(): number {
        return this.get('index');
      }
    }

    describe('constructs correctly', () => {
      const context = new DeepLocation({ pathname: '/exectx', index: 0 });

      it('has correct initial values', () => {
        expect(context.canceled).toBe(false);
        expect(context).toBeInstanceOf(DeepLocation);
        expect(context.pathname).toBe('/exectx');
        expect(context.index).toBe(0);
      });

      test('child has correct initial values', () => {
        const childContext = context.nest({ index: 1 });

        expect(childContext.canceled).toBe(false);
        expect(childContext).toBeInstanceOf(DeepLocation);
        expect(childContext.pathname).toBe('/exectx');
        expect(childContext.index).toBe(1);
      });

      test('can add parent using prototype.nest()', () => {
        const counterContext = new Location({ pathname: '/exectx/cool', query: '?cool' });
        const childContext = context.nest({ index: 1 });

        expect(childContext.pathname).toBe('/exectx');
        expect(childContext.index).toBe(1);

        Context.nest({
          child: childContext,
          parent: counterContext,
        });

        expect(childContext.pathname).toBe('/exectx'); // would not be "/exectx/cool" beause `context` comes before
        expect(childContext.get('query')).toBe('?cool');
      });
    });
  });
});
