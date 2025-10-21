// js/graficas.js (o dentro de una etiqueta <script> en tu HTML)

function cargarDatosYGraficar() {
    fetch('URL_DE_TU_SERVIDOR/api_lectura.php') // Llama a tu API de Backend
        .then(response => response.json())
        .then(data => {
            // 1. PREPARAR DATOS
            const timestamps = data.map(item => item.timestamp);
            const temperaturas = data.map(item => parseFloat(item.temperatura));
            
            // 2. CREAR LA GRÁFICA (usando Chart.js)
            const ctx = document.getElementById('graficaTemperatura').getContext('2d');
            
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: timestamps, // Eje X: Tiempo
                    datasets: [{
                        label: 'Temperatura (°C)',
                        data: temperaturas, // Eje Y: Valores
                        borderColor: 'rgb(255, 99, 132)',
                        tension: 0.1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: false
                        }
                    }
                }
            });
        })
        .catch(error => console.error('Error al obtener datos:', error));
}

// Llamar a la función cuando la página cargue
cargarDatosYGraficar();