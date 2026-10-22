# Запуск і тестування ChronoClassic API

## 1. Передумови

Потрібні PHP 5.6+ з розширеннями `pdo_mysql` і `fileinfo`, а також MySQL 5.7+/MariaDB. Проєкт адаптований для shared hosting і не потребує Composer, SSH або запуску команд на сервері.

## 2. Створення та наповнення бази даних

Перейдіть у корінь проєкту й виконайте SQL-файли по черзі. У звичайному терміналі:

```bash
mysql -u root -p < database/schema.sql
mysql -u root -p watchstore < database/seed.sql
```

Або відкрийте обидва файли у MySQL Workbench / phpMyAdmin та виконайте спочатку `schema.sql`, а потім `seed.sql`.

`seed.sql` створює тестові бренди й годинники та два облікові записи:

| Роль | Email | Пароль |
| --- | --- | --- |
| Адміністратор | `admin@watch.com` | `password` |
| Користувач | `user@watch.com` | `password` |

Не використовуйте ці паролі у реальному проєкті.

## 3. Налаштування підключення

Відкрийте [`config.php`](../config.php) у корені сайту та вкажіть значення, які надав хостинг, у секції `db`: назву БД, логін, пароль і сервер БД. У `jwt_secret` задайте довгий випадковий рядок. Якщо фронтенд розміщено на іншому домені, замініть `cors_origin` з `*` на його повну адресу.

## 4. Запуск сервера

На хостингу нічого запускати не потрібно: після завантаження файлів відкрийте `https://ваш-домен/` або `https://ваш-домен/router.php`. Має з’явитися JSON із `"ChronoClassic API"`. API доступне за адресою `https://ваш-домен/api/v1`.

Для завантаження фото PHP повинен мати право запису до `public/uploads/products` (зазвичай це вже працює; якщо ні — встановіть права 775 через файловий менеджер хостингу).

## 5. Налаштування Postman

1. Створіть Collection `ChronoClassic API`.
2. У Collection variables додайте `baseUrl` зі значенням `https://ваш-домен/api/v1`.
3. Додайте ще `userToken` і `adminToken`; початкові значення залиште порожніми.
4. Для JSON-запитів встановлюйте `Body → raw → JSON` і заголовок `Content-Type: application/json`.
5. Для захищених endpoint-ів у вкладці **Authorization** виберіть `Bearer Token` і вкажіть `{{userToken}}` або `{{adminToken}}`.

### Отримання токена користувача

Створіть запит `POST {{baseUrl}}/auth/login`:

```json
{
  "login": "user@watch.com",
  "password": "password"
}
```

У вкладці **Tests** вставте:

```javascript
pm.collectionVariables.set('userToken', pm.response.json().token);
```

Після відправлення Postman збереже токен у `userToken`.

### Отримання токена адміністратора

Створіть запит `POST {{baseUrl}}/auth/admin/login`:

```json
{
  "email": "admin@watch.com",
  "password": "password"
}
```

У **Tests**:

```javascript
pm.collectionVariables.set('adminToken', pm.response.json().token);
```

## 6. Рекомендована послідовність тестування

1. `GET {{baseUrl}}/brands` — має повернути п’ять брендів.
2. `GET {{baseUrl}}/products?limit=12` — має повернути тестові годинники.
3. `GET {{baseUrl}}/products/1` — деталі одного товару. Якщо ID відрізняється, візьміть його з попередньої відповіді.
4. Виконайте user login, потім `GET {{baseUrl}}/auth/me` з `{{userToken}}`.
5. Створіть замовлення через `POST {{baseUrl}}/orders` із Bearer `{{userToken}}`:

```json
{
  "customer_name": "Тестовий Користувач",
  "phone": "+380501112233",
  "email": "user@watch.com",
  "comment": "Тестове замовлення",
  "items": [
    { "product_id": 1, "quantity": 1 }
  ]
}
```

Використайте справжній `product_id` із каталогу. Після успіху перевірте `GET {{baseUrl}}/orders`: нове замовлення має бути у списку, а залишок товару — зменшитись.

6. Виконайте admin login. Перевірте `GET {{baseUrl}}/admin/users` із Bearer `{{adminToken}}`.
7. Створіть бренд через `POST {{baseUrl}}/admin/brands`:

```json
{ "name": "Hamilton" }
```

8. Змініть статус створеного замовлення через `PATCH {{baseUrl}}/admin/orders/{id}/status`:

```json
{ "status": "В обробці" }
```

9. Перевірте відмову в доступі: повторіть адміністративний маршрут із `{{userToken}}`. Очікуваний статус — `403`.

## 7. Перевірка типових помилок

- Відсутній або недійсний токен на захищеному маршруті — `401`.
- Токен звичайного користувача на admin-маршруті — `403`.
- Повторний email/номер телефону під час реєстрації — `409`.
- Відсутні обов’язкові поля або невірний формат даних — `422`.
- Невідомий товар/замовлення/заявка — `404`.
- Кількість товару більша за складський залишок — `422`; замовлення не створюється.

Повний перелік маршрутів та форматів запитів доступний у [api-endpoints.md](api-endpoints.md).
