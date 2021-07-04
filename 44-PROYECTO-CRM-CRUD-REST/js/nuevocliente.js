import { mostrarAlerta, validar } from './funciones.js';
import { nuevoCliente } from './API.js';

(function() {
    const formulario = document.querySelector('#formulario');

    formulario.addEventListener('submit', validarFormulario);

    function validarFormulario(e) {
        e.preventDefault();

        const nombre = document.querySelector('#nombre').value;
        const email = document.querySelector('#email').value;
        const telefono = document.querySelector('#telefono').value;
        const empresa = document.querySelector('#empresa').value;
        
        const Inputs = {
            nombre,
            email,
            telefono,
            empresa
        }

        if( validar(Inputs) ) {

            mostrarAlerta('Todos los campos son obligatorios')
            return;

        }

        nuevoCliente(Inputs)

    }

})();