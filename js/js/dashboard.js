// js/dashboard.js
const API_URL = '/Agrosense/api/api_lectura.php';

function dibujarGrafica(canvasId, labels, dataSet, labelText, borderColor, backgroundColor, minY, maxY) {
    const ctx = document.getElementById(canvasId).getContext('2d');
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: labelText,
                data: dataSet,
                borderColor: borderColor,
                backgroundColor: backgroundColor,
                tension: 0.3,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                y: {
                    min: minY, 
                    max: maxY, 
                    beginAtZero: false,
                    title: {
                        display: true,
                        text: labelText
                    }
                },
                x: {
                    display: false 
                }
            },
            plugins: {
                legend: { display: false },
                title: { display: false }
            }
        }
    });
}


function cargarDashboardData() {
    fetch(API_URL)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al conectar con la API: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            if (data.length === 0) {
                document.querySelector('.dashboard-grid').innerHTML = '<p style="text-align:center;">No hay datos disponibles.</p>';
                return;
            }

            // Preparar los datos
            const timestamps = data.map(item => item.timestamp);
            const temperaturas = data.map(item => parseFloat(item.temperatura));
            const humedades = data.map(item => parseFloat(item.humedad));
            const ph_values = data.map(item => parseFloat(item.ph));

            // 1. Dibujar Gráfica de Temperatura
            dibujarGrafica('graficaDashboardTemperatura', timestamps, temperaturas, 'Temperatura (°C)', 'rgb(255, 99, 132)', 'rgba(255, 99, 132, 0.2)', 15, 35);

            // 2. Dibujar Gráfica de Humedad
            dibujarGrafica('graficaDashboardHumedad', timestamps, humedades, 'Humedad del Suelo (%)', 'rgb(54, 162, 235)', 'rgba(54, 162, 235, 0.2)', 20, 100);

            // 3. Dibujar Gráfica de PH
            dibujarGrafica('graficaDashboardPH', timestamps, ph_values, 'Nivel de pH', 'rgb(75, 192, 192)', 'rgba(75, 192, 192, 0.2)', 4, 9);
        })
        .catch(error => {
            console.error('Error general al cargar el dashboard:', error);
            document.querySelector('.dashboard-grid').innerHTML = '<p style="color:red; text-align:center;">Error al cargar datos del servidor.</p>';
        });
}

document.addEventListener('DOMContentLoaded', cargarDashboardData);