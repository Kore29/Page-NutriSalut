// Obtener referencias a los elementos del formulario
let nom_opcioInput = document.getElementById('nom_opcio');
let tipus_opcioInput = document.getElementById('tipus_opcio');
let contigutInput = document.getElementById('contigut');
let descripcio_opcioInput = document.getElementById('descripcio_opcio');
let createOpcioBtn = document.getElementById('create-opcio-btn');

// Agregar evento al botón
createOpcioBtn.addEventListener('click', createOpcio);

// Función para crear una opción
function createOpcio() {
    // Crear el objeto con los datos del formulario
    var OpcioData = {
        nom_opcio: nom_opcioInput.value,
        tipus_opcio: tipus_opcioInput.value,
        contigut: contigutInput.value,
        descripcio_opcio: descripcio_opcioInput.value
    };

    // Enviar los datos a la API con fetch
    fetch('http://localhost:3000/preguntas', { // Ajusta la URL según tu configuración del servidor
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(OpcioData)
    })
        .then(function(response) {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Error en la solicitud: ' + response.status);
            }
        })
        .then(function(data) {
            Swal.fire({
                title: '¡Opción creada con éxito!',
                icon: 'success',
                showConfirmButton: false,
                timer: 1500
            });
            console.log('Respuesta del servidor:', data);

            // Refrescar la lista de opciones después de crear
            if (typeof getAllOpcions === 'function') {
                getAllOpcions();
            }
        })
        .catch(function(error) {
            console.error('Error al crear la opción:', error);
            Swal.fire({
                title: 'No se pudo crear la opción. Revisa la consola para más detalles.',
                icon: 'error',
                showConfirmButton: true,
                timer: 1500
            });
        });
}

// Función para obtener todas las opciones del servidor y mostrarla en la lista
function getAllOpcions() {
    fetch('http://localhost:3000/preguntas') // Ajusta la URL según tu configuración del servidor
        .then(function(response) {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Error en la solicitud: ' + response.status);
            }
        })
        .then(function(data) {
            // Usar innerHTML para agregar los elementos en la lista
            const opcionesList = document.getElementById('opciones-list');
            opcionesList.innerHTML = ''; // Limpiar la lista antes de agregar nuevos elementos

            data.forEach(function(opcio) {
                let row = `
                    <tr>
                        <td>${opcio.id}</td>
                        <td>${opcio.nom_opcio}</td>
                        <td>${opcio.tipus_opcio}</td>
                        <td>${opcio.contigut}</td>
                        <td>${opcio.descripcio_opcio}</td>
                        <td>
                            <button class="btn btn-primary px-2" onclick="updateOpcio(${opcio.id})">Renombrar</button>
                            <button class="btn btn-primary px-2" onclick="deleteOpcio(${opcio.id})">Eliminar</button>
                        </td>
                    </tr>
                `;
                opcionesList.innerHTML += row; // Insertar la fila en la tabla
            });
        })
        .catch(function(error) {
            console.error('Error al obtener las opciones:', error);
            Swal.fire({
                title: 'No se pudieron obtener las opciones. Revisa la consola para más detalles.',
                icon: 'error',
                showConfirmButton: true,
                timer: 1500
            });
        });
}

// Función para actualizar una opción
function updateOpcio(id) {
    // Obtener los valores actuales de la opción y permitir editarlos
    let opcio = prompt("Ingresa el nuevo nombre de la opción:");
    
    if (opcio) {
        fetch(`http://localhost:3000/preguntas/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nom_opcio: opcio
            })
        })
        .then(response => {
            if (response.ok) {
                Swal.fire({
                    title: '¡Opción actualizada con éxito!',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1500
                });
                getAllOpcions(); // Refrescar la lista
            } else {
                throw new Error('Error al actualizar la opción');
            }
        })
        .catch(error => {
            console.error(error);
            Swal.fire({
                title: 'Error al actualizar la opción.',
                icon: 'error',
                showConfirmButton: true,
                timer: 1500
            });
        });
    }
}

// Función para eliminar una opción
function deleteOpcio(id) {
    fetch(`http://localhost:3000/preguntas/${id}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (response.ok) {
            Swal.fire({
                title: '¡Opción eliminada con éxito!',
                icon: 'success',
                showConfirmButton: false,
                timer: 1500
            });
            getAllOpcions(); // Refrescar la lista
        } else {
            throw new Error('Error al eliminar la opción');
        }
    })
    .catch(error => {
        console.error(error);
        Swal.fire({
            title: 'Error al eliminar la opción.',
            icon: 'error',
            showConfirmButton: true,
            timer: 1500
        });
    });
}

// Llamar a la función de obtener opciones cada 5 segundos (5000 milisegundos)
setInterval(getAllOpcions, 5000);

// Llamar inicialmente para mostrar las opciones al cargar la página
getAllOpcions();
