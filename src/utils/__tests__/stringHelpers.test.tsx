import { describe, it } from 'vitest';
import { capitalize, decapitalize } from '../stringHelpers';
import { mock, result } from '../__mocks__/stringHelpers.mock';

describe('String helpers', () => {
  const { lower: mockLower, upper: mockUpper } = mock;
  const { lower: resultLower, upper: resultUpper } = result;
  it('Test capitalize strings', () => {
    expect(capitalize(mockLower)).toEqual(resultUpper);
  });
  it('Test capitalize strings', () => {
    expect(capitalize()).toEqual('');
  });
  it('Test decapitalize strings', () => {
    expect(decapitalize(mockUpper)).toEqual(resultLower);
  });
  it('Test decapitalize strings', () => {
    expect(decapitalize()).toEqual('');
  });
});
