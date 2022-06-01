# Class: Context<V\>

[exectx](../wiki/exectx).Context

## Type parameters

| Name | Type |
| :------ | :------ |
| `V` | extends `object` = `any` |

## Hierarchy

- [`Execution`](../wiki/exectx.Execution)

  ↳ **`Context`**

## Table of contents

### Constructors

- [constructor](../wiki/exectx.Context#constructor)

### Accessors

- [canceled](../wiki/exectx.Context#canceled)
- [promiseCanceled](../wiki/exectx.Context#promisecanceled)

### Methods

- [cancel](../wiki/exectx.Context#cancel)
- [get](../wiki/exectx.Context#get)
- [has](../wiki/exectx.Context#has)
- [nest](../wiki/exectx.Context#nest)
- [nestExecution](../wiki/exectx.Context#nestexecution)
- [onCanceled](../wiki/exectx.Context#oncanceled)
- [run](../wiki/exectx.Context#run)
- [set](../wiki/exectx.Context#set)
- [generateKey](../wiki/exectx.Context#generatekey)
- [isEqual](../wiki/exectx.Context#isequal)
- [nest](../wiki/exectx.Context#nest-1)
- [parseParentArg](../wiki/exectx.Context#parseparentarg)
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
| `parent?` | `ContextParentArg`<`V`\> |

#### Overrides

[Execution](../wiki/exectx.Execution).[constructor](../wiki/exectx.Execution#constructor)

#### Defined in

[exectx/src/Context.ts:20](https://github.com/ludvigalden/exectx/blob/0f41d8f/packages/exectx/src/Context.ts#L20)

## Accessors

### canceled

• `get` **canceled**(): `boolean`

Whether the execution has been canceled. It can be checked manually in functions that accept
the execution as an argument in order to know whether to keep a process going, or if it should be canceled,
in order reduce the amount of uneccessary executions that lead to no effect.

#### Returns

`boolean`

#### Inherited from

Execution.canceled

#### Defined in

[exectx/src/Execution.ts:183](https://github.com/ludvigalden/exectx/blob/0f41d8f/packages/exectx/src/Execution.ts#L183)

___

### promiseCanceled

• `get` **promiseCanceled**(): `Promise`<`void`\>

Returns a promise that resolves once the execution is canceled.
If the execution is already canceled, a resolved promise is returned.

#### Returns

`Promise`<`void`\>

#### Inherited from

Execution.promiseCanceled

#### Defined in

[exectx/src/Execution.ts:172](https://github.com/ludvigalden/exectx/blob/0f41d8f/packages/exectx/src/Execution.ts#L172)

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

[exectx/src/Execution.ts:45](https://github.com/ludvigalden/exectx/blob/0f41d8f/packages/exectx/src/Execution.ts#L45)

___

### get

▸ **get**<`K`\>(`key`): `V`[`K`]

**`method`** get

**`description`** Get a value

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends `string` \| `number` \| `symbol` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `K` |

#### Returns

`V`[`K`]

#### Defined in

[exectx/src/Context.ts:49](https://github.com/ludvigalden/exectx/blob/0f41d8f/packages/exectx/src/Context.ts#L49)

___

### has

▸ **has**<`K`\>(`key`): `boolean`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends `string` \| `number` \| `symbol` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `K` |

#### Returns

`boolean`

#### Defined in

[exectx/src/Context.ts:63](https://github.com/ludvigalden/exectx/blob/0f41d8f/packages/exectx/src/Context.ts#L63)

___

### nest

▸ **nest**(`values?`, ...`otherParents`): [`Context`](../wiki/exectx.Context)<`V`\>

Returns a child context that inherits the cancellation state and values of this context (as well as any additional parents specified).

#### Parameters

| Name | Type |
| :------ | :------ |
| `values?` | `Partial`<`V`\> |
| `...otherParents` | `ContextParent`<`V`\>[] |

#### Returns

[`Context`](../wiki/exectx.Context)<`V`\>

#### Overrides

[Execution](../wiki/exectx.Execution).[nest](../wiki/exectx.Execution#nest)

#### Defined in

[exectx/src/Context.ts:70](https://github.com/ludvigalden/exectx/blob/0f41d8f/packages/exectx/src/Context.ts#L70)

▸ **nest**<`CV`\>(`values?`, ...`otherParents`): [`Context`](../wiki/exectx.Context)<`NestedContextValues`<`V`, `CV`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `CV` | extends `object` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `values?` | `CV` |
| `...otherParents` | `ContextParent`<`CV`\>[] |

#### Returns

[`Context`](../wiki/exectx.Context)<`NestedContextValues`<`V`, `CV`\>\>

#### Overrides

Execution.nest

#### Defined in

[exectx/src/Context.ts:71](https://github.com/ludvigalden/exectx/blob/0f41d8f/packages/exectx/src/Context.ts#L71)

___

### nestExecution

▸ **nestExecution**(): [`Execution`](../wiki/exectx.Execution)

#### Returns

[`Execution`](../wiki/exectx.Execution)

#### Defined in

[exectx/src/Context.ts:87](https://github.com/ludvigalden/exectx/blob/0f41d8f/packages/exectx/src/Context.ts#L87)

___

### onCanceled

▸ **onCanceled**(`listener`): `ExecutionCanceledUnsubscriber`

Listen to whenever the executions is canceled, and returns a function to stop listening.
If the execution is already canceled, the passed listener is called synchronously and the returned function does nothing.

#### Parameters

| Name | Type |
| :------ | :------ |
| `listener` | `ExecutionCanceledListener` |

#### Returns

`ExecutionCanceledUnsubscriber`

#### Inherited from

[Execution](../wiki/exectx.Execution).[onCanceled](../wiki/exectx.Execution#oncanceled)

#### Defined in

[exectx/src/Execution.ts:62](https://github.com/ludvigalden/exectx/blob/0f41d8f/packages/exectx/src/Execution.ts#L62)

___

### run

▸ **run**<`_1`\>(`_1`): `void` \| `_1` \| `Promise`<`void` \| `_1`\>

Run actions for the execution. If any of the actions returns `undefined` or if the execution is canceled, the next action will not be run.
Every action inherits the value returned from the previous action (unless that value is `undefined`).

#### Type parameters

| Name |
| :------ |
| `_1` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `_1` | () => `void` \| `_1` \| `Promise`<`void` \| `_1`\> |

#### Returns

`void` \| `_1` \| `Promise`<`void` \| `_1`\>

#### Inherited from

[Execution](../wiki/exectx.Execution).[run](../wiki/exectx.Execution#run)

#### Defined in

[exectx/src/Execution.ts:92](https://github.com/ludvigalden/exectx/blob/0f41d8f/packages/exectx/src/Execution.ts#L92)

▸ **run**<`_1`, `_2`\>(`_1`, `_2`): `void` \| `_2` \| `Promise`<`void` \| `_2`\>

#### Type parameters

| Name |
| :------ |
| `_1` |
| `_2` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `_1` | () => `void` \| `_1` \| `Promise`<`void` \| `_1`\> |
| `_2` | (`_1`: `_1`) => `void` \| `_2` \| `Promise`<`void` \| `_2`\> |

#### Returns

`void` \| `_2` \| `Promise`<`void` \| `_2`\>

#### Inherited from

[Execution](../wiki/exectx.Execution).[run](../wiki/exectx.Execution#run)

#### Defined in

[exectx/src/Execution.ts:93](https://github.com/ludvigalden/exectx/blob/0f41d8f/packages/exectx/src/Execution.ts#L93)

▸ **run**<`_1`, `_2`, `_3`\>(`_1`, `_2`, `_3`): `void` \| `_3` \| `Promise`<`void` \| `_3`\>

#### Type parameters

| Name |
| :------ |
| `_1` |
| `_2` |
| `_3` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `_1` | () => `void` \| `_1` \| `Promise`<`void` \| `_1`\> |
| `_2` | (`_1`: `_1`) => `void` \| `_2` \| `Promise`<`void` \| `_2`\> |
| `_3` | (`_2`: `_2`) => `void` \| `_3` \| `Promise`<`void` \| `_3`\> |

#### Returns

`void` \| `_3` \| `Promise`<`void` \| `_3`\>

#### Inherited from

[Execution](../wiki/exectx.Execution).[run](../wiki/exectx.Execution#run)

#### Defined in

[exectx/src/Execution.ts:97](https://github.com/ludvigalden/exectx/blob/0f41d8f/packages/exectx/src/Execution.ts#L97)

▸ **run**<`_1`, `_2`, `_3`, `_4`\>(`_1`, `_2`, `_3`, `_4`): `void` \| `_4` \| `Promise`<`void` \| `_4`\>

#### Type parameters

| Name |
| :------ |
| `_1` |
| `_2` |
| `_3` |
| `_4` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `_1` | () => `void` \| `_1` \| `Promise`<`void` \| `_1`\> |
| `_2` | (`_1`: `_1`) => `void` \| `_2` \| `Promise`<`void` \| `_2`\> |
| `_3` | (`_2`: `_2`) => `void` \| `_3` \| `Promise`<`void` \| `_3`\> |
| `_4` | (`_3`: `_3`) => `void` \| `_4` \| `Promise`<`void` \| `_4`\> |

#### Returns

`void` \| `_4` \| `Promise`<`void` \| `_4`\>

#### Inherited from

[Execution](../wiki/exectx.Execution).[run](../wiki/exectx.Execution#run)

#### Defined in

[exectx/src/Execution.ts:102](https://github.com/ludvigalden/exectx/blob/0f41d8f/packages/exectx/src/Execution.ts#L102)

▸ **run**<`_1`, `_2`, `_3`, `_4`, `_5`\>(`_1`, `_2`, `_3`, `_4`, `_5`): `void` \| `_5` \| `Promise`<`void` \| `_5`\>

#### Type parameters

| Name |
| :------ |
| `_1` |
| `_2` |
| `_3` |
| `_4` |
| `_5` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `_1` | () => `void` \| `_1` \| `Promise`<`void` \| `_1`\> |
| `_2` | (`_1`: `_1`) => `void` \| `_2` \| `Promise`<`void` \| `_2`\> |
| `_3` | (`_2`: `_2`) => `void` \| `_3` \| `Promise`<`void` \| `_3`\> |
| `_4` | (`_3`: `_3`) => `void` \| `_4` \| `Promise`<`void` \| `_4`\> |
| `_5` | (`_4`: `_4`) => `void` \| `_5` \| `Promise`<`void` \| `_5`\> |

#### Returns

`void` \| `_5` \| `Promise`<`void` \| `_5`\>

#### Inherited from

[Execution](../wiki/exectx.Execution).[run](../wiki/exectx.Execution#run)

#### Defined in

[exectx/src/Execution.ts:108](https://github.com/ludvigalden/exectx/blob/0f41d8f/packages/exectx/src/Execution.ts#L108)

___

### set

▸ **set**<`K`\>(`key`, `value`): [`Context`](../wiki/exectx.Context)<`V`\>

Set a value of the context.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends `string` \| `number` \| `symbol` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `K` |
| `value` | `V`[`K`] |

#### Returns

[`Context`](../wiki/exectx.Context)<`V`\>

Context.

#### Defined in

[exectx/src/Context.ts:39](https://github.com/ludvigalden/exectx/blob/0f41d8f/packages/exectx/src/Context.ts#L39)

___

### generateKey

▸ `Static` **generateKey**(): `number`

#### Returns

`number`

#### Inherited from

[Execution](../wiki/exectx.Execution).[generateKey](../wiki/exectx.Execution#generatekey)

#### Defined in

[exectx/src/Execution.ts:215](https://github.com/ludvigalden/exectx/blob/0f41d8f/packages/exectx/src/Execution.ts#L215)

___

### isEqual

▸ `Static` **isEqual**(`a`, `b`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | [`Execution`](../wiki/exectx.Execution) |
| `b` | [`Execution`](../wiki/exectx.Execution) |

#### Returns

`boolean`

#### Inherited from

[Execution](../wiki/exectx.Execution).[isEqual](../wiki/exectx.Execution#isequal)

#### Defined in

[exectx/src/Execution.ts:231](https://github.com/ludvigalden/exectx/blob/0f41d8f/packages/exectx/src/Execution.ts#L231)

___

### nest

▸ `Static` **nest**<`PV`, `V`, `T`\>(`options`): `T`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `PV` | extends `object` |
| `V` | extends `object` |
| `T` | extends [`Context`](../wiki/exectx.Context)<`NestedContextValues`<`PV`, `V`\>, `T`\> = [`Context`](../wiki/exectx.Context)<`NestedContextValues`<`PV`, `V`\>\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `NestContextOptions`<`PV`, `V`, `T`\> |

#### Returns

`T`

#### Overrides

[Execution](../wiki/exectx.Execution).[nest](../wiki/exectx.Execution#nest-1)

#### Defined in

[exectx/src/Context.ts:122](https://github.com/ludvigalden/exectx/blob/0f41d8f/packages/exectx/src/Context.ts#L122)

▸ `Static` **nest**<`T`, `PT`\>(`options`): `T`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Execution`](../wiki/exectx.Execution)<`T`\> |
| `PT` | extends [`Execution`](../wiki/exectx.Execution)<`PT`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `NestExecutionOptions`<`T`, `PT`\> |

#### Returns

`T`

#### Overrides

Execution.nest

#### Defined in

[exectx/src/Context.ts:127](https://github.com/ludvigalden/exectx/blob/0f41d8f/packages/exectx/src/Context.ts#L127)

___

### parseParentArg

▸ `Static` **parseParentArg**<`T`\>(`arg`): `T`[]

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Execution`](../wiki/exectx.Execution)<`T`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `arg` | `ExecutionParentArg`<`T`\> \| `Falsey` |

#### Returns

`T`[]

#### Inherited from

[Execution](../wiki/exectx.Execution).[parseParentArg](../wiki/exectx.Execution#parseparentarg)

#### Defined in

[exectx/src/Execution.ts:219](https://github.com/ludvigalden/exectx/blob/0f41d8f/packages/exectx/src/Execution.ts#L219)

___

### stringifyValues

▸ `Static` **stringifyValues**(`values`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `values` | `object` |

#### Returns

`string`

#### Defined in

[exectx/src/Context.ts:182](https://github.com/ludvigalden/exectx/blob/0f41d8f/packages/exectx/src/Context.ts#L182)
