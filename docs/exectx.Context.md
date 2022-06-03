# Class: Context<V\>

[exectx](../wiki/exectx).Context

An [`Execution`](../wiki/exectx.Execution) that allows for storing values and inheriting values and cancellation state
from parent contexts and/or executions.

**`param`** Values that are specific to the context.

**`param`** Parent(s) to inherit values and/or cancellation state from.

**`typicalname`** context

**`classdesc`** A cancelable that holds mutable values and can inherit from other contexts and executions.

## Type parameters

| Name | Type |
| :------ | :------ |
| `V` | extends `object` = `any` |

## Hierarchy

- [`Execution`](../wiki/exectx.Execution)

  ↳ **`Context`**

  ↳↳ [`ReactContext`](../wiki/exectx-react.ReactContext)

## Table of contents

### Constructors

- [constructor](../wiki/exectx.Context#constructor)

### Accessors

- [canceled](../wiki/exectx.Context#canceled)
- [promiseCanceled](../wiki/exectx.Context#promisecanceled)

### Methods

- [cancel](../wiki/exectx.Context#cancel)
- [delete](../wiki/exectx.Context#delete)
- [get](../wiki/exectx.Context#get)
- [getAll](../wiki/exectx.Context#getall)
- [has](../wiki/exectx.Context#has)
- [nest](../wiki/exectx.Context#nest)
- [nestExecution](../wiki/exectx.Context#nestexecution)
- [onCanceled](../wiki/exectx.Context#oncanceled)
- [set](../wiki/exectx.Context#set)
- [isEqual](../wiki/exectx.Context#isequal)
- [stringifyValues](../wiki/exectx.Context#stringifyvalues)

## Constructors

### constructor

• **new Context**<`V`\>(`values?`, `parent?`)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `V` | extends `object` = `any` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `values?` | `V` |
| `parent?` | [`ContextParentArg`](../wiki/exectx#contextparentarg)<`V`\> |

#### Overrides

[Execution](../wiki/exectx.Execution).[constructor](../wiki/exectx.Execution#constructor)

#### Defined in

[exectx/src/Context.ts:21](https://github.com/ludvigalden/exectx/blob/a0361f0/packages/exectx/src/Context.ts#L21)

## Accessors

### canceled

• `get` **canceled**(): `boolean`

Whether the execution has been canceled. It can be checked manually in functions that accept
the execution as an argument in order to know whether to keep a process going, or if it should be canceled,
in order reduce the amount of uneccessary executions that lead to no effect.

#### Returns

`boolean`

Whether the execution has been canceled.

#### Inherited from

Execution.canceled

#### Defined in

[exectx/src/Execution.ts:120](https://github.com/ludvigalden/exectx/blob/a0361f0/packages/exectx/src/Execution.ts#L120)

___

### promiseCanceled

• `get` **promiseCanceled**(): `Promise`<`void`\>

A promise that resolves whenever the execution is canceled, or if the execution is already canceled, a resolved promise.

#### Returns

`Promise`<`void`\>

#### Inherited from

Execution.promiseCanceled

#### Defined in

[exectx/src/Execution.ts:105](https://github.com/ludvigalden/exectx/blob/a0361f0/packages/exectx/src/Execution.ts#L105)

## Methods

### cancel

▸ **cancel**(): `void`

Cancels the execution and notifies any listeners. It does not affect any parent executions.
Should only be used if the execution was constructed by you, or if you know what you're doing.

#### Returns

`void`

#### Inherited from

[Execution](../wiki/exectx.Execution).[cancel](../wiki/exectx.Execution#cancel)

#### Defined in

[exectx/src/Execution.ts:41](https://github.com/ludvigalden/exectx/blob/a0361f0/packages/exectx/src/Execution.ts#L41)

___

### delete

▸ **delete**<`K`\>(`key`): `void`

**`description`** Deletes a value of the context.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends `string` \| `number` \| `symbol` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `K` | The key of the value to delete. When deleted, the value will be inherited from any parent(s). |

#### Returns

`void`

#### Defined in

[exectx/src/Context.ts:49](https://github.com/ludvigalden/exectx/blob/a0361f0/packages/exectx/src/Context.ts#L49)

___

### get

▸ **get**<`K`\>(`key`): `V`[`K`]

**`description`** Retrieves a value of the context.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends `string` \| `number` \| `symbol` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `K` | The key of the value to retrieve. |

#### Returns

`V`[`K`]

The value defined in the context or in any of its parent contexts.

#### Defined in

[exectx/src/Context.ts:58](https://github.com/ludvigalden/exectx/blob/a0361f0/packages/exectx/src/Context.ts#L58)

___

### getAll

▸ **getAll**<`K`\>(`key`): `V`[`K`][]

**`description`** Retrieves values defined in the context and in any of its parents.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends `string` \| `number` \| `symbol` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `K` | The key of the value to retrieve. |

#### Returns

`V`[`K`][]

The values of a specific key among this instance and its parents, wherever it is found to be defined.

#### Defined in

[exectx/src/Context.ts:77](https://github.com/ludvigalden/exectx/blob/a0361f0/packages/exectx/src/Context.ts#L77)

___

### has

▸ **has**<`K`\>(`key`): `boolean`

**`description`** Whether a value is defined in the context or in any of its parent contexts.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends `string` \| `number` \| `symbol` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `K` | The key of the value to check whether it is defined. |

#### Returns

`boolean`

Whether a value is defined in the context or in any of its parent contexts.

#### Defined in

[exectx/src/Context.ts:98](https://github.com/ludvigalden/exectx/blob/a0361f0/packages/exectx/src/Context.ts#L98)

___

### nest

▸ **nest**(`values?`): [`Context`](../wiki/exectx.Context)<`V`\>

**`description`** Nests the context.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `values?` | `Partial`<`V`\> | Values to attach to the nested context. |

#### Returns

[`Context`](../wiki/exectx.Context)<`V`\>

A child context that inherits the cancellation state and values of this context
(as well as any additional parents specified.)

#### Overrides

[Execution](../wiki/exectx.Execution).[nest](../wiki/exectx.Execution#nest)

#### Defined in

[exectx/src/Context.ts:110](https://github.com/ludvigalden/exectx/blob/a0361f0/packages/exectx/src/Context.ts#L110)

▸ **nest**<`CV`\>(`values?`): [`Context`](../wiki/exectx.Context)<[`NestedContextValues`](../wiki/exectx#nestedcontextvalues)<`V`, `CV`\>\>

**`description`** Nests the context.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `CV` | extends `object` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `values?` | `CV` | Values to attach to the nested context. |

#### Returns

[`Context`](../wiki/exectx.Context)<[`NestedContextValues`](../wiki/exectx#nestedcontextvalues)<`V`, `CV`\>\>

A child context that inherits the cancellation state and values of this context
(as well as any additional parents specified.)

#### Overrides

Execution.nest

#### Defined in

[exectx/src/Context.ts:117](https://github.com/ludvigalden/exectx/blob/a0361f0/packages/exectx/src/Context.ts#L117)

___

### nestExecution

▸ **nestExecution**(): [`Execution`](../wiki/exectx.Execution)

Nests the context to a execution that inherits the cancellation state of the context.

#### Returns

[`Execution`](../wiki/exectx.Execution)

A child execution context that will be canceled whenever its parent is canceled, or when it is canceled itself.
Its state does not affect the state of its parent.

#### Defined in

[exectx/src/Context.ts:131](https://github.com/ludvigalden/exectx/blob/a0361f0/packages/exectx/src/Context.ts#L131)

___

### onCanceled

▸ **onCanceled**(`listener`): [`ExecutionCanceledUnsubscriber`](../wiki/exectx#executioncanceledunsubscriber)

Listens to whenever the execution is canceled.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `listener` | [`ExecutionCanceledListener`](../wiki/exectx#executioncanceledlistener) | Called wheneer the execution is canceled. If the execution is already canceled, the passed listener is called synchronously and the returned function does nothing. |

#### Returns

[`ExecutionCanceledUnsubscriber`](../wiki/exectx#executioncanceledunsubscriber)

Unsubscriber for the listener.

#### Inherited from

[Execution](../wiki/exectx.Execution).[onCanceled](../wiki/exectx.Execution#oncanceled)

#### Defined in

[exectx/src/Execution.ts:63](https://github.com/ludvigalden/exectx/blob/a0361f0/packages/exectx/src/Execution.ts#L63)

___

### set

▸ **set**<`K`\>(`key`, `value`): `void`

Sets a value of the context. It will override any value with the same key of any parent context.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends `string` \| `number` \| `symbol` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `K` | The key of the value to set. |
| `value` | `V`[`K`] | The value to set to the key. |

#### Returns

`void`

#### Defined in

[exectx/src/Context.ts:41](https://github.com/ludvigalden/exectx/blob/a0361f0/packages/exectx/src/Context.ts#L41)

___

### isEqual

▸ `Static` **isEqual**(`a`, `b`): `boolean`

**`description`** Whether two executions are equal to each other.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `a` | [`Execution`](../wiki/exectx.Execution) | Execution A. |
| `b` | [`Execution`](../wiki/exectx.Execution) | Execution B. |

#### Returns

`boolean`

Whether execution `a` and `b` are equal.

#### Inherited from

[Execution](../wiki/exectx.Execution).[isEqual](../wiki/exectx.Execution#isequal)

#### Defined in

[exectx/src/Execution.ts:130](https://github.com/ludvigalden/exectx/blob/a0361f0/packages/exectx/src/Execution.ts#L130)

___

### stringifyValues

▸ `Static` **stringifyValues**(`values`): `string`

Formats a string representation of context values.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `values` | `object` | Values to stringify. |

#### Returns

`string`

Stringified version of the values.

#### Defined in

[exectx/src/Context.ts:166](https://github.com/ludvigalden/exectx/blob/a0361f0/packages/exectx/src/Context.ts#L166)
