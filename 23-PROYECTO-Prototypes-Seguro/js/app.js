
//Constructores
function Seguro(marca, year, tipo){
    this.marca = marca;
    this.year = year;
    this.tipo = tipo;
}
//Realiza la cotizacion con los datosgf 
Seguro.prototype.cotizarSeguro = function () {
    /*
        1: Americano 1.15
        2: Asiatico 1.05
        3: Europeo 1.35
    */
    //Leemos el ano de diferencia
    const diferencia = new Date().getFullYear() - this.year
    let cotizacion;
    let precioBase = 2000;

    switch(this.marca){
        case '1': 
            cotizacion = precioBase * 1.15;
            break;
        case '2':
            cotizacion = precioBase * 1.05;
            break;
        case '3':
            cotizacion = precioBase * 1.35;
            break;

        default:
            break;
    }

    // Por cada year, la diferencia es mayor, el costo va a reducirse un 3%
    cotizacion -= ((diferencia * 3) * cotizacion / 100)

    /*
        Si el seguro es basico se multiplica por un 30% mas
        Si el seguro es completo se multiplica por un 50% mas
    */
    if(this.tipo === 'basico'){
        cotizacion *= 1.30; 
    }else {
        cotizacion *= 1.50;
    }

    return cotizacion;

}

function UI(){};

UI.prototype.llenarOpcciones = function (){
    const seleccion = document.querySelector('#year');
    const max = new Date().getFullYear(), min = max - 20;

    for(let i = max; i > min; i--){
        const listaYears = document.createElement('option');
        listaYears.value = i;
        listaYears.textContent = i;

        seleccion.appendChild(listaYears);
    }
}

UI.prototype.mostrarMensaje = function(mensaje, tipo) {
    const div = document.createElement('div');

    if(tipo === 'error'){
        div.classList.add('error');
    }else {
        div.classList.add('correcto')
    }
    
    div.classList.add('mensaje', 'mt-10');
    div.textContent = mensaje

    const fourmulario = document.querySelector('#cotizar-seguro');
    fourmulario.insertBefore(div, document.querySelector('#resultado'));

    setTimeout( () => {
        div.remove()
    }, 4000)

}

UI.prototype.mostrarResultado = (seguro, total) => {
    const {marca, year, tipo} = seguro;
    let nuevaMarca;

    switch(marca){
        case '1':
            nuevaMarca = 'Americano';
            break;
        case '2':
            nuevaMarca = 'Asiatico';
            break;
        case '3':
            nuevaMarca = 'Europeo';
            break;

        default:
            break;
    }
    //Crear resultado
    const div = document.createElement('div');
    div.classList.add('mt-10');

    div.innerHTML = `
        <p class="header">Tu Resumen</p>
        <p class="font-bold">Marca: <span class="font-normal"> ${nuevaMarca}</span></p>
        <p class="font-bold">Year: <span class="font-normal"> ${year}</span></p>
        <p class="font-bold">Tipo: <span class="font-normal capitalize"> ${tipo}</span></p>
        <p class="font-bold">Total: <span class="font-normal"> $${total}</span></p>

    `

    const resultadoDiv = document.querySelector('#resultado');

    //mostrar Spinner
    const spinner = document.querySelector('#cargando');
    spinner.style.display = 'block'

    setTimeout(() => {
        // Se borra el spiner pero se muestra el resultdo
        spinner.style.display = 'none';
        resultadoDiv.appendChild(div);
    }, 4000)

}

document.addEventListener('DOMContentLoaded', () => {
    ui.llenarOpcciones()
})

eventListeners();
function eventListeners(){
    const fourmulario = document.querySelector('#cotizar-seguro')
    fourmulario.addEventListener('submit', validarFormulario)
}

function validarFormulario(e){
    e.preventDefault();

    const marca = document.querySelector('#marca').value;
    const year = document.querySelector('#year').value;
    const tipo = document.querySelector('input[name="tipo"]:checked').value;

    if(marca === '' || year === '' || tipo === ''){
        ui.mostrarMensaje('Todos los campos son obligatorios', 'error')
    }else {
        ui.mostrarMensaje('Cotizando...', 'correcto');

    }

    // Eliminando las cotizaciones previas
    const resultado = document.querySelector('#resultado div');
    if(resultado != null){
        resultado.remove();
    }

    //Instancioamos seguro
    const seguro = new Seguro(marca, year, tipo)
    const total = seguro.cotizarSeguro()

    ui.mostrarResultado(seguro, total)

}

//instanciamos
const ui = new UI();
console.log(ui)