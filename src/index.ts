import * as vue from '@vue/reactivity';
import { refToDesc, getBaseValue } from './utils';

export function ref(target: Object, key: PropertyKey, desc?: any): any {
  return refToDesc(() => vue.ref(getBaseValue(desc)));
}

export function shallowRef(target: Object, key: PropertyKey, desc?: any): any {
  return refToDesc(() => vue.shallowRef(getBaseValue(desc)));
}

ref.shallow = shallowRef;

export function computed(target: Object, key: PropertyKey, desc: PropertyDescriptor): any {
  const { get, set } = desc;
  // eslint-disable-next-line prefer-arrow-callback
  return refToDesc(function getRef(instance: any) {
    if (!set) {
      return vue.computed(() => get!.call(instance));
    }
    return vue.computed({
      get: () => get!.call(instance),
      set: (value: any) => set.call(instance, value),
    });
  });
}
