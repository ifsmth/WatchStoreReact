<?php

function b64url_encode($value) { return rtrim(strtr(base64_encode($value), '+/', '-_'), '='); }
function b64url_decode($value) { return base64_decode(strtr($value, '-_', '+/')); }

function create_token($id, $role)
{
    global $config;
    $header = b64url_encode(json_encode(array('alg' => 'HS256', 'typ' => 'JWT')));
    $payload = b64url_encode(json_encode(array('id' => (int) $id, 'role' => $role, 'iat' => time(), 'exp' => time() + 86400)));
    $signature = b64url_encode(hash_hmac('sha256', $header . '.' . $payload, $config['jwt_secret'], true));
    return $header . '.' . $payload . '.' . $signature;
}

function authenticated_account($pdo)
{
    global $config;
    $header = isset($_SERVER['HTTP_AUTHORIZATION']) ? $_SERVER['HTTP_AUTHORIZATION'] : '';
    if (!preg_match('/^Bearer\\s+(.+)$/i', $header, $matches)) error_response('Потрібен Bearer token.', 401);
    $parts = explode('.', $matches[1]);
    if (count($parts) !== 3) error_response('Недійсний токен.', 401);
    $expected = b64url_encode(hash_hmac('sha256', $parts[0] . '.' . $parts[1], $config['jwt_secret'], true));
    $claims = json_decode(b64url_decode($parts[1]), true);
    if (!hash_equals($expected, $parts[2]) || !is_array($claims) || !isset($claims['id'], $claims['role'], $claims['exp']) || $claims['exp'] < time()) error_response('Недійсний або прострочений токен.', 401);
    if ($claims['role'] !== 'user' && $claims['role'] !== 'admin') error_response('Недійсний токен.', 401);
    $table = $claims['role'] === 'admin' ? 'admins' : 'users';
    $statement = $pdo->prepare('SELECT * FROM ' . $table . ' WHERE id = ?');
    $statement->execute(array((int) $claims['id']));
    $account = $statement->fetch();
    if (!$account) error_response('Користувача не знайдено.', 401);
    return array('role' => $claims['role'], 'data' => $account);
}

function require_user($pdo) { $account = authenticated_account($pdo); if ($account['role'] !== 'user') error_response('Доступ лише для користувача.', 403); return $account['data']; }
function require_admin($pdo) { $account = authenticated_account($pdo); if ($account['role'] !== 'admin') error_response('Доступ лише для адміністратора.', 403); return $account['data']; }

function public_account($account, $role)
{
    $result = array('id' => (int) $account['id'], 'email' => $account['email'], 'role' => $role, 'created_at' => iso_date($account['created_at']));
    if ($role === 'user') { $result['name'] = $account['name']; $result['phone_number'] = $account['phone_number']; }
    return $result;
}
