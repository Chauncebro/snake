<?php
session_start();
$username = $_POST['username'];
$password = $_POST['password'];
$theLogin = False; 

$m = new MongoClient(); // connect
$db = $m->selectDB("snake");

$db->setReadPreference(MongoClient::RP_SECONDARY_PREFERRED);
$c = $db->users;

$cursor = $c->find();

$data = array();

foreach($cursor as $id => $score){
    if($score["user"] == $username){
        if(password_verify($password, $score["password"])){
            $_SESSION['username'] = $username;
			$theLogin = True;
        }
    }
}

if( $theLogin){
	$_SESSION['username'] = $username;
	$_SESSION['token'] = substr(md5(rand()), 0, 10);
 
	echo json_encode(array(
		"success" => true,
		"token" => $_SESSION['token'],
		"user" => $username
	));
	exit;
}else{
	echo json_encode(array(
		"success" => false,
	));
	exit;
}

echo json_encode($data);

?>