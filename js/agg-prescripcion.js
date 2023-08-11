let listarPacientes= async()=>{
    const peticion= await fetch("http://localhost:8081/Medico/findAllPacientes",{
      method:"GET",
      headers:{
        "Accept":"application/json",
        "Content-Type":"application/json"
      }
    });
    const pacients=await peticion.json();
    console.log(pacients);
    let select=document.getElementById("paciente");
    pacients.forEach(function(paciente) {
        const option = document.createElement('option');
        option.value = paciente.cedula;
        option.text = paciente.nombre +" - "+ paciente.cedula;
        select.appendChild(option);
        
      });

}
listarPacientes();


class PrescripcionForm {
    constructor() {
      this.form = document.getElementById("agg-prescripcion-form");
      this.form.addEventListener("submit", this.handleSubmit.bind(this));
    }
  
    handleSubmit(event) {
      event.preventDefault();
      const tiempoTranscurrido = Date.now();
      const hoy = new Date(tiempoTranscurrido);
      if (this.validateForm()) {
        const prescripcionCita={
            prescripcion:{
        orificioSalida:this.getValue("Orificio"),
        nocheSeca:this.getCheckedValue("noche")
        },
        cita:{
            fecha:hoy,
            paciente:this.getValue("paciente"),
            medico:"1193098415"
        }
    }
  
        this.guardarPrescripcion(prescripcionCita);
      }
    }
  
    validateForm() {
      let isValid = true;
  
      const requiredFields = ["Orificio","noche"];
  
      requiredFields.forEach(field => {
        const value = this.getValue(field);
  
        if (!value) {
          isValid = false;
          this.setFieldError(field, "Campo obligatorio");
        } else {
          this.clearFieldError(field);
        }
      });
  
      return isValid;
    }
  
    getValue(fieldId) {
      const field = document.getElementById(fieldId);
      console.log(fieldId);
      return field.value.trim();
    }
  
    getCheckedValue(fieldId) {
      const field = document.getElementById(fieldId);
      return field.checked ? "true" : "false";
    }
  
    setFieldError(fieldId, errorMessage) {
      const field = document.getElementById(fieldId);
      const errorElement = field.nextElementSibling;
      errorElement.textContent = errorMessage;
      field.classList.add("error");
    }
  
    clearFieldError(fieldId) {
      const field = document.getElementById(fieldId);
      const errorElement = field.nextElementSibling;
      field.classList.remove("error");
    }
  
    guardarPrescripcion(prescripcionCita) {
        console.log(prescripcionCita)
     //REEMPLAZAR BACKEND 
      fetch("http://localhost:8081/Medico/prescripcion/crearPrescripcion/", {
        method: "POST",
        body: JSON.stringify(prescripcionCita),
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        const successMessage = document.getElementById("success-message");
        successMessage.style.display = "block";
        pacienteForm.form.style.display = "none";

      })
      .catch(error => {
        console.error(error);
      });
    }
  }
  
  const prescripcionForm = new PrescripcionForm();
  