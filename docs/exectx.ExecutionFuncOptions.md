# Interface: ExecutionFuncOptions<A, E\>

[exectx](../wiki/exectx).ExecutionFuncOptions

Options that alters the behaviour of an execution function.

## Type parameters

| Name | Type |
| :------ | :------ |
| `A` | extends `any`[] |
| `E` | extends [`Execution`](../wiki/exectx.Execution) |

## Table of contents

### Properties

- [defaultExecution](../wiki/exectx.ExecutionFuncOptions#defaultexecution)
- [equalArguments](../wiki/exectx.ExecutionFuncOptions#equalarguments)
- [equalExecutions](../wiki/exectx.ExecutionFuncOptions#equalexecutions)

## Properties

### defaultExecution

• `Optional` **defaultExecution**: `E` \| () => `E`

If the function is called without a defined execution, a fallback execution is defaulted to.
This defaults to a never-canceled execution, but can be overriden using this option.
As always, the execution is nested before being passed to the inner function.

#### Defined in

[exectx/src/executionFunc.ts:195](https://github.com/ludvigalden/exectx/blob/0f41d8f/packages/exectx/src/executionFunc.ts#L195)

___

### equalArguments

• `Optional` **equalArguments**: `boolean` \| `void` \| (`a`: `A`, `b`: `A`) => `boolean`

If defined, every call to the function will be validated to see if the returned value
of the previous call should be returned, instead of calling the function again and
canceling the passed execution. It will only do this if the passed executions
are deemed equal (or are both undefined), though this can be configured using the `equalExecutions` option.
If set `true`, all parameters are deemed equal, and only the execution will be validated.

#### Defined in

[exectx/src/executionFunc.ts:188](https://github.com/ludvigalden/exectx/blob/0f41d8f/packages/exectx/src/executionFunc.ts#L188)

___

### equalExecutions

• `Optional` **equalExecutions**: `boolean` \| `void` \| (`a`: `E`, `b`: `E`) => `boolean`

If `equalArguments` is defined, this option can determine whether two executions are equal.
If set `true`, all executions are deemed equal.

#### Defined in

[exectx/src/executionFunc.ts:191](https://github.com/ludvigalden/exectx/blob/0f41d8f/packages/exectx/src/executionFunc.ts#L191)
