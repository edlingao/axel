<?php 
include_once('../index.php');
include_once('../classes/user.php');

$user = new backend\User($database->getConnection());
$response = null;

$method = ($_SERVER['REQUEST_METHOD']);


switch ($method) {

  case 'POST':
    # code...
    $_POST = json_decode(file_get_contents('php://input'), true);
    $response = $user->login($_POST['email'], $_POST['password']);
    header('access-token: '.$response);
    break;
}

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: *");
header('Access-Control-Allow-Methods:*');
header("Allow: GET, POST, OPTIONS, PUT, DELETE");

echo $response;
