import { Pages } from "@/utils/enums";

export type InputT = {
  label: string;
  placeholder: string;
  name: string;
  type: string;
  min?: number;
  max?: number;
  className: string;
};

type FormT = {
  mainInputs: any[],
  contactInputs: any[]
}

function createInput(
  label: string,
  placeholder: string,
  name: string,
  type: string = 'text',
  min?: number,
  max?: number,
  className: string = ''
) {
  return {
    label,
    placeholder,
    name,
    type,
    min,
    max,
    className
  };
}

const commonInputs = {
  companyName: createInput(
    'Назва підприємства, установи, організації, фізичної особи – підприємця',
    'Введіть назву підприємства, установи, організації, фізичної особи – підприємця',
    'companyName'
  ),
  primaryActivityType: createInput(
    'Основний вид діяльності',
    'Введіть основний вид діяльності',
    'primaryActivityType'
  ),
  employerLocality: createInput(
    'Населений пункт, в якому розміщений роботодавець',
    'Введіть населений пункт, в якому розміщений роботодавець',
    'employerLocality'
  ),
  employeeCount: createInput(
    'Кількість працівників',
    'Введіть кількість працівників',
    'employeeCount',
    'number',
    0,
    1000
  ),
};

const contactInputsCommon = [
  createInput('Електронна пошта', 'Введіть електронну пошту', 'email', 'email'),
  createInput('Номер мобільного телефону', 'Введіть номер мобільного телефону', 'mobilePhone', 'tel'),
];

function additionalInfoInput(label: string, placeholder: string) {
  return createInput(label, placeholder, 'additionalInfo');
}

function getInnovativeSolutionsInputs() {
  return {
    mainInputs: [
      commonInputs.companyName,
      commonInputs.primaryActivityType,
      commonInputs.employerLocality,
      commonInputs.employeeCount,
    ],
    contactInputs: [
      createInput('Прізвище, ім’я, по батькові', 'Введіть прізвище, ім’я, по батькові', 'fullName'),
      ...contactInputsCommon,
      additionalInfoInput('Додаткова інформація про роботодавця (необов’язково)', 'Введіть додаткову інформацію про роботодавця'),
    ],
  };
}

export const pages: Record<Pages, FormT> = {
  [Pages.inovativeSolutions]: getInnovativeSolutionsInputs(),
  [Pages.bestSpecialist]: {
    mainInputs: [],
    contactInputs: []
  },
  [Pages.effectiveSupport]: {
    ...getInnovativeSolutionsInputs(),
    contactInputs: [
      createInput('Прізвище, ім’я, по батькові', 'Введіть прізвище, ім’я, по батькові', 'fullName'),
      ...contactInputsCommon,
      additionalInfoInput('Додаткова інформація про роботодавця або проект (за бажанням)', 'Введіть додаткову інформацію про роботодавця'),
    ],
  },
  [Pages.art]: {
    mainInputs: [
      createInput('Населений пункт (Введіть назву населеного пункту)', 'Введіть назву населеного пункту', 'employerLocality'),
      createInput('Прізвище, ім’я, по батькові (повністю)', 'Введіть прізвище, ім’я, по батькові', 'fullName'),
      createInput('Місце роботи/навчання/вид зайнятості', 'Введіть місце роботи/навчання/вид зайнятості', 'primaryActivityType'),
      createInput('Рік народження', 'Введіть рік народження', 'birthYear'),
      commonInputs.employerLocality,
    ],
    contactInputs: [
      ...contactInputsCommon,
      additionalInfoInput('Додаткова інформація про себе за бажанням (мрії, особисті досягнення і т.д)', 'Введіть додаткову інформацію про себе'),
    ]
  }
};
