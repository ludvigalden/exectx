### `exectx`

[![Stable Release](https://img.shields.io/npm/v/exectx.svg)](https://npm.im/exectx)
[![Blazing Fast](https://badgen.now.sh/badge/speed/blazing%20%F0%9F%94%A5/green)](https://npm.im/exectx)
[![gzip size](http://img.badgesize.io/https://unpkg.com/exectx@latest/dist/exectx.umd.production.min.js?compression=gzip)](https://unpkg.com/exectx@latest/dist/exectx.umd.production.min.js)
[![license](https://badgen.now.sh/badge/license/MIT)](./LICENSE)

---

## Modules
Module | Description
------ | -----------
[exectx] | <p>Makes an execution dependent function that accepts an execution as the last parameter only run for one execution at a time. That is, the execution passed to the function will be canceled if the function is called again during the time its returned value is being resolved. Additionally, there are options that allows for using the previously returned value of the function if the arguments and the passed execution are deemed equal.</p>

## Classes

Name | Description
------ | -----------
[Context] | <p>A cancellable with values that inherits cancellation state and values from any number of parents.</p>
[Execution] | <p>A cancellable that inherits cancellation state from any number of parents.</p>
[ExecutionSlot] | <p>A cancellable that inherits from one execution at a time.</p>

## Functions

Name | Description
------ | -----------
[useExecution()] | <p>Use an execution that is canceled when the component is unmounted or when the <code>deps</code> change. If the <code>parent</code> is specified as an array and the <code>deps</code> are undefined, make sure to memoize the array.</p>
[useExecutionFunc()] | <p>Use an execution dependent function and cancel any pending call when the component is unmounted or when the <code>deps</code> change. Make sure to specify <code>deps</code> if the <code>func</code> or <code>options</code> depend on any changing value.</p>
[useExecutionSlot(parent)] | <p>Use an execution slot that is canceled when the component is unmounted or when the <code>deps</code> change. If the <code>parent</code> is specified as an array and the <code>deps</code> are undefined, make sure to memoize the array.</p>
[useResolvedValue()] | <p>Use a resolved value and cancel any pending resoltion of the value when the component unmounts or when the <code>deps</code> change. Make sure to specify <code>deps</code> if <code>options</code> depend on any changing value. Additionally, if an <code>executionSlot</code> is specified, it will be canceled when the component unmounts or when the <code>deps</code> change.</p>
[executionResolve()] | <p>Resolves the specified value and applies any specified options, such as formatting the resolved value, handling interruptions, using default executions, nesting executions properly, and so on. It is useful if you don't know if a value will be resolved synchronously or asynchronously, and returning a promise in case any of the specified options leads to any asynchronicity.</p>

## Typedefs

Name | Description
------ | -----------
[ContextParentArg] | <p>Parent(s) to inherit inherit values and/or cancellation state from.</p>
[ExecutionParentArg] | <p>Parent(s) to inherit cancellation state from.</p>
[ExecutionFuncOptions] | 
[ExecutionFunc2] | 
[InnerExecutionFunc] | <p>Function that receives the passed parameters and an execution as the final parameter.</p>
[ExecutionFunc] | 

## exectx

<p>Makes an execution dependent function that accepts an execution as the last parameter only run for one execution at a time.
That is, the execution passed to the function will be canceled if the function is called again
during the time its returned value is being resolved. Additionally, there are options that allows for
using the previously returned value of the function if the arguments and the passed execution are deemed equal.</p>

**Returns**: <p>ExecutionFunc</p>  

| Param | Type | Description |
| --- | --- | --- |
| innerFunc | [`ExecutionFunc`] |  |
| options | [`ExecutionFuncOptions`] | <p>Options for the behaviour of the execution function.</p> |

## Context

<p>A cancellable with values that inherits cancellation state and values from any number of parents.</p>

**Kind**: global class  
**Extends**: [`Execution`]  

### new Context(values, parent)

<p>An execution that allows for storing values and inheriting values and cancellation
from parent contexts or executions.</p>

| Param | Type | Description |
| --- | --- | --- |
| values | `V` | <p>Values that are specific to the context.</p> |
| parent | [`ContextParentArg`] | <p>Parent(s) to inherit values and/or cancellation state from.</p> |

## Execution

<p>A cancellable that inherits cancellation state from any number of parents.</p>

**Kind**: global class  

### new Execution(parent)

<p>An execution is a context-like object that holds information about an execution being canceled.
It is intended to be used for asynchronous actions that can be canceled at any point in the future.
An execution can be canceled using the <code>cancel</code> method and checked whether canceled using the <code>canceled</code> property.
Additional methods and properties for efficient usage of the <code>canceled</code> property are <code>onCanceled</code>, <code>run</code>, and <code>promise</code>.</p>

| Param | Type | Description |
| --- | --- | --- |
| parent | [`ExecutionParentArg`] | <p>Parent(s) to inherit cancellation state from.</p> |

## ExecutionSlot

<p>A cancellable that inherits from one execution at a time.</p>

**Kind**: global class  
**Extends**: [`Execution`]  

### new ExecutionSlot(parent)

<p>It is oftentime useful to declare a slot for a category of executions. For instance, a service might have
a method that uses an execution but that should only be processing once. It simply features that if there is a current
pending execution in the slot when a new execution is set, the previous execution is set canceled.
It also provides the getter <code>promise</code> which returns a promise that is resolved when the last execution is canceled.</p>

| Param | Type | Description |
| --- | --- | --- |
| parent | [`ExecutionParentArg`] | <p>Parent(s) to inherit cancellation state from.</p> |

## useExecution()

<p>Use an execution that is canceled when the component is unmounted or when the <code>deps</code> change.
If the <code>parent</code> is specified as an array and the <code>deps</code> are undefined, make sure to memoize the array.</p>

**Kind**: global function  

## useExecutionFunc()

<p>Use an execution dependent function and cancel any pending call when the component is unmounted or when the <code>deps</code> change.
Make sure to specify <code>deps</code> if the <code>func</code> or <code>options</code> depend on any changing value.</p>

**Kind**: global function  

## useExecutionSlot(parent)

<p>Use an execution slot that is canceled when the component is unmounted or when the <code>deps</code> change.
If the <code>parent</code> is specified as an array and the <code>deps</code> are undefined, make sure to memoize the array.</p>

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| parent | [`ExecutionParentArg`] | <p>Parent(s) to inherit cancellation state from.</p> |

## useResolvedValue()

<p>Use a resolved value and cancel any pending resoltion of the value when the component unmounts or when the <code>deps</code> change.
Make sure to specify <code>deps</code> if <code>options</code> depend on any changing value. Additionally, if an <code>executionSlot</code> is specified,
it will be canceled when the component unmounts or when the <code>deps</code> change.</p>

**Kind**: global function  

## executionResolve()

<p>Resolves the specified value and applies any specified options, such as formatting the resolved value,
handling interruptions, using default executions, nesting executions properly, and so on. It is useful
if you don't know if a value will be resolved synchronously or asynchronously, and returning a promise
in case any of the specified options leads to any asynchronicity.</p>

**Kind**: global function  

## ContextParentArg

<p>Parent(s) to inherit inherit values and/or cancellation state from.</p>

**Kind**: global typedef  

## ExecutionParentArg

<p>Parent(s) to inherit cancellation state from.</p>

**Kind**: global typedef  

## ExecutionFuncOptions

**Kind**: global typedef  

## ExecutionFunc2

**Kind**: global typedef  

## InnerExecutionFunc

<p>Function that receives the passed parameters and an execution as the final parameter.</p>

**Kind**: global typedef  
**Returns**: <p>T</p>  

| Param | Type |
| --- | --- |
| ...params | `A` | 
| execution | [`Execution`] | 

## ExecutionFunc

**Kind**: global typedef  
**Returns**: <p>T</p>  

| Param | Type |
| --- | --- |
| ...params | `A` | 
| execution | [`Execution`] | 

<!-- LINKS -->

[exectx]:#exectx
[Context]:#context
[Execution]:#execution
[ExecutionSlot]:#executionslot
[ContextParentArg]:#contextparentarg
[ExecutionParentArg]:#executionparentarg
[ExecutionFuncOptions]:#executionfuncoptions
[ExecutionFunc2]:#executionfunc2
[InnerExecutionFunc]:#innerexecutionfunc
[ExecutionFunc]:#executionfunc
[`ExecutionFunc`]:#executionfunc
[`ExecutionFuncOptions`]:#executionfuncoptions
[`Execution`]:#execution
[`ContextParentArg`]:#contextparentarg
[`ExecutionParentArg`]:#executionparentarg
[useExecution()]:#useexecution
[useExecutionFunc()]:#useexecutionfunc
[useExecutionSlot(parent)]:#useexecutionslotparent
[useResolvedValue()]:#useresolvedvalue
[executionResolve()]:#executionresolve

## Authors

- Ludvig Aldén [@ludvigalden](https://github.com/ludvigalden)

---

[MIT License.](https://github.com/ludvigalden/exectx/blob/main/LICENSE)
