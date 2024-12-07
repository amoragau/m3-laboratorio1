const showMedicos = (medicosAll) => {
  console.log(JSON.stringify(medicosAll, null, 2));
  const medicosOri    = [...medicosAll]; //clonacion
  const medicos       = medicosOri.filter(medico => !medico.destacado); //busqueda
  const listaMedicos  = document.getElementById('medicos');
  const rowElement    = document.createElement('div');
  rowElement.classList.add('row');
  rowElement.classList.add('section__list');
  rowElement.classList.add('medicos__list');
  listaMedicos.appendChild(rowElement);
  medicos.sort((a, b) => b.añosExperiencia - a.añosExperiencia);  //ordenamiendo
  medicos.forEach(medico => {
    const { nombre, especialidad, añosExperiencia, disponibilidad, id} = medico;
    console.log(showInfoMedico(medico));
    const medicoElement = document.createElement('div');
    medicoElement.classList.add('col');
    medicoElement.classList.add('section__item');
    //medicoElement.classList.add('card');
    medicoElement.classList.add('medicos__item');
    medicoElement.innerHTML  = `
      <div class="card-body">
        <h5 class="card-title">${nombre}- ${especialidad}</h5>
        <p><strong>Años de Experiencia:</strong> ${añosExperiencia}</p>
      </div>`;
      rowElement.appendChild(medicoElement);
  });
}
const showInfoMedico = (medico) =>{
  const { nombre, especialidad, añosExperiencia} = medico;
  return (`${nombre}, especialidad: ${especialidad}, ${añosExperiencia} años de experiencia`);
};

const medicos = [
  {
    "id": 1,
    "nombre": "Dr. Juan Pérez",
    "especialidad": "Cardiología",
    "añosExperiencia": 15,
    "disponibilidad": {
      "lunes": ["09:00-13:00", "15:00-18:00"],
      "miércoles": ["09:00-13:00", "15:00-18:00"],
      "viernes": ["09:00-13:00"]
    },
    "destacado": true
  },
  {
    "id": 2,
    "nombre": "Dra. María González",
    "especialidad": "Dermatología",
    "añosExperiencia": 10,
    "disponibilidad": {
      "martes": ["08:00-14:00"],
      "jueves": ["08:00-14:00"],
      "sábado": ["10:00-13:00"]
    },
    "destacado": true
  },
  {
    "id": 3,
    "nombre": "Dr. Carlos Rodríguez",
    "especialidad": "Cirugía General",
    "añosExperiencia": 20,
    "disponibilidad": {
      "lunes": ["14:00-20:00"],
      "miércoles": ["14:00-20:00"],
      "viernes": ["14:00-20:00"]
    },
    "destacado": false
  },
  {
    "id": 4,
    "nombre": "Dr. Carlos Ulloa",
    "especialidad": "Cirugía General",
    "añosExperiencia": 7,
    "disponibilidad": {
      "lunes": ["14:00-20:00"],
      "miércoles": ["14:00-20:00"],
      "viernes": ["14:00-20:00"]
    },
    "destacado": false
  },
  {
    "id": 5,
    "nombre": "Dr. Felipe Urenda",
    "especialidad": "Cirugía General",
    "añosExperiencia": 2,
    "disponibilidad": {
      "lunes": ["14:00-20:00"],
      "miércoles": ["14:00-20:00"],
      "viernes": ["14:00-20:00"]
    },
    "destacado": false
  } 
];
const especialidades = [
  {
    "id": 1,
    "nombre": "Cardiología",
    "descripcion": "Especialidad que se ocupa de las enfermedades del corazón y del aparato circulatorio.",
    "subespecialidades": [
      "Cardiología intervencionista",
      "Electrofisiología cardíaca",
      "Ecocardiografía"
    ]
  },
  {
    "id": 2,
    "nombre": "Neurología",
    "descripcion": "Especialidad médica que trata los trastornos del sistema nervioso.",
    "subespecialidades": [
      "Neurología vascular",
      "Neurología pediátrica",
      "Neurofisiología clínica"
    ]
  },
  {
    "id": 3,
    "nombre": "Pediatría",
    "descripcion": "Especialidad médica que estudia al niño y sus enfermedades.",
    "subespecialidades": [
      "Neonatología",
      "Pediatría del desarrollo",
      "Gastroenterología pediátrica"
    ]
  },
  {
    "id": 4,
    "nombre": "Cirugía General",
    "descripcion": "Especialidad que abarca operaciones del aparato digestivo, sistema endocrino y otras áreas.",
    "subespecialidades": [
      "Cirugía laparoscópica",
      "Cirugía oncológica",
      "Cirugía de trauma"
    ]
  },
  {
    "id": 5,
    "nombre": "Dermatología",
    "descripcion": "Especialidad médica encargada del estudio de la piel, su estructura, función y enfermedades.",
    "subespecialidades": [
      "Dermatología",
      "Dermatología oncológica",
      "Cirugía dermatológica"
    ]
  }
];
//showMedicos(medicos);

// Fusionar médicos con sus respectivas especialidades
const mergedData = especialidades.map(especialidad => {
  // Filtramos los médicos que coinciden con la especialidad
  const medicosEspecialidad = medicos.filter(medico => medico.especialidad === especialidad.nombre);
  // Devolvemos la especialidad con los médicos correspondientes
  return {
    ...especialidad,
    medicos: medicosEspecialidad
  };
});
console.log(JSON.stringify(mergedData, null, 2));
// Agregar, eliminar y buscar en arreglo

const arrMedicos = ["Dr. Juan Lopez","Dra. María González","Dr. Juan Pérez","Dr. Carlos Rodríguez"];
const agregarMedicos = (arreglo, nuevo) =>{
  arreglo.push(nuevo);
  console.log(`Médico ${nuevo} agregado con éxito.`);
}
const eliminarMedico = (arreglo, nombre) => {
  const index = arreglo.indexOf(nombre);
  if (index !== -1) {
    arreglo.splice(index, 1);
    console.log(`Médico ${nombre} eliminado con éxito.`);
  } else {
    console.log(`No se encontró al médico ${nombre}.`);
  }
}
const buscarMedico = (arreglo, nombre) => {
  const medicoEncontrado = arreglo.find(medico => medico.toLowerCase().includes(nombre.toLowerCase()));
  if (medicoEncontrado) {
    console.log(`Médico encontrado: ${medicoEncontrado}`);
    return medicoEncontrado;
  } else {
    console.log(`No se encontró ningún médico que coincida con "${nombre}".`);
    return null;
  }
}
agregarMedicos(arrMedicos, "Dr. Felipe Urenda");
eliminarMedico(arrMedicos, "Dr. Juan Lopez");
buscarMedico(arrMedicos, "Juan");



// Pilas: Implementa una pila para gestionar las citas de los pacientes (última cita agendada, próxima cita a atender, etc.).
const citasPacientes = [];
const addCita = (citasPacientes, cita) =>{
  citasPacientes.push(cita);
  console.log(`La última cita agendada es: ${cita}`);
};

const nextCita = (citasPacientes) =>{
  console.log(`La próxima cita a atender es ${citasPacientes.pop()}`);
}

addCita(citasPacientes, 'Cita 1');
addCita(citasPacientes, 'Cita 2');
addCita(citasPacientes, 'Cita 3');
nextCita(citasPacientes);

