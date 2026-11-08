USE `betatestreact`;

-- --------------------------------------------------------

--
-- Структура таблиці `admins`
--

CREATE TABLE `admins` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp()
) ;

--
-- Дамп даних таблиці `admins`
--

INSERT INTO `admins` (`id`, `email`, `password_hash`, `created_at`) VALUES
(1, 'admin@watch.com', '$2y$10$WSYEpendqtBUlRNjReVAWuPiUTpDbkqotPnN9e67S7Qv2G3p4ayzW', '2026-11-01 18:57:42');

-- --------------------------------------------------------

--
-- Структура таблиці `applications`
--

CREATE TABLE `applications` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `contact_information` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `status` enum('Нове','Опрацьовано') DEFAULT 'Нове',
  `created_at` timestamp NULL DEFAULT current_timestamp()
) ;

-- --------------------------------------------------------

--
-- Структура таблиці `brands`
--

CREATE TABLE `brands` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL
) ;

--
-- Дамп даних таблиці `brands`
--

INSERT INTO `brands` (`id`, `name`) VALUES
(1, 'Casio'),
(2, 'Tissot'),
(3, 'Seiko'),
(4, 'Longines'),
(5, 'Orient');

-- --------------------------------------------------------

--
-- Структура таблиці `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `customer_name` varchar(255) NOT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `comment` text DEFAULT NULL,
  `total_price` decimal(10,2) NOT NULL,
  `status` enum('Нове','В обробці','Відправлено','Виконано','Скасовано') DEFAULT 'Нове',
  `created_at` timestamp NULL DEFAULT current_timestamp()
) ;

--
-- Дамп даних таблиці `orders`
--

INSERT INTO `orders` (`id`, `user_id`, `customer_name`, `phone`, `email`, `comment`, `total_price`, `status`, `created_at`) VALUES
(1, 2, 'test', '+380 123456789', 'example@mail.com', 'test', '15900.00', 'Виконано', '2026-11-03 09:14:34');

-- --------------------------------------------------------

--
-- Структура таблиці `order_items`
--

CREATE TABLE `order_items` (
  `id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT 1,
  `price_at_purchase` decimal(10,2) NOT NULL
) ;

--
-- Дамп даних таблиці `order_items`
--

INSERT INTO `order_items` (`id`, `order_id`, `product_id`, `quantity`, `price_at_purchase`) VALUES
(1, 1, 2, 1, '15900.00');

-- --------------------------------------------------------

