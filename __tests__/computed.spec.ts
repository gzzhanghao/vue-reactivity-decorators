import { ref, watchEffect } from '@vue/runtime-core';
import { computed } from '../src';

describe('computed', () => {
  class Test {
    ref = ref(1);

    computedCount = 0;

    @computed get onlyGetter() {
      this.computedCount += 1;
      return this.ref.value;
    }

    @computed get withSetter() {
      this.computedCount += 1;
      return this.ref.value;
    }

    set withSetter(value: number) {
      this.ref.value = value;
    }
  }

  let test: Test;
  beforeEach(() => {
    test = new Test();
  });

  it('only getter', () => {
    expect(test.computedCount).toBe(0);

    // Get multiple times
    for (let i = 1; i < 3; i += 1) {
      expect(test.onlyGetter).toBe(1);
      expect(test.computedCount).toBe(1);
    }
  });

  it('with setter', () => {
    expect(test.computedCount).toBe(0);

    expect(test.withSetter).toBe(1);
    expect(test.computedCount).toBe(1);

    for (let i = 0; i < 3; i += 1) {
      test.withSetter += 1;
      expect(test.withSetter).toBe(i + 2);
      expect(test.computedCount).toBe(i + 2);
    }
  });

  it('trigger effects', () => {
    let value = test.onlyGetter;

    watchEffect(() => {
      value = test.onlyGetter;
    }, {
      flush: 'sync',
    });

    expect(value).toBe(1);

    test.ref.value += 1;
    expect(value).toBe(2);
  });
});
