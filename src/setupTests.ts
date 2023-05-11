import matchers from '@testing-library/jest-dom/matchers';
import { setupServer } from 'msw/node';
import { expect } from 'vitest';
import { correctHandlers } from './__mocks__/response.mock';

const server = setupServer(...correctHandlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

expect.extend(matchers);
