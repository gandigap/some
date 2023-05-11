import { ErrorsProp, Register } from '../CustomForm';
import { useFormErrorMessage } from '../../../hooks/useFormErrorMessage';
import { GenderField } from '../GenderField/GenderField';

interface Props extends Register, ErrorsProp {
  styleName: string;
}

function GenderRadio({ styleName, register, errors }: Props) {
  const { showErrorMessage } = useFormErrorMessage({ cells: 2 });
  const genders = ['male', 'female', 'other'];

  return (
    <>
      <label htmlFor="gender">Gender:</label>
      <div className={styleName}>
        {genders.map((gender) => (
          <GenderField
            key={gender}
            gender={gender}
            register={register}
          />
        ))}
      </div>
      {errors.gender && showErrorMessage(errors.gender.message)}
    </>
  );
}

export { GenderRadio };
