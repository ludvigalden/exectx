# Interface: ReactContext<V\>

[exectx-react](../wiki/exectx-react).ReactContext

React context that also have a `root` specified, which will be the consumed [`Context`](../wiki/exectx.Context)
unless it has been nested using the [`ContextProvider`](../wiki/exectx-react#contextprovider).

## Type parameters

| Name | Type |
| :------ | :------ |
| `V` | extends `object` |

## Hierarchy

- [`Context`](../wiki/exectx.Context)<[`Context`](../wiki/exectx.Context)<`V`\>\>

  ↳ **`ReactContext`**

## Table of contents

### Properties

- [root](../wiki/exectx-react.ReactContext#root)

## Properties

### root

• **root**: [`Context`](../wiki/exectx.Context)<`V`\>

The root [`Context`](../wiki/exectx.Context) that will be nested and consumed by React tree descendants.

#### Defined in

exectx-react/src/createReactContext.ts:34
