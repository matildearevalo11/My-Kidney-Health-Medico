 class PacienteForm {
    constructor() {
      this.form = document.getElementById("paciente-form");
      this.form.addEventListener("submit", this.handleSubmit.bind(this));
    }
  
    handleSubmit(event) {
      event.preventDefault();
  
      if (this.validateForm()) {
        const paciente = {
          nombre: this.getValue("nombre"),
          correo:"leider@gmail",
          contrasenia:"1234",
          cedula: this.getValue("documento"),
          fechaNacimiento: (this.getValue("fecha")+"T02:45:05.101Z"),
          eps: this.getValue("eps"),
          altura: this.getValue("estatura"),
          edad: this.getValue("edad"),
          tipoSangre: this.getValue("tiposangre"),
          rh: this.getValue("rh"),
          direccion: this.getValue("direccion"),
          celular: this.getValue("telefono"),
          ocupacion: this.getValue("ocupacion"),
          peso:2,
          pesoSeco:2
          //hipertension: this.getCheckedValue("hipertension"),
          //diabetes: this.getCheckedValue("diabetes")
        };
  
        this.guardarPaciente(paciente);
      }
    }
  
    validateForm() {
      let isValid = true;
  
      const requiredFields = ["nombre", "documento", "fecha", "eps", "estatura", "edad", "tiposangre", "rh", "direccion", "telefono", "ocupacion"];
  
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
      return field.value.trim();
    }
  
    getCheckedValue(fieldId) {
      const field = document.getElementById(fieldId);
      return field.checked ? "Sí" : "No";
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
  
    guardarPaciente(paciente) {
      console.log(paciente);
     //REEMPLAZAR BACKEND 
      fetch("http://localhost:8081/paciente/crearPaciente", {
        method: "POST",
        body: JSON.stringify(paciente),
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
  
  const pacienteForm = new PacienteForm();
  