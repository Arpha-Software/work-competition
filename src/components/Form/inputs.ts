import { Pages } from "@/utils/enums";

export const pages = {
  [Pages.inovativeSolutions]: {
    mainInputs: [
      {
        label: 'Назва підприємства, установи, організації, фізичної особи – підприємця',
        placeholder: 'Введіть назву підприємства, установи, організації, фізичної особи – підприємця',
        name: 'companyName',
        type: 'text',
        className: ''
      },
      {
        label: 'Основний вид діяльності',
        placeholder: 'Введіть основний вид діяльності',
        name: 'primaryActivityType',
        type: 'text',
        className: ''
      },
      {
        label: 'Область, в якій знаходиться роботодавець',
        placeholder: 'Введіть область, в якій знаходиться роботодавець',
        name: 'employerRegion',
        type: 'text',
        className: ''
      },
      {
        label: 'Населений пункт, в якому розміщений роботодавець',
        placeholder: 'Введіть населений пункт, в якому розміщений роботодавець',
        name: 'employerLocality',
        type: 'text',
        className: ''
      },
      {
        label: 'Кількість працівників',
        placeholder: 'Введіть кількість працівників',
        name: 'employeeCount',
        type: 'number',
        className: ''
      },
    ],
    contactInputs: [
      {
        label: 'Прізвище, ім’я, по батькові',
        placeholder: 'Введіть прізвище, ім’я, по батькові',
        name: 'fullName',
        type: 'text',
        className: ''
      },
      {
        label: 'Електронна пошта',
        placeholder: 'Введіть електронну пошту',
        name: 'email',
        type: 'email',
        className: ''
      },
      {
        label: 'Номер мобільного телефону',
        placeholder: 'Введіть номер мобільного телефону',
        name: 'mobilePhone',
        type: 'tel',
        className: ''
      },
      {
        label: 'Додаткова інформація про роботодавця (необов’язково)',
        placeholder: 'Введіть додаткову інформацію про роботодавця',
        name: 'additionalInfo',
        type: 'text',
        className: '',
      }
    ]
  },
  [Pages.bestSpecialist]: {
    mainInputs: [],
    contactInputs: []
  },
  [Pages.effectiveSupport]: {
    mainInputs: [
      {
        label: 'Назва підприємства, установи, організації, фізичної особи – підприємця',
        placeholder: 'Введіть назву підприємства, установи, організації, фізичної особи – підприємця',
        name: 'companyName',
        type: 'text',
        className: ''
      },
      {
        label: 'Основний вид діяльності',
        placeholder: 'Введіть основний вид діяльності',
        name: 'primaryActivityType',
        type: 'text',
        className: ''
      },
      {
        label: 'Область, в якій знаходиться роботодавець',
        placeholder: 'Введіть область, в якій знаходиться роботодавець',
        name: 'employerRegion',
        type: 'text',
        className: ''
      },
      {
        label: 'Населений пункт, в якому розміщений роботодавець',
        placeholder: 'Введіть населений пункт, в якому розміщений роботодавець',
        name: 'employerLocality',
        type: 'text',
        className: ''
      },
      {
        label: 'Кількість працівників',
        placeholder: 'Введіть кількість працівників',
        name: 'employeeCount',
        type: 'number',
        className: ''
      },
    ],
    contactInputs: [
      {
        label: 'Прізвище, ім’я, по батькові',
        placeholder: 'Введіть прізвище, ім’я, по батькові',
        name: 'fullName',
        type: 'text',
        className: ''
      },
      {
        label: 'Електронна пошта',
        placeholder: 'Введіть електронну пошту',
        name: 'email',
        type: 'email',
        className: ''
      },
      {
        label: 'Номер мобільного телефону',
        placeholder: 'Введіть номер мобільного телефону',
        name: 'mobilePhone',
        type: 'tel',
        className: ''
      },
      {
        label: 'Додаткова інформація про роботодавця або про проект (за бажанням)',
        placeholder: 'Введіть додаткову інформацію про роботодавця',
        name: 'additionalInfo',
        type: 'text',
        className: '',
      }
    ]
  },
  [Pages.art]: {
    mainInputs: [
      {
        label: 'Прізвище, ім’я, по батькові (повністю)',
        placeholder: 'Введіть прізвище, ім’я, по батькові',
        name: 'fullName',
        type: 'text',
        className: ''
      },
      {
        label: 'Рік народження',
        placeholder: 'Введіть рік народження',
        name: 'birthYear',
        type: 'text',
        className: ''
      },
      {
        label: 'Область проживання',
        placeholder: 'Введіть область проживання',
        name: 'employerRegion',
        type: 'text',
        className: ''
      },
      {
        label: 'Населений пункт проживання',
        placeholder: 'Введіть населений пункт проживання',
        name: 'employerLocality',
        type: 'text',
        className: ''
      },
    ],
    contactInputs: [
      {
        label: 'Електронна пошта',
        placeholder: 'Введіть електронну пошту',
        name: 'email',
        type: 'email',
        className: ''
      },
      {
        label: 'Номер мобільного телефону',
        placeholder: 'Введіть номер мобільного телефону',
        name: 'mobilePhone',
        type: 'tel',
        className: ''
      },
      {
        label: 'Додаткова інформація про себе (мрії, особисті досягнення і т.д)',
        placeholder: 'Введіть додаткову інформацію про роботодавця',
        name: 'additionalInfo',
        type: 'text',
        className: '',
      }
    ]
  }
}
