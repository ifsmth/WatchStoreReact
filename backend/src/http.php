<?php

function configure_cors()
{
    header('Content-Type: application/json; charset=utf-8');
    // Public API: allow requests from any frontend origin.
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Authorization');
    header('Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS');
}

function request_method()
{
    return isset($_SERVER['REQUEST_METHOD']) ? $_SERVER['REQUEST_METHOD'] : 'GET';
}

function handle_preflight_request()
{
    configure_cors();
    if (request_method() === 'OPTIONS') {
        http_response_code(204);
        exit;
    }
}

function request_path()
{
    $uri = isset($_SERVER['REQUEST_URI']) ? $_SERVER['REQUEST_URI'] : '/';
    $path = parse_url($uri, PHP_URL_PATH);
    $path = $path ? $path : '/';
    $path = preg_replace('#^/(?:backend/)?(?:index|router)\\.php#', '', $path);
    // When this project is deployed in the /backend folder, REQUEST_URI still
    // includes that folder. The route table itself starts at /api/v1.
    $path = preg_replace('#^/backend(?=/|$)#', '', $path);
    return rtrim($path, '/') ?: '/';
}

function json_body()
{
    $raw = file_get_contents('php://input');
    if (!$raw) {
        return array();
    }
    $body = json_decode($raw, true);
    if (!is_array($body)) {
        error_response('Тіло запиту має бути коректним JSON.');
    }
    return $body;
}

function json_response($data, $status = 200)
{
    configure_cors();
    http_response_code($status);
    if ($status !== 204) {
        echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    }
    exit;
}

function error_response($message, $status = 400, $details = array())
{
    $payload = array('error' => $message);
    if ($details !== array()) {
        $payload['details'] = $details;
    }
    json_response($payload, $status);
}

function database_error_response($exception)
{
    $status = $exception->getCode() === '23000' ? 409 : 500;
    error_response($status === 409 ? 'Конфлікт даних.' : 'Помилка бази даних.', $status);
}
