const alertPlaceholder = document.getElementById('liveAlertPlaceholder');
const appendAlert = (message, type) => {
  const wrapper = document.createElement('div')
  wrapper.innerHTML = [
    `<div class="alert alert-${type} alert-dismissible" role="alert">`,
    `   <div>${message}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    '</div>'
  ].join('')
  alertPlaceholder.append(wrapper)
}

const alertTrigger = document.getElementById('btnEnviar')
if (alertTrigger) {
  alertTrigger.addEventListener('click', () => {
    appendAlert('Todavía no implementado', 'success')
  })
}

//Colas: Crea una cola para simular el orden de llegada de los pacientes en la página de contacto.
const colaPacientes = (pacientes, paciente) =>{
  pacientes.push(paciente);
  console.log(`Paciente agregado: ${paciente}`);
};

const btnRegistrarLlegada = document.getElementById('btnRegistrarLlegada');
btnRegistrarLlegada.addEventListener('click', function() {
  const alertColaPacientes = document.getElementById('alertCola');
  const rNombre   = document.getElementById('rNombrePaciente').value;
  const pacientes = [];
  colaPacientes(pacientes, rNombre);
  alertColaPacientes.innerHTML = `El próximo es: ${pacientes.shift()}`;
});
