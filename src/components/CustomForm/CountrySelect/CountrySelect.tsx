import { ChangeEvent } from 'react';
import { ErrorsProp, Register } from '../CustomForm';
import { useFormErrorMessage } from '../../../hooks/useFormErrorMessage';
import { formAction } from '../../../store/slices/formSlice';
import { useTypedDispatch } from '../../../store/hooks';

interface Props extends Register, ErrorsProp {}

function CountrySelect({ register, errors }: Props) {
  const { showErrorMessage } = useFormErrorMessage({ cells: 2 });
  const dispatch = useTypedDispatch();

  const countryRef = register('country');
  const handler = (event: ChangeEvent<HTMLSelectElement>) => {
    countryRef.onChange(event);
    dispatch(formAction.setValue({ fields: { country: event.target.value } }));
  };

  return (
    <>
      <label htmlFor="country">Country:</label>
      <select
        defaultValue=""
        id="country"
        {...countryRef}
        onChange={handler}
      >
        <option
          value=""
          disabled
        >
          Choose your country
        </option>
        <option value="belarus">Belarus</option>
        <option value="ukraine">Ukraine</option>
        <option value="russia">Russia</option>
      </select>
      {errors.country && showErrorMessage(errors.country.message)}
    </>
  );
}

export { CountrySelect };
