<?php 
namespace backend;

class Post {
  private $database = null;
 
  public function __construct($database)
  {
    $this->database = $database;
  }

  public function getPosts() {
    $query = "SELECT * FROM post";
    $result = $this->database->query($query);
    $posts = array();
    while ($row = $result->fetch_assoc()) {
      $posts[] = $row;
    }
    return json_encode($posts);
  }

  public function getPost($id) {
    $query = "SELECT * FROM post WHERE id_post = " . $id;
    $result = $this->database->query($query);
    $post = $result->fetch_assoc();
    return json_encode($post);
  }

  public function createPost($user_id, $title, $body) {
    $query = "INSERT INTO post(user_id, title, body) VALUES ('$user_id', '$title', '$body')";
    $result = $this->database->query($query);
    return json_decode($result);
  }

  public function updatePost($id, $user_id, $title, $body) {
    $query = "UPDATE post SET user_id = '$user_id', title = '$title', body = '$body' WHERE id = " . $id;
    $result = $this->database->query($query);
    return json_decode($result);
  }

  public function deletePost($id) {
    $query = "DELETE FROM post WHERE id = " . $id;
    $result = $this->database->query($query);
    return json_decode($result);
  }

  public function getComments($post_id) {
    $query = "SELECT * FROM comment WHERE post_id = " . $post_id;
    $result = $this->database->query($query);
    $comments = array();
    while ($row = $result->fetch_assoc()) {
      $comments[] = $row;
    }
    return json_encode($comments);
  }
}
