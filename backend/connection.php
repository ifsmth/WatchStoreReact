<?php

/* Єдине підключення до MySQL для всього проєкту. */
$config = require __DIR__ . '/config.php';
$db = $config['db'];

try {
    $dsn = 'mysql:host=' . $db['host'] . ';port=' . $db['port']
        . ';dbname=' . $db['name'] . ';charset=' . $db['charset'];
    $pdo = new PDO($dsn, $db['user'], $db['password'], array(
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ));
} catch (PDOException $exception) {
    header('Content-Type: application/json; charset=utf-8');
    http_response_code(500);
    echo json_encode(array('error' => 'Не вдалося підключитися до бази даних.'), JSON_UNESCAPED_UNICODE);
    exit;
}
