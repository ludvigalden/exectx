# Interface: DefaultContextValues

[exectx-react](../wiki/exectx-react).DefaultContextValues

The default React context values. They can be overriden like so:

```typescript
declare module 'exectx-react' {
  interface DefaultContextValues {
    role?: 'admin' | 'guest';
  }
}
```
