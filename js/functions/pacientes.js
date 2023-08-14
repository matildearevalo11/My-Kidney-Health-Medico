
var cedulaEncriptada= "";


let pacientesTratados = async () => {
  let cont = 1;
  try {
    // Call listarPacientes and await its result
    const pacientes = await listarPacientes();

    let msg = "";
    if (pacientes != null && pacientes.length > 0) {
      
      msg += '<br>' +
        '<table class="pacientes">' +
        '<thead>' +
        '<tr>' +
        '<th>Nombre</th>' +
        '<th>Cédula</th>' +
        '<th>Acciones</th>' +
        '</tr>'+
        '</thead>';

      pacientes.forEach((paciente) => {
        
        localStorage.setItem("cedulaPaciente", paciente.cedula);
        msg +=
          '<tr>' +
          '<td>' + paciente.nombre + '</td>' +
          '<td>' + paciente.cedula + '</td>' +
          '<td>' +
          '<a href="principal.html?cedula='+encodeURIComponent(CryptoJS.AES.encrypt(paciente.cedula, "clave_secreta").toString())+'"class="icon-link" onclick="llenarInfoPaciente() type="button">' +
          '<img src="../img/ver.png" class="actualizar"/>' +
          '</a>' +
          '<a href="info-pacientes.html" type="button">' +
          '<img src="../img/editar.png" class="actualizar"/>' +
          '</a>'+
          '<a href="pacientes.html" data-bs-toggle="modal" data-bs-target="#inhabilitarpaciente" type="button">' +
          '<img src="../img/inhabilitar.png" class="actualizar"/>' +
          '</a>' +
          '</td>' +
          '</tr>'+
          '<div>' +
          '<div class="modal" tabindex="-1" id="inhabilitarpaciente">' +
          '<div class="modal-dialog">' +
          '<div class="modal-content">' +
          '<div class="modal-header">' +
          '<h5 class="modal-title">Eliminar Alergia</h5>' +
          '<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>' +
          '</div>' +
          '<div class="modal-body">' +
          '<p>¿Está seguro(a) de eliminar esta alergia?</p>' +
          '<label class="nombreAlergia" id="nombreAlergia">NOMBRE PACIENTE</label>' +
          '</div>' +
          '<div class="modal-footer">' +
          '<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>' +

          '<button type="submit"  onclick="" class="btn btn-danger">Inhabilitar</button>' +
          '</div>' +
          '</div>' +
          '</div>' +
          '</div>' +
          '</div>' +
          '<div>' ;
      });
    } else {
      msg += '<br>' +
        '<table class="pacientes">' +
        '<thead>' +
        '<tr>' +
        '<th>Nombre</th>' +
        '<th>Cédula</th>' +
        '<th>Acciones</th>' +
        '</tr>' +
        '</thead>' +
        '<tr>' +
        '<td colspan="3">' + "No hay pacientes Registrados" + '</td>' +
        '</tr>';
    }
    msg += '</table>';
    document.getElementById("pacientes").innerHTML = msg;
  } catch (error) {
    console.error("Error in pacientesTratados:", error);
  }
};


let pacientesInhabilitados = async () => {
  let cont = 1;
  try {
    // Call listarPacientes and await its result
    const pacientes = await listarPacientesInactivos();

    let msg = "";
    if (pacientes != null && pacientes.length > 0) {
      
      msg += '<br>' +
        '<table class="pacientes">' +
        '<thead>' +
        '<tr>' +
        '<th>Nombre</th>' +
        '<th>Cédula</th>' +
        '<th>Acciones</th>' +
        '</tr>'+
        '</thead>';

      pacientes.forEach((paciente) => {
        
        localStorage.setItem("cedulaPaciente", paciente.cedula);
        msg +=
          '<tr>' +
          '<td>' + paciente.nombre + '</td>' +
          '<td>' + paciente.cedula + '</td>' +
          '<td>' +
          '<a href="" data-bs-toggle="modal" data-bs-target="#inhabilitarpaciente" type="button">' +
          '<img src="../img/actualizar.png" class="actualizar"/>' +
          '</a>' +
          '</td>' +
          '</tr>';
      });
    } else {
      msg += '<br>' +
        '<table class="pacientes">' +
        '<thead>' +
        '<tr>' +
        '<th>Nombre</th>' +
        '<th>Cédula</th>' +
        '<th>Acciones</th>' +
        '</tr>' +
        '</thead>' +
        '<tr>' +
        '<td colspan="3">' + "No hay pacientes inhabilitados" + '</td>' +
        '</tr>';
    }
    msg += '</table>';
    document.getElementById("pacientesinhabilitados").innerHTML = msg;
  } catch (error) {
    console.error("Error in pacientesTratados:", error);
  }
};
// Call the pacientesTratados function to populate the table
pacientesTratados();
pacientesInhabilitados();