<?php
// --- LÍNEAS TEMPORALES PARA DEPURACIÓN DE PHP ---
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
// ---------------------------------------------------

// ¡REVISA Y REEMPLAZA ESTOS VALORES!
define('DB_SERVER', 'localhost');             
define('DB_USERNAME', 'root');                
define('DB_PASSWORD', '');                    
define('DB_NAME', 'tu_nombre_de_base_de_datos'); 
define('TABLE_NAME', 'lecturas_sensores'); 

// Si usaste el puerto 3307, cámbialo aquí:
// define('DB_SERVER', 'localhost:3307');

// Conexión a la base de datos
$conn = new mysqli(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);

// Verificar la conexión
if ($conn->connect_error) {
    // ESTE BLOQUE AHORA MOSTRARÁ EL ERROR ESPECÍFICO DE MYSQL
    die("❌ FATAL ERROR: Conexión fallida. Revisar credenciales o puerto. Mensaje: " . $conn->connect_error);
}

$conn->set_charset("utf8mb4"); 
?>