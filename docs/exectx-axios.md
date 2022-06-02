# Module: exectx-axios

## Table of contents

### Interfaces

- [AxiosExecutionRequestConfig](../wiki/exectx-axios.AxiosExecutionRequestConfig)

### Functions

- [axiosExecutionRequest](../wiki/exectx-axios#axiosexecutionrequest)
- [createAxiosCancelTokenSource](../wiki/exectx-axios#createaxioscanceltokensource)

## Functions

### axiosExecutionRequest

▸ **axiosExecutionRequest**<`D`\>(`config`): `AxiosPromise`<`D`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `D` | `any` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`AxiosExecutionRequestConfig`](../wiki/exectx-axios.AxiosExecutionRequestConfig)<`D`\> |

#### Returns

`AxiosPromise`<`D`\>

#### Defined in

exectx-axios/src/axiosExecutionRequest.ts:6

___

### createAxiosCancelTokenSource

▸ **createAxiosCancelTokenSource**(`execution?`): `CancelTokenSource`

#### Parameters

| Name | Type |
| :------ | :------ |
| `execution?` | [`Execution`](../wiki/exectx.Execution) |

#### Returns

`CancelTokenSource`

#### Defined in

exectx-axios/src/createAxiosCancelTokenSource.ts:4
