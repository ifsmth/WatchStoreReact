<?php

function product_response($pdo, $product)
{
    $statement = $pdo->prepare('SELECT id, image_url, is_main FROM product_images WHERE product_id = ? ORDER BY is_main DESC, id ASC');
    $statement->execute(array($product['id']));
    $images = array();
    foreach ($statement->fetchAll() as $image) $images[] = array('id' => (int) $image['id'], 'image_url' => $image['image_url'], 'is_main' => (bool) $image['is_main']);
    return array('id' => (int) $product['id'], 'brand_id' => $product['brand_id'] === null ? null : (int) $product['brand_id'], 'brand' => $product['brand'], 'title' => $product['title'], 'price' => (float) $product['price'], 'gender' => $product['gender'], 'mechanism' => $product['mechanism'], 'glass' => $product['glass'], 'strap_material' => $product['strap_material'], 'water_resistance' => $product['water_resistance'], 'stock' => (int) $product['stock'], 'description' => $product['description'], 'images' => $images, 'created_at' => iso_date($product['created_at']));
}
function find_product($pdo, $id)
{
    $statement = $pdo->prepare('SELECT p.*, b.name AS brand FROM products p LEFT JOIN brands b ON b.id = p.brand_id WHERE p.id = ?'); $statement->execute(array($id)); $product = $statement->fetch(); if (!$product) error_response('Товар не знайдено.', 404); return product_response($pdo, $product);
}
function product_input($input, $isCreate)
{
    if ($isCreate) require_fields($input, array('title', 'price'));
    if (isset($input['price']) && (!is_numeric($input['price']) || (float) $input['price'] < 0)) error_response('Некоректна ціна.', 422);
    if (isset($input['stock']) && (!is_numeric($input['stock']) || (int) $input['stock'] < 0)) error_response('Некоректний залишок.', 422);
    $data = array(); foreach (array('title','brand_id','price','gender','mechanism','glass','strap_material','water_resistance','stock','description') as $field) if (array_key_exists($field, $input)) $data[$field] = $input[$field]; return $data;
}
