<?php 
include_once('../index.php');
include_once('../classes/comments.php');

$comment = new backend\Comment($database->getConnection());
$response = null;

$method = ($_SERVER['REQUEST_METHOD']);


switch ($method) {

  case 'POST':
    # code...
    $_POST = json_decode(file_get_contents('php://input'), true);
    $response = $comment->createComment($_POST['post_id'], $_POST['user_id'], $_POST['body']);
    break;
  case 'DELETE':
    # code...
    $_POST = json_decode(file_get_contents('php://input'), true);
    $response = $comment->deleteComment($_POST['id']);
    break;
}

header('Content-Type: application/json');

echo $response;

