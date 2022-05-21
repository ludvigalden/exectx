### `exectx`

[![Stable Release](https://img.shields.io/npm/v/exectx.svg)](https://npm.im/exectx)
[![Blazing Fast](https://badgen.now.sh/badge/speed/blazing%20%F0%9F%94%A5/green)](https://npm.im/exectx)
[![gzip size](http://img.badgesize.io/https://unpkg.com/exectx@latest/dist/exectx.umd.production.min.js?compression=gzip)](https://unpkg.com/exectx@latest/dist/exectx.umd.production.min.js)
[![license](https://badgen.now.sh/badge/license/MIT)](./LICENSE)

---

Cancelable executions and contexts are important for making both front-end and back-end applications more performant. For instance, HTTP requests can be canceled when a screen is changed. This package makes such things easier to implement.

## `new Execution(?parent)`

An execution is cancelable by the `cancel()` method and provides the properties `canceled`, `promiseCanceled` as well as the methods `onCanceled(callback)` and `run(...actions)` (which allows for running a series of actions that depend on the previous action being completed or its returned value ... see the jsdoc for more info). It can also be nested using the `nest()` method (which is basically the same as doing `new Execution(parent)`), making its descendants to inherit its cancellation state (being canceled too whenever any of its parents are canceled).

## `new ExecutionSlot(?parent)`

Holds a single execution at a time inherits the cancellation state from the currently set execution. It also cancels the currently set execution when it is replaced by a different execution.

## `new Context(values, ?parent)`

A context is an extension of an execution (and functions the same way with regards to cancellations), also being able to hold values that are passed on to descending contexts. The implementation is type-safe and allows for easily creating custom constructors extending `Context`.

## `executionFunc(func, ?opts)`

Transforms a function so that it always receives an execution as the last argument and only runs the function for one execution at a time. That is, if the function returned from `executionFunc(func)` is called with an execution, such as `(...args, executionA)`, and is later called with a different execution before the previous call has finished (or the returned promise has been resolved), such as `(...args, executionB)`, the execution passed to the `func` will be canceled. On the other hand, if it's called with the same `executionA`, the same value will be returned as from the previous call. See the jsdoc comments for the options `equalArguments` and `equalExecutions` for more info.

## `executionResolve(opts)`

A helper function for resolving expensive values with a large number of options, such as `value`, `getValue`, `getDefaultValue`, `formatValue`, `onResolved`, `onInterrupted`, and so on. See the jsdoc comments for more info.

## Authors

- Ludvig Aldén [@ludvigalden](https://github.com/ludvigalden)

---

[MIT License.](https://github.com/ludvigalden/exectx/blob/master/LICENSE)
