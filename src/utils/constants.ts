const images = {
  home: {
    gallery: "/images/gallery.png",
    thisYear: "/images/thisYear.png",
    bestArts2024: "/images/2024.png",
  },
  categories: {
    category1: "/images/cat1.png",
    category2: "/images/cat2.png",
    category3: "/images/cat3.png",
    category4: "/images/cat4.png",
  },
  subcategories: {
    postersAndInformation: "/images/posters.png",
    photosAndCollages: "/images/photo_collages.png",
    drawings: "/images/pictures.png",
    videos: "/images/videos.png",
  },
  partners: {
    partner1: "/images/partner1.png",
    partner2: "/images/partner2.png",
    partner3: "/images/partner3.png",
    partner4: "/images/partner4.png",
    partner5: "/images/partner5.png",
    partner6: "/images/partner6.png",
  },
  best_arts_2024: {
    main: "/images/best_arts_2024.png",
  },
}

export { images };

export const CATEGORIES = [
  { value: 'all', label: 'Всі категорії' },
  { value: 'Інноваційні та цифрові рішення для забезпечення безпеки на роботі', label: 'Інноваційні та цифрові рішення для забезпечення безпеки на роботі' },
  { value: 'Ефективні програми психосоціальної підтримки на роботі та її реалізація', label: 'Ефективні програми психосоціальної підтримки на роботі та її реалізація' },
  { value: 'Мистецтво, що рятує життя', label: 'Мистецтво, що рятує життя' },
];

export const REGIONS = [
  { value: 'all', label: 'Всі області' },
  { value: 'Вінницька', label: 'Вінницька область' },
  { value: 'Волинська', label: 'Волинська область' },
  { value: 'Дніпропетровська', label: 'Дніпропетровська область' },
  { value: 'Донецька', label: 'Донецька область' },
  { value: 'Житомирська', label: 'Житомирська область' },
  { value: 'Закарпатська', label: 'Закарпатська область' },
  { value: 'Запорізька', label: 'Запорізька область' },
  { value: 'Івано-Франківська', label: 'Івано-Франківська область' },
  { value: 'Київська', label: 'Київська область' },
  { value: 'Кіровоградська', label: 'Кіровоградська область' },
  { value: 'Луганська', label: 'Луганська область' },
  { value: 'Львівська', label: 'Львівська область' },
  { value: 'Миколаївська', label: 'Миколаївська область' },
  { value: 'Одеська', label: 'Одеська область' },
  { value: 'Полтавська', label: 'Полтавська область' },
  { value: 'Рівненська', label: 'Рівненська область' },
  { value: 'Сумська', label: 'Сумська область' },
  { value: 'Тернопільська', label: 'Тернопільська область' },
  { value: 'Харківська', label: 'Харківська область' },
  { value: 'Херсонська', label: 'Херсонська область' },
  { value: 'Хмельницька', label: 'Хмельницька область' },
  { value: 'Черкаська', label: 'Черкаська область' },
  { value: 'Чернівецька', label: 'Чернівецька область' },
  { value: 'Чернігівська', label: 'Чернігівська область' },
];

export const SORT_OPTIONS = [
  { value: 'newest', label: 'Найновіші' },
  { value: 'oldest', label: 'Найстаріші' },
];

export const PAGE_SIZE = 12;
export const API_URL = 'https://bicp2-15a28878e665.herokuapp.com/submissions/twenty-twenty-four';
