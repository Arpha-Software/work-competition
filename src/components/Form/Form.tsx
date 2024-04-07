'use client';

import { ChangeEvent, useEffect, useReducer, useState } from "react";

import { Input } from "../Input";
import { Button } from "../Button";
import { Loader } from "../Loader";
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
import { content } from "@/app/[slug]/content";
import { submitForm } from "@/api/form";
import { Modal } from "../Modal";
import { Combobox } from "@/components/Combobox";

type AgreementsProps = {
  page: Pages;
  formData: FormData;
  validationErrors: Record<string, string>;
  updateAgreementState: (value: boolean) => void;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Agreements = ({
  page,
  formData,
  validationErrors,
  updateAgreementState,
  handleChange,
}: AgreementsProps) => {
  const [isCheckedFirst, setIsCheckedFirst] = useState(!!formData.agreement);
  const [isCheckedSecond, setIsCheckedSecond] = useState(!!formData.agreement);

  const onFirstCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newState = e.target.checked;
    setIsCheckedFirst(newState);

    updateAgreementState(newState && isCheckedSecond);
  };

  const onSecondCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newState = e.target.checked;
    setIsCheckedSecond(newState);

    updateAgreementState(isCheckedFirst && newState);
  };

  if (page === Pages.art) {
    return (
      <>
        <label htmlFor="agreement" className='flex items-center select-none relative'>
          <input
            type="checkbox"
            id="agreement"
            name="agreement"
            checked={isCheckedFirst}
            onChange={onFirstCheckboxChange}
            className='mr-2'
            required
          />

          <span className="text-sm">
            Я надаю згоду на обробку персональних даних <span className="font-semibold">(якщо учасник неповнолітній – згоду надає один з батьків, зазначивши своє ПІБ)</span>
          </span>

          {validationErrors.agreement ? <span className="absolute top-full text-xs text-red-500">{validationErrors.agreement}</span> : null}
        </label>

        <label htmlFor="agreement2" className='flex items-center select-none relative'>
          <input
            type="checkbox"
            id="agreement2"
            name="agreement2"
            checked={isCheckedSecond}
            onChange={onSecondCheckboxChange}
            className='mr-2'
            required
          />

          <span className="text-sm">
            Я надаю згоду на реалізацію шляхом продажу на аукціоні, організованому Держпраці, твору образотворчого мистецтва, виконаного мною особисто, із подальшим направленням отриманих коштів на потреби Збройних сил України.
            <span className="font-semibold">(якщо учасник неповнолітній – згоду надає один з батьків, зазначивши своє ПІБ)</span>
          </span>

          {validationErrors.agreement2 ? <span className="absolute top-full text-xs text-red-500">{validationErrors.agreement2}</span> : null}
        </label>
      </>
    )
  } else {
    return (
      <label htmlFor="agreement" className='flex items-center select-none relative'>
        <input
          type="checkbox"
          id="agreement"
          name="agreement"
          checked={!!formData.agreement}
          onChange={handleChange}
          className='mr-2'
          required
        />

        <span className="text-sm">Надаю згоду на обробку персональних даних</span>
        {validationErrors.agreement ? <span className="absolute top-full text-xs text-red-500">{validationErrors.agreement}</span> : null}
      </label>
    )
  }
}

type FormProps = {
  page: Pages;
  closeModal: () => void;
}

export const Form = ({ page, closeModal }: FormProps) => {
  const [{ formData, selectedRegion, file, validationErrors, isLoading }, dispatch] = useReducer(formReducer, initialState, (): FormState => {
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

  const getInputConfig = ({ label, placeholder, name, type, min, max, className }: any) => {
    const config = {
      label,
      placeholder,
      type,
      className,
      name,
      value: (formData[name] ?? '') as string,
      onChange: handleChange,
      error: validationErrors[name],
      min,
      max,
    }

    return config;
  }

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

  const updateAgreementState = (isAgreementValid: boolean) => {
    dispatch({
      type: FormActionTypes.UPDATE_INPUT,
      payload: {
        name: 'agreement',
        value: isAgreementValid,
      },
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch({ type: FormActionTypes.IS_LOADING, isLoading: true });

    const allFields = { ...formData, file };

    const validation = validateFormData(allFields, page);

    if (!validation.success) {
      const errors = validation.errors!.reduce((acc, curr) => {
        acc[curr.field] = curr.message;
        return acc;
      }, {} as Record<string, string>);
      console.error("errors", errors);

      dispatch({ type: FormActionTypes.SET_VALIDATION_ERRORS, validationErrors: errors });
      dispatch({ type: FormActionTypes.IS_LOADING, isLoading: false });

      return;
    }

    dispatch({ type: FormActionTypes.SET_VALIDATION_ERRORS, validationErrors: {} });

    const formFormData = new FormData();

    formFormData.append('data', new Blob([JSON.stringify({...formData, category: content[page].title, employerRegion: selectedRegion})], { type: 'application/json' }));
    if (file) {
      formFormData.append('file', file as Blob, file.name);
    }

    submitForm(formFormData).then(response => {
      if (response.success) {
        console.log("Form submitted successfully");
        closeModal && closeModal();
      } else {
        console.error("Form submission failed");
      }
    }).finally(() => {
      dispatch({ type: FormActionTypes.IS_LOADING, isLoading: false });
    });
  };

  useEffect(() => {
    dispatch({ type: FormActionTypes.SET_FORM_DATA, formData });
  }, [page]);

  if (isLoading) {
    return (
      <div className="top-0 left-0 w-full h-screen fixed bg-white bg-opacity-90 z-50 flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <form className="mt-8 space-y-6 last:space-y-8" onSubmit={handleSubmit}>
      <Combobox value={selectedRegion} dispatch={dispatch} error="Це поле є обов'язковим" />

      {pages[page].mainInputs.map(({ label, placeholder, name, type, min, max, className }, index) => (
        <Input
          {...getInputConfig({ label, placeholder, name, type, min, max, className })}
          key={`${label}-${index}`}
        />
      ))}

      <h3 className="text-lg font-semibold mt-8 mb-6">Контактна особа</h3>

      {pages[page].contactInputs.map(({ label, placeholder, name, type, className }, index) => (
        <Input
          {...getInputConfig({ label, placeholder, name, type, className })}
          key={`${label}-${index}`}
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

      <Agreements
        page={page}
        formData={formData}
        validationErrors={validationErrors}
        updateAgreementState={updateAgreementState}
        handleChange={handleChange}
      />

      <Button className="w-full mt-8" type="submit">Відправити</Button>
    </form>
  )
}

export const FormModal = ({ page, closeModal }: FormProps) => {
  return (
    <Modal
      className='w-full max-w-[620px] md:min-h-[550px] top-4 bottom-4 overflow-auto'
      closeModal={closeModal}
    >
      <div className='space-y-4'>
        <h2 className='text-3xl text-center uppercase'>Реєстрація</h2>
        <p className='text-sm text-center uppercase max-w-96 mx-auto'>Категорія: {content[page].title}</p>
      </div>

      <Form page={page} closeModal={closeModal} />
    </Modal>
  )
}
