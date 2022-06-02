# Module: exectx

## Table of contents

### Classes

- [Context](../wiki/exectx.Context)
- [Execution](../wiki/exectx.Execution)
- [ExecutionSlot](../wiki/exectx.ExecutionSlot)

### Interfaces

- [ExecutionFunc](../wiki/exectx.ExecutionFunc)
- [ExecutionFuncOptions](../wiki/exectx.ExecutionFuncOptions)
- [ExecutionResolveOptions](../wiki/exectx.ExecutionResolveOptions)

### Functions

- [executionFunc](../wiki/exectx#executionfunc)
- [executionResolve](../wiki/exectx#executionresolve)

## Functions

### executionFunc

▸ **executionFunc**<`A`, `RT`, `E`\>(`innerFunc`, `options?`): [`ExecutionFunc`](../wiki/exectx.ExecutionFunc)<`A`, `RT`, `E`\>

Makes an execution dependent function that accepts an execution as the last parameter only run for one execution at a time.
That is, the execution passed to the function will be canceled if the function is called again
during the time its returned value is being resolved.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `A` | extends `any`[] |
| `RT` | `RT` |
| `E` | extends [`Execution`](../wiki/exectx.Execution)<`E`\> |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `innerFunc` | (...`params`: [...params: A[], execution: E]) => `RT` | Function that receives the passed parameters and an execution as the final parameter. |
| `options?` | [`ExecutionFuncOptions`](../wiki/exectx.ExecutionFuncOptions)<`A`, `E`\> | Options for the behaviour of the execution function. For instance, these allow for using the previously returned value of the function if the arguments and the passed execution are deemed equal. |

#### Returns

[`ExecutionFunc`](../wiki/exectx.ExecutionFunc)<`A`, `RT`, `E`\>

#### Defined in

[exectx/src/executionFunc.ts:12](https://github.com/ludvigalden/exectx/blob/b8a37e3/packages/exectx/src/executionFunc.ts#L12)

___

### executionResolve

▸ **executionResolve**<`T`, `RT`, `E`\>(`options`): `RT` \| `Promise`<`RT` \| `void`\>

Resolves the specified value and applies any specified options, such as formatting the resolved value,
handling interruptions, using default executions, nesting executions properly, and so on. It is useful
if you don't know if a value will be resolved synchronously or asynchronously, and returning a promise
in case any of the specified options leads to any asynchronicity.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `RT` | `T` |
| `E` | extends [`Execution`](../wiki/exectx.Execution)<`E`\> = [`Execution`](../wiki/exectx.Execution) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`ExecutionResolveOptions`](../wiki/exectx.ExecutionResolveOptions)<`T`, `RT`, `E`\> |

#### Returns

`RT` \| `Promise`<`RT` \| `void`\>

#### Defined in

[exectx/src/executionResolve.ts:12](https://github.com/ludvigalden/exectx/blob/b8a37e3/packages/exectx/src/executionResolve.ts#L12)
