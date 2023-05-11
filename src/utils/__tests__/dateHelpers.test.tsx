import { describe, it } from 'vitest';
import { getCurrentDate, getParseDate } from '../dateHelpers';

describe('Date helpers', () => {
  it('Test getCurrentDate', () => {
    expect(typeof getCurrentDate()).toEqual('string');
  });
  it('Test getParseDate', () => {
    const mock = '2033-12-23';
    const expectResult = {
      year: '2033',
      month: '12',
      day: '23',
    };
    expect(getParseDate(mock)).toEqual(expectResult);
  });
  it('Test getParseDate', () => {
    const expectResult = {
      year: '',
      month: '',
      day: '',
    };
    expect(getParseDate()).toEqual(expectResult);
  });
});
