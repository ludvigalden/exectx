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

#### Type parameters

| Name | Type |
| :------ | :------ |
| `A` | extends `any`[] |
| `RT` | `RT` |
| `E` | extends [`Execution`](../wiki/exectx.Execution)<`E`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `innerFunc` | (...`params`: [...params: A[], execution: E]) => `RT` |
| `options?` | [`ExecutionFuncOptions`](../wiki/exectx.ExecutionFuncOptions)<`A`, `E`\> |

#### Returns

[`ExecutionFunc`](../wiki/exectx.ExecutionFunc)<`A`, `RT`, `E`\>

#### Defined in

[exectx/src/executionFunc.ts:16](https://github.com/ludvigalden/exectx/blob/0f41d8f/packages/exectx/src/executionFunc.ts#L16)

___

### executionResolve

▸ **executionResolve**<`T`, `RT`, `E`\>(`options`): `RT` \| `Promise`<`RT` \| `void`\>

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

[exectx/src/executionResolve.ts:14](https://github.com/ludvigalden/exectx/blob/0f41d8f/packages/exectx/src/executionResolve.ts#L14)
