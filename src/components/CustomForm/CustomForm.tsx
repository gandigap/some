import { FieldErrors, SubmitHandler, UseFormRegister, useForm } from 'react-hook-form';
import style from './customForm.module.scss';
import { FullNameInput } from './FullNameInput/FullNameInput';
import { BirthDateInput } from './BirthDateInput/BirthDateInput';
import { CountrySelect } from './CountrySelect/CountrySelect';
import { GenderRadio } from './GenderRadio/GenderRadio';
import { ImageInput } from './ImageInput/ImageInput';
import { PolicyCheckbox } from './PolicyCheckbox/PolicyCheckbox';
import { StatusMessage } from './StatusMessage/StatusMessage';
import { formValidation } from '../../utils/formValidation';
import { useSendingStatus } from '../../hooks/useSendingStatus';
import { useTimeout } from '../../hooks/useTimeout';
import { formCardsAction } from '../../store/slices/formCardsSlice';
import { useTypedDispatch, useTypedSelector } from '../../store/hooks';
import { formAction } from '../../store/slices/formSlice';

export interface FormData {
  agreement: boolean;
  country: string;
  date: string;
  firstName: string;
  lastName: string;
  gender: string | null;
  image: FileList;
}

export interface Register {
  register: UseFormRegister<FormData>;
}

export interface ErrorsProp {
  errors: FieldErrors<FormData>;
}

export type DefaultValues = Partial<Omit<FormData, 'image'>>;

function CustomForm() {
  const { isSending, toggleSendingStatus } = useSendingStatus();
  const userTimeout = useTimeout();
  const dispatch = useTypedDispatch();

  const defaultValues = useTypedSelector(({ form }) => form.fields);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<FormData>({
    resolver: formValidation,
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    defaultValues,
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    const url = URL.createObjectURL(data.image[0]);
    const card = { ...data, image: url, gender: data.gender };
    toggleSendingStatus();
    dispatch(formCardsAction.addCard({ card }));
    dispatch(formAction.reset());
    userTimeout(() => {
      reset();
      toggleSendingStatus();
    }, 2000);
  };

  return (
    <form
      className={style.form}
      onSubmit={handleSubmit(onSubmit)}
    >
      <FullNameInput
        register={register}
        errors={errors}
      />
      <BirthDateInput
        register={register}
        errors={errors}
      />
      <CountrySelect
        register={register}
        errors={errors}
      />
      <GenderRadio
        styleName={style['radio-container']}
        register={register}
        errors={errors}
      />
      <ImageInput
        styleName={style['file-container']}
        register={register}
        errors={errors}
      />
      <PolicyCheckbox
        styleName={style['policy-container']}
        register={register}
        errors={errors}
      />
      <div className={style['button-container']}>
        {!isSending ? (
          <button type="submit">Submit</button>
        ) : (
          <StatusMessage message="Form data was saved" />
        )}
      </div>
    </form>
  );
}

export { CustomForm };
