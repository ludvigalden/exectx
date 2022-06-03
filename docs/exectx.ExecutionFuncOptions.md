# Interface: ExecutionFuncOptions<A, E\>

[exectx](../wiki/exectx).ExecutionFuncOptions

**`see`** [`executionFunc`](../wiki/exectx#executionfunc)

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

• `Optional` **defaultExecution**: `E` \| [`ExecutionGetter`](../wiki/exectx#executiongetter)<`E`\>

If the function is called without a defined execution, a fallback execution is defaulted to.
This defaults to a never-canceled execution, but can be overriden using this option.
As always, the execution is nested before being passed to the inner function.

#### Defined in

[exectx/src/executionFunc.ts:215](https://github.com/ludvigalden/exectx/blob/832bc31/packages/exectx/src/executionFunc.ts#L215)

___

### equalArguments

• `Optional` **equalArguments**: `boolean` \| [`ArgumentsEqualityChecker`](../wiki/exectx#argumentsequalitychecker)<`A`\>

If defined, every call to the function will be validated to see if the returned value
of the previous call should be returned, instead of calling the function again and
canceling the passed execution. It will only do this if the passed executions
are deemed equal (or are both undefined), though this can be configured using the `equalExecutions` option.
If set `true`, all parameters are deemed equal, and only the execution will be validated.

#### Defined in

[exectx/src/executionFunc.ts:205](https://github.com/ludvigalden/exectx/blob/832bc31/packages/exectx/src/executionFunc.ts#L205)

___

### equalExecutions

• `Optional` **equalExecutions**: `boolean` \| [`ExecutionEqualityChecker`](../wiki/exectx#executionequalitychecker)<`E`\>

Determines whether two executions are equal. If set `true`, all executions are deemed equal.

#### Defined in

[exectx/src/executionFunc.ts:209](https://github.com/ludvigalden/exectx/blob/832bc31/packages/exectx/src/executionFunc.ts#L209)
