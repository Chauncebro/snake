<?php
session_start();
$m = new MongoClient(); // connect
$db = $m->selectDB("snake");
$collection = $db->users;

$user = $_POST['username'];
$password = $_POST['password'];

$cryptword = password_hash($password, PASSWORD_BCRYPT);

$document = array(
    "user" => $user,
    "password" => $cryptword
    );

$collection->insert($document);
echo "inserted";

?>