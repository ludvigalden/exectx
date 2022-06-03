# Class: Execution

[exectx](../wiki/exectx).Execution

An execution is a context-like object that holds information about an execution being canceled.
It is intended to be used for asynchronous actions that can be canceled at any point in the future.
An execution can be canceled using the `cancel` method and checked whether canceled using the `canceled` property.
Additional methods and properties for efficient usage of the `canceled` property are `onCanceled`, `run`, and `promise`.

**`param`** Parent(s) to inherit cancellation state from.

**`typicalname`** execution

**`classdesc`** A cancelable that can inherit cancellation of other contexts and executions.

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
- [isEqual](../wiki/exectx.Execution#isequal)

## Constructors

### constructor

• **new Execution**(`parent?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `parent?` | [`ExecutionsArg`](../wiki/exectx#executionsarg)<[`Execution`](../wiki/exectx.Execution)\> |

#### Defined in

[exectx/src/Execution.ts:21](https://github.com/ludvigalden/exectx/blob/5c34d65/packages/exectx/src/Execution.ts#L21)

## Accessors

### canceled

• `get` **canceled**(): `boolean`

Whether the execution has been canceled. It can be checked manually in functions that accept
the execution as an argument in order to know whether to keep a process going, or if it should be canceled,
in order reduce the amount of uneccessary executions that lead to no effect.

#### Returns

`boolean`

Whether the execution has been canceled.

#### Defined in

[exectx/src/Execution.ts:120](https://github.com/ludvigalden/exectx/blob/5c34d65/packages/exectx/src/Execution.ts#L120)

___

### promiseCanceled

• `get` **promiseCanceled**(): `Promise`<`void`\>

A promise that resolves whenever the execution is canceled, or if the execution is already canceled, a resolved promise.

#### Returns

`Promise`<`void`\>

#### Defined in

[exectx/src/Execution.ts:105](https://github.com/ludvigalden/exectx/blob/5c34d65/packages/exectx/src/Execution.ts#L105)

## Methods

### cancel

▸ **cancel**(): `void`

Cancels the execution and notifies any listeners. It does not affect any parent executions.
Should only be used if the execution was constructed by you, or if you know what you're doing.

#### Returns

`void`

#### Defined in

[exectx/src/Execution.ts:41](https://github.com/ludvigalden/exectx/blob/5c34d65/packages/exectx/src/Execution.ts#L41)

___

### nest

▸ **nest**(): [`Execution`](../wiki/exectx.Execution)

**`description`** Nests the execution.

#### Returns

[`Execution`](../wiki/exectx.Execution)

A child execution context that will be canceled whenever its parent is canceled, or when it is canceled itself.
Its state does not affect the state of its parent.

#### Defined in

[exectx/src/Execution.ts:33](https://github.com/ludvigalden/exectx/blob/5c34d65/packages/exectx/src/Execution.ts#L33)

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

#### Defined in

[exectx/src/Execution.ts:63](https://github.com/ludvigalden/exectx/blob/5c34d65/packages/exectx/src/Execution.ts#L63)

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

#### Defined in

[exectx/src/Execution.ts:130](https://github.com/ludvigalden/exectx/blob/5c34d65/packages/exectx/src/Execution.ts#L130)
