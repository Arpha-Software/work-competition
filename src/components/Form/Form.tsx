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
import { submitForm } from "@/api/form";
import { content } from "@/app/[slug]/content";

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

  console.log('category:', content[page].title);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const allFields = { ...formData, file };

    const validation = validateFormData(allFields, page);

    if (!validation.success) {
      const errors = validation.errors!.reduce((acc, curr) => {
        acc[curr.field] = curr.message;
        return acc;
      }, {} as Record<string, string>);

      dispatch({ type: FormActionTypes.SET_VALIDATION_ERRORS, validationErrors: errors });

      return;
    }

    dispatch({ type: FormActionTypes.SET_VALIDATION_ERRORS, validationErrors: {} });

    const formFormData = new FormData();

    formFormData.append('data', new Blob([JSON.stringify({...formData, category: content[page].title})], { type: 'application/json' }));
    if (file) {
      formFormData.append('file', file as Blob, file.name);
    }

    submitForm(formFormData).then(response => {
      if (response.success) {
        console.log("Form submitted successfully");
      } else {
        console.error("Form submission failed");
      }
    });
  };

  useEffect(() => {
    dispatch({ type: FormActionTypes.SET_FORM_DATA, formData });
  }, [page]);

  return (
    <form className="mt-8 space-y-6 last:space-y-8" onSubmit={handleSubmit}>
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

      <div className="flex items-center relative">
        <Button className="w-36 h-14 p-0" tag="div" variant="secondary">
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

        {validationErrors.file ? (
          <span className="absolute top-full text-xs text-red-500">
            {validationErrors.file}
          </span>
        ) : null}

        {file && (
          <div className="text-sm">
            <span className="block ml-3">Обраний файл: {cutFileName(file.name)}</span>
            <span className="ml-3">Розмір файлу: {file.size} байт</span>
          </div>
        )}
      </div>

      <label htmlFor="agreement" className='flex items-center select-none relative'>
        <input
          type="checkbox"
          id="agreement"
          name="agreement"
          checked={!!formData.agreement}
          onChange={handleChange}
          className='mr-2'
        />

        <span className="text-sm">Надаю згоду на обробку персональних даних</span>
        {validationErrors.agreement ? <span className="absolute top-full text-xs text-red-500">{validationErrors.agreement}</span> : null}
      </label>

      <Button className="w-full mt-8" type="submit">Відправити</Button>
    </form>
  )
}
