# Interface: ContextProviderProps<PV, V\>

[exectx-react](../wiki/exectx-react).ContextProviderProps

**`see`** [`ContextProvider`](../wiki/exectx-react#contextprovider)

## Type parameters

| Name | Type |
| :------ | :------ |
| `PV` | extends `object` = [`DefaultContextValues`](../wiki/exectx-react.DefaultContextValues) |
| `V` | extends `object` = `PV` |

## Hierarchy

- `Omit`<[`NestContextOptions`](../wiki/exectx.NestContextOptions)<`PV`, `V`\>, ``"parent"`` \| ``"child"``\>

  ↳ **`ContextProviderProps`**

## Table of contents

### Properties

- [context](../wiki/exectx-react.ContextProviderProps#context)
- [customConstructor](../wiki/exectx-react.ContextProviderProps#customconstructor)
- [deps](../wiki/exectx-react.ContextProviderProps#deps)
- [otherParents](../wiki/exectx-react.ContextProviderProps#otherparents)
- [skipNestExecution](../wiki/exectx-react.ContextProviderProps#skipnestexecution)
- [values](../wiki/exectx-react.ContextProviderProps#values)

## Properties

### context

• `Optional` **context**: [`ReactContext`](../wiki/exectx-react.ReactContext)<`V`\>

The context to provide and nest the consumed instance of.
If undefined, the [`defaultContext`](../wiki/exectx-react#defaultcontext) will be used.

#### Defined in

exectx-react/src/ContextProvider.tsx:37

___

### customConstructor

• `Optional` **customConstructor**: [`ContextConstructor`](../wiki/exectx#contextconstructor)<`V`, [`Context`](../wiki/exectx.Context)<`V`\>\>

Allows for using a custom constructor for the returned context.

#### Inherited from

Omit.customConstructor

#### Defined in

exectx/dist/declarations/src/nestContext.d.ts:25

___

### deps

• `Optional` **deps**: readonly `any`[]

When the identity of any of the `deps` array elements change,
the provided context will be re-constructed. If undefined, the provided
context will only be re-constructed when the consumed instance change.

#### Defined in

exectx-react/src/ContextProvider.tsx:43

___

### otherParents

• `Optional` **otherParents**: [`ContextParentArg`](../wiki/exectx#contextparentarg)<`V`\>[]

Other parents to inherit values and/or cancellation state from.

#### Inherited from

Omit.otherParents

#### Defined in

exectx/dist/declarations/src/nestContext.d.ts:19

___

### skipNestExecution

• `Optional` **skipNestExecution**: `boolean`

Whether the cancellation-state should not be nested.

#### Inherited from

Omit.skipNestExecution

#### Defined in

exectx/dist/declarations/src/nestContext.d.ts:27

___

### values

• `Optional` **values**: `V`

Values to set to the nested context, which will replace values defined in parent contexts.

#### Inherited from

Omit.values

#### Defined in

exectx/dist/declarations/src/nestContext.d.ts:21
