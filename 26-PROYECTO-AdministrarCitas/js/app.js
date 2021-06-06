//Variables
const mascotaInput = document.querySelector('#mascota');
const propietarioInput = document.querySelector('#propietario');
const telefonoInput = document.querySelector('#telefono');
const fechaInput = document.querySelector('#fecha');
const horaInput = document.querySelector('#hora');
const sintomasInput = document.querySelector('#sintomas')

const formulario = document.querySelector('#nueva-cita');
const contenedorCitas = document.querySelector('#citas')

let edicion;

//Eventos

eventListener()
function eventListener() {
    mascotaInput.addEventListener('input', datosCita);
    propietarioInput.addEventListener('input', datosCita);
    telefonoInput.addEventListener('input', datosCita);
    fechaInput.addEventListener('input', datosCita);
    horaInput.addEventListener('input', datosCita);
    sintomasInput.addEventListener('input', datosCita);

    formulario.addEventListener('submit', nuevaCita)
}

//Clases
class Citas {
    constructor() {
        this.citas = [];
    }

    agregarCita(cita) {
        this.citas = [...this.citas, cita];
        console.log(this.citas)
    }

    eliminarCitas(id){
        this.citas = this.citas.filter(cita => cita.id !== id)
    }
    
    editarCita(citaActualizada) {
        this.citas = this.citas.map(cita => cita.id === citaActualizada.id ? citaActualizada : cita)


    }

}

class UI {
    mostrarMensaje(mensaje, tipo) {
        const div = document.createElement('div');
        div.classList.add('text-center', 'alert', 'd-block', 'col-12')

        if(tipo === 'error') {
            div.classList.add('alert-danger')
        }else {
            div.classList.add('alert-success')
        }
        div.textContent = mensaje

        const contenido = document.querySelector('#contenido');
        contenido.insertBefore(div, document.querySelector('.agregar-cita'))

        setTimeout(() => {
            div.remove()
        }, 4000)
    }

    mostrarCita({citas}) { //Sacamos con distructuring directamente citas
        this.eliminarHTML()

        citas.forEach(cita => {
            const {mascota, propietario, telefono, fecha, hora, sintomas, id} = cita

            const citaDiv = document.createElement('div');
            citaDiv.classList.add('cita', 'p-3')
            citaDiv.dataset.id = id

            const mascotaDiv = document.createElement('h2');
            mascotaDiv.textContent = mascota;

            const propietarioDiv = document.createElement('p');
            propietarioDiv.innerHTML = `
                <span class="font-weight-bolder">Propietario: </span>${propietario}
            `
            const telefonoDiv = document.createElement('p');
            telefonoDiv.innerHTML = `
                <span class="font-weight-bolder">Telefono: </span>${telefono}
            `
            const fechaDiv = document.createElement('p');
            fechaDiv.innerHTML = `
                <span class="font-weight-bolder">Fecha: </span>${fecha}
            `
            const horaDiv = document.createElement('p');
            horaDiv.innerHTML = `
                <span class="font-weight-bolder">Hora: </span>${hora}
            `
            const sintomasDiv = document.createElement('p');
            sintomasDiv.innerHTML = `
                <span class="font-weight-bolder">Sintomas: </span>${sintomas}
            `
            const btnBorrar = document.createElement('button')
            btnBorrar.classList.add('btn', 'btn-danger', 'mr-2')
            btnBorrar.innerHTML = `
                Eliminar <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            `
            btnBorrar.onclick = () => {
                eliminarCita(id)
            }

            const btnEditar = document.createElement('button')
            btnEditar.classList.add('btn', 'btn-info', 'mr-2')
            btnEditar.innerHTML = `
                Editar <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            `
            btnEditar.onclick = () => {
                activarEdicio(cita)
            }



            citaDiv.appendChild(mascotaDiv)
            citaDiv.appendChild(propietarioDiv)
            citaDiv.appendChild(telefonoDiv)
            citaDiv.appendChild(fechaDiv)
            citaDiv.appendChild(horaDiv)
            citaDiv.appendChild(sintomasDiv)
            citaDiv.appendChild(btnBorrar)
            citaDiv.appendChild(btnEditar)

            contenedorCitas.appendChild(citaDiv)

        })
    }
    eliminarHTML() {
        while(contenedorCitas.firstChild){
            contenedorCitas.removeChild(contenedorCitas.firstChild)
        }
    }

}

const ui = new UI()
const administrarCitas = new Citas()


//Funciones
const datosObj = {
    mascota: '',
    propietario: '',
    telefono: '',
    fecha: '',
    hora: '',
    sintomas: ''
}


function datosCita(e) {

    datosObj[e.target.name] = e.target.value //!Esto solo funciona si tiene el atributo name en el html

}

function nuevaCita(e) {
    e.preventDefault();

    const {mascota, propietario, telefono, fecha, hora, sintomas} = datosObj

    if(mascota === '' || propietario === '' || telefono === '' || fecha === '' || hora === '' || sintomas === '') {
        ui.mostrarMensaje('Todos los campos son obligatorios', 'error')
        return;
    }

    if(edicion) {
        ui.mostrarMensaje('Datos guardados correctamente...')

        // Pasar el objeto de citas al objeto
        administrarCitas.editarCita({...datosObj})

        formulario.querySelector('button[type="submit"]').textContent = 'Guardar cambios'

        edicion = false
    }else {

         ui.mostrarMensaje('Agregando cita...')

        //agregando un id
        datosObj.id = Date.now()
        administrarCitas.agregarCita({...datosObj}) //! Para que el objeto no sea remplazado por el nuevo, le pasamos el objeto actualizado
    }


    //restableciendo el formulario
    formulario.reset()

    //rellenar el html
    ui.mostrarCita(administrarCitas)

    //limpiamos el objeto
    limpiarDatos()



}

function limpiarDatos(){
    datosObj.marca = '';
    datosObj.propietario = '';
    datosObj.telefono = '';
    datosObj.fecha = '';
    datosObj.hora = '';
    datosObj.sintomas = '';
}

function eliminarCita(id) {
    // Eliminando las citas
    administrarCitas.eliminarCitas(id)

    //Mostando el mensaje
    ui.mostrarMensaje('Cita eliminada correctamente.')

    //refrescando la lista
    ui.mostrarCita(administrarCitas)
}

function activarEdicio(cita) {
    const {mascota, propietario, telefono, fecha, hora, sintomas, id} = cita

    mascotaInput.value = mascota
    propietarioInput.value = propietario
    telefonoInput.value = telefono
    fechaInput.value = fecha
    horaInput.value = hora
    sintomasInput.value = sintomas

    datosObj.mascota = mascota
    datosObj.propietario = propietario
    datosObj.telefono = telefono
    datosObj.fecha = fecha
    datosObj.hora = hora
    datosObj.sintomas = sintomas
    datosObj.id = id

    formulario.querySelector('button[type="submit"]').textContent = 'Guardar cambios'

    edicion = true

}
