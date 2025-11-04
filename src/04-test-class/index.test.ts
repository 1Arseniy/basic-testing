import {
  getBankAccount,
  TransferFailedError,
  InsufficientFundsError,
  SynchronizationFailedError,
} from '.';

describe('BankAccount', () => {
  const startBalance = 10;
  test('should create account with initial balance', () => {
    const balance = getBankAccount(startBalance);
    expect(balance.getBalance()).toBe(startBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => getBankAccount(startBalance).withdraw(20)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring more than balance', () => {
    expect(() =>
      getBankAccount(startBalance).transfer(15, getBankAccount(40)),
    ).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    const account = getBankAccount(startBalance);
    expect(() => account.transfer(2, account)).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    expect(getBankAccount(startBalance).deposit(1).getBalance()).toBe(11);
  });

  test('should withdraw money', () => {
    expect(getBankAccount(startBalance).withdraw(1).getBalance()).toBe(9);
  });

  test('should transfer money', () => {
    expect(
      getBankAccount(startBalance).transfer(1, getBankAccount(10)).getBalance(),
    ).toBe(9);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const acc = getBankAccount(startBalance);
    jest.spyOn(acc, 'fetchBalance').mockResolvedValue(2);
    const result = await acc.fetchBalance();
    expect(result).toBe(2);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const acc = getBankAccount(startBalance);
    jest.spyOn(acc, 'fetchBalance').mockResolvedValue(2);
    await acc.synchronizeBalance();
    expect(acc.getBalance()).toBe(2);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const acc = getBankAccount(startBalance);
    jest.spyOn(acc, 'fetchBalance').mockResolvedValue(null);

    await expect(acc.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
