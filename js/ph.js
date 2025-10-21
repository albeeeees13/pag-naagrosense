// js/ph.js
const API_URL = '/api/api_lectura.php'; // RUTA DE TU API DE PHP

function llenarTablaHistorial(data) {
    const tbody = document.getElementById('ph-history-body');
    if (!tbody) return;

    // Limpiar contenido anterior
    tbody.innerHTML = ''; 

    // Recorrer los datos y crear filas (los datos vienen del más antiguo al más nuevo después del array_reverse en PHP)
    // Para la tabla, los mostramos del más nuevo al más antiguo (reverse)
    const reversedData = [...data].reverse();

    reversedData.forEach(item => {
        const row = tbody.insertRow();
        const cellDate = row.insertCell();
        const cellPH = row.insertCell();

        // Formato simple de fecha para la tabla
        cellDate.textContent = item.timestamp.replace(' ', ' '); 
        cellPH.textContent = parseFloat(item.ph).toFixed(2);
    });
}

function cargarDatosYGraficarPH() {
    fetch(API_URL)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al conectar con la API: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            if (data.length === 0) {
                document.getElementById('graficaPH').textContent = 'No hay datos de pH disponibles.';
                return;
            }

            // Llenar la tabla de historial
            llenarTablaHistorial(data);

            // Preparar datos para la Gráfica
            const timestamps = data.map(item => item.timestamp);
            const ph_values = data.map(item => parseFloat(item.ph));
            
            const ctx = document.getElementById('graficaPH').getContext('2d');
            
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: timestamps, 
                    datasets: [{
                        label: 'Nivel de pH del Suelo',
                        data: ph_values,
                        borderColor: 'rgb(75, 192, 192)',
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        tension: 0.1,
                        fill: true
                    }]
                },
                options: {
                    responsive: true,
                    scales: {
                        y: { min: 4, max: 9, title: { display: true, text: 'PH' } }
                    }
                }
            });
        })
        .catch(error => {
            console.error('Error al cargar datos de pH:', error);
            document.getElementById('graficaPH').textContent = 'Error al cargar los datos: ' + error.message;
        });
}

document.addEventListener('DOMContentLoaded', cargarDatosYGraficarPH);