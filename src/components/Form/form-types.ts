import { z } from 'zod';
import { FormData } from '@/utils/types';
import { ErrorMessages, Pages } from '@/utils/enums';

export type ValidationResult = {
  success: boolean;
  data?: FormData;
  errors?: { field: string; message: string }[];
};

const MAX_UPLOAD_SIZE = 1024 * 1024 * 50;
const ACCEPTED_FILE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "video/mp4",
  "video/x-msvideo",
  "video/quicktime",
];

const baseSchemaFields = {
  companyName: z.string().min(1, `Назва компанії ${ErrorMessages.RequiredMan}`),
  primaryActivityType: z.string().min(1, `Галузь діяльності ${ErrorMessages.RequiredWoman}`),
  employerLocality: z.string().min(1, `Місто ${ErrorMessages.RequiredMan}`),
  age: z.string().min(1, `Вік ${ErrorMessages.RequiredMan}`),
  employeeCount: z.string().min(0, `Кількість працівників має бути не менше 0`),
  fullName: z.string().min(1, `Ім'я контактної особи ${ErrorMessages.RequiredMan}`),
  email: z.string().email(ErrorMessages.EmailInvalid),
  additionalInfo: z.string().optional(),
  agreement: z.boolean({ required_error: ErrorMessages.ConsentRequired }),
  phoneNumber: z.string()
    .transform((value) => value.replace(/\D/g, ''))
    .refine((value) => value.length >= 10 && value.length <= 12, ErrorMessages.PhoneInvalid)
    .refine((value) => {
      if (value.length === 9) {
        return `380${value}`;
      }
      return value;
    })
    .refine((value) => /^\d+$/.test(value), ErrorMessages.PhoneInvalid)
};


const fileSchema = z.instanceof(File, { message: ErrorMessages.FileRequired })
  .optional()
  .refine(file => !file || file.size <= MAX_UPLOAD_SIZE, ErrorMessages.FileSize)
  .refine(file => file?.type ? ACCEPTED_FILE_TYPES.includes(file.type) : false, ErrorMessages.FileType);

const { companyName, employeeCount, ...baseSchemaFieldsArt } = baseSchemaFields;

const schemas = {
  [Pages.inovativeSolutions]: z.object({ ...baseSchemaFields, file: fileSchema }),
  [Pages.bestSpecialist]: z.object({ ...baseSchemaFields, file: fileSchema }),
  [Pages.effectiveSupport]: z.object({ ...baseSchemaFields, file: fileSchema }),
  [Pages.art]: z.object({
    ...baseSchemaFieldsArt,
    file: fileSchema
    })
};

export const validateFormData = (formData: FormData, page: Pages): ValidationResult => {
  const schema = schemas[page];

  if (!schema) {
    return { success: false, errors: [{ field: '', message: ErrorMessages.PageNotFound }] };
  }

  const result = schema.safeParse({
    ...formData,
    age: "1",
  });

  if (!result.success) {
    const errors = result.error.errors.map(err => ({
      field: String(err.path[0]),
      message: err.message
    }));

    return { success: false, errors };
  }

  return { success: true, data: result.data };
};
