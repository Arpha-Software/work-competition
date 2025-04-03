export enum Pages {
  inovativeSolutions = 'inovative-solutions',
  bestSpecialist = 'best-specialist',
  effectiveSupport = 'effective-support',
  art = 'art',
}

export enum ErrorMessages {
  RequiredMan = "є обов'язковим",
  RequiredWoman = "є обов'язковою",
  EmailInvalid = "Невірний формат електронної пошти",
  PhoneInvalid = "Номер телефону невірний",
  RegionInvalid = "Неправильний формат області. Введіть: Львівська, Київська і т.д",
  FileSize = "Розмір файлу перевищує 50 МБ",
  FileType = "Не валідний формат файлу",
  FileRequired = "Файл є обов'язковим",
  PageNotFound = "Сторінку не знайдено",
  ConsentRequired = "Ви повинні надати згоду на обробку персональних даних.",
}

export enum Regions {
  Lviv = 'Львівська',
  Kyiv = 'Київська',
  Kharkiv = 'Харківська',
  Dnipro = 'Дніпропетровська',
  Odesa = 'Одеська',
  Zaporizhzhia = 'Запорізька',
  Chernivtsi = 'Чернівецька',
  IvanoFrankivsk = 'Івано-Франківська',
  Ternopil = 'Тернопільська',
  Vinnytsia = 'Вінницька',
  Khmelnytskyi = 'Хмельницька',
  Rivne = 'Рівненська',
  Zakarpattia = 'Закарпатська',
  Poltava = 'Полтавська',
  Sumy = 'Сумська',
  Kherson = 'Херсонська',
  Zhytomyr = 'Житомирська',
  Cherkasy = 'Черкаська',
  Luhansk = 'Луганська',
  Donetsk = 'Донецька',
  Mykolaiv = 'Миколаївська',
  Volyn = 'Волинська',
  Kirovohrad = 'Кіровоградська',
  Chernihiv = 'Чернігівська',
  Crimea = 'АР Крим',
}

export enum AdminTab {
  WORKS = 'works',
  MODERATORS = 'moderators',
}

export enum SortOrder {
  NEWEST = 'newest',
  OLDEST = 'oldest',
}

export enum WorkStatus {
  PUBLIC = 'public',
  HIDDEN = 'hidden',
}
