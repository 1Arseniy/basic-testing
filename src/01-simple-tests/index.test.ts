import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const calculate = simpleCalculator({ a: 1, b: 2, action: Action.Add });
    expect(calculate).toBe(3);
  });

  test('should subtract two numbers', () => {
    const calculate = simpleCalculator({ a: 2, b: 1, action: Action.Subtract });
    expect(calculate).toBe(1);
  });

  test('should multiply two numbers', () => {
    const calculate = simpleCalculator({ a: 5, b: 4, action: Action.Multiply });
    expect(calculate).toBe(20);
  });

  test('should divide two numbers', () => {
    const calculate = simpleCalculator({ a: 20, b: 4, action: Action.Divide });
    expect(calculate).toBe(5);
  });

  test('should exponentiate two numbers', () => {
    const calculate = simpleCalculator({
      a: 3,
      b: 4,
      action: Action.Exponentiate,
    });
    expect(calculate).toBe(81);
  });

  test('should return null for invalid action', () => {
    const calculate = simpleCalculator({
      a: 1,
      b: 4,
      action: '!',
    });
    expect(calculate).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const calculate = simpleCalculator({
      a: '1',
      b: true,
      action: Action.Add,
    });
    expect(calculate).toBeNull();
  });
});
