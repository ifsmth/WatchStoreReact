<?php
function show_product($pdo,$id){json_response(find_product($pdo,$id));}
function api_info($pdo){json_response(array('ok'=>true,'message'=>'ChronoClassic API','version'=>'v1'));}
function dispatch_request($pdo,$method,$path)
{
    $routes=array(
        'GET /'=>'api_info',
        'POST /api/v1/auth/register'=>'register_user',
        'POST /api/v1/auth/login'=>'login_user',
        'POST /api/v1/auth/admin/login'=>'login_admin',
        'GET /api/v1/auth/me'=>'current_account',
        'PUT /api/v1/users/me'=>'update_profile',
        'PUT /api/v1/users/me/password'=>'change_password',
        'GET /api/v1/admin/users'=>'list_users',
        'GET /api/v1/brands'=>'list_brands',
        'POST /api/v1/admin/brands'=>'create_brand',
        'GET /api/v1/products'=>'list_products',
        'POST /api/v1/admin/products'=>'create_product',
        'POST /api/v1/orders'=>'create_order',
        'GET /api/v1/orders'=>'list_orders',
        'POST /api/v1/applications'=>'create_application',
        'GET /api/v1/admin/applications'=>'list_applications'
    );
    $key=$method.' '.$path;
    if(isset($routes[$key])) call_user_func($routes[$key],$pdo);
    $patterns=array(
        array('DELETE','#^/api/v1/admin/brands/(\\d+)$#','delete_brand'),array('GET','#^/api/v1/products/(\\d+)$#','show_product'),array('PUT','#^/api/v1/admin/products/(\\d+)$#','update_product'),array('DELETE','#^/api/v1/admin/products/(\\d+)$#','delete_product'),array('POST','#^/api/v1/admin/products/(\\d+)/images$#','upload_product_image'),array('DELETE','#^/api/v1/admin/products/(\\d+)/images/(\\d+)$#','delete_product_image'),array('GET','#^/api/v1/orders/(\\d+)$#','show_order'),array('PATCH','#^/api/v1/admin/orders/(\\d+)/status$#','update_order_status'),array('PUT','#^/api/v1/admin/orders/(\\d+)$#','update_order_contacts'),array('DELETE','#^/api/v1/admin/orders/(\\d+)$#','delete_order'),array('PATCH','#^/api/v1/admin/applications/(\\d+)/status$#','update_application_status'),array('DELETE','#^/api/v1/admin/applications/(\\d+)$#','delete_application')
    );
    foreach($patterns as$route){if($method===$route[0]&&preg_match($route[1],$path,$matches)){array_shift($matches);$args=array($pdo);foreach($matches as$id)$args[]=(int)$id;call_user_func_array($route[2],$args);}}
    error_response('Маршрут не знайдено.',404);
}
