# Interface: NestExecutionOptions<T, PT\>

[exectx](../wiki/exectx).NestExecutionOptions

**`see`** [`nestExecution`](../wiki/exectx#nestexecution)

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Execution`](../wiki/exectx.Execution) = [`Execution`](../wiki/exectx.Execution) |
| `PT` | extends [`Execution`](../wiki/exectx.Execution) = [`Execution`](../wiki/exectx.Execution) |

## Table of contents

### Properties

- [child](../wiki/exectx.NestExecutionOptions#child)
- [customConstructor](../wiki/exectx.NestExecutionOptions#customconstructor)
- [parent](../wiki/exectx.NestExecutionOptions#parent)

## Properties

### child

• `Optional` **child**: `T`

The child to pass cancellation state from any specified parent(s) to.
The same instance will be returned if defined.

#### Defined in

[exectx/src/nestExecution.ts:54](https://github.com/ludvigalden/exectx/blob/832bc31/packages/exectx/src/nestExecution.ts#L54)

___

### customConstructor

• `Optional` **customConstructor**: [`ExecutionConstructor`](../wiki/exectx#executionconstructor)<`T`, `PT`\>

A custom execution constructor,
which will be used to construct the nested execution if `child` is null.

#### Defined in

[exectx/src/nestExecution.ts:59](https://github.com/ludvigalden/exectx/blob/832bc31/packages/exectx/src/nestExecution.ts#L59)

___

### parent

• `Optional` **parent**: [`ExecutionsArg`](../wiki/exectx#executionsarg)<`PT`\>

Parent(s) to inherit cancellation state from.

#### Defined in

[exectx/src/nestExecution.ts:49](https://github.com/ludvigalden/exectx/blob/832bc31/packages/exectx/src/nestExecution.ts#L49)
