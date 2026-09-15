# Магазин наручних годинників

Каталог обладнання для навчальних проєктів.
Поточний результат: початкова сторінка з локальними даними.

## Середовище

Node.js: v24.21.0
npm: 11.19.0
Git: 2.45.2.windows.1
Docker і Docker Compose: 27.2.0
Основний варіант: Магазин наручних годинниківі

## Запуск

Нативно: npm install, потім npm run dev.
Docker: docker compose build,
docker compose run --rm web npm install,
потім docker compose up.
Адреса Docker: http://localhost:5173.
Зупинення й видалення контейнера: docker compose down.

## Збірка

npm run build
Або: docker compose run --rm web npm run build

## План

Див. docs/project-plan.md.
Форми й маршрути ще заплановані.
