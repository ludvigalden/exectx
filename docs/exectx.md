# Module: exectx

## Table of contents

### Classes

- [Context](../wiki/exectx.Context)
- [Execution](../wiki/exectx.Execution)
- [ExecutionSlot](../wiki/exectx.ExecutionSlot)

### Interfaces

- [ExecutionFunc](../wiki/exectx.ExecutionFunc)
- [ExecutionFuncOptions](../wiki/exectx.ExecutionFuncOptions)
- [ExecutionResolveOptions](../wiki/exectx.ExecutionResolveOptions)
- [NestContextOptions](../wiki/exectx.NestContextOptions)
- [NestExecutionOptions](../wiki/exectx.NestExecutionOptions)

### Type Aliases

- [ArgumentsEqualityChecker](../wiki/exectx#argumentsequalitychecker)
- [ContextConstructor](../wiki/exectx#contextconstructor)
- [ContextParent](../wiki/exectx#contextparent)
- [ContextParentArg](../wiki/exectx#contextparentarg)
- [ExecutionCanceledListener](../wiki/exectx#executioncanceledlistener)
- [ExecutionCanceledUnsubscriber](../wiki/exectx#executioncanceledunsubscriber)
- [ExecutionConstructor](../wiki/exectx#executionconstructor)
- [ExecutionEqualityChecker](../wiki/exectx#executionequalitychecker)
- [ExecutionGetter](../wiki/exectx#executiongetter)
- [ExecutionsArg](../wiki/exectx#executionsarg)
- [InnerExecutionFunc](../wiki/exectx#innerexecutionfunc)
- [NestedContextValues](../wiki/exectx#nestedcontextvalues)
- [ReadonlyExecution](../wiki/exectx#readonlyexecution)
- [RootRunAction](../wiki/exectx#rootrunaction)
- [RunAction](../wiki/exectx#runaction)
- [RunReturnValue](../wiki/exectx#runreturnvalue)

### Functions

- [executionFunc](../wiki/exectx#executionfunc)
- [executionResolve](../wiki/exectx#executionresolve)
- [executionRun](../wiki/exectx#executionrun)
- [nestContext](../wiki/exectx#nestcontext)
- [nestExecution](../wiki/exectx#nestexecution)
- [parseExecutionsArg](../wiki/exectx#parseexecutionsarg)

## Type Aliases

### ArgumentsEqualityChecker

Ƭ **ArgumentsEqualityChecker**<`A`\>: (`a`: `A`, `b`: `A`) => `boolean`

#### Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `A` | extends `any`[] | Type of parameters. |

#### Type declaration

▸ (`a`, `b`): `boolean`

Determines whether two executions are equal.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `a` | `A` | Parameters A. |
| `b` | `A` | Parameters B. |

##### Returns

`boolean`

Whether the arguments are equal.

#### Defined in

[exectx/src/executionFunc.ts:240](https://github.com/ludvigalden/exectx/blob/832bc31/packages/exectx/src/executionFunc.ts#L240)

___

### ContextConstructor

Ƭ **ContextConstructor**<`V`, `T`\>: (`values?`: `V`, `parent?`: [`ContextParentArg`](../wiki/exectx#contextparentarg)<`V`\>) => `T`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `V` | extends `object` = `any` |
| `T` | extends [`Context`](../wiki/exectx.Context)<`V`\> = [`Context`](../wiki/exectx.Context)<`V`\> |

#### Type declaration

• (`values?`, `parent?`)

A constructor for a custom  context, which can be specified when nesting contexts.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `values?` | `V` | Values that are specific to the context. |
| `parent?` | [`ContextParentArg`](../wiki/exectx#contextparentarg)<`V`\> | Parent(s) to inherit values and/or cancellation state from. |

#### Defined in

[exectx/src/nestContext.ts:116](https://github.com/ludvigalden/exectx/blob/832bc31/packages/exectx/src/nestContext.ts#L116)

___

### ContextParent

Ƭ **ContextParent**<`V`\>: [`Context`](../wiki/exectx.Context)<`V`\> \| [`Context`](../wiki/exectx.Context)<`Partial`<`V`\>\> \| [`Execution`](../wiki/exectx.Execution)

Parent(s) to inherit values and/or cancellation state from.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `V` | extends `object` |

#### Defined in

[exectx/src/nestContext.ts:98](https://github.com/ludvigalden/exectx/blob/832bc31/packages/exectx/src/nestContext.ts#L98)

___

### ContextParentArg

Ƭ **ContextParentArg**<`V`\>: [`ExecutionsArg`](../wiki/exectx#executionsarg)<[`ContextParent`](../wiki/exectx#contextparent)<`V`\>\>

Specifies the type for the `parent` argument when constructing a context.

Because of issues with type inference, the context parent can be any type of context
(with types of values that possibly does not match the types of values of the constructed child).
This may be fixed in the future, which is why the `V` generic should be specified, declaring the
type of values of the child context.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `V` | extends `object` = `object` |

#### Defined in

[exectx/src/nestContext.ts:108](https://github.com/ludvigalden/exectx/blob/832bc31/packages/exectx/src/nestContext.ts#L108)

___

### ExecutionCanceledListener

Ƭ **ExecutionCanceledListener**: () => `void`

#### Type declaration

▸ (): `void`

Listener for when an execution is canceled.

##### Returns

`void`

#### Defined in

[exectx/src/Execution.ts:155](https://github.com/ludvigalden/exectx/blob/832bc31/packages/exectx/src/Execution.ts#L155)

___

### ExecutionCanceledUnsubscriber

Ƭ **ExecutionCanceledUnsubscriber**: () => `boolean`

#### Type declaration

▸ (): `boolean`

Unsubscriber for a listener for when an execution is canceled.

##### Returns

`boolean`

Whether the listener was unsubscribed (not having previously been unsubscribed.)

#### Defined in

[exectx/src/Execution.ts:162](https://github.com/ludvigalden/exectx/blob/832bc31/packages/exectx/src/Execution.ts#L162)

___

### ExecutionConstructor

Ƭ **ExecutionConstructor**<`T`, `PT`\>: (`parent?`: [`ExecutionsArg`](../wiki/exectx#executionsarg)<`PT`\>) => `T`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Execution`](../wiki/exectx.Execution) = [`Execution`](../wiki/exectx.Execution) |
| `PT` | extends [`Execution`](../wiki/exectx.Execution) = [`Execution`](../wiki/exectx.Execution) |

#### Type declaration

• (`parent?`)

A constructor for a custom execution, which can be specified when nesting executions.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `parent?` | [`ExecutionsArg`](../wiki/exectx#executionsarg)<`PT`\> | Parent(s) to inherit cancellation state from. |

#### Defined in

[exectx/src/nestExecution.ts:67](https://github.com/ludvigalden/exectx/blob/832bc31/packages/exectx/src/nestExecution.ts#L67)

___

### ExecutionEqualityChecker

Ƭ **ExecutionEqualityChecker**<`E`\>: (`a`: `E`, `b`: `E`) => `boolean`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `E` | extends [`Execution`](../wiki/exectx.Execution) = [`Execution`](../wiki/exectx.Execution) |

#### Type declaration

▸ (`a`, `b`): `boolean`

Determines whether two executions are equal.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `a` | `E` | Execution A. |
| `b` | `E` | Execution B. |

##### Returns

`boolean`

Whether the executions are equal.

#### Defined in

[exectx/src/executionFunc.ts:230](https://github.com/ludvigalden/exectx/blob/832bc31/packages/exectx/src/executionFunc.ts#L230)

___

### ExecutionGetter

Ƭ **ExecutionGetter**<`E`\>: () => `E`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `E` | extends [`Execution`](../wiki/exectx.Execution) = [`Execution`](../wiki/exectx.Execution) |

#### Type declaration

▸ (): `E`

Function that returns an execution.

##### Returns

`E`

#### Defined in

[exectx/src/executionFunc.ts:221](https://github.com/ludvigalden/exectx/blob/832bc31/packages/exectx/src/executionFunc.ts#L221)

___

### ExecutionsArg

Ƭ **ExecutionsArg**<`T`\>: `T` \| `void` \| ``null`` \| ``false`` \| `undefined` \| `Iterable`<`T` \| `void` \| ``null`` \| ``false`` \| `undefined`\> \| `Iterable`<`T`\>

Loosely specifies one or more executions, which can also be undefined or otherwise falsey.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Execution`](../wiki/exectx.Execution) = [`Execution`](../wiki/exectx.Execution) |

#### Defined in

[exectx/src/parseExecutionsArg.ts:24](https://github.com/ludvigalden/exectx/blob/832bc31/packages/exectx/src/parseExecutionsArg.ts#L24)

___

### InnerExecutionFunc

Ƭ **InnerExecutionFunc**<`A`, `RT`, `E`\>: (...`params`: [params: A, execution: E]) => `RT`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `A` | extends `any`[] |
| `RT` | `RT` |
| `E` | extends [`Execution`](../wiki/exectx.Execution) |

#### Type declaration

▸ (...`params`): `RT`

Function that receives the passed parameters and an execution as the final parameter.

##### Parameters

| Name | Type |
| :------ | :------ |
| `...params` | [params: A, execution: E] |

##### Returns

`RT`

#### Defined in

[exectx/src/executionFunc.ts:173](https://github.com/ludvigalden/exectx/blob/832bc31/packages/exectx/src/executionFunc.ts#L173)

___

### NestedContextValues

Ƭ **NestedContextValues**<`PV`, `V`\>: `V` & `PV`

Merged values of a nested context.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `PV` | extends `object` = `any` |
| `V` | extends `object` = `PV` |

#### Defined in

[exectx/src/nestContext.ts:92](https://github.com/ludvigalden/exectx/blob/832bc31/packages/exectx/src/nestContext.ts#L92)

___

### ReadonlyExecution

Ƭ **ReadonlyExecution**: `Omit`<[`Execution`](../wiki/exectx.Execution), ``"cancel"``\>

A read-only variant of an execution. Currently only useful for typing purposes.
Removes the opportunity to cancel the execution.

#### Defined in

[exectx/src/Execution.ts:150](https://github.com/ludvigalden/exectx/blob/832bc31/packages/exectx/src/Execution.ts#L150)

___

### RootRunAction

Ƭ **RootRunAction**<`T`\>: () => [`RunReturnValue`](../wiki/exectx#runreturnvalue)<`T`\>

#### Type parameters

| Name | Description |
| :------ | :------ |
| `T` | The value passed to the next action. |

#### Type declaration

▸ (): [`RunReturnValue`](../wiki/exectx#runreturnvalue)<`T`\>

The first action to be used by [`executionRun`](../wiki/exectx#executionrun).

##### Returns

[`RunReturnValue`](../wiki/exectx#runreturnvalue)<`T`\>

The value to pass to the next action unless undefined.

#### Defined in

[exectx/src/executionRun.ts:198](https://github.com/ludvigalden/exectx/blob/832bc31/packages/exectx/src/executionRun.ts#L198)

___

### RunAction

Ƭ **RunAction**<`T1`, `T2`\>: (`value`: `T1`) => [`RunReturnValue`](../wiki/exectx#runreturnvalue)<`T2`\>

#### Type parameters

| Name | Description |
| :------ | :------ |
| `T1` | The value returned from the previous action. |
| `T2` | The value passed to the next action. |

#### Type declaration

▸ (`value`): [`RunReturnValue`](../wiki/exectx#runreturnvalue)<`T2`\>

A consecutive action to be used by [`executionRun`](../wiki/exectx#executionrun).

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `T1` | The value returned from the previously run action. |

##### Returns

[`RunReturnValue`](../wiki/exectx#runreturnvalue)<`T2`\>

The value to pass to the next action unless undefined.

#### Defined in

[exectx/src/executionRun.ts:190](https://github.com/ludvigalden/exectx/blob/832bc31/packages/exectx/src/executionRun.ts#L190)

___

### RunReturnValue

Ƭ **RunReturnValue**<`T`\>: `T` \| `void` \| `Promise`<`T` \| `void`\>

The return value used by [`executionRun`](../wiki/exectx#executionrun).

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[exectx/src/executionRun.ts:203](https://github.com/ludvigalden/exectx/blob/832bc31/packages/exectx/src/executionRun.ts#L203)

## Functions

### executionFunc

▸ **executionFunc**<`A`, `RT`, `E`\>(`innerFunc`, `options?`): [`ExecutionFunc`](../wiki/exectx.ExecutionFunc)<`A`, `RT`, `E`\>

Transforms a function so that it always receives an execution as the last argument and only runs the function for one execution at a time.
That is, if the function returned from `executionFunc(innerFunc)` is called with an execution, such as `(...args, executionA)`, and is later
called with a different execution before the previous call has finished (or the returned promise has been resolved), such as `(...args, executionB)`,
the execution passed to the `func` will be canceled. On the other hand, if it's called with the same `executionA`, the same value will be returned as
from the previous call.

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

#### Returns

[`ExecutionFunc`](../wiki/exectx.ExecutionFunc)<`A`, `RT`, `E`\>

The transformed execution func, which accepts an execution as the final optional parameter.

#### Defined in

[exectx/src/executionFunc.ts:15](https://github.com/ludvigalden/exectx/blob/832bc31/packages/exectx/src/executionFunc.ts#L15)

___

### executionResolve

▸ **executionResolve**<`T`, `RT`, `E`\>(`options`): `RT` \| `Promise`<`RT` \| `void`\>

Resolves the specified value and applies any specified options, such as formatting the resolved value,
handling interruptions, using default executions, nesting executions properly, and so on. It is useful
if you don't know if a value will be resolved synchronously or asynchronously, and returning a promise
in case any of the specified options leads to any asynchronicity. It can also be used as a tool
for resolving expensive values.

#### Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `T` | `T` | - |
| `RT` | `T` | The type of the returned value. |
| `E` | extends [`Execution`](../wiki/exectx.Execution)<`E`\> = [`Execution`](../wiki/exectx.Execution) | - |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`ExecutionResolveOptions`](../wiki/exectx.ExecutionResolveOptions)<`T`, `RT`, `E`\> | Specifies how to resolve the value and configures the use of executions. |

#### Returns

`RT` \| `Promise`<`RT` \| `void`\>

The resolved value, or undefined if the execution was canceled while resolving the value.

#### Defined in

[exectx/src/executionResolve.ts:18](https://github.com/ludvigalden/exectx/blob/832bc31/packages/exectx/src/executionResolve.ts#L18)

___

### executionRun

▸ **executionRun**<`T`\>(`execution`, `action`, ...`actions`): [`RunReturnValue`](../wiki/exectx#runreturnvalue)<`T`\>

Runs one or more actions for an execution and returns the value returned from the last action.

#### Type parameters

| Name | Description |
| :------ | :------ |
| `T` | Value returned from any of the actions. |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `execution` | [`Execution`](../wiki/exectx.Execution) | Execution to attach to the run. If canceled during the run, the run is canceled and undefined is returned. |
| `action` | [`RootRunAction`](../wiki/exectx#rootrunaction)<`T`\> |  |
| `...actions` | [`RunAction`](../wiki/exectx#runaction)<`T`, `T`\>[] |  |

#### Returns

[`RunReturnValue`](../wiki/exectx#runreturnvalue)<`T`\>

If the execution is canceled before the last action as finished, or if any of the run actions return undefined,
undefined is returned. Otherwise, the value returned from the last action is returned. If any of the run actions return a promise, a promise is returned.

#### Defined in

[../exectx/src/executionRun.ts:15](https://github.com/ludvigalden/exectx/blob/832bc31/packages/exectx/src/executionRun.ts#L15)

___

### nestContext

▸ **nestContext**<`PV`, `V`, `T`\>(`options`): `T`

Makes a child context that inherits cancellation-state and values from any number of parent(s).
It can be pre-constructed by specifying a `child` or constructed using a custom `constructor`.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `PV` | extends `object` |
| `V` | extends `object` = `PV` |
| `T` | extends [`Context`](../wiki/exectx.Context)<[`NestedContextValues`](../wiki/exectx#nestedcontextvalues)<`PV`, `V`\>, `T`\> = [`Context`](../wiki/exectx.Context)<[`NestedContextValues`](../wiki/exectx#nestedcontextvalues)<`PV`, `V`\>\> |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`NestContextOptions`](../wiki/exectx.NestContextOptions)<`PV`, `V`, `T`\> | Advanced options for nesting executions. |

#### Returns

`T`

The nested execution.

#### Defined in

[exectx/src/nestContext.ts:13](https://github.com/ludvigalden/exectx/blob/832bc31/packages/exectx/src/nestContext.ts#L13)

___

### nestExecution

▸ **nestExecution**<`T`, `PT`\>(`options`): `T`

Makes a child execution that inherits cancellation-state from any number of parent(s).
It can be pre-constructed by specifying a `child` or constructed using a `customConstructor`.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Execution`](../wiki/exectx.Execution)<`T`\> |
| `PT` | extends [`Execution`](../wiki/exectx.Execution)<`PT`\> |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`NestExecutionOptions`](../wiki/exectx.NestExecutionOptions)<`T`, `PT`\> | Advanced options for nesting executions. |

#### Returns

`T`

The nested execution.

#### Defined in

[exectx/src/nestExecution.ts:11](https://github.com/ludvigalden/exectx/blob/832bc31/packages/exectx/src/nestExecution.ts#L11)

___

### parseExecutionsArg

▸ **parseExecutionsArg**<`T`\>(`arg?`): `T`[]

Parses loosely specified executions into an array of valid executions.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Execution`](../wiki/exectx.Execution)<`T`\> = [`Execution`](../wiki/exectx.Execution) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arg?` | [`ExecutionsArg`](../wiki/exectx#executionsarg)<`T`\> | Loosely specified execution(s). |

#### Returns

`T`[]

Array of valid executions.

#### Defined in

[exectx/src/parseExecutionsArg.ts:9](https://github.com/ludvigalden/exectx/blob/832bc31/packages/exectx/src/parseExecutionsArg.ts#L9)
