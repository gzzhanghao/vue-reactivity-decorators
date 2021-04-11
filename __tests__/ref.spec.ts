import { effect } from '@vue/reactivity';
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

    effect(() => {
      value = test.value;
    });

    test.value += 1;
    expect(value).toBe(2);
  });

  it('deep reactive', () => {
    let { value } = test.reactive;

    effect(() => {
      value = test.reactive.value;
    });

    test.reactive.value += 1;
    expect(value).toBe(2);
  });

  it('shallow', () => {
    let { value } = test.shallow;

    effect(() => {
      value = test.shallow.value;
    });

    test.shallow.value += 1;
    expect(value).toBe(1);

    test.shallow = { value: 2 };
    expect(value).toBe(2);
  });
});
