<?php

require_once dirname(__DIR__) . '/src/bootstrap.php';

handle_preflight_request();

try {
    dispatch_request($pdo, request_method(), request_path());
} catch (PDOException $exception) {
    database_error_response($exception);
} catch (Exception $exception) {
    error_log($exception->getMessage());
    error_response('Внутрішня помилка сервера.', 500);
}
