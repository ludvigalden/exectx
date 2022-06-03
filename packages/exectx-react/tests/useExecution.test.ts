import { renderHook } from '@testing-library/react-hooks';
import { Execution } from 'exectx';

import { useExecution } from '../src/useExecution';

describe('useExecution', () => {
  test('execution gets cancel on unmount', () => {
    const { result, unmount } = renderHook(() => useExecution());

    expect(result.current).toBeInstanceOf(Execution);
    expect(result.current.canceled).toBe(false);

    unmount();

    expect(result.current.canceled).toBe(true);
  });
});
