import { describe, it, vi } from 'vitest';
import { paths } from '../Paths';

afterEach(() => {
  vi.restoreAllMocks();
});

describe('Products', () => {
  it('Test render products', () => {
    const spy = vi.spyOn(paths, 'getPath');
    const home = paths.getPath('/');
    const notFound = paths.getPath('');
    expect(spy).toHaveBeenCalled();
    expect(home).toEqual('Home');
    expect(notFound).toEqual('404');
  });
});
