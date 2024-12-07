# Laboratorio 1

Este proyecto implementa funcionalidades avanzadas en JavaScript para mejorar la gestión de datos en el sitio web de un hospital. A continuación, se detallan las principales características y componentes del proyecto.


## Página de inicio 📋

```
index.html
```

## Desarrollo evaluación:

## 1. Manejo de Objetos JSON

  ### a) Se implementaun objeto json en `js/medicos.js` y se utilizan objetos aninados:


  ```javascript
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
  // ... otros datos
  ]
  ```
  Utiliza destructuring para acceder a las propiedades de estos objetos y mostrar la información de un doctor específico en la consola y en la interfaz web.

  Por consola;
  ```javascript
  console.log(showInfoMedico(medico));
  const showInfoMedico = (medico) =>{
    const { nombre, especialidad, añosExperiencia} = medico;
    return (`${nombre}, especialidad: ${especialidad}, ${añosExperiencia} años de experiencia`);
  };
  // ... resto del código
  ```
  En medicos.html, dentro de `<section>` se crear un elemento `<div>` para mostrar la información:
  ```html
  <section id="medicos" class="section">
    //
  </section>
  ```

  ```javascript
  const showMedicos = (medicosAll) => {
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
  // ... resto del código
  ```
## 2. Operaciones con JSON

  ### a) Clonación usando el operador de propagación (...)
  ```javascript
  const medicosOri    = [...medicosAll]; //clonacion
  // ... resto del código
  ```

  ### b) Merge
  ```javascript
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
  console.log(mergedData);
  // ... resto del código
  ```

  - Mapeo de especialidades: Se utiliza map() para recorrer el arreglo especialidades. Para cada especialidad, se buscan los médicos correspondientes usando filter().

  - Filtrado de médicos: Dentro del map(), se utiliza filter() para seleccionar solo aquellos médicos cuya propiedad especialidad coincida con el nombre de la especialidad actual.

  - Fusión de los datos: Por cada especialidad, se agrega la propiedad medicos, que contiene los médicos correspondientes.

  ### c) Recorrido y stringify

  Dentro de la función `showMedicos(medicos);` en el archivo `js/medicos.js` se realiza el recorrido del objeto json:

  ```javascript
  const showMedicos = (medicosAll) => {
    console.log(JSON.stringify(medicosAll, null, 2)); //muestra por consola el objeto convertido en cadena
    //codigo
    medicos.forEach(medico => {
    //codigo
    }
    //llamada de la función
  }
  showMedicos(medicos);
  // ... resto del código
  ```

## 3. Implementación de Estructuras de Datos

### a) Arreglos: Utiliza un arreglo para almacenar la lista de doctores. Implementa operaciones como agregar, eliminar y buscar doctores dentro del arreglo.

Se implementa en el archivo `js/medicos.js`:
```javascript
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
// ... resto del código
```
### b) Pilas: Implementa una pila para gestionar las citas de los pacientes (última cita agendada, próxima cita a atender, etc.).

Se implementa en el archivo `js/medicos.js`:
```javascript
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
// ... resto del código
```

### c) Colas: Crea una cola para simular el orden de llegada de los pacientes en la página de contacto.

Se implementa en el archivo `js/contacto.js` y en `contacto.html`:

En `contacto.html` se define un formulario para ingresar el paciente según el orden de llegada:

```html
<section id="pacientes" class="section">
  <h3>Registro de llegada pacientes:</h3>
  <form action="" method="post" class="contact__form">	
    <div class="mb-3">
      <label for="rNombre" class="form-label">Nombre paciente<span class="requerido">*</span></label>
      <input type="text" name="rNombrePaciente" id="rNombrePaciente" required placeholder="Escribe el nombre del paciente" class=" form-control form-control-lg contact__form-input">
    </div>
    <div class="d-grid gap-2">
      <div id="alertCola"></div>
      <button type="button" name="enviar_formulario" id="btnRegistrarLlegada" class="btn btn-green-hospital2">Registrar llegada</button>
    </div>
    <p class="aviso">
      <span class="requerido"> * </span>Los campos son obligatorios.
    </p>					
  </form>
</section>
```

