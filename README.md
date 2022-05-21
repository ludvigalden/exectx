### `exectx`

[![Stable Release](https://img.shields.io/npm/v/exectx.svg)](https://npm.im/exectx)
[![Blazing Fast](https://badgen.now.sh/badge/speed/blazing%20%F0%9F%94%A5/green)](https://npm.im/exectx)
[![gzip size](http://img.badgesize.io/https://unpkg.com/exectx@latest/dist/exectx.umd.production.min.js?compression=gzip)](https://unpkg.com/exectx@latest/dist/exectx.umd.production.min.js)
[![license](https://badgen.now.sh/badge/license/MIT)](./LICENSE)

---

There are cases where you need to force an update while unsure whether the component is mounted. `useSafeForceUpdate` is a safe form of force updating a component. The basic quality is to not perform any updates when the component is not unmounted. In addition, it also allows for queueing a update for when the component *has* been mounted, which is simply canceled by calling the function before the component has been mounted.

```typescript
import { useSafeForceUpdate } from "exectx";

const forceUpdate = useSafeForceUpdate()

React.useMemo(() => {
  setTimeout(() => {
    forceUpdate() // React will not ever complain about this!
  }, [Math.random() * 1000])
}, [])
```

## Authors

- Ludvig Aldén [@ludvigalden](https://github.com/ludvigalden)

---

[MIT License.](https://github.com/ludvigalden/exectx/blob/master/LICENSE)
