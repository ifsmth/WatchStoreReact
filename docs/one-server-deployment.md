# Розміщення React і PHP на одному домені

Оптимальна структура у кореневій папці домену (`public_html`, `www` або папка FTP) така:

```text
корінь домену/
├── index.html                 ← із React dist
├── assets/                    ← із React dist
├── favicon.svg
├── icons.svg
├── .htaccess                  ← із React dist
└── backend/                   ← весь PHP backend
    ├── .htaccess
    ├── config.php
    ├── connection.php
    ├── public/
    └── src/
```

Не заливайте `dist` як вкладену папку. До кореня домену потрібно скопіювати **вміст** папки `dist`: `index.html`, `assets`, `.htaccess`, `favicon.svg`, `icons.svg`. Папка PHP має залишитися вкладеною як `backend`.

## Адреси

| Призначення | URL |
| --- | --- |
| Сайт | `https://ваш-домен/` |
| React-маршрут | `https://ваш-домен/products` |
| API | `https://ваш-домен/backend/api/v1/brands` |
| Перевірка PHP | `https://ваш-домен/backend/router.php` |

Фронтенд звертається до відносного URL `/backend/api/v1`; тому це одна адреса, один сервер і той самий домен. CORS для такої схеми не потрібний. Backend також надсилає `Access-Control-Allow-Origin: *` для сумісності з зовнішніми клієнтами.

## Що зробити в FTP

1. Видаліть вкладену папку `dist` у корені сайту, якщо вона містить лише дубль уже розпакованих файлів.
2. Залиште папку `backend` у корені й переконайтесь, що там є `.htaccess`.
3. Скопіюйте в корінь домену вміст зібраної папки `dist`.
4. У `backend/config.php` внесіть параметри MySQL і замініть `jwt_secret`.
5. У phpMyAdmin імпортуйте спочатку `backend/database/schema.sql`, потім `backend/database/seed.sql`.
6. Перевірте в браузері `https://ваш-домен/backend/api/v1/brands`: має повернутись JSON із брендами.
7. Відкрийте `https://ваш-домен/products` напряму. Якщо немає 404, React `.htaccess` працює правильно.

Для завантаження фото встановіть права запису для `backend/public/uploads/products` (зазвичай 775).
