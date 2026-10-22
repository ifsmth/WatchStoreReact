# ChronoClassic API (Pure PHP)

## Запуск

1. Імпортуйте [`database/schema.sql`](database/schema.sql), а потім тестові дані з [`database/seed.sql`](database/seed.sql) у MySQL.
2. Для shared hosting відредагуйте параметри БД та `jwt_secret` у [`config.php`](config.php). Змінні середовища не потрібні.
3. Надайте PHP право запису до `public/uploads/products`.
4. На shared hosting нічого запускати не потрібно: файл `.htaccess` сам направляє API-запити до бекенду. Відкрийте кореневу адресу домену для перевірки.

Для локальної розробки можна виконати:

```bash
php -S localhost:8000 router.php
```

API доступне за шляхом `/api/v1/...`. Усі відповіді — JSON. Для захищених маршрутів передайте `Authorization: Bearer <token>`.

Детальні інструкції запуску та перевірки API у Postman: [docs/setup-and-postman.md](docs/setup-and-postman.md).

## Структура коду

`public/index.php` — єдина точка входу; `src/routes.php` — зіставлення URL із handler-ами; `src/handlers/` — логіка endpoint-ів за темами; `src/auth.php`, `src/products.php`, `src/orders.php` — спільна прикладна логіка. Усі модулі отримують PDO з одного [`connection.php`](connection.php).

Щоб додати адміністратора, згенеруйте хеш `password_hash('пароль', PASSWORD_DEFAULT)` та вставте його у таблицю `admins`.
