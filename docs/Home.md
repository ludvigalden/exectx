# `exectx-monorepo`

[![Stable Release](https://img.shields.io/npm/v/exectx.svg)](https://npm.im/exectx)
[![Documentation](./docs/coverage.svg)](https://github.com/ludvigalden/exectx/wiki)
[![Blazing Fast](https://badgen.now.sh/badge/speed/blazing%20%F0%9F%94%A5/green)](https://npm.im/exectx)
[![gzip size](http://img.badgesize.io/https://unpkg.com/exectx@latest/dist/exectx.umd.min.js?compression=gzip)](https://unpkg.com/exectx@latest/dist/exectx.umd.min.js)
[![license](https://badgen.now.sh/badge/license/MIT)](./LICENSE)

---

Check out the [wiki page for `exectx`](https://github.com/ludvigalden/exectx/wiki/exectx).

## Classes

<dl>
<dt><a href="#Context">Context</a> ⇐ <code><a href="#Execution">Execution</a></code></dt>
<dd><p>A cancelable that holds mutable values and can inherit from other contexts and executions.</p></dd>
<dt><a href="#Execution">Execution</a></dt>
<dd><p>A cancelable that can inherit cancellation of other contexts and executions.</p></dd>
<dt><a href="#ExecutionSlot">ExecutionSlot</a> ⇐ <code><a href="#Execution">Execution</a></code></dt>
<dd><p>A cancelable that holds one execution simultaneously and cancels executions when replaced.</p></dd>
</dl>

## Members

<dl>
<dt><a href="#defaultContext">defaultContext</a></dt>
<dd><p>The default React context that is used.</p></dd>
</dl>

## Functions

<dl>
<dt><a href="#axiosExecutionRequest">axiosExecutionRequest(config)</a> ⇒ <code>AxiosPromise.&lt;D&gt;</code></dt>
<dd><p>Makes a request using {@linkcode axios.request} and attaches the specified execution, which
will cancel the request whenever the execution is canceled.</p></dd>
<dt><a href="#createAxiosCancelTokenSource">createAxiosCancelTokenSource(execution)</a> ⇒ <code>CancelTokenSource</code></dt>
<dd><p>Creates a {@linkcode CancelTokenSource} based on an execution for use with {@linkcode axios}.</p></dd>
<dt><a href="#createContext">createContext(values, parent)</a> ⇒ <code>ReactContext.&lt;V&gt;</code></dt>
<dd><p>Creates a React context for a [`Context`](../wiki/exectx.Context).
It can be nested using the [`ContextProvider`](../wiki/exectx-react#contextprovider).</p></dd>
<dt><a href="#useContext">useContext(context)</a> ⇒ <code><a href="#Context">Context</a></code></dt>
<dd><p>React hook for consuming a provided [`Context`](../wiki/exectx.Context).</p></dd>
<dt><a href="#useExecution">useExecution(parent, deps)</a> ⇒ <code><a href="#Execution">Execution</a></code></dt>
<dd><p>React hook for using an [`Execution`](../wiki/exectx.Execution) that is canceled when the component is unmounted.</p></dd>
<dt><a href="#useExecutionFunc">useExecutionFunc(innerFunc, options, deps)</a> ⇒ <code>ExecutionFunc</code></dt>
<dd><p>React hook for using an execution-dependent function and cancel any pending call when the component is unmounted.</p></dd>
<dt><a href="#useExecutionSlot">useExecutionSlot(parent, deps)</a> ⇒ <code><a href="#ExecutionSlot">ExecutionSlot</a></code></dt>
<dd><p>React hook for using an [`ExecutionSlot`](../wiki/exectx.ExecutionSlot) that is canceled when the component is unmounted or when the <code>deps</code> change.</p></dd>
<dt><a href="#useResolvedValue">useResolvedValue(options, deps)</a> ⇒ <code>RT</code> | <code>undefined</code></dt>
<dd><p>React hook for using a resolved value and cancelling any pending resolution of the value when the component unmounts
or when any of the specified <code>deps</code> change.</p></dd>
<dt><a href="#executionFunc">executionFunc(innerFunc, options)</a> ⇒ <code>ExecutionFunc</code></dt>
<dd><p>Transforms a function so that it always receives an execution as the last argument and only runs the function for one execution at a time.
That is, if the function returned from <code>executionFunc(innerFunc)</code> is called with an execution, such as <code>(...args, executionA)</code>, and is later
called with a different execution before the previous call has finished (or the returned promise has been resolved), such as <code>(...args, executionB)</code>,
the execution passed to the <code>func</code> will be canceled. On the other hand, if it's called with the same <code>executionA</code>, the same value will be returned as
from the previous call.</p></dd>
<dt><a href="#executionResolve">executionResolve(options)</a> ⇒ <code>RT</code> | <code>Promise.&lt;(RT|void)&gt;</code></dt>
<dd><p>Resolves the specified value and applies any specified options, such as formatting the resolved value,
handling interruptions, using default executions, nesting executions properly, and so on. It is useful
if you don't know if a value will be resolved synchronously or asynchronously, and returning a promise
in case any of the specified options leads to any asynchronicity. It can also be used as a tool
for resolving expensive values.</p></dd>
<dt><a href="#executionRun">executionRun(execution, ...actions)</a> ⇒ <code>RunReturnValue.&lt;T&gt;</code></dt>
<dd><p>Runs one or more actions for an execution and returns the value returned from the last action.</p></dd>
<dt><a href="#nestContext">nestContext(options)</a> ⇒ <code><a href="#Execution">Execution</a></code></dt>
<dd><p>Makes a child context that inherits cancellation-state and values from any number of parent(s).
It can be pre-constructed by specifying a <code>child</code> or constructed using a custom <code>constructor</code>.</p></dd>
<dt><a href="#nestExecution">nestExecution(options)</a> ⇒ <code><a href="#Execution">Execution</a></code></dt>
<dd><p>Makes a child execution that inherits cancellation-state from any number of parent(s).
It can be pre-constructed by specifying a <code>child</code> or constructed using a <code>customConstructor</code>.</p></dd>
<dt><a href="#parseExecutionsArg">parseExecutionsArg(arg)</a> ⇒ <code><a href="#Execution">Array.&lt;Execution&gt;</a></code></dt>
<dd><p>Parses loosely specified executions into an array of valid executions.</p></dd>
</dl>

## Authors

- Ludvig Aldén [@ludvigalden](https://github.com/ludvigalden)

---

[MIT License.](https://github.com/ludvigalden/exectx/blob/main/LICENSE)
