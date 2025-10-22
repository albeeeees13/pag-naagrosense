<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');

// Configuración de base de datos
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "agrosense_db";

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    echo json_encode([
        'error' => true,
        'mensaje' => 'Error de conexión: ' . $conn->connect_error
    ]);
    exit();
}

// Consulta SQL
$sql = "SELECT * FROM lecturas_sensores ORDER BY timestamp DESC LIMIT 10";
$result = $conn->query($sql);

if (!$result) {
    echo json_encode([
        'error' => true,
        'mensaje' => 'Error en la consulta: ' . $conn->error
    ]);
    exit();
}

// Preparar respuesta
$response = [];

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $response[] = $row;
    }
    echo json_encode([
        'error' => false,
        'datos' => $response,
        'total' => $result->num_rows
    ]);
} else {
    echo json_encode([
        'error' => false,
        'mensaje' => 'No hay datos en la tabla',
        'datos' => []
    ]);
}

$conn->close();
?>