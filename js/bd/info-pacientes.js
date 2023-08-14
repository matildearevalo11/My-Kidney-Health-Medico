document.addEventListener('DOMContentLoaded', function() {
  const pacienteInfo = document.getElementById('pacienteInfo');
  const prescripcionInfo = document.getElementById('prescripcionInfo');
  const seguimientoData = document.getElementById('seguimientoData');

  let servidorAPI="http://localhost:8081/";
  const urlParams = new URLSearchParams(window.location.search);
    const cedulEncriptad = urlParams.get('cedula');
    console.log(cedulEncriptad);
    const cedulaPac=decodeURIComponent(cedulEncriptad);
    let cedulEncript = CryptoJS.AES.decrypt(cedulaPac, 'clave_secreta').toString(CryptoJS.enc.Utf8);
console.log(cedulEncript);
let obtenerCedulaEncriptada=async()=>{
  const peticion= await fetch(servidorAPI+'Medico/findAllPacientes',{
    method:'GET',
    headers:{
      "Accept":"application/json",
      "Content-Type": "application/json"
    }
      });
      const pacientes=await peticion.json();
      console.log(pacientes);
      let cedulaEncriptada="";
      pacientes.forEach(paciente=>{
        let decryptedCedula = CryptoJS.AES.decrypt(paciente.cedula, 'clave_secreta').toString(CryptoJS.enc.Utf8);
        const cedulaCodificado = decodeURIComponent(decryptedCedula);
        console.log(decryptedCedula);
        if(cedulEncript===cedulaCodificado)
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
let fechaNacimiento= paciente.fechaNacimiento.split("T")[0];
console.log(fechaNacimiento);
let edad= calcularEdad(fechaNacimiento);
console.log(edad);
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
      <div class="col-md-4">
      <p><b>Nombre:</b> ${nombre}</p>
      </div>
      <div class="col-md-4">
      <p><b>Documento:</b> ${cedula}</p>
      </div>
      <div class="col-md-4">
      <p><b>Fecha de nacimiento:</b> ${paciente.fechaNacimiento.split("T")[0]}</p>
      </div>
      </div>

      <div class="row">
        <div class="col-md-4">
      <p><b>EPS:</b> ${eps}</p>
      </div>
      <div class="col-md-4">
      <p><b>Estatura:</b> ${paciente.altura} cms.</p>
      </div>
      <div class="col-md-4">
      <p><b>Edad:</b> ${edad} años</p>
      </div>
      </div>
      <div class="row">
        <div class="col-md-4">
      <p><b>Grupo de sanguíneo:</b> ${tipoSangre} ${paciente.rh}</p>
      </div>
      <div class="col-md-4">
      <p><b>Dirección:</b> ${direccion}</p>
      </div>
    </div>
    <div class="row">
      <div class="col-md-4">
      <p><b>Teléfono:</b> ${celular}</p>
      </div>
      <div class="col-md-4">
      <p><b>Ocupación:</b> ${ocupacion}</p>
      </div>
      </div>

      `;
}
//llenarInfoPaciente();

function calcularEdad(nacimiento) {
  console.log(nacimiento);
  const fechaNacimiento = new Date(nacimiento);
  console.log(fechaNacimiento);
  const fechaActual = new Date();
  console.log(fechaActual);
  const edadMilisegundos = fechaActual - fechaNacimiento;
  console.log(edadMilisegundos);
  const edad = new Date(edadMilisegundos).getFullYear() - 1970;
  console.log(edad);
return edad;
}



// Obtener la prescripción de la diálisis
let llenarInfoPrescripcion=async()=>{
  let cedulaPaciente= await obtenerCedulaEncriptada();
  let paciente ={
    cedula:cedulaPaciente
  }
  const peticion= await fetch(servidorAPI+"paciente/prescripcion/prescripcionActual",{
    method:"POST",
    headers: {
      "Accept":"application/json",
  "Content-Type":"application/json"
    },
    body: JSON.stringify(paciente)
  });
  const prescripcionContainer = document.getElementById('prescripcionInfo');
  const prescripcion=await peticion.json();
  console.log(prescripcion);
  console.log(prescripcion.unionPrescripcionDiasRecambios);
  // Crear elementos HTML para mostrar los datos de la prescripción
  const fechaDesde = document.createElement('p');
  fechaDesde.textContent = `Fecha Inicio: ${prescripcion.cita.fecha.split("T")[0]}`;
  const fechaHasta = document.createElement('p');
  fechaHasta.textContent = `Fecha finalización: ${prescripcion.cita.fechaFin.split("T")[0]}`;
  const recambios= prescripcion.unionPrescripcionDiasRecambios;
  recambios.forEach(recambio=>{
    let concentracion=recambio.recambios;
    console.log(concentracion)
    let diasActivos = "";
    console.log(recambio.prescripcionDia);
// Iterar a través de los días de la semana y verificar si son true
for (const dia in recambio.prescripcionDia) {
  if (dia !== 'cita' && dia !== 'idPrescripcionDia') {
    if (recambio.prescripcionDia[dia]) {
      diasActivos+=dia+", ";
    }
  }
}


console.log(diasActivos);
  console.log(recambio.recambios.concentracion);
  const cantidadRecambios = document.createElement('p');
  cantidadRecambios.textContent = `Cantidad de recambios: ${diasActivos}`;
  prescripcionContainer.appendChild(cantidadRecambios);
  const concentracionElement = document.createElement('p');
  concentracionElement.textContent = `Concentración: ${recambio.concentracion}`;
  prescripcionContainer.appendChild(concentracionElement);
})
  const concentracion = document.createElement('p');
  concentracion.textContent = `Concentración: ${prescripcion.concentracion}`;
  const volumen = document.createElement('p');
  volumen.textContent = `Volumen: 2000 c.c`;
  const promedioRecambios = document.createElement('p');
  promedioRecambios.textContent = `Promedio de recambios: ${prescripcion.promedioRecambios}`;
  const promedioUltrafiltracion = document.createElement('p');
  promedioUltrafiltracion.textContent = `Promedio de ultrafiltración: ${prescripcion.promedioUltrafiltracion}`;
  const diasAnalizados = document.createElement('p');
  diasAnalizados.textContent = `Días analizados: ${prescripcion.diasAnalizados}`;

  // Agregar los elementos al contenedor de la prescripción
  prescripcionContainer.appendChild(fechaDesde);
  prescripcionContainer.appendChild(fechaHasta);
  
  prescripcionContainer.appendChild(concentracion);
  prescripcionContainer.appendChild(volumen);
  prescripcionContainer.appendChild(promedioRecambios);
  prescripcionContainer.appendChild(promedioUltrafiltracion);
  prescripcionContainer.appendChild(diasAnalizados);
};
llenarInfoPrescripcion();
});
/*
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

