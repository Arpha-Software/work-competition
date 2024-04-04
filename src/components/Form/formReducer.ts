import { FormData } from '@/utils/types';

export enum FormActionTypes {
  SET_FORM_DATA = 'SET_FORM_DATA',
  UPDATE_INPUT = 'UPDATE_INPUT',
  SET_FILE = 'SET_FILE',
  SET_VALIDATION_ERRORS = 'SET_VALIDATION_ERRORS',
  IS_LOADING = 'IS_LOADING',
}

export type FormState = {
  formData: FormData;
  file: File | null;
  validationErrors: Record<string, any>;
  isLoading?: boolean;
};

export type FormAction =
  | { type: FormActionTypes.SET_FORM_DATA; formData: FormData }
  | { type: FormActionTypes.UPDATE_INPUT; payload: { name: string; value: string | boolean; } }
  | { type: FormActionTypes.SET_FILE; file: File }
  | { type: FormActionTypes.SET_VALIDATION_ERRORS; validationErrors: Record<string, string> }
  | { type: FormActionTypes.IS_LOADING; isLoading: boolean };

export function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case FormActionTypes.SET_FORM_DATA:
      return {
        ...state,
        formData: action.formData,
      };
    case FormActionTypes.UPDATE_INPUT:
      const { name, value } = action.payload;
      return {
        ...state,
        formData: {
          ...state.formData,
          [name]: value,
        },
      };
    case FormActionTypes.SET_FILE:
      return {
        ...state,
        file: action.file,
      };
    case FormActionTypes.SET_VALIDATION_ERRORS:
      return {
        ...state,
        validationErrors: action.validationErrors,
      };
    case FormActionTypes.IS_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    default:
      throw new Error(`Unhandled action type: ${(action as FormAction).type}`);
  }
}

export const initialState: FormState = {
  formData: {},
  file: null,
  validationErrors: {},
  isLoading: false,
};
