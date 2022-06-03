# Interface: NestContextOptions<PV, V, T\>

[exectx](../wiki/exectx).NestContextOptions

**`see`** [`nestContext`](../wiki/exectx#nestcontext)

## Type parameters

| Name | Type |
| :------ | :------ |
| `PV` | extends `object` = `any` |
| `V` | extends `object` = `PV` |
| `T` | extends [`Context`](../wiki/exectx.Context)<[`NestedContextValues`](../wiki/exectx#nestedcontextvalues)<`PV`, `V`\>\> = [`Context`](../wiki/exectx.Context)<[`NestedContextValues`](../wiki/exectx#nestedcontextvalues)<`PV`, `V`\>\> |

## Table of contents

### Properties

- [child](../wiki/exectx.NestContextOptions#child)
- [customConstructor](../wiki/exectx.NestContextOptions#customconstructor)
- [otherParents](../wiki/exectx.NestContextOptions#otherparents)
- [parent](../wiki/exectx.NestContextOptions#parent)
- [skipNestExecution](../wiki/exectx.NestContextOptions#skipnestexecution)
- [values](../wiki/exectx.NestContextOptions#values)

## Properties

### child

• `Optional` **child**: `T`

Allows for nesting a pre-constructed context.

#### Defined in

exectx/src/nestContext.ts:82

___

### customConstructor

• `Optional` **customConstructor**: [`ContextConstructor`](../wiki/exectx#contextconstructor)<`V`, [`Context`](../wiki/exectx.Context)<`V`\>\>

Allows for using a custom constructor for the returned context.

#### Defined in

exectx/src/nestContext.ts:84

___

### otherParents

• `Optional` **otherParents**: [`ContextParentArg`](../wiki/exectx#contextparentarg)<`V`\>[]

Other parents to inherit values and/or cancellation state from.

#### Defined in

exectx/src/nestContext.ts:78

___

### parent

• `Optional` **parent**: [`ContextParentArg`](../wiki/exectx#contextparentarg)<`PV`\>

Parent(s) to inherit values and/or cancellation state from.

#### Defined in

exectx/src/nestContext.ts:76

___

### skipNestExecution

• `Optional` **skipNestExecution**: `boolean`

Whether the cancellation-state should not be nested.

#### Defined in

exectx/src/nestContext.ts:86

___

### values

• `Optional` **values**: `V`

Values to set to the nested context, which will replace values defined in parent contexts.

#### Defined in

exectx/src/nestContext.ts:80
