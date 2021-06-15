import Citas from './clases/citas.js';
import UI from './clases/UI.js';
import { mascotaInput, propietarioInput, telefonoInput, fechaInput, horaInput, sintomasInput } from './variables.js';
import { datosCita } from './funciones.js'


// Eventos
eventListeners();
function eventListeners() {
    mascotaInput.addEventListener('change', datosCita);
    propietarioInput.addEventListener('change', datosCita);
    telefonoInput.addEventListener('change', datosCita);
    fechaInput.addEventListener('change', datosCita);
    horaInput.addEventListener('change', datosCita);
    sintomasInput.addEventListener('change', datosCita);
}

// CLasses

export const administrarCitas = new Citas();
console.log(administrarCitas);
export const ui = new UI(administrarCitas);

