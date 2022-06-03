### `exectx-react`

[![Stable Release](https://img.shields.io/npm/v/exectx-react.svg)](https://npm.im/exectx-react)
[![Documentation](https://img.shields.io/badge/docs-wiki-blue.svg)](https://github.com/ludvigalden/exectx/wiki/exectx)
[![Blazing Fast](https://badgen.now.sh/badge/speed/blazing/green)](https://npm.im/exectx-react)
[![gzip size](http://img.badgesize.io/https://unpkg.com/exectx-react@latest/dist/exectx-react.umd.min.js?compression=gzip)](https://unpkg.com/exectx-react@latest/dist/exectx-react.umd.min.js)
[![license](https://badgen.now.sh/badge/license/MIT)](./LICENSE)

---

## Constants

<dl>
<dt><a href="#defaultContext">defaultContext</a></dt>
<dd><p>The default React context that is used.</p></dd>
</dl>

## Functions

<dl>
<dt><a href="#createContext">createContext(values, parent)</a> ⇒ <code>ReactContext.&lt;V&gt;</code></dt>
<dd><p>Creates a React context for a {@linkcode Context}.
It can be nested using the {@linkcode ContextProvider}.</p></dd>
<dt><a href="#useContext">useContext(context)</a> ⇒ <code>Context</code></dt>
<dd><p>React hook for consuming a provided {@linkcode Context}.</p></dd>
<dt><a href="#useExecution">useExecution(parent, deps)</a> ⇒ <code>Execution</code></dt>
<dd><p>React hook for using an {@linkcode Execution} that is canceled when the component is unmounted.</p></dd>
<dt><a href="#useExecutionFunc">useExecutionFunc(innerFunc, options, deps)</a> ⇒ <code>ExecutionFunc</code></dt>
<dd><p>React hook for using an execution-dependent function and cancel any pending call when the component is unmounted.</p></dd>
<dt><a href="#useExecutionSlot">useExecutionSlot(parent, deps)</a> ⇒ <code>ExecutionSlot</code></dt>
<dd><p>React hook for using an {@linkcode ExecutionSlot} that is canceled when the component is unmounted or when the <code>deps</code> change.</p></dd>
<dt><a href="#useResolvedValue">useResolvedValue(options, deps)</a> ⇒ <code>RT</code> | <code>undefined</code></dt>
<dd><p>React hook for using a resolved value and cancelling any pending resolution of the value when the component unmounts
or when any of the specified <code>deps</code> change.</p></dd>
</dl>

<a name="defaultContext"></a>

## defaultContext
<p>The default React context that is used.</p>

**Kind**: global constant  
<a name="createContext"></a>

## createContext(values, parent) ⇒ <code>ReactContext.&lt;V&gt;</code>
<p>Creates a React context for a {@linkcode Context}.
It can be nested using the {@linkcode ContextProvider}.</p>

**Kind**: global function  
**Returns**: <code>ReactContext.&lt;V&gt;</code> - <p>The created React context.</p>  

| Param | Type | Description |
| --- | --- | --- |
| values | <code>V</code> | <p>Default values to set to the root context.</p> |
| parent | <code>ContextParentArg.&lt;V&gt;</code> | <p>arent(s) to inherit values and/or cancellation state from.</p> |

<a name="useContext"></a>

## useContext(context) ⇒ <code>Context</code>
<p>React hook for consuming a provided {@linkcode Context}.</p>

**Kind**: global function  
**Returns**: <code>Context</code> - <p>The consumed context.</p>  
**See**

- {@linkcode ContextProvider}
- {@linkcode createReactContext}


| Param | Type | Description |
| --- | --- | --- |
| context | <code>ReactContext</code> | <p>The React context to consume. Defaults to the {@linkcode defaultContext}.</p> |

<a name="useExecution"></a>

## useExecution(parent, deps) ⇒ <code>Execution</code>
<p>React hook for using an {@linkcode Execution} that is canceled when the component is unmounted.</p>

**Kind**: global function  
**Returns**: <code>Execution</code> - <p>The constructed execution.</p>  

| Param | Type | Description |
| --- | --- | --- |
| parent | <code>ExecutionsArg</code> | <p>If defined, the returned execution will be nested from the specified parent(s). If specified as an array and the <code>deps</code> are undefined, make sure to memoize the array.</p> |
| deps | <code>ReadonlyArray</code> | <p>When identities of the <code>deps</code> change, the execution will be reconstructed.</p> |

<a name="useExecutionFunc"></a>

## useExecutionFunc(innerFunc, options, deps) ⇒ <code>ExecutionFunc</code>
<p>React hook for using an execution-dependent function and cancel any pending call when the component is unmounted.</p>

**Kind**: global function  
**Returns**: <code>ExecutionFunc</code> - <p>The transformed execution func, which accepts an execution as the final optional parameter.</p>  

| Param | Type | Description |
| --- | --- | --- |
| innerFunc | <code>InnerExecutionFunc</code> | <p>Function that receives the passed parameters and an execution as the final parameter.</p> |
| options | <code>ExecutionFuncOptions</code> | <p>Options for the behaviour of the execution function. For instance, these allow for using the previously returned value of the function if the arguments and the passed execution are deemed equal.</p> |
| deps | <code>ReadonlyArray</code> | <p>When identities of the <code>deps</code> change, the execution func will be reconstructed, so make sure to specify these if the <code>innerFunc</code> or <code>options</code> depend on any changing variable.</p> |

<a name="useExecutionSlot"></a>

## useExecutionSlot(parent, deps) ⇒ <code>ExecutionSlot</code>
<p>React hook for using an {@linkcode ExecutionSlot} that is canceled when the component is unmounted or when the <code>deps</code> change.</p>

**Kind**: global function  
**Returns**: <code>ExecutionSlot</code> - <p>The constructed execution slot.</p>  

| Param | Type | Description |
| --- | --- | --- |
| parent | <code>ExecutionsArg</code> | <p>If defined, the returned execution slot will be nested from the specified parent(s). If specified as an array and the <code>deps</code> are undefined, make sure to memoize the array.</p> |
| deps | <code>ReadonlyArray</code> | <p>When identities of the <code>deps</code> change, the execution slot will be reconstructed.</p> |

<a name="useResolvedValue"></a>

## useResolvedValue(options, deps) ⇒ <code>RT</code> \| <code>undefined</code>
<p>React hook for using a resolved value and cancelling any pending resolution of the value when the component unmounts
or when any of the specified <code>deps</code> change.</p>

**Kind**: global function  
**Returns**: <code>RT</code> \| <code>undefined</code> - <p>The resolved value, or undefined if it's currently being resolved.</p>  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>ExecutionResolveOptions</code> | <p>Specifies how to resolve the value and configures the use of executions. If an <code>executionSlot</code> is specified, it will be canceled when the component unmounts or when the <code>deps</code> change.</p> |
| deps | <code>ReadonlyArray</code> | <p>When identities of the <code>deps</code> change, the value will be resolved again. Should be defined if the <code>options</code> depend on any changing value.</p> |


## Authors

- Ludvig Aldén [@ludvigalden](https://github.com/ludvigalden)

---

[MIT License.](https://github.com/ludvigalden/exectx/blob/main/LICENSE)
