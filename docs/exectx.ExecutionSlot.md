# Class: ExecutionSlot<T\>

[exectx](../wiki/exectx).ExecutionSlot

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Execution`](../wiki/exectx.Execution) = [`Execution`](../wiki/exectx.Execution) |

## Hierarchy

- [`Execution`](../wiki/exectx.Execution)

  ↳ **`ExecutionSlot`**

## Table of contents

### Constructors

- [constructor](../wiki/exectx.ExecutionSlot#constructor)

### Accessors

- [canceled](../wiki/exectx.ExecutionSlot#canceled)
- [current](../wiki/exectx.ExecutionSlot#current)
- [promise](../wiki/exectx.ExecutionSlot#promise)
- [promiseCanceled](../wiki/exectx.ExecutionSlot#promisecanceled)

### Methods

- [cancel](../wiki/exectx.ExecutionSlot#cancel)
- [nest](../wiki/exectx.ExecutionSlot#nest)
- [onCanceled](../wiki/exectx.ExecutionSlot#oncanceled)
- [run](../wiki/exectx.ExecutionSlot#run)
- [set](../wiki/exectx.ExecutionSlot#set)
- [generateKey](../wiki/exectx.ExecutionSlot#generatekey)
- [isEqual](../wiki/exectx.ExecutionSlot#isequal)
- [nest](../wiki/exectx.ExecutionSlot#nest-1)
- [parseParentArg](../wiki/exectx.ExecutionSlot#parseparentarg)

## Constructors

### constructor

• **new ExecutionSlot**<`T`\>(`parent?`)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Execution`](../wiki/exectx.Execution)<`T`\> = [`Execution`](../wiki/exectx.Execution) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `parent?` | `ExecutionParentArg`<`T`\> |

#### Overrides

[Execution](../wiki/exectx.Execution).[constructor](../wiki/exectx.Execution#constructor)

#### Defined in

[exectx/src/ExecutionSlot.ts:24](https://github.com/ludvigalden/exectx/blob/0f41d8f/packages/exectx/src/ExecutionSlot.ts#L24)

## Accessors

### canceled

• `get` **canceled**(): `boolean`

Whether the currently defined execution is canceled, or `true` if there is no execution currently defined.

#### Returns

`boolean`

#### Overrides

Execution.canceled

#### Defined in

[exectx/src/ExecutionSlot.ts:133](https://github.com/ludvigalden/exectx/blob/0f41d8f/packages/exectx/src/ExecutionSlot.ts#L133)

___

### current

• `get` **current**(): `T`

The current execution of the execution slot.

#### Returns

`T`

#### Defined in

[exectx/src/ExecutionSlot.ts:128](https://github.com/ludvigalden/exectx/blob/0f41d8f/packages/exectx/src/ExecutionSlot.ts#L128)

___

### promise

• `get` **promise**(): `Promise`<`void`\>

Returns the a promise that is resolved when the `canceled`-state of the execution slot returns false.
That is, it does not simply return the promise for the `canceled`-state of the currently defined execution.
If the execution slot is currently canceled, a resolved promise is returned.

#### Returns

`Promise`<`void`\>

#### Defined in

[exectx/src/ExecutionSlot.ts:140](https://github.com/ludvigalden/exectx/blob/0f41d8f/packages/exectx/src/ExecutionSlot.ts#L140)

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

If defined, cancels the current execution, and removes the current execution.

#### Returns

`void`

#### Overrides

[Execution](../wiki/exectx.Execution).[cancel](../wiki/exectx.Execution#cancel)

#### Defined in

[exectx/src/ExecutionSlot.ts:109](https://github.com/ludvigalden/exectx/blob/0f41d8f/packages/exectx/src/ExecutionSlot.ts#L109)

___

### nest

▸ **nest**(): [`Execution`](../wiki/exectx.Execution)

Returns a child execution context that will be canceled whenever its parent is canceled, or when it is canceled itself.
Its state does not affect the state of its parent.

#### Returns

[`Execution`](../wiki/exectx.Execution)

A child execution.

#### Inherited from

[Execution](../wiki/exectx.Execution).[nest](../wiki/exectx.Execution#nest)

#### Defined in

[exectx/src/Execution.ts:39](https://github.com/ludvigalden/exectx/blob/0f41d8f/packages/exectx/src/Execution.ts#L39)

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

#### Overrides

[Execution](../wiki/exectx.Execution).[onCanceled](../wiki/exectx.Execution#oncanceled)

#### Defined in

[exectx/src/ExecutionSlot.ts:30](https://github.com/ludvigalden/exectx/blob/0f41d8f/packages/exectx/src/ExecutionSlot.ts#L30)

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

▸ **set**(`execution?`): `T`

Set the current execution of the execution slot. If there already is a defined execution that is not
equal to the passed execution, that execution is set canceled. If no execution is passed, a new one is constructed.
It returns the set execution.

#### Parameters

| Name | Type |
| :------ | :------ |
| `execution` | `T` |

#### Returns

`T`

#### Defined in

[exectx/src/ExecutionSlot.ts:75](https://github.com/ludvigalden/exectx/blob/0f41d8f/packages/exectx/src/ExecutionSlot.ts#L75)

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

#### Inherited from

[Execution](../wiki/exectx.Execution).[nest](../wiki/exectx.Execution#nest-1)

#### Defined in

[exectx/src/Execution.ts:187](https://github.com/ludvigalden/exectx/blob/0f41d8f/packages/exectx/src/Execution.ts#L187)

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