--
-- Структура таблиці `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `brand_id` int(11) DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `gender` enum('Чоловічий','Жіночий','Унісекс') DEFAULT 'Унісекс',
  `mechanism` varchar(50) DEFAULT NULL,
  `glass` varchar(50) DEFAULT NULL,
  `strap_material` varchar(50) DEFAULT NULL,
  `water_resistance` varchar(50) DEFAULT NULL,
  `stock` int(11) NOT NULL DEFAULT 0,
  `description` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp()
) ;

--
-- Дамп даних таблиці `products`
--

INSERT INTO `products` (`id`, `brand_id`, `title`, `price`, `gender`, `mechanism`, `glass`, `strap_material`, `water_resistance`, `stock`, `description`, `created_at`) VALUES
(1, 1, 'Casio G-Shock GA-2100-1AER', '4850.00', 'Чоловічий', 'Кварцовий', 'Мінеральне', 'Полімерний ремінець', '200', 15, 'Надійний ударостійкий годинник для активного способу життя.', '2026-11-01 18:57:42'),
(2, 2, 'Tissot PRX T137.410.11.041.00', '15900.00', 'Чоловічий', 'Кварцовий', 'Сапфірове', 'Сталевий браслет', '100', 7, 'Класична модель у стилі сімдесятих років.', '2026-11-01 18:57:42'),
(3, 3, 'Seiko Presage Cocktail Time', '18900.00', 'Чоловічий', 'Механічний', 'Мінеральне', 'Шкіряний ремінець', '50', 6, 'Автоматичний годинник з елегантним циферблатом.', '2026-11-01 18:57:42'),
(4, 4, 'Longines HydroConquest', '7400.00', 'Чоловічий', 'Кварцовий', 'Сапфірове', 'Сталевий браслет', '300', 10, 'Спортивний годинник із високим рівнем водозахисту.', '2026-11-01 18:57:42'),
(5, 5, 'Orient Bambino Version 5', '9800.00', 'Унісекс', 'Механічний', 'Мінеральне', 'Шкіряний ремінець', '30', 12, 'Стримана класична модель для щоденного носіння.', '2026-11-01 18:57:42');

-- --------------------------------------------------------

--
-- Структура таблиці `product_images`
--

CREATE TABLE `product_images` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `image_url` varchar(255) NOT NULL,
  `is_main` tinyint(1) NOT NULL DEFAULT 0
) ;

--
-- Дамп даних таблиці `product_images`
--

INSERT INTO `product_images` (`id`, `product_id`, `image_url`, `is_main`) VALUES
(1, 1, '/uploads/products/6ae868f433f9b3.71327940.jpg', 1),
(2, 1, '/uploads/products/6ae868f44331f8.35100590.jpg', 0),
(3, 2, '/uploads/products/6ae86995487f67.13183379.jpg', 1),
(4, 2, '/uploads/products/6ae86995564963.78816003.jpg', 0),
(5, 2, '/uploads/products/6ae86995696393.81769660.jpg', 0),
(6, 3, '/uploads/products/6ae86a01e1c760.47698016.jpg', 1),
(7, 3, '/uploads/products/6ae86a0202cc60.14597522.jpg', 0),
(8, 4, '/uploads/products/6ae86a526d8402.86874931.jpg', 1),
(9, 4, '/uploads/products/6ae86a5287d5e2.00401929.jpg', 0),
(10, 4, '/uploads/products/6ae86a52ab7787.85265178.jpg', 0),
(11, 5, '/uploads/products/6ae86ac00c0749.09422571.jpg', 1),
(12, 5, '/uploads/products/6ae86ac0313b25.74062910.jpg', 0);

-- --------------------------------------------------------

--
-- Структура таблиці `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone_number` varchar(50) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp()
) ;

--
-- Дамп даних таблиці `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `phone_number`, `password_hash`, `created_at`) VALUES
(1, 'Тестовий Користувач', 'user@watch.com', '+380501112233', '$2y$10$WSYEpendqtBUlRNjReVAWuPiUTpDbkqotPnN9e67S7Qv2G3p4ayzW', '2026-11-01 18:57:42'),
(2, 'test', 'example@mail.com', '+380 123456789', '$2y$10$WSYEpendqtBUlRNjReVAWuPiUTpDbkqotPnN9e67S7Qv2G3p4ayzW', '2026-11-01 19:08:44');

--
-- Індекси збережених таблиць
--

--
-- Індекси таблиці `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Індекси таблиці `applications`
--
ALTER TABLE `applications`
  ADD PRIMARY KEY (`id`);

--
-- Індекси таблиці `brands`
--
ALTER TABLE `brands`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Індекси таблиці `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_orders_user` (`user_id`);

--
-- Індекси таблиці `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_items_order` (`order_id`),
  ADD KEY `fk_items_product` (`product_id`);

--
-- Індекси таблиці `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_products_brand` (`brand_id`);

--
-- Індекси таблиці `product_images`
--
ALTER TABLE `product_images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_images_product` (`product_id`);

--
-- Індекси таблиці `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `phone_number` (`phone_number`);

--
-- AUTO_INCREMENT для збережених таблиць
--

--
-- AUTO_INCREMENT для таблиці `admins`
--
ALTER TABLE `admins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT для таблиці `applications`
--
ALTER TABLE `applications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT для таблиці `brands`
--
ALTER TABLE `brands`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT для таблиці `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT для таблиці `order_items`
--
ALTER TABLE `order_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT для таблиці `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT для таблиці `product_images`
--
ALTER TABLE `product_images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT для таблиці `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
