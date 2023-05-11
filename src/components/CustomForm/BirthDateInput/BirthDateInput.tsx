import { ChangeEvent } from 'react';
import { useFormErrorMessage } from '../../../hooks/useFormErrorMessage';
import { ErrorsProp, Register } from '../CustomForm';
import { formAction } from '../../../store/slices/formSlice';
import { useTypedDispatch } from '../../../store/hooks';

interface Props extends Register, ErrorsProp {}

function BirthDateInput({ register, errors }: Props) {
  const { showErrorMessage } = useFormErrorMessage({ cells: 2 });
  const dispatch = useTypedDispatch();

  const dateRef = register('date');
  const handler = (event: ChangeEvent<HTMLInputElement>) => {
    dateRef.onChange(event);
    dispatch(formAction.setValue({ fields: { date: event.target.value } }));
  };

  return (
    <>
      <label htmlFor="date">Birth Date:</label>
      <input
        type="date"
        id="date"
        data-testid="date"
        {...dateRef}
        onChange={handler}
      />
      {errors.date && showErrorMessage(errors.date.message)}
    </>
  );
}

export { BirthDateInput };
