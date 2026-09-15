// Тестові дані для брендів (таблиця brands)
export const brands = [
  { id: 1, name: "Casio" },
  { id: 2, name: "Tissot" },
  { id: 3, name: "Orient" },
  { id: 4, name: "Daniel Wellington" },
  { id: 5, name: "Michael Kors" },
];

// Тестові дані для товарів (таблиця products)
export const products = [
  {
    id: 1,
    brand_id: 1,
    title: "Casio G-Shock GA-2100-1AER",
    price: 4850.0,
    gender: "Чоловічий",
    mechanism: "Кварцовий",
    glass: "Мінеральне",
    strap_material: "Полімер",
    water_resistance: "20 ATM",
    stock: 12,
    description:
      "Легендарний ударостійкий годинник з карбоновим корпусом. Ідеальний для активного відпочинку та спорту.",
    created_at: "2026-09-10T10:00:00Z",
  },
  {
    id: 2,
    brand_id: 3,
    title: "Orient Bambino FAC00009N0",
    price: 8200.0,
    gender: "Чоловічий",
    mechanism: "Механічний з автопідзаводом",
    glass: "Мінеральне",
    strap_material: "Натуральна шкіра",
    water_resistance: "3 ATM",
    stock: 5,
    description:
      "Класичний годинник у вінтажному стилі з опуклим склом. Чудово підкреслить ваш діловий образ.",
    created_at: "2026-09-11T14:30:00Z",
  },
  {
    id: 3,
    brand_id: 2,
    title: "Tissot PRX Powermatic 80",
    price: 28500.0,
    gender: "Унісекс",
    mechanism: "Механічний з автопідзаводом",
    glass: "Сапфірове",
    strap_material: "Нержавіюча сталь",
    water_resistance: "10 ATM",
    stock: 3,
    description:
      "Швейцарський годинник з ретро-дизайном 70-х років. Має вражаючий запас ходу до 80 годин.",
    created_at: "2026-09-12T09:15:00Z",
  },
  {
    id: 4,
    brand_id: 4,
    title: "Daniel Wellington Petite Melrose",
    price: 6400.0,
    gender: "Жіночий",
    mechanism: "Кварцовий",
    glass: "Мінеральне",
    strap_material: "Нержавіюча сталь (Mesh)",
    water_resistance: "3 ATM",
    stock: 8,
    description:
      "Елегантний мінімалістичний жіночий годинник з браслетом міланського плетіння кольору рожевого золота.",
    created_at: "2026-09-14T11:45:00Z",
  },
  {
    id: 5,
    brand_id: 5,
    title: "Michael Kors Parker MK5896",
    price: 10200.0,
    gender: "Жіночий",
    mechanism: "Кварцовий",
    glass: "Мінеральне",
    strap_material: "Нержавіюча сталь та ацетат",
    water_resistance: "5 ATM",
    stock: 0, // Приклад товару, якого немає в наявності
    description:
      "Гламурний годинник, прикрашений кристалами, що додасть розкоші будь-якому образу.",
    created_at: "2026-09-15T08:20:00Z",
  },
];
