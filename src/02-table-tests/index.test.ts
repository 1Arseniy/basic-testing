import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 3, b: 2, action: Action.Subtract, expected: 1 },
  { a: 6, b: 2, action: Action.Subtract, expected: 4 },
  { a: 6, b: 2, action: Action.Divide, expected: 3 },
  { a: 6, b: 2, action: Action.Multiply, expected: 12 },
  { a: 6, b: 2, action: Action.Exponentiate, expected: 36 },
  { a: 6, b: 2, action: '', expected: null },
  { a: true, b: '', action: Action.Add, expected: null },
  { a: null, b: undefined, action: Action.Add, expected: null },
  { a: 6, b: 'bhdbcd', action: Action.Add, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'tests oprations - "+", "-", "*", "/", "^"',
    ({ a, b, action, expected }) => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    },
  );
});
