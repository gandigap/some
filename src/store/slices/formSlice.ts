import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { DefaultValues } from '../../components/CustomForm/CustomForm';

interface FormState {
  fields: DefaultValues;
}

function isStateKey(state: FormState, key: string): key is keyof DefaultValues {
  return key in state.fields;
}

const formSlice = createSlice({
  name: 'form',
  initialState: <FormState>{
    fields: {},
  },
  reducers: {
    setValue(state, action: PayloadAction<FormState>) {
      const [value] = Object.values(action.payload.fields);
      const [key] = Object.keys(action.payload.fields);
      if (!value && isStateKey(state, key)) {
        delete state.fields[key];
        return;
      }
      Object.assign(state.fields, action.payload.fields);
    },
    reset(state) {
      state.fields = {};
    },
  },
});

const formReducer = formSlice.reducer;
const formAction = formSlice.actions;

export { formReducer, formAction };
