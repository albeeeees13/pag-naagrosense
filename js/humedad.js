const humData = [
  { fecha: "2025-10-16 10:00", valor: 55 },
  { fecha: "2025-10-16 09:45", valor: 56 },
  { fecha: "2025-10-16 09:30", valor: 54 },
  { fecha: "2025-10-16 09:15", valor: 53 },
  { fecha: "2025-10-16 09:00", valor: 52 }
];

const humCtx = document.getElementById('humedadChart').getContext('2d');
new Chart(humCtx, {
  type: 'line',
  data: {
    labels: humData.map(d => d.fecha),
    datasets: [{
      label: 'Humedad (%)',
      data: humData.map(d => d.valor),
      borderColor: '#20c997',
      backgroundColor: 'rgba(32,201,151,0.2)',
      fill: true,
      tension: 0.3
    }]
  },
  options: {
    responsive: true,
    scales: {
      y: { min: 0, max: 100 }
    }
  }
});

const humTbody = document.getElementById('humedadTable');
humTbody.innerHTML = humData.map(d => `
  <tr>
    <td>${d.fecha}</td>
    <td>${d.valor}</td>
  </tr>
`).join('');
