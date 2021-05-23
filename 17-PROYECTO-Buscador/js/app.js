//* Variables
const resultado = document.querySelector('#resultado');

const marca = document.querySelector('#marca');
const year = document.querySelector('#year');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');
const puertas = document.querySelector('#puertas');
const transmision = document.querySelector('#transmision');
const color = document.querySelector('#color');

const datosBusqueda = {
    marca: '',
    year: '',
    minimo: '',
    maximo: '',
    puertas: '',
    transmision: '',
    color: ''
}

const maxDate = new Date().getFullYear()
const minDate = maxDate - 11

//* Eventos

document.addEventListener('DOMContentLoaded', () => {
    mostrarAutos(autos) //Muestra los autos al cargar

    //LLlena las opcciones de anos
    llenarSelect()
})

//todo Anadiendo los eventos a las listas
marca.addEventListener('change', e => {
    datosBusqueda.marca = e.target.value;

    filtrarDatos(autos)
})
year.addEventListener('change', e => {
    datosBusqueda.year = parseInt(e.target.value);

    filtrarDatos(autos);
})
minimo.addEventListener('change', e => {
    datosBusqueda.minimo = e.target.value;

    filtrarDatos(autos);
})
maximo.addEventListener('change', e => {
    datosBusqueda.maximo = e.target.value;
    
    filtrarDatos(autos)
})
puertas.addEventListener('change', e => {
    datosBusqueda.puertas = parseInt(e.target.value);

    filtrarDatos(autos);
})
transmision.addEventListener('change', e => {
    datosBusqueda.transmision = e.target.value;

    filtrarDatos(autos);
})
color.addEventListener('change', e => {
    datosBusqueda.color = e.target.value;

    filtrarDatos(autos);
})

//* Funciones
function mostrarAutos(autos) {
    limpiarHMTL()
    
    autos.forEach( auto => {
        const { marca, modelo, year, precio, puertas, color, transmision} = auto; //! Aplicamos Destructuring Method

        const carroHTML = document.createElement('p');

        carroHTML.textContent = `
            ${marca} ${modelo} - ${puertas} Puertas - ${year} - Precio: \$${precio} - Color: ${color} - Transmicion: ${transmision}
        `;

        resultado.appendChild(carroHTML);
    })

}

function limpiarHMTL(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild)
    }
}


//Genera los anos del select 
function llenarSelect(){

    for(let i = maxDate; i >= minDate; i--){
        const years = document.createElement('option');
        years.textContent = i;
        years.value = i;
        year.appendChild(years)
    }
}

//Filtrando los auntos en base a su busqueda
function filtrarDatos(auto){
    const filtrado = auto.filter( filtrarMarca ).filter( filtrarYear ).filter( filtrarMinimo ).filter( filtrarMaximo ).filter( filtrarPuertas ).filter( filtrarTransmision).filter( filtrarColor );

    if(filtrado.length){
        mostrarAutos(filtrado)
    } else {
        noResultado()
    }

}

function noResultado(){
    
    limpiarHMTL();
    const noExite = document.createElement('p');
    
    noExite.textContent = 'No se ha encontrado ningun vehiculo.'
    noExite.classList.add('error', 'alert')
    resultado.appendChild(noExite)
}

function filtrarMarca(auto) {
    const { marca } = datosBusqueda;
    if(marca){
        return auto.marca === marca;
    }
    return auto;
}
function filtrarYear(auto) {
    const { year } = datosBusqueda;
    if(year){
        return auto.year === year;
    }
    return auto;
}
function filtrarMinimo(auto){
    const { minimo } = datosBusqueda;
    if(minimo){
        return auto.precio >= minimo;
    }
    return auto;
}
function filtrarMaximo(auto){
    const { maximo } = datosBusqueda;
    if(maximo){ 
    }
    return auto;
}
function filtrarPuertas(auto){
    const { puertas } = datosBusqueda;

    if(puertas){
        return auto.puertas === puertas;
    }
    return auto;
}
function filtrarTransmision(auto){
    const { transmision } = datosBusqueda;
    if(transmision){
        return auto.transmision === transmision;
    }
    return auto;
}
function filtrarColor(auto){
    const { color } = datosBusqueda;
    if(color){
        return auto.color === color;
    }
    return auto;
}