import { mockOne, mockTwo, mockThree, unmockedFunction } from './index';

jest.mock('./index', () => {
  const originalModule =
    jest.requireActual<typeof import('./index')>('./index');
  return {
    ...originalModule,
    mockOne: jest.fn(() => 'mocked foo'),
    mockTwo: jest.fn(() => 'mocked bar'),
    mockThree: jest.fn(() => 'mocked baz'),
  };
});

describe('partial mocking', () => {
  afterAll(() => {
    jest.unmock('./index');
  });

  test('mockOne, mockTwo, mockThree should not log into console', () => {
    const mockFn = jest.spyOn(console, 'log').mockImplementation(() => {});

    mockOne();
    mockTwo();
    mockThree();

    expect(mockFn).not.toHaveBeenCalled();
  });

  test('unmockedFunction should log into console', () => {
    const mockFn = jest.spyOn(console, 'log').mockImplementation(() => {});
    unmockedFunction();

    expect(mockFn).toHaveBeenCalledWith('I am not mocked');
  });
});
