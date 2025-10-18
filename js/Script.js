const sensorData = [
  { fecha: "2025-10-16 10:00", ph: 6.8, temperatura: 24.5, humedad: 55 },
  { fecha: "2025-10-16 09:45", ph: 6.9, temperatura: 24.3, humedad: 56 },
  { fecha: "2025-10-16 09:30", ph: 7.0, temperatura: 24.1, humedad: 54 },
];

function mostrarUltimasMediciones() {
  const ultimas = sensorData[0];
  const tarjetas = [
    { titulo: "PH", valor: ultimas.ph, icono: "vial", bg: "info" },
    { titulo: "Temperatura (°C)", valor: ultimas.temperatura, icono: "temperature-half", bg: "warning" },
    { titulo: "Humedad (%)", valor: ultimas.humedad, icono: "droplet", bg: "success" },
  ];
  const contenedor = document.getElementById("latestReadings");
  contenedor.innerHTML = tarjetas.map(t => `
    <div class="col-md-4">
      <div class="card text-white bg-${t.bg} card-metric">
        <div class="card-body d-flex align-items-center">
          <i class="fas fa-${t.icono} fa-2x me-3"></i>
          <div>
            <h5 class="card-title mb-0">${t.valor}</h5>
            <small>${t.titulo}</small>
          </div>
        </div>
      </div>
    </div>
  `).join('');
}

document.getElementById("menu-toggle").addEventListener("click", function () {
  document.getElementById("sidebar-wrapper").classList.toggle("d-none");
});

mostrarUltimasMediciones();
