import { z } from 'zod';
import { FormData } from '@/utils/types';
import { Pages } from '@/utils/enums';

export type ValidationResult = {
  success: boolean;
  data?: FormData;
  errors?: { field: string; message: string }[];
};

export const inovativeSolutionsSchema = z.object({
  companyName: z.string().min(1, "Company name is required"),
  activity: z.string().min(1, "Activity field is required"),
  region: z.string().min(1, "Region is required"),
  city: z.string().min(1, "City is required"),
  workers: z.string().min(1, "Number of workers must be at least 1"),
  name: z.string().min(1, "Contact name is required"),
  email: z.string().email("Invalid email format"),
  phone: z.string().min(10, "Phone number is too small").max(13, "Phone number is too long"),
  additionalInfo: z.string().optional(),
  agreement: z.boolean().refine(val => val === true, {
    message: "You must agree to the terms."
  }),
});

export const bestSpecialistSchema = z.object({
  companyName: z.string().min(1, "Company name is required"),
  activity: z.string().min(1, "Activity field is required"),
  region: z.string().min(1, "Region is required"),
  city: z.string().min(1, "City is required"),
  workers: z.string().min(1, "Number of workers must be at least 1"),
  name: z.string().min(1, "Contact name is required"),
  email: z.string().email("Invalid email format"),
  phone: z.string().min(10, "Phone number is too small").max(13, "Phone number is too long"),
  additionalInfo: z.string().optional(),
  agreement: z.boolean().refine(val => val === true, {
    message: "You must agree to the terms."
  }),
});

export const effectiveSupportSchema = z.object({
  companyName: z.string().min(1, "Company name is required"),
  activity: z.string().min(1, "Activity field is required"),
  region: z.string().min(1, "Region is required"),
  city: z.string().min(1, "City is required"),
  workers: z.string().min(1, "Number of workers must be at least 1"),
  name: z.string().min(1, "Contact name is required"),
  email: z.string().email("Invalid email format"),
  phone: z.string().min(10, "Phone number is too small").max(13, "Phone number is too long"),
  additionalInfo: z.string().optional(),
  agreement: z.boolean().refine(val => val === true, {
    message: "You must agree to the terms."
  }),
});

export const artSchema = z.object({
  name: z.string().min(1, "Name is required"),
  birthYear: z.string().min(1, "Birth year field is required"),
  region: z.string().min(1, "Region is required"),
  city: z.string().min(1, "City is required"),
  email: z.string().min(1, "Email is required"),
  phone: z.string().min(10, "Phone number is too small").max(13, "Phone number is too long"),
  additionalInfo: z.string().optional(),
  agreement: z.boolean().refine(val => val === true, {
    message: "You must agree to the terms."
  }),
});

export const validateFormData = (formData: FormData, page: Pages): ValidationResult => {
  let schema;

  switch (page) {
    case Pages.inovativeSolutions:
      schema = inovativeSolutionsSchema;
      break;
    case Pages.bestSpecialist:
      schema = bestSpecialistSchema;
      break;
    case Pages.effectiveSupport:
      schema = effectiveSupportSchema;
      break;
    case Pages.art:
      schema = artSchema;
      break;
    default:
      return { success: false, errors: [{ field: '', message: "Page not found" }] };
  }

  const result = schema.safeParse(formData);

  if (!result.success) {
    const errors = result.error.errors.map(err => ({
      field: String(err.path[0]),
      message: err.message
    }));
    return { success: false, errors };
  }

  return { success: true, data: result.data };
};
