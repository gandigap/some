import { Resolver } from 'react-hook-form';
import { capitalize } from './stringHelpers';
import { getCurrentDate, getParseDate } from './dateHelpers';
import { FormData } from '../components/CustomForm/CustomForm';

interface FieldError {
  type: string;
  message: string;
}

type FormErrors = {
  [Property in keyof FormData]: FieldError;
};

const formValidation: Resolver<FormData> = async (data) => {
  const getValues = (formData: FormData) => {
    if (Object.values(formData).some((value) => !value)) return {};
    return formData;
  };
  const getErrors = (formData: FormData) => {
    const errors: Partial<FormErrors> = {};
    const defaultEmptyMessage = 'Field cannot be empty';
    const setError = (field: keyof FormErrors, message?: string) =>
      Object.assign(errors, {
        [field]: {
          type: 'required',
          message: message || defaultEmptyMessage,
        },
      });
    if (!formData.firstName) {
      setError('firstName');
    }
    if (formData.firstName !== capitalize(formData.firstName)) {
      setError('firstName', 'First letter must be capital');
    }
    if (!formData.lastName) {
      setError('lastName');
    }
    if (formData.lastName !== capitalize(formData.lastName)) {
      setError('lastName', 'First letter must be capital');
    }
    if (!formData.date) {
      setError('date');
    }
    if (formData.date) {
      const currentDate = getCurrentDate();
      const { year: currentYear } = getParseDate(currentDate);
      const { year } = getParseDate(formData.date);
      const futureDateMessage = 'You are not birth in future';
      if (currentYear < year) {
        setError('date', futureDateMessage);
      }
      if (currentDate < formData.date) {
        setError('date', futureDateMessage);
      }
      if (Number(year) < Number(currentYear) - 120) {
        setError('date', 'You are not immortal');
      }
    }
    if (!formData.country) {
      setError('country');
    }
    if (!formData.gender) {
      setError('gender');
    }
    if (!formData.agreement) {
      setError('agreement', 'Field must be checked');
    }
    if (!formData.image.length) {
      setError('image');
    }
    const [file] = formData.image;
    if (file && !file.type.includes('image')) {
      setError('image', 'Upload image');
    }
    return errors;
  };

  return {
    values: getValues(data),
    errors: getErrors(data),
  };
};

export { formValidation };
