const formulario = document.querySelector('#formulario')
let DB;

eventListeners()
function eventListeners() {

    document.addEventListener('DOMContentLoaded', cargarDB)
    formulario.addEventListener('submit', validarCampos)
}

function cargarDB() {
    const cargarDB = window.indexedDB.open('crm', 1)

    cargarDB.onerror = function() {
        console.log('Hubo un error al cargar la base de datos')
    }

    cargarDB.onsuccess = function() {
        DB = cargarDB.result
    }   
}

class UI {

    mostrarMensaje(mensaje, tipo){
        const mostrarMensaje = document.createElement('div')
        mostrarMensaje.classList.add('px-4', 'py-3', 'rounded', 'max-w-lg', 'mx-auto', 'mt-6', 'text-center' )
        mostrarMensaje.textContent = mensaje

        if(tipo === 'error') {
            mostrarMensaje.classList.add('bg-red-100', 'border-red-400', 'text-red-700')
        } else {
            mostrarMensaje.classList.add('bg-green-100', 'border-green-400', 'text-green-700')
        }

        formulario.appendChild(mostrarMensaje);

        setTimeout(() => {
            mostrarMensaje.remove()

            formulario.reset()
            
            window.location.href = 'index.html'
        }, 5000)
    }

}

const ui = new UI();



function validarCampos(e) {
    e.preventDefault();

    const nombreInput = document.querySelector('#nombre').value;
    const correoInput = document.querySelector('#email').value;
    const telefonoInput = document.querySelector('#telefono').value;
    const empresaInput = document.querySelector('#empresa').value;
    


    console.log(correoInput)

    if( nombreInput === '' || correoInput === '' || telefonoInput === '' || empresaInput === '') {
        ui.mostrarMensaje('Todos los campos son obligatorios', 'error')

        return;
    }



    const clientesObj = {
        nombre: nombreInput,
        email: correoInput,
        telefono: telefonoInput,
        empresa: empresaInput,
        id: Date.now()
    }

    guardarCliente(clientesObj);

}

function guardarCliente(cliente) {
    const transaccion = DB.transaction(['crm'], 'readwrite');
    const objectStore = transaccion.objectStore('crm');

    objectStore.add(cliente);

    transaccion.onerror = function () {
        console.log('Hubo un error en la transaccion');
        ui.mostrarMensaje('El correo ya esta usado', 'error')
    }

    transaccion.oncomplete = function () {
        console.log('Transaccion completada')

        ui.mostrarMensaje('Agregando Usuario...')
    }

}