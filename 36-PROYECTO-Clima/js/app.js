const formulario = document.querySelector('#formulario');
const contenido = document.querySelector('.container');
const resultado = document.querySelector('#resultado')

eventListeners()
function eventListeners() {

    formulario.addEventListener('submit', validarFormulario);
}

class UI {
    mostrarMensaje(mensaje, estado){
        const alerta = document.querySelector('.bg-red-100');

        if(!alerta) {
            const div = document.createElement('div');
            div.classList.add('px-4', 'py-3', 'rounded', 'relative', 'max-w-md', 'mx-auto', 'mt-6', 'text-center')

            const tipo = document.createElement('strong');
            tipo.classList.add('font-bold')

            const txt = document.createElement('span');
            txt.classList.add('block', 'sm:inline')
            
            if(estado === 'error') {

                div.classList.add('bg-red-100', 'border-red-400', 'text-red-700')

                tipo.textContent = 'Error! '
        
                txt.textContent = mensaje

            }

            div.appendChild(tipo);
            div.appendChild(txt);
            formulario.appendChild(div);
            
            setTimeout(() => {
                div.remove()
            }, 4000)

        }
    }
}

const ui = new UI()

function validarFormulario(e) {
    e.preventDefault();

    const ciudadInput = document.querySelector('#ciudad').value;
    const paisInput = document.querySelector('#pais').value;

    console.log(ciudadInput)
    console.log(paisInput)

    if(ciudadInput === '' || paisInput === ''){
        ui.mostrarMensaje('Ambos campos son obligatorios', 'error');

        return;
    }

    consultarAPI(ciudadInput, paisInput)

}

function consultarAPI(ciudad, pais) {
    const appId = '7095b77c26838a9d72fe5edbd0550915'

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`

    spinner()

    fetch(url)
        .then(res => res.json())
        .then(res => imprimirHTML(res))

}

function imprimirHTML(datos) {
    if(datos.cod == 404) {
        ui.mostrarMensaje('No se encrontro la ciudad', 'error');

        return;
    }

    mostrarCliema(datos);
}

function mostrarCliema(datos) {
    limpiarHTML()

    const { main, name } = datos

    const temp = parseInt(main.temp - 273.15)
    const temp_max = parseInt(main.temp_max - 273.15)
    const temp_min = parseInt(main.temp_min - 273.15)

    const div_clima = document.createElement('div');
    div_clima.classList.add('text-center', 'text-white');

    const ciudad = document.createElement('p');
    ciudad.classList.add('font-bold', 'text-2xl');
    ciudad.textContent = `Clima en: ${name}`

    const p_temp = document.createElement('p');
    p_temp.classList.add('font-bold', 'text-6xl');
    p_temp.textContent = `${temp} ℃`

    const p_temp_max = document.createElement('p');
    p_temp_max.classList.add('text-xl');
    p_temp_max.textContent = `Maxima: ${temp_max} ℃`

    const p_temp_min = document.createElement('p');
    p_temp_min.classList.add('text-xl');
    p_temp_min.textContent = `Minima: ${temp_min} ℃`

    div_clima.appendChild(ciudad);
    div_clima.appendChild(p_temp);
    div_clima.appendChild(p_temp_max);
    div_clima.appendChild(p_temp_min);

    resultado.appendChild(div_clima)
    
}

function spinner() {
    limpiarHTML()
    
    const divSpinner = document.createElement('div');
    divSpinner.classList.add('sk-fading-circle');
    divSpinner.innerHTML = `
        <div class="sk-circle1 sk-circle"></div>
        <div class="sk-circle2 sk-circle"></div>
        <div class="sk-circle3 sk-circle"></div>
        <div class="sk-circle4 sk-circle"></div>
        <div class="sk-circle5 sk-circle"></div>
        <div class="sk-circle6 sk-circle"></div>
        <div class="sk-circle7 sk-circle"></div>
        <div class="sk-circle8 sk-circle"></div>
        <div class="sk-circle9 sk-circle"></div>
        <div class="sk-circle10 sk-circle"></div>
        <div class="sk-circle11 sk-circle"></div>
        <div class="sk-circle12 sk-circle"></div>
    `

    resultado.appendChild(divSpinner)
}

function limpiarHTML() {
    while(resultado.firstChild) {
        resultado.removeChild(resultado.firstChild)
    }
}