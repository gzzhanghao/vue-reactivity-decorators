import { watchEffect } from '@vue/runtime-core';
import { ref } from '../src';

describe('ref', () => {
  class Test {
    @ref value = 1;

    @ref reactive = { value: 1 };

    @ref.shallow shallow = { value: 1 };
  }

  let test: Test;
  beforeEach(() => {
    test = new Test();
  });

  it('reactive', () => {
    let { value } = test;

    watchEffect(() => {
      value = test.value;
    }, {
      flush: 'sync',
    });

    test.value += 1;
    expect(value).toBe(2);
  });

  it('deep reactive', () => {
    let { value } = test.reactive;

    watchEffect(() => {
      value = test.reactive.value;
    }, {
      flush: 'sync',
    });

    test.reactive.value += 1;
    expect(value).toBe(2);
  });

  it('shallow', () => {
    let { value } = test.shallow;

    watchEffect(() => {
      value = test.shallow.value;
    }, {
      flush: 'sync',
    });

    test.shallow.value += 1;
    expect(value).toBe(1);

    test.shallow = { value: 2 };
    expect(value).toBe(2);
  });
});
