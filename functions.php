<?php

error_reporting(E_ALL);
ini_set('display_errors', '1');

$username = 'peron';
$password = 'password';

// DB connection
try {
	$db = new PDO('mysql:host=localhost;dbname=notify', $username, $password);
} catch (PDOException $e) {
	print "Error!: " . $e->getMessage() . "<br/>";
	die();
}

db_query($db, 'SET CHARACTER SET utf8');

// DB query
function db_query($database, $string, $values = NULL) {
	$temp_query = $database->prepare($string);

	if (is_null($values)) {
		$temp_query->execute();
	} else {
		$temp_query->execute($values);
	}
	return $temp_array = $temp_query->fetchAll(PDO::FETCH_ASSOC);
}


?>
