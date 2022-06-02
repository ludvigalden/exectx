# Class: Execution

[exectx](../wiki/exectx).Execution

An execution is a context-like object that holds information about an execution being canceled.
It is intended to be used for asynchronous actions that can be canceled at any point in the future.
An execution can be canceled using the `cancel` method and checked whether canceled using the `canceled` property.
Additional methods and properties for efficient usage of the `canceled` property are `onCanceled`, `run`, and `promise`.

**`param`** Parent(s) to inherit cancellation state from.

## Hierarchy

- **`Execution`**

  ↳ [`Context`](../wiki/exectx.Context)

  ↳ [`ExecutionSlot`](../wiki/exectx.ExecutionSlot)

## Table of contents

### Constructors

- [constructor](../wiki/exectx.Execution#constructor)

### Accessors

- [canceled](../wiki/exectx.Execution#canceled)
- [promiseCanceled](../wiki/exectx.Execution#promisecanceled)

### Methods

- [cancel](../wiki/exectx.Execution#cancel)
- [nest](../wiki/exectx.Execution#nest)
- [onCanceled](../wiki/exectx.Execution#oncanceled)
- [run](../wiki/exectx.Execution#run)
- [generateKey](../wiki/exectx.Execution#generatekey)
- [isEqual](../wiki/exectx.Execution#isequal)
- [nest](../wiki/exectx.Execution#nest-1)
- [parseParentArg](../wiki/exectx.Execution#parseparentarg)

## Constructors

### constructor

• **new Execution**(`parent?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `parent?` | `ExecutionParentArg`<[`Execution`](../wiki/exectx.Execution)\> |

#### Defined in

[exectx/src/Execution.ts:17](https://github.com/ludvigalden/exectx/blob/b8a37e3/packages/exectx/src/Execution.ts#L17)

## Accessors

### canceled

• `get` **canceled**(): `boolean`

Whether the execution has been canceled. It can be checked manually in functions that accept
the execution as an argument in order to know whether to keep a process going, or if it should be canceled,
in order reduce the amount of uneccessary executions that lead to no effect.

#### Returns

`boolean`

#### Defined in

[exectx/src/Execution.ts:175](https://github.com/ludvigalden/exectx/blob/b8a37e3/packages/exectx/src/Execution.ts#L175)

___

### promiseCanceled

• `get` **promiseCanceled**(): `Promise`<`void`\>

Returns a promise that resolves once the execution is canceled.
If the execution is already canceled, a resolved promise is returned.

#### Returns

`Promise`<`void`\>

#### Defined in

[exectx/src/Execution.ts:164](https://github.com/ludvigalden/exectx/blob/b8a37e3/packages/exectx/src/Execution.ts#L164)

## Methods

### cancel

▸ **cancel**(): `void`

Cancels the execution and notifies any listeners. It does not affect any parent executions.
Should only be used if the execution was constructed by you, or if you know what you're doing.

#### Returns

`void`

#### Defined in

[exectx/src/Execution.ts:37](https://github.com/ludvigalden/exectx/blob/b8a37e3/packages/exectx/src/Execution.ts#L37)

___

### nest

▸ **nest**(): [`Execution`](../wiki/exectx.Execution)

Nests the execution
Returns a child execution context that will be canceled whenever its parent is canceled, or when it is canceled itself.
Its state does not affect the state of its parent.

#### Returns

[`Execution`](../wiki/exectx.Execution)

A child execution.

#### Defined in

[exectx/src/Execution.ts:31](https://github.com/ludvigalden/exectx/blob/b8a37e3/packages/exectx/src/Execution.ts#L31)

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

#### Defined in

[exectx/src/Execution.ts:54](https://github.com/ludvigalden/exectx/blob/b8a37e3/packages/exectx/src/Execution.ts#L54)

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

#### Defined in

[exectx/src/Execution.ts:84](https://github.com/ludvigalden/exectx/blob/b8a37e3/packages/exectx/src/Execution.ts#L84)

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

#### Defined in

[exectx/src/Execution.ts:85](https://github.com/ludvigalden/exectx/blob/b8a37e3/packages/exectx/src/Execution.ts#L85)

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

#### Defined in

[exectx/src/Execution.ts:89](https://github.com/ludvigalden/exectx/blob/b8a37e3/packages/exectx/src/Execution.ts#L89)

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

#### Defined in

[exectx/src/Execution.ts:94](https://github.com/ludvigalden/exectx/blob/b8a37e3/packages/exectx/src/Execution.ts#L94)

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

#### Defined in

[exectx/src/Execution.ts:100](https://github.com/ludvigalden/exectx/blob/b8a37e3/packages/exectx/src/Execution.ts#L100)

___

### generateKey

▸ `Static` **generateKey**(): `number`

#### Returns

`number`

#### Defined in

[exectx/src/Execution.ts:207](https://github.com/ludvigalden/exectx/blob/b8a37e3/packages/exectx/src/Execution.ts#L207)

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

#### Defined in

[exectx/src/Execution.ts:223](https://github.com/ludvigalden/exectx/blob/b8a37e3/packages/exectx/src/Execution.ts#L223)

___

### nest

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

#### Defined in

[exectx/src/Execution.ts:179](https://github.com/ludvigalden/exectx/blob/b8a37e3/packages/exectx/src/Execution.ts#L179)

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

#### Defined in

[exectx/src/Execution.ts:211](https://github.com/ludvigalden/exectx/blob/b8a37e3/packages/exectx/src/Execution.ts#L211)
