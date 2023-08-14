
var cedulaEncriptada= "";


let obtenerCedulaEncriptada=async(cedulEncript)=>{
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
        msg +=
          '<tr>' +
          '<td>' + paciente.nombre + '</td>' +
          '<td>' + paciente.cedula + '</td>' +
          '<td>' +
          '<a href="info-pacientes.html?cedula='+encodeURIComponent(CryptoJS.AES.encrypt(paciente.cedula, "clave_secreta").toString())+'" class="icon-link" onclick="llenarInfoPaciente() type="button">' +
          '<img src="../img/logo.jpg" class="actualizar"/>' +
          '</a>' +
          '</td>' +
          '</tr>';
          
            msg +=
              '<div class="modal" tabindex="-1" id="inhabilitarpaciente' + cont + '">' +
              '<div class="modal-dialog">' +
              '<div class="modal-content">' +
              '<div class="modal-header">' +
              '<h5 class="modal-title">Inhabilitar Paciente</h5>' +
              '<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>' +
              '</div>' +
              '<div class="modal-body">' +
              '<p><b>¿Está seguro(a) de inhabilitar este paciente?</b></p>' +
              '<label class="cedulaPaciente" id="cedulaPaciente"><b>Cédula: </b>'+paciente.cedula+'</label><br>' +
              '<label class="cedulaPaciente" id="cedulaPaciente"><b>Nombre: </b>'+paciente.nombre+'</label>' +
              '</div>' +
              '<div class="modal-footer">' +
              '<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>' +
              '<button type="submit" onclick="inhabilitarPaciente(' + paciente.cedula + ')"" class="btn btn-danger">Inhabilitar</button>' +
              '</div>' +
              '</div>' +
              '</div>' +
              '</div>';
              
            cont++; // Increment the counter for modal IDs
          });
        } else {
          msg +=
            '<br>' +
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
          '<a href=""  type="button">' +
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

// let inhabilitarPaciente = async (ced) => {
//   let pacienteInDto;
//   const pacientes = await listarPacientes();
//   pacientes.forEach((paciente) => {
//    pacienteInDto = { cedula: ced };
// });

//   fetch(localStorage.getItem("servidorAPI" + "Medico/inhabilitarPaciente", {
//     method: "PATCH",
//     headers: {
//       "Accept": "application/json",
//       "Content-Type": "application/json"
//     },
//     body: JSON.stringify(pacienteInDto)
//   })
  

//     .then(response => {
//       console.log(response)
//       if (response.ok) {
//         $('#inhabilitarpaciente' + ced).modal('hide');
//         location.reload();
//       }
//     })
//     .catch(error => {
//       console.error(error);
//     })
//   );
  

// }

let inhabilitarPaciente = async (ced) => {
  let cedEncriptada = CryptoJS.AES.encrypt(ced, 'clave_secreta').toString();
  console.log(cedEncriptada)
  let cedulaEncriptada = await obtenerCedulaEncriptada(cedEncriptada);
  console.log(cedulaEncriptada)
  try {  
    const pacienteInDto = { cedula: cedulaEncriptada };
    console.log(pacienteInDto)

    const response = await fetch(servidorAPI+'Medico/inhabilitarPaciente', {
      method: "PATCH",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(pacienteInDto)
  });

    if (response.ok) {
      $('#inhabilitarpaciente' + cedulaEncriptada).modal('hide');
      //location.reload();
    } else {
      console.error("Error al inhabilitar paciente:", response.status);
    }
  } catch (error) {
    console.error("Error al inhabilitar paciente:", error);
  }
};

// Call the pacientesTratados function to populate the table
pacientesTratados();
inhabilitarPaciente();
pacientesInhabilitados();