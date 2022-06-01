# Class: Execution

[exectx](../wiki/exectx).Execution

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

[exectx/src/Execution.ts:26](https://github.com/ludvigalden/exectx/blob/0f41d8f/packages/exectx/src/Execution.ts#L26)

## Accessors

### canceled

• `get` **canceled**(): `boolean`

Whether the execution has been canceled. It can be checked manually in functions that accept
the execution as an argument in order to know whether to keep a process going, or if it should be canceled,
in order reduce the amount of uneccessary executions that lead to no effect.

#### Returns

`boolean`

#### Defined in

[exectx/src/Execution.ts:183](https://github.com/ludvigalden/exectx/blob/0f41d8f/packages/exectx/src/Execution.ts#L183)

___

### promiseCanceled

• `get` **promiseCanceled**(): `Promise`<`void`\>

Returns a promise that resolves once the execution is canceled.
If the execution is already canceled, a resolved promise is returned.

#### Returns

`Promise`<`void`\>

#### Defined in

[exectx/src/Execution.ts:172](https://github.com/ludvigalden/exectx/blob/0f41d8f/packages/exectx/src/Execution.ts#L172)

## Methods

### cancel

▸ **cancel**(): `void`

Cancels the execution and notifies any listeners. It does not affect any parent executions.
Should only be used if the execution was constructed by you, or if you know what you're doing.

#### Returns

`void`

#### Defined in

[exectx/src/Execution.ts:45](https://github.com/ludvigalden/exectx/blob/0f41d8f/packages/exectx/src/Execution.ts#L45)

___

### nest

▸ **nest**(): [`Execution`](../wiki/exectx.Execution)

Returns a child execution context that will be canceled whenever its parent is canceled, or when it is canceled itself.
Its state does not affect the state of its parent.

#### Returns

[`Execution`](../wiki/exectx.Execution)

A child execution.

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

#### Defined in

[exectx/src/Execution.ts:108](https://github.com/ludvigalden/exectx/blob/0f41d8f/packages/exectx/src/Execution.ts#L108)

___

### generateKey

▸ `Static` **generateKey**(): `number`

#### Returns

`number`

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

#### Defined in

[exectx/src/Execution.ts:219](https://github.com/ludvigalden/exectx/blob/0f41d8f/packages/exectx/src/Execution.ts#L219)
