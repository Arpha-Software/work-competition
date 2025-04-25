import { images } from "./constants";
import { ECardType } from "./enums";

export const categories = [
  {
    content: {
      title: "Інноваційні та цифрові рішення для забезпечення безпеки на роботі",
      description: "Якщо ви вже успішно впроваджуєте інноваційні та цифрові рішення, зокрема  електронний документообіг в системі управління охороною праці, моніторинг стану обладнання, виявлення небезпек, попередження аварійних ситуацій тощо або починаєте цей шлях, ми запрошуємо вас поділитися своїм досвідом та досягненнями у цьому розділі.",
    },
    image: {
      src: images.categories.category1,
      alt: "image1",
    },
    linkHref: "/2025/inovative-solutions",
  },
  {
    content: {
      title: "Кращий спеціаліст з охорони праці",
      description: "Тут кожен спеціаліст з охорони праці може заявити про себе як про найкращого фахівця, що має максимальну ефективність та є суперпрофесіоналом. Хочете потішити себе та свого роботодавця – вам сюди!",
    },
    image: {
      src: images.categories.category2,
      alt: "image2",
    },
    linkHref: "/2025/best-specialist",
  },
  {
    content: {
      title: "Ефективні програми психосоціальної підтримки на роботі та її реалізація",
      description: "Це про роботодавців, які розуміють, що таке успішний бізнес з найпродуктивнішою командою професіоналів-однодумців. Якщо ви знаєте, як зробити команду такою, і ви вже це зробили чи намагаєтеся це зробити –  цей розділ для вас.",
    },
    image: {
      src: images.categories.category3,
      alt: "image3",
    },
    linkHref: "/2025/effective-support",
  },
  {
    content: {
      title: "Мистецтво, що рятує життя",
      description: "Цей розділ для творців, які вміють викласти свої почуття на папері. Знаєте як виглядає безпечна праця? Вам сюди! Немає значення, скільки вам років, вмієте ви малювати чи користуєтеся відповідним програмним забезпеченням. Фантазія і почуття – ось що робить ескіз, постер, малюнок витвором мистецтва.",
    },
    image: {
      src: images.categories.category4,
      alt: "image4",
    },
    linkHref: "/2025/art",
  },
]

export const subcategories = [
  {
    content: {
      title: "Постери та інформаційні плакати",
    },
    image: {
      src: images.subcategories.postersAndInformation,
      alt: "image1",
    },
    linkHref: "/2025/art/posters-and-information",
  },
  {
    content: {
      title: "Художні фото та колажі"
    },
    image: {
      src: images.subcategories.photosAndCollages,
      alt: "image2",
    },
    linkHref: "/2025/art/photos-and-collages",
  },
  // {
  //   content: {
  //     title: "Малюнки"
  //   },
  //   image: {
  //     src: images.subcategories.drawings,
  //     alt: "image3",
  //   },
  //   linkHref: "/2025/art/drawings",
  // },
  {
    content: {
      title: "Відеоролики"
    },
    image: {
      src: images.subcategories.videos,
      alt: "image4",
    },
    linkHref: "/2025/art/videos",
  },
]

export const regions = [
  { value: 'Волинська' },
  { value: 'Закарпатська' },
  { value: 'Львівська' },
  { value: 'Рівненська' },
  { value: 'Івано-Франківська' },
  { value: 'Тернопільська' },
  { value: 'Чернівецька' },
  { value: 'Одеська' },
  { value: 'Миколаївська' },
  { value: 'Херсонська' },
  { value: 'Кіровоградська' },
  { value: 'Дніпропетровська' },
  { value: 'Запорізька' },
  { value: 'Полтавська' },
  { value: 'Сумська' },
  { value: 'Харківська' },
  { value: 'Донецька' },
  { value: 'Луганська' },
  { value: 'Житомирська' },
  { value: 'Хмельницька' },
  { value: 'Вінницька' },
  { value: 'Київська' },
  { value: 'Черкаська' },
  { value: 'Чернігівська' },
]

export const homeContent = [
  {
    content: {
      title: "Галерея кращих робіт",
      description: "Перегляньте архів найкращих робіт переможців минулих конкурсів. Надихайтеся унікальними ідеями та творчими рішеннями!",
    },
    image: {
      src: images.home.gallery,
      alt: "image1",
    },
    linkHref: "/best-arts",
    buttonText: "Переглянути",
    type: ECardType.NONE,
    tagLabel: '2024'
  },
  {
    content: {
      title: "Мистецтво безпеки праці 2025",
      description: "Долучайтеся до цьогорічного конкурсу! Створюйте, діліться своїми ідеями та робіть внесок у формування культури безпеки праці. Ваша робота може надихнути інших!",
    },
    image: {
      src: images.home.thisYear,
      alt: "image2",
    },
    linkHref: "/2025",
    buttonText: "Взяти участь",
    type: ECardType.EVENT,
    tagLabel: '2025'
  },
];

export const bestArtsContent = [
  {
    content: {
      title: "Мистецтво безпеки праці 2024",
      description: "Перегляньте архів найкращих робіт переможців минулих конкурсів. Надихайтеся унікальними ідеями та творчими рішеннями!",
    },
    image: {
      src: images.home.bestArts2024,
      alt: "image1",
    },
    linkHref: "/2024",
    buttonText: "Переглянути",
    type: ECardType.EVENT,
    tagLabel: '2024'
  },
  {
    content: {
      title: "Мистецтво безпеки праці 2025",
      description: "Долучайтеся до цьогорічного конкурсу! Створюйте, діліться своїми ідеями та робіть внесок у формування культури безпеки праці. Ваша робота може надихнути інших!",
    },
    image: {
      src: images.home.thisYear,
      alt: "image2",
    },
    linkHref: "/2025",
    buttonText: "Взяти участь",
    type: ECardType.EVENT,
    tagLabel: '2025'
  },
];

export interface ArtSection {
  id: number;
  title: string;
  link: string;
}

export const artSections: ArtSection[] = [
  {
    id: 1,
    title: "Усі категорії 2024 року",
    link: "/categories-2024"
  },
  {
    id: 2,
    title: "Інноваційні та цифрові рішення для забезпечення безпеки на роботі",
    link: "/digital-solutions"
  },
  {
    id: 3,
    title: "Ефективні програми психосоціальної підтримки на роботі та її реалізація",
    link: "/psychosocial-support"
  },
  {
    id: 4,
    title: "Мистецтво, що рятує життя",
    link: "/life-saving-art"
  }
];
