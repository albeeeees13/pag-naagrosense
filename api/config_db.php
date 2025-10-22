<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header('Content-Type: application/json; charset=utf-8');
// ¡REEMPLAZA ESTOS VALORES CON TUS CREDENCIALES REALES!
define('DB_SERVER', 'localhost');            
define('DB_USERNAME', 'root');                
define('DB_PASSWORD', '');                    
define('DB_NAME', 'agrosense_db'); 
define('TABLE_NAME', 'lecturas_sensores'); 

// Si usaste el puerto 3307, cámbialo aquí:
// define('DB_SERVER', 'localhost:3307');

// Conexión a la base de datos
$conn = new mysqli(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);

if ($conn->connect_error) {
    die("Error de conexión a la base de datos: " . $conn->connect_error);
}
$conn->set_charset("utf8mb4"); 
?>