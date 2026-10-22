<?php

function find_order($pdo, $id) { $s=$pdo->prepare('SELECT * FROM orders WHERE id = ?'); $s->execute(array($id)); $order=$s->fetch(); if (!$order) error_response('Замовлення не знайдено.',404); return $order; }
function order_response($pdo, $order)
{
    $s=$pdo->prepare('SELECT oi.product_id,p.title,oi.quantity,oi.price_at_purchase FROM order_items oi JOIN products p ON p.id=oi.product_id WHERE oi.order_id=?'); $s->execute(array($order['id'])); $items=array(); foreach($s->fetchAll() as $item) $items[]=array('product_id'=>(int)$item['product_id'],'title'=>$item['title'],'quantity'=>(int)$item['quantity'],'price_at_purchase'=>(float)$item['price_at_purchase']);
    return array('id'=>(int)$order['id'],'user_id'=>$order['user_id']===null?null:(int)$order['user_id'],'customer'=>array('name'=>$order['customer_name'],'phone'=>$order['phone'],'email'=>$order['email']),'comment'=>$order['comment'],'status'=>$order['status'],'total_price'=>(float)$order['total_price'],'items'=>$items,'created_at'=>iso_date($order['created_at']));
}
