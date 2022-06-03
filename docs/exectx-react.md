# Module: exectx-react

## Table of contents

### Interfaces

- [ContextProviderProps](../wiki/exectx-react.ContextProviderProps)
- [DefaultContextValues](../wiki/exectx-react.DefaultContextValues)
- [ReactContext](../wiki/exectx-react.ReactContext)

### Variables

- [defaultContext](../wiki/exectx-react#defaultcontext)

### Functions

- [ContextProvider](../wiki/exectx-react#contextprovider)
- [createContext](../wiki/exectx-react#createcontext)
- [useContext](../wiki/exectx-react#usecontext)
- [useExecution](../wiki/exectx-react#useexecution)
- [useExecutionFunc](../wiki/exectx-react#useexecutionfunc)
- [useExecutionSlot](../wiki/exectx-react#useexecutionslot)
- [useResolvedValue](../wiki/exectx-react#useresolvedvalue)

## Variables

### defaultContext

• `Const` **defaultContext**: [`ReactContext`](../wiki/exectx-react.ReactContext)<[`DefaultContextValues`](../wiki/exectx-react.DefaultContextValues)\>

The default React context that is used.

#### Defined in

exectx-react/src/createReactContext.ts:54

## Functions

### ContextProvider

▸ **ContextProvider**<`PV`, `V`\>(`props`): `JSX.Element`

Nests the consumed [`Context`](../wiki/exectx.Context) of a React context and provides it.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `PV` | extends `object` = [`DefaultContextValues`](../wiki/exectx-react.DefaultContextValues) |
| `V` | extends `object` = `PV` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`ContextProviderProps`](../wiki/exectx-react.ContextProviderProps)<`V`, `V`\> |

#### Returns

`JSX.Element`

#### Defined in

exectx-react/src/ContextProvider.tsx:14

___

### createContext

▸ **createContext**<`V`\>(`values?`, `parent?`): [`ReactContext`](../wiki/exectx-react.ReactContext)<`V`\>

Creates a React context for a [`Context`](../wiki/exectx.Context).
It can be nested using the [`ContextProvider`](../wiki/exectx-react#contextprovider).

#### Type parameters

| Name | Type |
| :------ | :------ |
| `V` | extends `object` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `values?` | `V` | Default values to set to the root context. |
| `parent?` | [`ContextParentArg`](../wiki/exectx#contextparentarg)<`V`\> | arent(s) to inherit values and/or cancellation state from. |

#### Returns

[`ReactContext`](../wiki/exectx-react.ReactContext)<`V`\>

The created React context.

#### Defined in

exectx-react/src/createReactContext.ts:15

___

### useContext

▸ **useContext**<`V`\>(`context?`): [`Context`](../wiki/exectx.Context)<`V`\>

React hook for consuming a provided [`Context`](../wiki/exectx.Context).

**`see`** [`ContextProvider`](../wiki/exectx-react#contextprovider)

**`see`** {@linkcode createReactContext}

#### Type parameters

| Name | Type |
| :------ | :------ |
| `V` | extends `object` = [`DefaultContextValues`](../wiki/exectx-react.DefaultContextValues) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `context` | [`ReactContext`](../wiki/exectx-react.ReactContext)<`V`\> | The React context to consume. Defaults to the [`defaultContext`](../wiki/exectx-react#defaultcontext). |

#### Returns

[`Context`](../wiki/exectx.Context)<`V`\>

The consumed context.

#### Defined in

exectx-react/src/useContext.ts:16

___

### useExecution

▸ **useExecution**(`parent?`, `deps?`): [`Execution`](../wiki/exectx.Execution)

React hook for using an [`Execution`](../wiki/exectx.Execution) that is canceled when the component is unmounted.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `parent?` | [`ExecutionsArg`](../wiki/exectx#executionsarg)<[`Execution`](../wiki/exectx.Execution)\> | If defined, the returned execution will be nested from the specified parent(s). If specified as an array and the `deps` are undefined, make sure to memoize the array. |
| `deps` | readonly `any`[] | When identities of the `deps` change, the execution will be reconstructed. |

#### Returns

[`Execution`](../wiki/exectx.Execution)

The constructed execution.

#### Defined in

exectx-react/src/useExecution.ts:12

___

### useExecutionFunc

▸ **useExecutionFunc**<`A`, `RT`, `E`\>(`innerFunc`, `options?`, `deps?`): [`ExecutionFunc`](../wiki/exectx.ExecutionFunc)<`A`, `RT`, `E`\>

React hook for using an execution-dependent function and cancel any pending call when the component is unmounted.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `A` | extends `any`[] |
| `RT` | `RT` |
| `E` | extends [`Execution`](../wiki/exectx.Execution)<`E`\> |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `innerFunc` | [`InnerExecutionFunc`](../wiki/exectx#innerexecutionfunc)<`A`, `RT`, `E`\> | Function that receives the passed parameters and an execution as the final parameter. |
| `options?` | [`ExecutionFuncOptions`](../wiki/exectx.ExecutionFuncOptions)<`A`, `E`\> | Options for the behaviour of the execution function. For instance, these allow for using the previously returned value of the function if the arguments and the passed execution are deemed equal. |
| `deps?` | readonly `any`[] | When identities of the `deps` change, the execution func will be reconstructed, so make sure to specify these if the `innerFunc` or `options` depend on any changing variable. |

#### Returns

[`ExecutionFunc`](../wiki/exectx.ExecutionFunc)<`A`, `RT`, `E`\>

The transformed execution func, which accepts an execution as the final optional parameter.

#### Defined in

exectx-react/src/useExecutionFunc.ts:20

___

### useExecutionSlot

▸ **useExecutionSlot**<`T`\>(`parent?`, `deps?`): [`ExecutionSlot`](../wiki/exectx.ExecutionSlot)<`T`\>

React hook for using an [`ExecutionSlot`](../wiki/exectx.ExecutionSlot) that is canceled when the component is unmounted or when the `deps` change.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Execution`](../wiki/exectx.Execution)<`T`\> = [`Execution`](../wiki/exectx.Execution) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `parent?` | [`ExecutionsArg`](../wiki/exectx#executionsarg)<[`Execution`](../wiki/exectx.Execution)\> | If defined, the returned execution slot will be nested from the specified parent(s). If specified as an array and the `deps` are undefined, make sure to memoize the array. |
| `deps` | readonly `any`[] | When identities of the `deps` change, the execution slot will be reconstructed. |

#### Returns

[`ExecutionSlot`](../wiki/exectx.ExecutionSlot)<`T`\>

The constructed execution slot.

#### Defined in

exectx-react/src/useExecutionSlot.ts:12

___

### useResolvedValue

▸ **useResolvedValue**<`T`, `RT`, `E`\>(`options`, `deps?`): `RT` \| `undefined`

React hook for using a resolved value and cancelling any pending resolution of the value when the component unmounts
or when any of the specified `deps` change.

#### Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `T` | `T` | - |
| `RT` | `T` | The type of the resolved value. |
| `E` | extends [`Execution`](../wiki/exectx.Execution)<`E`\> = [`Execution`](../wiki/exectx.Execution) | - |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`ExecutionResolveOptions`](../wiki/exectx.ExecutionResolveOptions)<`T`, `RT`, `E`\> | Specifies how to resolve the value and configures the use of executions. If an `executionSlot` is specified, it will be canceled when the component unmounts or when the `deps` change. |
| `deps?` | readonly `any`[] | When identities of the `deps` change, the value will be resolved again. Should be defined if the `options` depend on any changing value. |

#### Returns

`RT` \| `undefined`

The resolved value, or undefined if it's currently being resolved.

#### Defined in

exectx-react/src/useResolvedValue.ts:20
