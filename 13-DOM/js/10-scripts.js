const enlace = document.createElement('a');

//  Anadiendo propiedades
enlace.textContent = 'Nuevo Enalece'
enlace.href = '/nuevo-enlace'
enlace.target = '_blank'
enlace.classList.add('nueva-clase')
enlace.onclick = myfuncion;


console.log(enlace)

//  Obteniendo la navegacion
const navegacion = document.querySelector('.navegacion');
navegacion.insertBefore(enlace, navegacion.children[2])

function myfuncion() {
    alert('Diste click')
}

//  CREANDO CARDS   
const parrafo1 = document.createElement('p');
parrafo1.textContent = 'musica'
parrafo1.classList.add('categoria', 'concierto')

const parrafo2 = document.createElement('p');
parrafo2.textContent = 'Musica trap 2021'
parrafo2.classList.add('titulo')

const parrafo3 = document.createElement('p');
parrafo3.textContent = '$500 por persona';
parrafo3.classList.add('precio')

const informacion = document.createElement('div');
informacion.classList.add('info');
informacion.appendChild(parrafo1);
informacion.appendChild(parrafo2);
informacion.appendChild(parrafo3);

const imagen = document.createElement('img');
imagen.src = 'img/hacer2.jpg';
imagen.classList.add('img-fluid');
imagen.alt = 'Texto Alternativo';

const padre = document.createElement('div');
padre.classList.add('card');
padre.appendChild(imagen);
padre.appendChild(informacion);


const ccontenedor = document.querySelector('.hacer .contenedor-cards');
ccontenedor.insertBefore(padre, ccontenedor.children[2]);

console.log(padre);