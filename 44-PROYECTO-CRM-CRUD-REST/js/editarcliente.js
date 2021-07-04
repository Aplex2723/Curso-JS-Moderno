import { editarCliente, obtenerCliente } from './API.js';
import { mostrarAlerta, validar } from './funciones.js';

(function () {
    const nombreInput = document.querySelector('#nombre');
    const emailInput = document.querySelector('#email');
    const telefonoInput = document.querySelector('#telefono');
    const empresaInput = document.querySelector('#empresa');
    const idInput = document.querySelector('#id');

    document.addEventListener('DOMContentLoaded', async () => {
        const URLParams = new URLSearchParams(window.location.search)

        const idCliente = parseInt( URLParams.get('id'));

        const datosCliente = await obtenerCliente(idCliente);
        
        rellenarDatos(datosCliente)

        //Validar Formulario
        const forumulario = document.querySelector('#formulario');
        forumulario.addEventListener('submit', validarFormulario)
    })

    function rellenarDatos(cliente) {
        const {nombre, email, telefono, empresa, id } = cliente;

       nombreInput.value = nombre; 
       emailInput.value = email; 
       telefonoInput.value = telefono; 
       empresaInput.value = empresa; 
       idInput.value = id;

    }

    function validarFormulario(e) {
        e.preventDefault();
        
        const cliente = {
            nombre: nombreInput.value,
            email: emailInput.value,
            telefono: telefonoInput.value,
            empresa: empresaInput.value,
            id: parseInt( idInput.value )
        }

        if( validar(cliente) ) {
            mostrarAlerta('Todos los campos son obligatorios');
            
            return;
        }

        editarCliente(cliente)

    }

})();