En `js/contacto.js` se implementa un listener para el boton `btnRegistrarLlegada` del formulario, cuando se ingresa un nuevo paciente este se agrega a la cola `pacientes`:


```javascript
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

// ... resto del código
```

## 4. Programación de Algoritmos

### a) Algoritmo de búsqueda:

Se implementa el algoritmo de búsqueda en un array `find()`en el archivo `js/medicos.js`:
```javascript
const arrMedicos = ["Dr. Juan Lopez","Dra. María González","Dr. Juan Pérez","Dr. Carlos Rodríguez"];
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
buscarMedico(arrMedicos, "Juan");
// ... resto del código
```
`fin()`
Devuelve el primer elemento que cumple la condición, si no encuentra nada, devuelve undefined. Detiene la búsqueda una vez encuentra el primer elemento.

Uso especifico:
- Busca en el array de médicos
- medico.toLowerCase() convierte cada nombre a minúsculas.
- .includes(nombre.toLowerCase()) busca si el nombre está contenido.
- Permite búsquedas parciales (no requiere nombre completo).

### b) Algoritmo de ordenamiento:

En el archivo `js/medicos.js` dentro de la funcion `showMedicos()` se utiliza el algoritmo de ordenamiento sort:
```javascript
const showMedicos = (medicosAll) => {
  // ... código anterior
  medicos.sort((a, b) => b.añosExperiencia - a.añosExperiencia);  //ordenamiendo
  // ... resto del código
}
// ... resto del código
```

El método sort() permite ordenar los elementos de un array. En este caso, se está utilizando una función de comparación como argumento para ordenar los médicos por sus años de experiencia de mayor a menor:

**Estructura básica**:
```javascript
array.sort((a, b) => valor_comparación)
```
La función de comparación recibe dos elementos (a y b) del array


**Lógica de la comparación**:
```javascript
b.añosExperiencia - a.añosExperiencia
```
Significa ordenar de mayor a menor, si el resultado es:
 - Positivo: b se coloca antes que a
 - Negativo: a se coloca antes que b
 - Cero: el orden se mantiene igual

### c) Explica  la complejidad de los algoritmos utilizados, aplicando conceptos de Big-O y complejidad ciclomática :

La complejidad de los algoritmos utilizados para los métodos `find()` y `sort()`, es la siguiente:

### Función buscarMedico (usando find())

### Complejidad temporal (Big-O):
- O(n), donde n es el número de elementos en el arreglo `arrMedicos`.
- En el peor caso, `find()` recorre todo el arreglo para encontrar una coincidencia o determinar que no existe.

### Complejidad ciclomática:
- 2, ya que hay dos caminos de ejecución posibles (médico encontrado o no encontrado).

## Función showMedicos (usando sort())

### Complejidad temporal (Big-O) para sort():
- O(n log n), donde n es el número de elementos en el arreglo `medicos`.
- JavaScript utiliza típicamente un algoritmo de ordenamiento eficiente como QuickSort o MergeSort, que tienen una complejidad promedio de O(n log n).

### Complejidad ciclomática para sort():
- 1, ya que la función de comparación utilizada en `sort()` tiene un solo camino de ejecución.

Es importante notar que la función `showMedicos` realiza varias operaciones además del ordenamiento, como filtrado y manipulación del DOM, que también contribuyen a su complejidad general. Sin embargo, el `sort()` es típicamente la operación más costosa en términos de complejidad temporal.


## Recursos ✒️

* [unDraw](https://undraw.co)
* [DALL-E](https://openai.com/index/dall-e-3/)
* [perplexity](https://www.perplexity.ai)


  
## Autor
Desarrollado Ana Moraga.