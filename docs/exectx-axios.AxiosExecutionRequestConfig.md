# Interface: AxiosExecutionRequestConfig<D\>

[exectx-axios](../wiki/exectx-axios).AxiosExecutionRequestConfig

**`see`** [`axiosExecutionRequest`](../wiki/exectx-axios#axiosexecutionrequest)

## Type parameters

| Name | Type |
| :------ | :------ |
| `D` | `any` |

## Hierarchy

- `Omit`<`AxiosRequestConfig`<`D`\>, ``"cancelToken"``\>

  ↳ **`AxiosExecutionRequestConfig`**

## Table of contents

### Properties

- [execution](../wiki/exectx-axios.AxiosExecutionRequestConfig#execution)

## Properties

### execution

• `Optional` **execution**: [`Execution`](../wiki/exectx.Execution)

The execution to attach to the request. When canceled, the request will also be canceled.

#### Defined in

exectx-axios/src/axiosExecutionRequest.ts:33
