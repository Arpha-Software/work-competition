'use client';

import { ChangeEvent, useEffect, useReducer } from "react";

import { Input } from "../Input";
import { Button } from "../Button";
import FileIcon from '/public/icons/mdi_file.svg';

import { Pages } from "@/utils/enums";
import { pages } from "./inputs";
import type { FormData } from "@/utils/types";

import {
  FormActionTypes,
  FormState,
  formReducer,
  initialState
} from "./formReducer";

import { validateFormData } from "./form-types";
import { cutFileName } from "@/tools/helpers";

type FormProps = {
  page: Pages;
}

export const Form = ({ page }: FormProps) => {
  const [{ formData, file, validationErrors }, dispatch] = useReducer(formReducer, initialState, (): FormState => {
    const initialFormData: FormData = {};
    const allInputs = [...(pages[page]?.mainInputs ?? []), ...(pages[page]?.contactInputs ?? [])];

    allInputs.forEach(input => {
      initialFormData[input.name] = input.type === 'checkbox' ? false : '';
    });

    return {
      ...initialState,
      formData: initialFormData,
    };
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    if (type === "file") {
      if (e.target.files) {
        dispatch({ type: FormActionTypes.SET_FILE, file: e.target.files[0] });
      }
    } else {
      dispatch({
        type: FormActionTypes.UPDATE_INPUT,
        payload: {
          name,
          value: type === 'checkbox' ? checked : value,
        },
      });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validation = validateFormData(formData, page);

    if (!validation.success) {
      const errors = validation.errors!.reduce((acc, curr) => {
        acc[curr.field] = curr.message;
        return acc;
      }, {} as Record<string, string>);

      dispatch({ type: FormActionTypes.SET_VALIDATION_ERRORS, validationErrors: errors });
      console.error("Form data is invalid, validation errors:", errors);
      return;
    }

    dispatch({ type: FormActionTypes.SET_VALIDATION_ERRORS, validationErrors: {} });

    console.log("Form data is valid, proceed with submission:", validation.data);
  };

  useEffect(() => {
    dispatch({ type: FormActionTypes.SET_FORM_DATA, formData });
  }, [page]);

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      {pages[page].mainInputs.map(({ label, placeholder, name, type, className }, index) => (
        <Input
          key={`${label}-${index}`}
          label={label}
          placeholder={placeholder}
          type={type}
          className={className}
          name={name}
          value={(formData[name] ?? '') as string}
          onChange={handleChange}
          error={validationErrors[name]}
        />
      ))}

      <h3 className="text-lg font-semibold mt-8 mb-6">Контактна особа</h3>

      {pages[page].contactInputs.map(({ label, placeholder, name, type, className }, index) => (
        <Input
          key={`${label}-${index}`}
          label={label}
          placeholder={placeholder}
          type={type}
          className={className}
          name={name}
          value={formData[name] as string ?? ''}
          onChange={handleChange}
          error={validationErrors[name]}
        />
      ))}

      <div className="flex items-center">
        <Button className="w-36 h-14 p-0" type="button" variant="secondary">
          <label htmlFor="file" className="flex items-center w-full h-full px-3 justify-between cursor-pointer">
            <FileIcon />
            <span>Ваша робота</span>
          </label>

          <input
            type="file"
            id="file"
            name="file"
            capture="environment"
            className="w-full h-full hidden"
            onChange={handleChange}
          />
        </Button>

        {file && (
          <div className="text-sm">
            <span className="block ml-3">Обраний файл: {cutFileName(file.name)}</span>
            <span className="ml-3">Розмір файлу: {file.size} байт</span>
          </div>
        )}
      </div>

      <label htmlFor="agreement" className={`flex items-center select-none ${validationErrors.agreement ? 'text-red-500' : ''}`}>
        <input
          type="checkbox"
          id="agreement"
          name="agreement"
          checked={!!formData.agreement}
          onChange={handleChange}
          className='mr-2'
        />

        <span className="text-sm">Надаю згоду на обробку персональних даних</span>
      </label>

      <Button className="w-full" type="submit">Відправити</Button>
    </form>
  )
}
