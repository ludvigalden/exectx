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

#### Parameters

| Name | Type |
| :------ | :------ |
| `...params` | [...params: A[], execution?: E] |

#### Returns

`RT`

#### Defined in

[exectx/src/executionFunc.ts:171](https://github.com/ludvigalden/exectx/blob/0f41d8f/packages/exectx/src/executionFunc.ts#L171)

## Table of contents

### Properties

- [\_\_defaultExecution](../wiki/exectx.ExecutionFunc#__defaultexecution)
- [\_\_params](../wiki/exectx.ExecutionFunc#__params)
- [\_\_returned](../wiki/exectx.ExecutionFunc#__returned)
- [\_execution](../wiki/exectx.ExecutionFunc#_execution)

## Properties

### \_\_defaultExecution

• `Optional` **\_\_defaultExecution**: `boolean`

#### Defined in

[exectx/src/executionFunc.ts:174](https://github.com/ludvigalden/exectx/blob/0f41d8f/packages/exectx/src/executionFunc.ts#L174)

___

### \_\_params

• `Optional` **\_\_params**: `A`

#### Defined in

[exectx/src/executionFunc.ts:175](https://github.com/ludvigalden/exectx/blob/0f41d8f/packages/exectx/src/executionFunc.ts#L175)

___

### \_\_returned

• `Optional` **\_\_returned**: `RT`

#### Defined in

[exectx/src/executionFunc.ts:176](https://github.com/ludvigalden/exectx/blob/0f41d8f/packages/exectx/src/executionFunc.ts#L176)

___

### \_execution

• `Optional` **\_execution**: `E`

#### Defined in

[exectx/src/executionFunc.ts:173](https://github.com/ludvigalden/exectx/blob/0f41d8f/packages/exectx/src/executionFunc.ts#L173)
