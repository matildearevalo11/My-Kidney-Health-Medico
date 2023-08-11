document.addEventListener('DOMContentLoaded', function() {
  const pacienteInfo = document.getElementById('pacienteInfo');
  const prescripcionInfo = document.getElementById('prescripcionInfo');
  const seguimientoData = document.getElementById('seguimientoData');

  // Obtener los datos del paciente
  fetch('ruta-del-backend/paciente')
    .then(response => response.json())
    .then(data => {
      // Mostrar los datos del paciente en el contenedor correspondiente
      pacienteInfo.innerHTML = `
        <p>Nombre: ${data.nombre}</p>
        <p>Documento: ${data.documento}</p>
        <p>Fecha de nacimiento: ${data.fecha}</p>
        <p>EPS: ${data.eps}</p>
        <p>Estatura: ${data.estatura}</p>
        <p>Edad: ${data.edad}</p>
        <p>Tipo de sangre: ${data.tiposangre}</p>
        <p>Rh: ${data.rh}</p>
        <p>Dirección: ${data.direccion}</p>
        <p>Teléfono: ${data.telefono}</p>
        <p>Ocupación: ${data.ocupacion}</p>
      `;
    });

// Obtener la prescripción de la diálisis
fetch('ruta-del-backend/prescripcion')
.then(response => response.json())
.then(data => {
  // Obtener el contenedor de la prescripción
  const prescripcionContainer = document.getElementById('prescripcion-container');

  // Crear elementos HTML para mostrar los datos de la prescripción
  const fechaDesde = document.createElement('p');
  fechaDesde.textContent = `Fecha desde: ${data.fechaDesde}`;
  const fechaHasta = document.createElement('p');
  fechaHasta.textContent = `Fecha hasta: ${data.fechaHasta}`;
  const cantidadRecambios = document.createElement('p');
  cantidadRecambios.textContent = `Cantidad de recambios: ${data.cantidadRecambios}`;
  const concentracion = document.createElement('p');
  concentracion.textContent = `Concentración: ${data.concentracion}`;
  const volumen = document.createElement('p');
  volumen.textContent = `Volumen: ${data.volumen}`;
  const promedioRecambios = document.createElement('p');
  promedioRecambios.textContent = `Promedio de recambios: ${data.promedioRecambios}`;
  const promedioUltrafiltracion = document.createElement('p');
  promedioUltrafiltracion.textContent = `Promedio de ultrafiltración: ${data.promedioUltrafiltracion}`;
  const diasAnalizados = document.createElement('p');
  diasAnalizados.textContent = `Días analizados: ${data.diasAnalizados}`;

  // Agregar los elementos al contenedor de la prescripción
  prescripcionContainer.appendChild(fechaDesde);
  prescripcionContainer.appendChild(fechaHasta);
  prescripcionContainer.appendChild(cantidadRecambios);
  prescripcionContainer.appendChild(concentracion);
  prescripcionContainer.appendChild(volumen);
  prescripcionContainer.appendChild(promedioRecambios);
  prescripcionContainer.appendChild(promedioUltrafiltracion);
  prescripcionContainer.appendChild(diasAnalizados);
});

// Obtener el seguimiento
fetch('ruta-del-backend/seguimiento')
  .then(response => response.json())
  .then(data => {
    // Crear la fila de cabecera de la tabla de seguimiento
    const headerRow = document.createElement('tr');
    const headers = ['Fecha', 'Hora', 'Contracción', 'Drenaje', 'Balance', 'Total de Ultrafiltrado'];

    headers.forEach(headerText => {
      const headerCell = document.createElement('th');
      headerCell.textContent = headerText;
      headerRow.appendChild(headerCell);
    });

    seguimientoData.appendChild(headerRow);

    // Mostrar los datos de seguimiento en la tabla correspondiente
    data.forEach(seg => {
      const row = document.createElement('tr');
      const fechaCell = document.createElement('td');
      fechaCell.textContent = seg.fecha;
      const horaCell = document.createElement('td');
      horaCell.textContent = seg.hora;
      const contraccionCell = document.createElement('td');
      contraccionCell.textContent = seg.contraccion;
      const drenajeCell = document.createElement('td');
      drenajeCell.textContent = seg.drenaje;
      const balanceCell = document.createElement('td');
      balanceCell.textContent = seg.balance;
      const ultrafiltradoCell = document.createElement('td');
      ultrafiltradoCell.textContent = seg.totalUltrafiltrado;

      row.appendChild(fechaCell);
      row.appendChild(horaCell);
      row.appendChild(contraccionCell);
      row.appendChild(drenajeCell);
      row.appendChild(balanceCell);
      row.appendChild(ultrafiltradoCell);

      seguimientoData.appendChild(row);
    });
  });
  
  // Obtener referencia a los botones de modificar y eliminar
var btnModificar = document.getElementById('btn-modificar');
var btnEliminar = document.getElementById('btn-eliminar');

// Agregar evento de clic al botón de modificar
btnModificar.addEventListener('click', function() {
  // Obtener el identificador del paciente
  var pacienteId = obtenerPacienteIdDesdeURL();

  // Redireccionar a la página de modificación del paciente con el identificador como parámetro
  window.location.href = 'modificar-paciente.html?documento=' + pacienteId;
});

  // Función para ocultar un paciente
function ocultarPaciente(pacienteId) {
  // Obtener la fila del paciente por su identificador
  var filaPaciente = document.getElementById('paciente-' + pacienteId);

  // Ocultar la fila estableciendo la propiedad display en 'none'
  filaPaciente.style.display = 'none';
}
// Agregar evento de clic al botón de eliminar
btnEliminar.addEventListener('click', function() {
  // Obtener el identificador del paciente
  var pacienteId = obtenerPacienteIdDesdeURL();

  // Ocultar el paciente en lugar de eliminarlo
  ocultarPaciente(pacienteId);
});

});
