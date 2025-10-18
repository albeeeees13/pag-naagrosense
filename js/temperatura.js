const tempData = [
  { fecha: "2025-10-16 10:00", valor: 24.5 },
  { fecha: "2025-10-16 09:45", valor: 24.3 },
  { fecha: "2025-10-16 09:30", valor: 24.1 },
  { fecha: "2025-10-16 09:15", valor: 24.0 },
  { fecha: "2025-10-16 09:00", valor: 23.8 }
];

const tempCtx = document.getElementById('tempChart').getContext('2d');
new Chart(tempCtx, {
  type: 'line',
  data: {
    labels: tempData.map(d => d.fecha),
    datasets: [{
      label: 'Temperatura (°C)',
      data: tempData.map(d => d.valor),
      borderColor: '#dc3545',
      backgroundColor: 'rgba(220,53,69,0.2)',
      fill: true,
      tension: 0.3
    }]
  },
  options: {
    responsive: true,
    scales: {
      y: { min: 0, max: 50 }
    }
  }
});

const tempTbody = document.getElementById('tempTable');
tempTbody.innerHTML = tempData.map(d => `
  <tr>
    <td>${d.fecha}</td>
    <td>${d.valor}</td>
  </tr>
`).join('');
