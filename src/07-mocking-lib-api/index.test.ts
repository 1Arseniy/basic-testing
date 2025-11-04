import axios, { AxiosInstance } from 'axios';
import { throttledGetDataFromApi } from './index';

describe('throttledGetDataFromApi', () => {
  const data = {
    id: 1,
    userId: 1,
    completed: false,
    title: 'delectus aut autem',
  };

  beforeAll(() => {
    jest.useFakeTimers();
  });

  test('should create instance with provided base url', async () => {
    jest.spyOn(axios, 'create');

    await throttledGetDataFromApi('/todos/1');

    expect(axios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    const mockFn = jest.fn().mockResolvedValue({ data });

    jest
      .spyOn(axios, 'create')
      .mockReturnValue({ get: mockFn } as unknown as AxiosInstance);

    await throttledGetDataFromApi('/todos/1');

    jest.advanceTimersByTime(5000);

    expect(mockFn).toHaveBeenCalledWith('/todos/1');
  });

  test('should return response data', async () => {
    const mockFn = jest.fn().mockResolvedValue({ data });

    jest
      .spyOn(axios, 'create')
      .mockReturnValue({ get: mockFn } as unknown as AxiosInstance);

    const result = await throttledGetDataFromApi('/todos/1');

    expect(result).toEqual(data);
  });
});
