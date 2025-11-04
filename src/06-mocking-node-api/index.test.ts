import path from 'path';
import fs from 'fs';
import fsp from 'fs/promises';
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';

describe('doStuffByTimeout', () => {
  const callback = jest.fn();

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    jest.spyOn(global, 'setTimeout');

    doStuffByTimeout(callback, 1000);

    expect(setTimeout).toHaveBeenCalledWith(callback, 1000);
  });

  test('should call callback only after timeout', () => {
    doStuffByTimeout(callback, 1000);

    expect(callback).not.toHaveBeenCalled();

    jest.runAllTimers();

    expect(callback).toHaveBeenCalled();
  });
});

describe('doStuffByInterval', () => {
  const callback = jest.fn();

  beforeEach(() => {
    jest.clearAllTimers();
    jest.clearAllMocks();
  });

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    jest.spyOn(global, 'setInterval');

    doStuffByInterval(callback, 2);

    expect(setInterval).toHaveBeenCalledWith(callback, 2);
  });

  test('should call callback multiple times after multiple intervals', () => {
    doStuffByInterval(callback, 2);

    expect(callback).not.toHaveBeenCalledTimes(5);

    jest.advanceTimersByTime(10);

    expect(callback).toHaveBeenCalledTimes(5);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const spy = jest.spyOn(path, 'join').mockImplementation(() => 'mock');

    await readFileAsynchronously('file.txt');

    expect(spy).toHaveBeenCalledWith(__dirname, 'file.txt');
  });

  test('should return null if file does not exist', async () => {
    jest.spyOn(fs, 'existsSync').mockImplementation(() => false);

    expect(await readFileAsynchronously('file.txt')).toBeNull();
  });

  test('should return file content if file exists', async () => {
    jest.spyOn(fs, 'existsSync').mockImplementation(() => true);
    jest
      .spyOn(fsp, 'readFile')
      .mockImplementation(() => Promise.resolve('SomeText'));

    const readFile = await readFileAsynchronously('file.txt');
    expect(readFile).toBe('SomeText');
  });
});
