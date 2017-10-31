<?php
$session_start();

$m = new MongoClient(); // connect
$db = $m->selectDB("snake");
$collection = $db->scores;

$user = $_SESSION['username'];
$score = $_POST['score'];

$document = array(
    "user" => $user,
    "score" => $score
    );

$collection->insert($document);
echo "inserted";

?>