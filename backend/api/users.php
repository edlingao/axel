<?php 
include_once('../index.php');
include_once('../classes/user.php');

$user = new backend\User($database->getConnection());
$response = null;

$method = ($_SERVER['REQUEST_METHOD']);


switch ($method) {
  case 'GET':
    $id = $_GET['id']; 
    if($id == null) {
      $response = ($user->getUsers());
    } else {
      $response =  ($user->getUser($id));
    }
    break;
    
  case 'POST':
    # code...
    $_POST = json_decode(file_get_contents('php://input'), true);
    $user->register($_POST['name'], $_POST['email'], $_POST['password']);
    $response = ($user->login($_POST['email'], $_POST['password']));
    break;

  default:
    # code...
    break;
}

header('Content-Type: application/json');

echo $response;

