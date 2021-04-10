# vue-reactivity-decorators

Use vue 3 [Reactivity API](https://v3.vuejs.org/api/reactivity-api.html) with decorators.

```ts
import { ref, computed } from 'vue-reactivity-decorators'

class Counter {
  @ref value = 1

  @computed get text() {
    return `Count: ${this.value}`
  }
}

const counter = new Counter()
console.log(counter.text) // Count: 1

counter.value += 1
console.log(counter.text) // Count: 2
```

## API Reference

### @ref

Mark a property as reactive.

__Example:__

```ts
class Counter {
  @ref value = 1
}

const counter = new Counter()
console.log(counter.value) // 0

counter.value++
console.log(counter.value) // 1
```

__See also:__

- [ref](https://v3.vuejs.org/api/refs-api.html#ref)

### @ref.shallow

Mark a property as reactive but keep its value clean.

__Example:__

```ts
class Foo {
  @ref.shallow value = {}
}

const foo = new Foo()
// mutating the ref's value is reactive
foo.value = {}
// but the value will not be converted.
isReactive(foo.value) // false
```

__See also:__

- [shallowRef](https://v3.vuejs.org/api/refs-api.html#shallowref)

### @computed

Creates an reacitve value that is derived from other reacitve values, but won't be recomputed unless one of the underlying reacitve values changes.

__Example:__

```ts
class Counter {
  @ref value = 1

  @computed get plusOne() {
    return this.value + 1
  }

  set plusOne(value: number) {
    this.value = value - 1
  }
}

const counter = new Counter()
console.log(counter.plusOne) // 2

counter.plusOne = 1
console.log(counter.value) // 0
```

__See also:__

- [computed](https://v3.vuejs.org/api/computed-watch-api.html#computed)
