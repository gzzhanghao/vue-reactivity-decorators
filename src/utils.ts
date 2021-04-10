import * as vue from 'vue';

export function refToDesc<T>(createRef: (instance: any) => vue.Ref<T>) {
  const refMap = new WeakMap<any, vue.Ref<T>>();

  function getRef(instance: any) {
    if (!refMap.has(instance)) {
      refMap.set(instance, createRef(instance));
    }
    return refMap.get(instance)!;
  }

  return {
    enumerable: true,
    configurable: true,
    get() {
      return getRef(this).value;
    },
    set(value: T) {
      getRef(this).value = value;
    },
  };
}

// istanbul ignore next
export function getBaseValue(desc?: any) {
  if (!desc) {
    return;
  }
  if (has(desc, 'value')) {
    return desc.value;
  }
  if (desc.initializer) {
    return desc.initializer();
  }
}

export function has(obj: Object, key: string) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}
