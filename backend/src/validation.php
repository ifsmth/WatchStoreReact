<?php

function require_fields($data, $fields)
{
    $details = array();
    foreach ($fields as $field) {
        if (!array_key_exists($field, $data) || $data[$field] === '') {
            $details[$field] = 'Обов’язкове поле.';
        }
    }
    if ($details !== array()) {
        error_response('Заповніть обов’язкові поля.', 422, $details);
    }
}

function require_valid_email($email)
{
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        error_response('Некоректний email.', 422);
    }
}

function iso_date($date)
{
    return $date === null ? null : gmdate('Y-m-d\\TH:i:s\\Z', strtotime($date));
}
