<?php

$session_start();

$username = $_POST['username'];

$m = new MongoClient(); // connect
$db = $m->selectDB("snake");

$db->setReadPreference(MongoClient::RP_SECONDARY_PREFERRED);
$c = $db->scores;

$cursor = $c->find();

$data = array();

$dataT = array();

array_push($dataT, "0");
array_push($dataT, $username);
array_push($data, $dataT);

array_push($data,$dataT); 

foreach($cursor as $id => $score){
    if($score["user"] == $username){
        $dataT = array();
        array_push($dataT, $score["user"]);
        array_push($dataT, $score["score"]);
        array_push($data, $dataT);
}
}

echo json_encode($data);

?>