-- Тестові дані для ChronoClassic.
-- Виконуйте ПІСЛЯ database/schema.sql. Скрипт можна запускати повторно.
USE watchstore;

INSERT INTO brands (name) VALUES
    ('Casio'),
    ('Tissot'),
    ('Seiko'),
    ('Longines'),
    ('Orient')
ON DUPLICATE KEY UPDATE name = VALUES(name);

-- Пароль обох тестових облікових записів: password
-- Хеш згенеровано password_hash('password', PASSWORD_DEFAULT).
INSERT INTO admins (email, password_hash) VALUES
    ('admin@watch.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.')
ON DUPLICATE KEY UPDATE password_hash = VALUES(password_hash);

INSERT INTO users (name, email, phone_number, password_hash) VALUES
    ('Тестовий Користувач', 'user@watch.com', '+380501112233', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.')
ON DUPLICATE KEY UPDATE password_hash = VALUES(password_hash);

INSERT INTO products (
    brand_id, title, price, gender, mechanism, glass, strap_material,
    water_resistance, stock, description
)
SELECT b.id, 'Casio G-Shock GA-2100-1AER', 4850.00, 'Чоловічий', 'Кварцовий',
       'Мінеральне', 'Полімерний ремінець', '200m', 15,
       'Надійний ударостійкий годинник для активного способу життя.'
FROM brands b
WHERE b.name = 'Casio'
  AND NOT EXISTS (SELECT 1 FROM products WHERE title = 'Casio G-Shock GA-2100-1AER');

INSERT INTO products (
    brand_id, title, price, gender, mechanism, glass, strap_material,
    water_resistance, stock, description
)
SELECT b.id, 'Tissot PRX T137.410.11.041.00', 15900.00, 'Чоловічий', 'Кварцовий',
       'Сапфірове', 'Сталевий браслет', '100m', 8,
       'Класична модель у стилі сімдесятих років.'
FROM brands b
WHERE b.name = 'Tissot'
  AND NOT EXISTS (SELECT 1 FROM products WHERE title = 'Tissot PRX T137.410.11.041.00');

INSERT INTO products (
    brand_id, title, price, gender, mechanism, glass, strap_material,
    water_resistance, stock, description
)
SELECT b.id, 'Seiko Presage Cocktail Time', 18900.00, 'Чоловічий', 'Механічний',
       'Мінеральне', 'Шкіряний ремінець', '50m', 6,
       'Автоматичний годинник з елегантним циферблатом.'
FROM brands b
WHERE b.name = 'Seiko'
  AND NOT EXISTS (SELECT 1 FROM products WHERE title = 'Seiko Presage Cocktail Time');

INSERT INTO products (
    brand_id, title, price, gender, mechanism, glass, strap_material,
    water_resistance, stock, description
)
SELECT b.id, 'Longines HydroConquest', 7400.00, 'Чоловічий', 'Кварцовий',
       'Сапфірове', 'Сталевий браслет', '300m', 10,
       'Спортивний годинник із високим рівнем водозахисту.'
FROM brands b
WHERE b.name = 'Longines'
  AND NOT EXISTS (SELECT 1 FROM products WHERE title = 'Longines HydroConquest');

INSERT INTO products (
    brand_id, title, price, gender, mechanism, glass, strap_material,
    water_resistance, stock, description
)
SELECT b.id, 'Orient Bambino Version 5', 9800.00, 'Унісекс', 'Механічний',
       'Мінеральне', 'Шкіряний ремінець', '30m', 12,
       'Стримана класична модель для щоденного носіння.'
FROM brands b
WHERE b.name = 'Orient'
  AND NOT EXISTS (SELECT 1 FROM products WHERE title = 'Orient Bambino Version 5');

INSERT INTO applications (name, contact_information, message, status) VALUES
('Іван Петренко', '+380501234567', 'Добрий день! Цікавить вартість та терміни виконання робіт. Прошу зв''язатися зі мною.', 'Нове'),
('Марія Коваленко', 'maria.kovalenko@gmail.com', 'Хочу замовити консультацію щодо вашого продукту. Коли можна зустрітися?', 'Нове'),
('Олександр Шевченко', '+380671112233', 'Виникла проблема з попереднім замовленням, потрібна допомога у вирішенні питання.', 'Опрацьовано'),
('Наталія Бондаренко', 'nataliia.b@ukr.net', 'Цікавить співпраця з вашою компанією на постійній основі. Чекаю на пропозицію.', 'Опрацьовано'),
('Дмитро Мельник', '+380931234567', 'Прошу надати детальну інформацію про послуги та прайс-лист.', 'Нове'),
('Анна Ткаченко', 'anna.tkachenko@outlook.com', 'Дякую за швидку відповідь! Хотіла б уточнити деталі доставки.', 'Опрацьовано'),
('Сергій Морозов', '+380991112244', 'Залишаю заявку на зворотний дзвінок у зручний для мене час — після 18:00.', 'Нове'),
('Юлія Савченко', 'yuliia.savchenko@gmail.com', 'Чи є у вас знижки для постійних клієнтів? Планую велике замовлення.', 'Нове'),
('Андрій Лисенко', '+380631234589', 'Необхідна технічна консультація щодо налаштування обладнання.', 'Опрацьовано'),
('Катерина Гриценко', 'kateryna.h@i.ua', 'Звертаюся з приводу партнерства. Надішліть, будь ласка, умови співпраці.', 'Нове');