import { useEffect } from 'react';
import * as rtl from '@testing-library/react';
import { singletonHook } from '../../src/singletonHook';

describe('singletonHook', () => {
  afterEach(() => {
    rtl.cleanup();
    //resetLocalStateForTests();
  });

  it('works', () => {
    const useHook = singletonHook({ a: 1 }, () => {
      return { b: 2 };
    });

    let messages = [];
    const Tmp = () => {
      const message = useHook();
      useEffect(() => { messages.push(message); }, [message]);
      return null;
    };

    rtl.render(<Tmp/>);
    expect(messages).toEqual([{ a: 1 }, { b: 2 }]);
  });
});
