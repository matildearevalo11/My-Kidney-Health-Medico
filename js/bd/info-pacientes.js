document.addEventListener('DOMContentLoaded', function() {
  const pacienteInfo = document.getElementById('pacienteInfo');
  const prescripcionInfo = document.getElementById('prescripcionInfo');
  const seguimientoData = document.getElementById('seguimientoData');

  let servidorAPI="http://localhost:8081/";
    const cedulaEncript =localStorage.getItem("cedulaPaciente");
    console.log(cedulaEncript); 
var cedulaEncriptada= "";

let obtenerCedulaEncriptada=async()=>{
  console.log(cedulaEncript);
  const peticion= await fetch(servidorAPI+'Medico/findAllPacientes',{
    method:'GET',
    headers:{
      "Accept":"application/json",
      "Content-Type": "application/json"
    }
      });
      const pacientes=await peticion.json();
      console.log(pacientes);
      pacientes.forEach(paciente=>{
        let decryptedCedula = CryptoJS.AES.decrypt(paciente.cedula, 'clave_secreta').toString(CryptoJS.enc.Utf8);
        const cedulaCodificado = decodeURIComponent(decryptedCedula);
        console.log(decryptedCedula);
        if(cedulaEncript===cedulaCodificado)
        cedulaEncriptada=paciente.cedula;
        
      })   
      console.log(cedulaEncriptada);
      return cedulaEncriptada;
}

let llenarInfoPaciente=async()=>{
let cedulaPaciente= await obtenerCedulaEncriptada();
let pacienteInDto ={
  cedula:cedulaPaciente
}
const peticion= await fetch(servidorAPI+"paciente/findPacienteByCedula",{
  method:"POST",
  headers: {
    "Accept":"application/json",
"Content-Type":"application/json"
  },
  body: JSON.stringify(pacienteInDto)
});
const paciente=await peticion.json();
console.log(paciente);

let nombre= CryptoJS.AES.decrypt(paciente.nombre, "clave_secreta").toString(CryptoJS.enc.Utf8);
let cedula= CryptoJS.AES.decrypt(paciente.cedula, "clave_secreta").toString(CryptoJS.enc.Utf8);
let eps= CryptoJS.AES.decrypt(paciente.eps, "clave_secreta").toString(CryptoJS.enc.Utf8);
let altura= CryptoJS.AES.decrypt(paciente.altura, "clave_secreta").toString(CryptoJS.enc.Utf8);
let tipoSangre= CryptoJS.AES.decrypt(paciente.tipoSangre, "clave_secreta").toString(CryptoJS.enc.Utf8);
let direccion= CryptoJS.AES.decrypt(paciente.direccion, "clave_secreta").toString(CryptoJS.enc.Utf8);
let celular= CryptoJS.AES.decrypt(paciente.celular, "clave_secreta").toString(CryptoJS.enc.Utf8);
let ocupacion= CryptoJS.AES.decrypt(paciente.ocupacion, "clave_secreta").toString(CryptoJS.enc.Utf8);
      // Mostrar los datos del paciente en el contenedor correspondiente
      pacienteInfo.innerHTML = `
        <div class="row">
        <div class="col-4">
        <p>Nombre: ${nombre}</p>
        </div>
        <div class="col-4">
        <p>Documento: ${cedula}</p>
        </div>
        <div class="col-4">
        <p>Fecha de nacimiento: ${paciente.fechaNacimiento.split("T")[0]}</p>
        </div>
        <div class="row">
        <div class="col-4">
        <p>EPS: ${eps}</p>
        </div>
        <div class="col-4">
        <p>Estatura: ${paciente.altura} cms.</p>
        </div>
        <div class="col-4">
        <p>Edad: ${paciente.edad}</p>
        </div>
        <div class="row">
        <div class="col-4">
        <p>Tipo de sangre: ${tipoSangre}</p>
        </div>
        <div class="col-4">
        <p>Rh: ${paciente.rh}</p>
        </div>
        <div class="col-4">
        <p>Dirección: ${direccion}</p>
        </div>
        <div class="row">
        <div class="col-4">
        <p>Teléfono: ${celular}</p>
        </div>
        <div class="col-4">
        <p>Ocupación: ${ocupacion}</p>
        </div>
        </div>
      `;
}
llenarInfoPaciente();

});

// Obtener la prescripción de la diálisis
/*fetch('ruta-del-backend/prescripcion')
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
}

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

});*/

