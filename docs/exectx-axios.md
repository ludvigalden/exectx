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

Makes a request using {@linkcode axios.request} and attaches the specified execution, which
will cancel the request whenever the execution is canceled.

#### Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `D` | `any` | Requested type of data. |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `config` | [`AxiosExecutionRequestConfig`](../wiki/exectx-axios.AxiosExecutionRequestConfig)<`D`\> | Axios request configuration that also accepts an execution. |

#### Returns

`AxiosPromise`<`D`\>

A promise that resolves the axios response.

#### Defined in

[exectx-axios/src/axiosExecutionRequest.ts:14](https://github.com/ludvigalden/exectx/blob/832bc31/packages/exectx-axios/src/axiosExecutionRequest.ts#L14)

___

### createAxiosCancelTokenSource

▸ **createAxiosCancelTokenSource**(`execution?`): `CancelTokenSource`

Creates a {@linkcode CancelTokenSource} based on an execution for use with {@linkcode axios}.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `execution?` | [`Execution`](../wiki/exectx.Execution) | The execution from which to inherit cancellation state from. |

#### Returns

`CancelTokenSource`

The cancel token to be used with {@linkcode axios}.

#### Defined in

[exectx-axios/src/createAxiosCancelTokenSource.ts:10](https://github.com/ludvigalden/exectx/blob/832bc31/packages/exectx-axios/src/createAxiosCancelTokenSource.ts#L10)
