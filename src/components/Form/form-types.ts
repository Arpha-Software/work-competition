import { z } from 'zod';
import { FormData } from '@/utils/types';
import { Pages } from '@/utils/enums';

export type ValidationResult = {
  success: boolean;
  data?: FormData;
  errors?: { field: string; message: string }[];
};

const agreement = z.boolean({
  required_error: "Ви повинні надати згоду на обробку персональних даних.",
});

const MAX_UPLOAD_SIZE = 1024 * 1024 * 3; // 3MB
const ACCEPTED_FILE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const fileSchema = z
.instanceof(File, { message: 'Файл є обов\'язковим' })
.optional()
.refine((file) => {
  return !file || file.size <= MAX_UPLOAD_SIZE;
}, 'File size must be less than 3MB')
.refine((file) => {
  return file?.type ? ACCEPTED_FILE_TYPES.includes(file.type) : false;
}, 'File must be a PNG');

export const inovativeSolutionsSchema = z.object({
  companyName: z.string().min(1, "Company name is required"),
  primaryActivityType: z.string().min(1, "Activity field is required"),
  employerRegion: z.string().min(1, "Region is required"),
  employerLocality: z.string().min(1, "City is required"),
  employeeCount: z.string().min(1, "Number of workers must be at least 1"),
  fullName: z.string().min(1, "Contact name is required"),
  email: z.string().email("Invalid email format"),
  mobilePhone: z.string().min(10, "Phone number is too small").max(13, "Phone number is too long"),
  additionalInfo: z.string().optional(),
  agreement,
  file: fileSchema,
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
  agreement,
  file: fileSchema,
});

export const effectiveSupportSchema = z.object({
  companyName: z.string().min(1, "Company name is required"),
  primaryActivityType: z.string().min(1, "Activity field is required"),
  employerRegion: z.string().min(1, "Region is required"),
  employerLocality: z.string().min(1, "City is required"),
  employeeCount: z.string().min(1, "Number of workers must be at least 1"),
  fullName: z.string().min(1, "Contact name is required"),
  email: z.string().email("Invalid email format"),
  mobilePhone: z.string().min(10, "Phone number is too small").max(13, "Phone number is too long"),
  additionalInfo: z.string().optional(),
  agreement,
  file: fileSchema,
});

export const artSchema = z.object({
  fullName: z.string().min(1, "Name is required"),
  birthYear: z.string().min(1, "Birth year field is required"),
  employerRegion: z.string().min(1, "Region is required"),
  employerLocality: z.string().min(1, "City is required"),
  email: z.string().min(1, "Email is required"),
  mobilePhone: z.string().min(10, "Phone number is too small").max(13, "Phone number is too long"),
  additionalInfo: z.string().optional(),
  agreement,
  file: fileSchema,
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
