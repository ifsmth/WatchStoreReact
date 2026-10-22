<?php

/*
 * Налаштування для shared hosting.
 * Змініть лише якщо хостинг видав інші параметри бази даних.
 */
return array(
    'db' => array(
        'host' => 'localhost',
        'port' => 3306,
        'name' => 'testreactwatchshop',
        'user' => 'testreactw',
        'password' => 'tR7edE3rjN5g',
        'charset' => 'utf8mb4',
    ),
    'jwt_secret' => 'change-this-secret-before-production-chrono-classic',
    'cors_origin' => '*',
);
