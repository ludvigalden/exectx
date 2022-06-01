# Module: exectx-react

## Table of contents

### Functions

- [useExecution](../wiki/exectx-react#useexecution)

## Functions

### useExecution

▸ **useExecution**(`parent?`, `deps?`): [`Execution`](../wiki/exectx.Execution)

Use an execution that is canceled when the component is unmounted or when the `deps` change.
If the `parent` is specified as an array and the `deps` are undefined, make sure to memoize the array.

#### Parameters

| Name | Type |
| :------ | :------ |
| `parent?` | `ExecutionParentArg`<[`Execution`](../wiki/exectx.Execution)\> |
| `deps` | readonly `any`[] |

#### Returns

[`Execution`](../wiki/exectx.Execution)

#### Defined in

exectx-react/src/useExecution.ts:8
