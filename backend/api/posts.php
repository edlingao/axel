<?php 
include_once('../index.php');
include_once('../classes/post.php');

$post = new backend\Post($database->getConnection());
$response = null;

$method = ($_SERVER['REQUEST_METHOD']);


switch ($method) {

  case 'GET': 
    $id = $_GET['id']; 
    if($id == null) {
      $response = $post->getPosts();
    } else {
      $response = $post->getPost($id);
    }
    break;

  case 'POST':
    # code...
    $_POST = json_decode(file_get_contents('php://input'), true);
    $response = $post->createPost($_POST['user_id'], $_POST['title'], $_POST['body']);
    break;
  case 'DELETE':
    # code...
    $_POST = json_decode(file_get_contents('php://input'), true);
    $response = $post->deletePost($_POST['id']);
    break;
}

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: *");
header('Access-Control-Allow-Methods:*');
header("Allow: GET, POST, OPTIONS, PUT, DELETE");

echo $response;

