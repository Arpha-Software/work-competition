import { images } from "./constants";

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
    linkHref: "/inovative-solutions",
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
    linkHref: "/best-specialist",
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
    linkHref: "/effective-support",
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
    linkHref: "/art",
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
    linkHref: "/art/posters-and-information",
  },
  {
    content: {
      title: "Художні фото та колажі"
    },
    image: {
      src: images.subcategories.photosAndCollages,
      alt: "image2",
    },
    linkHref: "/art/photos-and-collages",
  },
  {
    content: {
      title: "Малюнки"
    },
    image: {
      src: images.subcategories.drawings,
      alt: "image3",
    },
    linkHref: "/art/drawings",
  },
  {
    content: {
      title: "Відеоролики"
    },
    image: {
      src: images.subcategories.videos,
      alt: "image4",
    },
    linkHref: "/art/videos",
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
  { value: 'Київ' },
  { value: 'Черкаси' },
  { value: 'Чернігів' },
]
