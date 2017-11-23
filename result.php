<?php
$data = $_POST;

ob_start();
var_dump($data);
$result = ob_get_clean();

$text = date('H:i:s d-m-Y').PHP_EOL.$result;
file_put_contents('result.txt', $text, FILE_APPEND)
?>