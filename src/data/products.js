// Тестові дані для брендів (таблиця brands)
export const brands = [
  { id: 1, name: "Casio" },
  { id: 2, name: "Tissot" },
  { id: 3, name: "Seiko" },
  { id: 4, name: "Orient" },
  { id: 5, name: "Longines" },
  { id: 6, name: "Hamilton" },
  { id: 7, name: "Certina" },
  { id: 8, name: "Rado" },
  { id: 9, name: "Daniel Wellington" },
  { id: 10, name: "Michael Kors" },
];

export const brandsList = [
  "Усі бренди",
  "Tissot",
  "Certina",
  "Hamilton",
  "Longines",
  "Rado",
  "Orient",
  "Seiko",
  "Casio",
];

export const mechanismsList = ["Усі механізми", "Механічний", "Кварцовий"];
export const gendersList = ["Всі", "Чоловічий", "Жіночий", "Унісекс"];

// Тестові дані для товарів (таблиця products)
export const products = [
  {
    id: 1,
    brand_id: 1,
    brand: "Casio",
    title: "Casio G-Shock GA-2100-1AER",
    name: "Casio G-Shock GA-2100-1AER",
    price: 4850,
    gender: "Чоловічий",
    mechanism: "Кварцовий",
    glass: "Мінеральне",
    strap_material: "Полімер",
    water_resistance: "200m / 20 bar",
    stock: 12,
    rating: 4.9,
    description:
      "Надійний полімерний корпус з карбоновим підсиленням Carbon Core Guard, подвійна підсвітка та водозахист 200m.",
    image:
      "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&q=80&w=600",
    images: [
      "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1533139502658-0198f920d8e8?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&q=80&w=600",
    ],
    created_at: "2026-01-10T10:00:00Z",
  },
  {
    id: 2,
    brand_id: 2,
    brand: "Tissot",
    title: "Tissot Le Locle Powermatic 80",
    name: "Tissot Le Locle Powermatic 80",
    price: 24500,
    gender: "Чоловічий",
    mechanism: "Механічний",
    glass: "Сапфірове",
    strap_material: "Натуральна шкіра",
    water_resistance: "30m / 3 bar",
    stock: 5,
    rating: 5.0,
    description:
      "Швейцарська елегантність із автопідзаводом, запасом ходу 80 годин та прозорою задньою кришкою.",
    image:
      "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?auto=format&fit=crop&q=80&w=600",
    images: [
      "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1508656961515-a2ea60c87028?auto=format&fit=crop&q=80&w=600",
    ],
    created_at: "2026-01-11T14:30:00Z",
  },
  {
    id: 3,
    brand_id: 3,
    brand: "Seiko",
    title: "Seiko Presage Cocktail Time",
    name: "Seiko Presage Cocktail Time",
    price: 18200,
    gender: "Чоловічий",
    mechanism: "Механічний",
    glass: "Мінеральне Hardlex",
    strap_material: "Натуральна шкіра",
    water_resistance: "50m / 5 bar",
    stock: 8,
    rating: 4.8,
    description:
      "Глибокий гільйошований циферблат, натхненний культовою японською барною культурою Токіо.",
    image:
      "https://images.unsplash.com/photo-1508656961515-a2ea60c87028?auto=format&fit=crop&q=80&w=600",
    images: [
      "https://images.unsplash.com/photo-1508656961515-a2ea60c87028?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=600",
    ],
    created_at: "2026-01-12T09:15:00Z",
  },
  {
    id: 4,
    brand_id: 4,
    brand: "Orient",
    title: "Orient Bambino Open Heart",
    name: "Orient Bambino Open Heart",
    price: 11300,
    gender: "Жіночий",
    mechanism: "Механічний",
    glass: "Мінеральне випукле",
    strap_material: "Натуральна шкіра",
    water_resistance: "30m / 3 bar",
    stock: 15,
    rating: 4.7,
    description:
      "Витончений класичний годинник із відкритим балансом механізму на циферблаті Open Heart.",
    image:
      "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?auto=format&fit=crop&q=80&w=600",
    images: [
      "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=600",
    ],
    created_at: "2026-01-14T11:45:00Z",
  },
  {
    id: 5,
    brand_id: 5,
    brand: "Longines",
    title: "Longines Master Collection",
    name: "Longines Master Collection",
    price: 89000,
    gender: "Чоловічий",
    mechanism: "Механічний",
    glass: "Сапфірове з антивідблиском",
    strap_material: "Нержавіюча сталь",
    water_resistance: "30m / 3 bar",
    stock: 3,
    rating: 5.0,
    description:
      "Вершина швейцарського годинникарства з хронографом, індикатором фаз місяця та датою.",
    image:
      "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&q=80&w=600",
    images: [
      "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?auto=format&fit=crop&q=80&w=600",
    ],
    created_at: "2026-01-15T08:20:00Z",
  },
  {
    id: 6,
    brand_id: 6,
    brand: "Hamilton",
    title: "Hamilton Khaki Field Auto",
    name: "Hamilton Khaki Field Auto",
    price: 31200,
    gender: "Унісекс",
    mechanism: "Механічний",
    glass: "Сапфірове",
    strap_material: "Текстиль / Шкіра",
    water_resistance: "100m / 10 bar",
    stock: 7,
    rating: 4.9,
    description:
      "Легендарний мілітарі-дизайн з водонепроникністю 100m, стійким сапфіровим склом та запасом ходу 80 годин.",
    image:
      "https://images.unsplash.com/photo-1533139502658-0198f920d8e8?auto=format&fit=crop&q=80&w=600",
    images: [
      "https://images.unsplash.com/photo-1533139502658-0198f920d8e8?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&q=80&w=600",
    ],
    created_at: "2026-01-18T16:00:00Z",
  },
  {
    id: 7,
    brand_id: 7,
    brand: "Certina",
    title: "Certina DS Action Diver",
    name: "Certina DS Action Diver",
    price: 36800,
    gender: "Чоловічий",
    mechanism: "Механічний",
    glass: "Сапфірове",
    strap_material: "Нержавіюча сталь",
    water_resistance: "300m / 30 bar",
    stock: 6,
    rating: 4.9,
    description:
      "Професійний дайверський годинник за стандартом ISO 6425 з концепцією Double Security та водозахистом 300m.",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=600",
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1508656961515-a2ea60c87028?auto=format&fit=crop&q=80&w=600",
    ],
    created_at: "2026-01-20T12:00:00Z",
  },
  {
    id: 8,
    brand_id: 8,
    brand: "Rado",
    title: "Rado True Thinline Ceramic",
    name: "Rado True Thinline Ceramic",
    price: 64000,
    gender: "Жіночий",
    mechanism: "Кварцовий",
    glass: "Сапфірове",
    strap_material: "Хайтек кераміка",
    water_resistance: "30m / 3 bar",
    stock: 4,
    rating: 4.8,
    description:
      "Ультратонкий корпус із хайтек-кераміки високої міцності, стійкої до подряпин, невимушена розкіш.",
    image:
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=600",
    images: [
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?auto=format&fit=crop&q=80&w=600",
    ],
    created_at: "2026-01-22T15:30:00Z",
  },
];
