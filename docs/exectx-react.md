# Module: exectx-react

## Table of contents

### Interfaces

- [ReactContext](../wiki/exectx-react.ReactContext)

### Variables

- [defaultReactContext](../wiki/exectx-react#defaultreactcontext)

### Functions

- [createReactContext](../wiki/exectx-react#createreactcontext)
- [useExecution](../wiki/exectx-react#useexecution)
- [useExecutionFunc](../wiki/exectx-react#useexecutionfunc)
- [useExecutionSlot](../wiki/exectx-react#useexecutionslot)
- [useResolvedValue](../wiki/exectx-react#useresolvedvalue)

## Variables

### defaultReactContext

• `Const` **defaultReactContext**: [`ReactContext`](../wiki/exectx-react.ReactContext)<`object`\>

#### Defined in

exectx-react/src/createContext.ts:24

## Functions

### createReactContext

▸ **createReactContext**<`V`\>(`values?`, `parent?`): [`ReactContext`](../wiki/exectx-react.ReactContext)<`V`\>

Creates a react context.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `V` | extends `object` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `values?` | `V` |
| `parent?` | `ContextParentArg`<`V`\> |

#### Returns

[`ReactContext`](../wiki/exectx-react.ReactContext)<`V`\>

#### Defined in

exectx-react/src/createContext.ts:7

___

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

___

### useExecutionFunc

▸ **useExecutionFunc**<`A`, `RT`, `E`\>(`func`, `options?`, `deps?`): [`ExecutionFunc`](../wiki/exectx.ExecutionFunc)<`A`, `RT`, `E`\>

Use an execution dependent function and cancel any pending call when the component is unmounted or when the `deps` change.
Make sure to specify `deps` if the `func` or `options` depend on any changing value.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `A` | extends `any`[] |
| `RT` | `RT` |
| `E` | extends [`Execution`](../wiki/exectx.Execution)<`E`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `func` | (...`_arguments`: [...\_arguments: A[], execution: E]) => `RT` |
| `options?` | [`ExecutionFuncOptions`](../wiki/exectx.ExecutionFuncOptions)<`A`, `E`\> |
| `deps?` | readonly `any`[] |

#### Returns

[`ExecutionFunc`](../wiki/exectx.ExecutionFunc)<`A`, `RT`, `E`\>

#### Defined in

exectx-react/src/useExecutionFunc.ts:8

___

### useExecutionSlot

▸ **useExecutionSlot**(`parent?`, `deps?`): [`ExecutionSlot`](../wiki/exectx.ExecutionSlot)<[`Execution`](../wiki/exectx.Execution)\>

Use an execution slot that is canceled when the component is unmounted or when the `deps` change.
If the `parent` is specified as an array and the `deps` are undefined, make sure to memoize the array.

#### Parameters

| Name | Type |
| :------ | :------ |
| `parent?` | `ExecutionParentArg`<[`Execution`](../wiki/exectx.Execution)\> |
| `deps` | readonly `any`[] |

#### Returns

[`ExecutionSlot`](../wiki/exectx.ExecutionSlot)<[`Execution`](../wiki/exectx.Execution)\>

#### Defined in

exectx-react/src/useExecutionSlot.ts:8

___

### useResolvedValue

▸ **useResolvedValue**<`T`, `RT`, `E`\>(`options`, `deps?`): `RT` \| `undefined`

Use a resolved value and cancel any pending resoltion of the value when the component unmounts or when the `deps` change.
Make sure to specify `deps` if `options` depend on any changing value. Additionally, if an `executionSlot` is specified,
it will be canceled when the component unmounts or when the `deps` change.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `RT` | `T` |
| `E` | extends [`Execution`](../wiki/exectx.Execution)<`E`\> = [`Execution`](../wiki/exectx.Execution) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`ExecutionResolveOptions`](../wiki/exectx.ExecutionResolveOptions)<`T`, `RT`, `E`\> |
| `deps?` | readonly `any`[] |

#### Returns

`RT` \| `undefined`

#### Defined in

exectx-react/src/useResolvedValue.ts:14
