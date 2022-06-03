# `exectx-axios`

[![Stable Release](https://img.shields.io/npm/v/exectx-axios.svg)](https://npm.im/exectx-axios)
[![Documentation](https://img.shields.io/badge/docs-wiki-blue.svg)](https://github.com/ludvigalden/exectx/wiki/exectx-axios)
[![Blazing Fast](https://badgen.now.sh/badge/speed/blazing/green)](https://npm.im/exectx-axios)
[![gzip size](http://img.badgesize.io/https://unpkg.com/exectx-axios@latest/dist/exectx-axios.umd.min.js?compression=gzip)](https://unpkg.com/exectx-axios@latest/dist/exectx-axios.umd.min.js)
[![license](https://badgen.now.sh/badge/license/MIT)](./LICENSE)

---

## Functions

<dl>
<dt><a href="#axiosExecutionRequest">axiosExecutionRequest(config)</a> ⇒ <code>AxiosPromise.&lt;D&gt;</code></dt>
<dd><p>Makes a request using {@linkcode axios.request} and attaches the specified execution, which
will cancel the request whenever the execution is canceled.</p></dd>
<dt><a href="#createAxiosCancelTokenSource">createAxiosCancelTokenSource(execution)</a> ⇒ <code>CancelTokenSource</code></dt>
<dd><p>Creates a {@linkcode CancelTokenSource} based on an execution for use with {@linkcode axios}.</p></dd>
</dl>


## Authors

- Ludvig Aldén [@ludvigalden](https://github.com/ludvigalden)

---

[MIT License.](https://github.com/ludvigalden/exectx/blob/main/LICENSE)
