// js/humedad.js
const API_URL = '/api/api_lectura.php'; // RUTA DE TU API DE PHP

function llenarTablaHistorial(data) {
    const tbody = document.getElementById('humedad-history-body');
    if (!tbody) return;

    // Limpiar contenido anterior
    tbody.innerHTML = ''; 

    // Mostrar datos del más nuevo al más antiguo para el historial
    const reversedData = [...data].reverse();

    reversedData.forEach(item => {
        const row = tbody.insertRow();
        const cellDate = row.insertCell();
        const cellHumedad = row.insertCell();

        cellDate.textContent = item.timestamp.replace(' ', ' '); 
        cellHumedad.textContent = parseFloat(item.humedad).toFixed(2);
    });
}

function cargarDatosYGraficarHumedad() {
    fetch(API_URL)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al conectar con la API: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            if (data.length === 0) {
                document.getElementById('graficaHumedad').textContent = 'No hay datos de humedad disponibles.';
                return;
            }

            // Llenar la tabla de historial
            llenarTablaHistorial(data);

            // Preparar datos para la Gráfica
            const timestamps = data.map(item => item.timestamp);
            const humedades = data.map(item => parseFloat(item.humedad));
            
            const ctx = document.getElementById('graficaHumedad').getContext('2d');
            
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: timestamps, 
                    datasets: [{
                        label: 'Humedad del Suelo (%)',
                        data: humedades,
                        borderColor: 'rgb(54, 162, 235)', // Azul
                        backgroundColor: 'rgba(54, 162, 235, 0.2)',
                        tension: 0.3,
                        fill: true
                    }]
                },
                options: {
                    responsive: true,
                    scales: {
                        y: { 
                            min: 20, 
                            max: 100,
                            title: { display: true, text: 'Humedad (%)' }
                        }
                    }
                }
            });
        })
        .catch(error => {
            console.error('Error al cargar datos de humedad:', error);
            document.getElementById('graficaHumedad').textContent = 'Error al cargar los datos: ' + error.message;
        });
}

document.addEventListener('DOMContentLoaded', cargarDatosYGraficarHumedad);