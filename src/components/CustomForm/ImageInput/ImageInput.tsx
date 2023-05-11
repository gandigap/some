import { ErrorsProp, Register } from '../CustomForm';
import { useFormErrorMessage } from '../../../hooks/useFormErrorMessage';

interface Props extends Register, ErrorsProp {
  styleName: string;
}

function ImageInput({ styleName, register, errors }: Props) {
  const { showErrorMessage } = useFormErrorMessage({ cells: 1 });

  return (
    <div className={styleName}>
      <input
        type="file"
        data-cy="file"
        data-testid="file"
        {...register('image')}
      />
      {errors.image && showErrorMessage(errors.image.message)}
    </div>
  );
}

export { ImageInput };
