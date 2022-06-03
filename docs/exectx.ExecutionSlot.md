# Class: ExecutionSlot<T\>

[exectx](../wiki/exectx).ExecutionSlot

It is oftentime useful to declare a slot for a category of executions. For instance, a service might have
a method that uses an execution but that should only be processing once. It simply features that if there is a current
pending execution in the slot when a new execution is set, the previous execution is set canceled.

**`param`** Parent(s) to inherit cancellation state from.

**`typicalname`** executionSlot

**`classdesc`** A cancelable that holds one execution simultaneously and cancels executions when replaced.

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
- [promiseCanceled](../wiki/exectx.ExecutionSlot#promisecanceled)

### Methods

- [cancel](../wiki/exectx.ExecutionSlot#cancel)
- [nest](../wiki/exectx.ExecutionSlot#nest)
- [onCanceled](../wiki/exectx.ExecutionSlot#oncanceled)
- [set](../wiki/exectx.ExecutionSlot#set)
- [isEqual](../wiki/exectx.ExecutionSlot#isequal)

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
| `parent?` | [`ExecutionsArg`](../wiki/exectx#executionsarg)<[`Execution`](../wiki/exectx.Execution)\> |

#### Overrides

[Execution](../wiki/exectx.Execution).[constructor](../wiki/exectx.Execution#constructor)

#### Defined in

[exectx/src/ExecutionSlot.ts:18](https://github.com/ludvigalden/exectx/blob/a0361f0/packages/exectx/src/ExecutionSlot.ts#L18)

## Accessors

### canceled

• `get` **canceled**(): `boolean`

Whether the currently defined execution is canceled or if there is no execution currently defined.

#### Returns

`boolean`

#### Overrides

Execution.canceled

#### Defined in

[exectx/src/ExecutionSlot.ts:140](https://github.com/ludvigalden/exectx/blob/a0361f0/packages/exectx/src/ExecutionSlot.ts#L140)

___

### current

• `get` **current**(): `T`

The current execution of the execution slot.

#### Returns

`T`

The current execution of the execution slot.

#### Defined in

[exectx/src/ExecutionSlot.ts:133](https://github.com/ludvigalden/exectx/blob/a0361f0/packages/exectx/src/ExecutionSlot.ts#L133)

___

### promiseCanceled

• `get` **promiseCanceled**(): `Promise`<`void`\>

A promise that is resolved when the `canceled`-state of the execution slot returns false.
That is, it does not simply return the promise for the `canceled`-state of the currently defined execution.
If the execution slot is currently canceled, a resolved promise is returned.

#### Returns

`Promise`<`void`\>

#### Overrides

Execution.promiseCanceled

#### Defined in

[exectx/src/ExecutionSlot.ts:149](https://github.com/ludvigalden/exectx/blob/a0361f0/packages/exectx/src/ExecutionSlot.ts#L149)

## Methods

### cancel

▸ **cancel**(): `void`

If defined, cancels the current execution, and removes it from the execution slot.

#### Returns

`void`

#### Overrides

[Execution](../wiki/exectx.Execution).[cancel](../wiki/exectx.Execution#cancel)

#### Defined in

[exectx/src/ExecutionSlot.ts:108](https://github.com/ludvigalden/exectx/blob/a0361f0/packages/exectx/src/ExecutionSlot.ts#L108)

___

### nest

▸ **nest**(): [`Execution`](../wiki/exectx.Execution)

**`description`** Nests the execution.

#### Returns

[`Execution`](../wiki/exectx.Execution)

A child execution context that will be canceled whenever its parent is canceled, or when it is canceled itself.
Its state does not affect the state of its parent.

#### Inherited from

[Execution](../wiki/exectx.Execution).[nest](../wiki/exectx.Execution#nest)

#### Defined in

[exectx/src/Execution.ts:33](https://github.com/ludvigalden/exectx/blob/a0361f0/packages/exectx/src/Execution.ts#L33)

___

### onCanceled

▸ **onCanceled**(`listener`): [`ExecutionCanceledUnsubscriber`](../wiki/exectx#executioncanceledunsubscriber)

Listens to whenever the execution is canceled.

#### Parameters

| Name | Type |
| :------ | :------ |
| `listener` | [`ExecutionCanceledListener`](../wiki/exectx#executioncanceledlistener) |

#### Returns

[`ExecutionCanceledUnsubscriber`](../wiki/exectx#executioncanceledunsubscriber)

Unsubscriber for the listener.

#### Overrides

[Execution](../wiki/exectx.Execution).[onCanceled](../wiki/exectx.Execution#oncanceled)

#### Defined in

[exectx/src/ExecutionSlot.ts:24](https://github.com/ludvigalden/exectx/blob/a0361f0/packages/exectx/src/ExecutionSlot.ts#L24)

___

### set

▸ **set**(`execution?`): `T`

Set the current execution of the execution slot. If there already is a defined execution that is not
equal to the passed execution, that execution is set canceled. If no execution is passed, a new one is constructed.
It returns the set execution.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `execution` | `T` | The execution to replace the current execution of the execution slot with. |

#### Returns

`T`

The set execution.

#### Defined in

[exectx/src/ExecutionSlot.ts:72](https://github.com/ludvigalden/exectx/blob/a0361f0/packages/exectx/src/ExecutionSlot.ts#L72)

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
