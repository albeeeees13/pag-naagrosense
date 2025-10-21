// js/temperatura.js
const API_URL = '/api/api_lectura.php'; // RUTA DE TU API DE PHP

function llenarTablaHistorial(data) {
    const tbody = document.getElementById('temperatura-history-body');
    if (!tbody) return;

    // Limpiar contenido anterior
    tbody.innerHTML = ''; 

    // Mostrar datos del más nuevo al más antiguo para el historial
    const reversedData = [...data].reverse();

    reversedData.forEach(item => {
        const row = tbody.insertRow();
        const cellDate = row.insertCell();
        const cellTemperatura = row.insertCell();

        cellDate.textContent = item.timestamp.replace(' ', ' '); 
        cellTemperatura.textContent = parseFloat(item.temperatura).toFixed(2);
    });
}

function cargarDatosYGraficarTemperatura() {
    fetch(API_URL)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al conectar con la API: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            if (data.length === 0) {
                document.getElementById('graficaTemperatura').textContent = 'No hay datos de temperatura disponibles.';
                return;
            }

            // Llenar la tabla de historial
            llenarTablaHistorial(data);

            // Preparar datos para la Gráfica
            const timestamps = data.map(item => item.timestamp);
            const temperaturas = data.map(item => parseFloat(item.temperatura));
            
            const ctx = document.getElementById('graficaTemperatura').getContext('2d');
            
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: timestamps, 
                    datasets: [{
                        label: 'Temperatura (°C)',
                        data: temperaturas,
                        borderColor: 'rgb(255, 99, 132)', // Rojo
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        tension: 0.3,
                        fill: true
                    }]
                },
                options: {
                    responsive: true,
                    scales: {
                        y: { 
                            beginAtZero: false,
                            title: { display: true, text: 'Temperatura (°C)' } 
                        }
                    }
                }
            });
        })
        .catch(error => {
            console.error('Error al cargar datos de temperatura:', error);
            document.getElementById('graficaTemperatura').textContent = 'Error al cargar los datos: ' + error.message;
        });
}

document.addEventListener('DOMContentLoaded', cargarDatosYGraficarTemperatura);