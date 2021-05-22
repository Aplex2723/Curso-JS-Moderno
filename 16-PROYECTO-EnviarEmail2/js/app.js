//* Variables
const btnEnviar = document.querySelector('#enviar')
const btnReset = document.querySelector('#resetBtn');
const formulario = document.querySelector('#enviar-mail')

//Variables de campos
const email = document.querySelector('#email')
const asunto = document.querySelector('#asunto')
const mensaje = document.querySelector('#mensaje')

const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

eventListener()
function eventListener(){
    document.addEventListener('DOMContentLoaded', iniciarApp);

    //Campos del formulario
    email.addEventListener('blur', validarForm);
    asunto.addEventListener('blur', validarForm);
    mensaje.addEventListener('blur', validarForm);

    btnReset.addEventListener('click', resetearFormulario);

    formulario.addEventListener('submit', enviarEmail);
}


//* Funciones

function iniciarApp(){
    btnEnviar.disabled = true;
    btnEnviar.classList.add('opacity-50', 'cursor-not-allowed');

    email.classList.remove('border-green-500');
    asunto.classList.remove('border-green-500');
    mensaje.classList.remove('border-green-500');
}

function validarForm(e) {
    
    if(e.target.value.length > 0){

        const error = document.querySelector('p.error');
        if(error) {
            error.remove()
        }

       e.target.classList.remove('border-red-500');
       e.target.classList.add('border', 'border-green-500');


    } else {       
        e.target.classList.remove('border', 'border-green-500');
        e.target.classList.add('border', 'border-red-500')
        mostrarError('Todos los campos son obligatorios')
    }

     //! Expresiones regulares
     if(e.target.type === 'email') {

         if(er.test(e.target.value)) {
            const error = document.querySelector('p.error');
            if(error) {
                error.remove()
            }

            e.target.classList.remove('border-red-500')
            e.target.classList.add('border', 'border-green-500')
         } else {
             e.target.classList.remove('border', 'border-green-500')
            e.target.classList.add('border', 'border-red-500')
            mostrarError('El email no es valido')
         }
     }

    
     if(er.test(email.value) && asunto.value !== '' && mensaje.value !== ''){
        console.log('Pasate la validacion')
        btnEnviar.disabled = false;
        btnEnviar.classList.remove('opacity-50', 'cursor-not-allowed');
            
     } else {
        btnEnviar.disabled = true;
        btnEnviar.classList.add('opacity-50', 'cursor-not-allowed')
        console.log('Falta algo por validar')
     }
}

function mostrarError(mensaje) {
    const mensajeError = document.createElement('p');
    mensajeError.textContent = mensaje;
    mensajeError.classList.add('border', 'border-red-500', 'background-red-100', 'text-red-500', 'p-3', 'mt-5', 'text-center', 'error');

    const errores = document.querySelectorAll('.error');

    if(errores.length === 0) {
        formulario.appendChild(mensajeError)
    }
}

function enviarEmail(e) {
    e.preventDefault();
    
    const spinner = document.querySelector('#spinner');
    spinner.style.display = 'flex';

    //Despues de 3 segundo ocultar el spinner y ocultar el mensaje
    let timeout = 3000;
    setTimeout(() => {
        console.log('Esta funcion se ejecuta despues de 3 segundos')
        spinner.style.display = 'none';

        const parrafo = document.createElement('p');
        parrafo.textContent = 'El mensaje se envio correctamente';
        parrafo.classList.add('text-center', 'my-10', 'p-2', 'bg-green-500', 'text-white', 'font-bold', 'uppercase')
        
        //Inserta el parrafo antes del spinner
        formulario.insertBefore(parrafo, spinner);

        setTimeout( () => {                
            parrafo.remove()

            resetearFormulario();
        }, 5000)

    }, timeout);

    //TODO: El setInterval se ejecuta cada cierto tiempo en cambio a setTimeout que se ejecuta solo una vez
}
//Funcion que resetea el formulario
function resetearFormulario() {
    formulario.reset()

    iniciarApp();
}