# Interface: ExecutionFunc<A, RT, E\>

[exectx](../wiki/exectx).ExecutionFunc

## Type parameters

| Name | Type |
| :------ | :------ |
| `A` | extends `any`[] |
| `RT` | `RT` |
| `E` | extends [`Execution`](../wiki/exectx.Execution) |

## Callable

### ExecutionFunc

▸ **ExecutionFunc**(...`params`): `RT`

A function that accepts an execution as a final optional parameter, and have additional properties
defined for internal use by [`executionFunc`](../wiki/exectx#executionfunc).

#### Parameters

| Name | Type |
| :------ | :------ |
| `...params` | [...params: A[], execution?: E] |

#### Returns

`RT`

#### Defined in

[exectx/src/executionFunc.ts:182](https://github.com/ludvigalden/exectx/blob/832bc31/packages/exectx/src/executionFunc.ts#L182)

## Table of contents

### Properties

- [\_\_defaultExecution](../wiki/exectx.ExecutionFunc#__defaultexecution)
- [\_\_params](../wiki/exectx.ExecutionFunc#__params)
- [\_\_returned](../wiki/exectx.ExecutionFunc#__returned)
- [\_execution](../wiki/exectx.ExecutionFunc#_execution)

## Properties

### \_\_defaultExecution

• `Optional` **\_\_defaultExecution**: `boolean`

Whether most recently used execution was defaulted to.

#### Defined in

[exectx/src/executionFunc.ts:187](https://github.com/ludvigalden/exectx/blob/832bc31/packages/exectx/src/executionFunc.ts#L187)

___

### \_\_params

• `Optional` **\_\_params**: `A`

The most recently used params.

#### Defined in

[exectx/src/executionFunc.ts:189](https://github.com/ludvigalden/exectx/blob/832bc31/packages/exectx/src/executionFunc.ts#L189)

___

### \_\_returned

• `Optional` **\_\_returned**: `RT`

The most recently returned value.

#### Defined in

[exectx/src/executionFunc.ts:191](https://github.com/ludvigalden/exectx/blob/832bc31/packages/exectx/src/executionFunc.ts#L191)

___

### \_execution

• `Optional` **\_execution**: `E`

The most recently used execution.

#### Defined in

[exectx/src/executionFunc.ts:185](https://github.com/ludvigalden/exectx/blob/832bc31/packages/exectx/src/executionFunc.ts#L185)
