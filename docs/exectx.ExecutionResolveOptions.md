# Interface: ExecutionResolveOptions<T, RT, E\>

[exectx](../wiki/exectx).ExecutionResolveOptions

**`see`** [`executionResolve`](../wiki/exectx#executionresolve)

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `RT` | `T` |
| `E` | extends [`Execution`](../wiki/exectx.Execution) = [`Execution`](../wiki/exectx.Execution) |

## Table of contents

### Properties

- [defaultExecution](../wiki/exectx.ExecutionResolveOptions#defaultexecution)
- [execution](../wiki/exectx.ExecutionResolveOptions#execution)
- [executionSlot](../wiki/exectx.ExecutionResolveOptions#executionslot)
- [executionSlotReadonly](../wiki/exectx.ExecutionResolveOptions#executionslotreadonly)
- [value](../wiki/exectx.ExecutionResolveOptions#value)

### Methods

- [formatValue](../wiki/exectx.ExecutionResolveOptions#formatvalue)
- [getDefaultValue](../wiki/exectx.ExecutionResolveOptions#getdefaultvalue)
- [getValue](../wiki/exectx.ExecutionResolveOptions#getvalue)
- [onInterrupted](../wiki/exectx.ExecutionResolveOptions#oninterrupted)
- [onResolved](../wiki/exectx.ExecutionResolveOptions#onresolved)

## Properties

### defaultExecution

• `Optional` **defaultExecution**: `E` \| [`ExecutionGetter`](../wiki/exectx#executiongetter)<`E`\>

If the function is called without a defined execution, a fallback execution is defaulted to.
This defaults to a never-canceled execution, but can be overriden using this option.
As always, the execution is nested before being passed to the inner function.

#### Defined in

[exectx/src/executionResolve.ts:180](https://github.com/ludvigalden/exectx/blob/5c34d65/packages/exectx/src/executionResolve.ts#L180)

___

### execution

• `Optional` **execution**: `E`

If canceled during the time the passed value is being resolved, the `onResolved` function will never be called.

#### Defined in

[exectx/src/executionResolve.ts:164](https://github.com/ludvigalden/exectx/blob/5c34d65/packages/exectx/src/executionResolve.ts#L164)

___

### executionSlot

• `Optional` **executionSlot**: [`ExecutionSlot`](../wiki/exectx.ExecutionSlot)<[`Execution`](../wiki/exectx.Execution)\>

If defined, the resolved execution will be set to the execution slot, and the `getValue` or `getDefaultValue` option will not be called
while the execution slot has a current not-canceled execution.

#### Defined in

[exectx/src/executionResolve.ts:169](https://github.com/ludvigalden/exectx/blob/5c34d65/packages/exectx/src/executionResolve.ts#L169)

___

### executionSlotReadonly

• `Optional` **executionSlotReadonly**: `boolean`

Whether the resolved execution should not be set to the execution slot, i.e. the execution slot
will only be used to resolve the `getValue` function.

#### Defined in

[exectx/src/executionResolve.ts:174](https://github.com/ludvigalden/exectx/blob/5c34d65/packages/exectx/src/executionResolve.ts#L174)

___

### value

• `Optional` **value**: `T` \| `Promise`<`T`\>

The value to resolve.

#### Defined in

[exectx/src/executionResolve.ts:140](https://github.com/ludvigalden/exectx/blob/5c34d65/packages/exectx/src/executionResolve.ts#L140)

## Methods

### formatValue

▸ `Optional` **formatValue**(`value`, `execution`): `T` \| `Promise`<`T`\>

Format the value after it has been resolved.

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `T` |
| `execution` | `E` |

#### Returns

`T` \| `Promise`<`T`\>

#### Defined in

[exectx/src/executionResolve.ts:152](https://github.com/ludvigalden/exectx/blob/5c34d65/packages/exectx/src/executionResolve.ts#L152)

___

### getDefaultValue

▸ `Optional` **getDefaultValue**(`execution`): `T` \| `Promise`<`T`\>

Get the default value to resolve functionally, accepting the execution, if no `getValue` or `value` is specified. If defined along with an `executionSlot`,
the promise of the execution slot is resolved before calling the `getDefaultValue` function, if the execution has not been canceled during that time.

#### Parameters

| Name | Type |
| :------ | :------ |
| `execution` | `E` |

#### Returns

`T` \| `Promise`<`T`\>

#### Defined in

[exectx/src/executionResolve.ts:150](https://github.com/ludvigalden/exectx/blob/5c34d65/packages/exectx/src/executionResolve.ts#L150)

___

### getValue

▸ `Optional` **getValue**(`execution`): `T` \| `Promise`<`T`\>

Get the value to resolve functionally, accepting the execution. If defined along with an `executionSlot`,
the promise of the execution slot is resolved before calling the `getValue` function, if the execution has not been canceled during that time.

#### Parameters

| Name | Type |
| :------ | :------ |
| `execution` | `E` |

#### Returns

`T` \| `Promise`<`T`\>

#### Defined in

[exectx/src/executionResolve.ts:145](https://github.com/ludvigalden/exectx/blob/5c34d65/packages/exectx/src/executionResolve.ts#L145)

___

### onInterrupted

▸ `Optional` **onInterrupted**(`value`, `execution`): `RT` \| `Promise`<`RT`\>

Called if the execution is canceled during the time the value is being resolved.
The passed execution is in all cases canceled.

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `T` |
| `execution` | `E` |

#### Returns

`RT` \| `Promise`<`RT`\>

#### Defined in

[exectx/src/executionResolve.ts:162](https://github.com/ludvigalden/exectx/blob/5c34d65/packages/exectx/src/executionResolve.ts#L162)

___

### onResolved

▸ `Optional` **onResolved**(`value`, `execution`): `RT` \| `Promise`<`RT`\>

Called when the `value` has been resolved and the execution has not been canceled.
If the passed value is not a promise, `onResolved` is called synchronously.

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `T` |
| `execution` | `E` |

#### Returns

`RT` \| `Promise`<`RT`\>

#### Defined in

[exectx/src/executionResolve.ts:157](https://github.com/ludvigalden/exectx/blob/5c34d65/packages/exectx/src/executionResolve.ts#L157)
