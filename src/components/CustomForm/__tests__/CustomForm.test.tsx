import { beforeEach, describe, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { CustomForm } from '../CustomForm';
import { createStore } from '../../../store/store';

const getFakeDate = (action: string) => {
  const getByValue = (ms: number) => new Date(Date.now() + ms).toISOString().split('T');
  switch (action) {
    case 'plus year': {
      const value = 1000 * 60 * 60 * 24 * 365;
      const [date] = getByValue(value);
      return date;
    }
    case 'plus month': {
      const value = 1000 * 60 * 60 * 24 * 30;
      const [date] = getByValue(value);
      return date;
    }
    case 'plus day': {
      const value = 1000 * 60 * 60 * 24;
      const [date] = getByValue(value);
      return date;
    }
    default:
      return '0';
  }
};

beforeAll(() => {
  globalThis.URL.createObjectURL = vi.fn();
});

beforeEach(() => {
  const store = createStore();
  render(
    <Provider store={store}>
      <CustomForm />
    </Provider>
  );
  vi.useFakeTimers();
  vi.spyOn(global, 'setTimeout');
});

describe('CustomForm', () => {
  it('Test incorrect first name (empty)', async () => {
    await act(async () => {
      fireEvent.change(screen.getAllByRole('textbox')[0], { target: { value: '' } });
      fireEvent.click(screen.getByRole('button', { name: 'Submit' }));
    });
  });
  it('Test incorrect first name (lower case)', async () => {
    await act(async () => {
      fireEvent.change(screen.getAllByRole('textbox')[0], { target: { value: 'ame' } });
      fireEvent.click(screen.getByRole('button', { name: 'Submit' }));
    });
  });
  it('Test correct first name', async () => {
    await act(async () => {
      fireEvent.change(screen.getAllByRole('textbox')[0], { target: { value: 'Name' } });
      fireEvent.click(screen.getByRole('button', { name: 'Submit' }));
    });
  });
  it('Test incorrect surname (lower case)', async () => {
    await act(async () => {
      fireEvent.change(screen.getAllByRole('textbox')[0], { target: { value: 'Name' } });
      fireEvent.change(screen.getAllByRole('textbox')[1], { target: { value: 'urname' } });
      fireEvent.click(screen.getByRole('button', { name: 'Submit' }));
    });
  });
  it('Test correct surname', async () => {
    await act(async () => {
      fireEvent.change(screen.getAllByRole('textbox')[0], { target: { value: 'Name' } });
      fireEvent.change(screen.getAllByRole('textbox')[1], { target: { value: 'Surname' } });
      fireEvent.click(screen.getByRole('button', { name: 'Submit' }));
    });
  });
  it('Test incorrect date by year', async () => {
    const fakeDate = getFakeDate('plus year');
    await act(async () => {
      fireEvent.change(screen.getAllByRole('textbox')[0], { target: { value: 'Name' } });
      fireEvent.change(screen.getAllByRole('textbox')[1], { target: { value: 'Surname' } });
      fireEvent.change(screen.getByTestId('date'), { target: { value: fakeDate } });
      fireEvent.click(screen.getByRole('button', { name: 'Submit' }));
    });
  });
  it('Test incorrect date by month', async () => {
    const fakeDate = getFakeDate('plus month');
    await act(async () => {
      fireEvent.change(screen.getAllByRole('textbox')[0], { target: { value: 'Name' } });
      fireEvent.change(screen.getAllByRole('textbox')[1], { target: { value: 'Surname' } });
      fireEvent.change(screen.getByTestId('date'), { target: { value: fakeDate } });
      fireEvent.click(screen.getByRole('button', { name: 'Submit' }));
    });
  });
  it('Test incorrect date by day', async () => {
    const fakeDate = getFakeDate('plus day');
    await act(async () => {
      fireEvent.change(screen.getAllByRole('textbox')[0], { target: { value: 'Name' } });
      fireEvent.change(screen.getAllByRole('textbox')[1], { target: { value: 'Surname' } });
      fireEvent.change(screen.getByTestId('date'), { target: { value: fakeDate } });
      fireEvent.click(screen.getByRole('button', { name: 'Submit' }));
    });
  });
  it('Test incorrect date under min value', async () => {
    await act(async () => {
      fireEvent.change(screen.getAllByRole('textbox')[0], { target: { value: 'Name' } });
      fireEvent.change(screen.getAllByRole('textbox')[1], { target: { value: 'Surname' } });
      fireEvent.change(screen.getByTestId('date'), { target: { value: '1900-01-01' } });
      fireEvent.click(screen.getByRole('button', { name: 'Submit' }));
    });
  });
  it('Test correct date', async () => {
    await act(async () => {
      fireEvent.change(screen.getAllByRole('textbox')[0], { target: { value: 'Name' } });
      fireEvent.change(screen.getAllByRole('textbox')[1], { target: { value: 'Surname' } });
      fireEvent.change(screen.getByTestId('date'), { target: { value: '2022-01-01' } });
      fireEvent.click(screen.getByRole('button', { name: 'Submit' }));
    });
  });
  it('Test country select', async () => {
    await act(async () => {
      fireEvent.change(screen.getAllByRole('textbox')[0], { target: { value: 'Name' } });
      fireEvent.change(screen.getAllByRole('textbox')[1], { target: { value: 'Surname' } });
      fireEvent.change(screen.getByTestId('date'), { target: { value: '2022-01-01' } });
      fireEvent.change(screen.getByRole('combobox'), { target: { value: 'russia' } });
      fireEvent.click(screen.getByRole('button', { name: 'Submit' }));
    });
  });
  it('Test gender radio', async () => {
    await act(async () => {
      fireEvent.change(screen.getAllByRole('textbox')[0], { target: { value: 'Name' } });
      fireEvent.change(screen.getAllByRole('textbox')[1], { target: { value: 'Surname' } });
      fireEvent.change(screen.getByTestId('date'), { target: { value: '2022-01-01' } });
      fireEvent.change(screen.getByRole('combobox'), { target: { value: 'russia' } });
      fireEvent.click(screen.getAllByRole('radio')[0]);
      fireEvent.click(screen.getByRole('button', { name: 'Submit' }));
    });
  });
  it('Test correct file type', async () => {
    const file = new File(['image'], 'image.jpeg', { type: 'image/jpeg' });
    await act(async () => {
      fireEvent.change(screen.getAllByRole('textbox')[0], { target: { value: 'Name' } });
      fireEvent.change(screen.getAllByRole('textbox')[1], { target: { value: 'Surname' } });
      fireEvent.change(screen.getByTestId('date'), { target: { value: '2022-01-01' } });
      fireEvent.change(screen.getByRole('combobox'), { target: { value: 'russia' } });
      fireEvent.click(screen.getAllByRole('radio')[0]);
      fireEvent.change(screen.getByTestId('file'), { target: { files: [file] } });
      fireEvent.click(screen.getByRole('button', { name: 'Submit' }));
    });
  });
  it('Test incorrect file type', async () => {
    const file = new File(['text'], 'text.txt', { type: 'text/plain' });
    await act(async () => {
      fireEvent.change(screen.getAllByRole('textbox')[0], { target: { value: 'Name' } });
      fireEvent.change(screen.getAllByRole('textbox')[1], { target: { value: 'Surname' } });
      fireEvent.change(screen.getByTestId('date'), { target: { value: '2022-01-01' } });
      fireEvent.click(screen.getAllByRole('radio')[0]);
      fireEvent.change(screen.getByRole('combobox'), { target: { value: 'russia' } });
      fireEvent.change(screen.getByTestId('file'), { target: { files: [file] } });
      fireEvent.click(screen.getByRole('button', { name: 'Submit' }));
    });
  });
  it('Test full form cycle', async () => {
    const file = new File(['image'], 'image.jpeg', { type: 'image/jpeg' });
    await act(async () => {
      fireEvent.change(screen.getAllByRole('textbox')[0], { target: { value: 'Name' } });
      fireEvent.change(screen.getAllByRole('textbox')[1], { target: { value: 'Surname' } });
      fireEvent.change(screen.getByTestId('date'), { target: { value: '2022-01-01' } });
      fireEvent.click(screen.getAllByRole('radio')[0]);
      fireEvent.change(screen.getByRole('combobox'), { target: { value: 'russia' } });
      fireEvent.change(screen.getByTestId('file'), { target: { files: [file] } });
      fireEvent.click(screen.getByRole('checkbox'));
      fireEvent.click(screen.getByRole('button', { name: 'Submit' }));
    });
    await act(async () => {
      vi.runAllTimers();
      expect(setTimeout).toHaveBeenCalledTimes(1);
      expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 2000);
    });
  });
});
