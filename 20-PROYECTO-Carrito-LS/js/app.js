
const carrito = document.querySelector('#carrito')
const listaCarrito = document.querySelector('#lista-carrito tbody');
const listaCursos = document.querySelector('#lista-cursos');
const vaciarCarrito = document.querySelector('#vaciar-carrito');
let productos = [];

//* Eventos
enventListenes()
function enventListenes(){
    listaCursos.addEventListener('click', agregarCurso);

    carrito.addEventListener('click', eliminarCurso)

    vaciarCarrito.addEventListener('click', () => {
        productos = [];

        carritoHTML()
    })

    document.addEventListener('DOMContentLoaded', agregarLocal)
}


//*Funciones
function agregarLocal(){
    productos = JSON.parse(localStorage.getItem('carrito')) || [];

    carritoHTML()
}

function agregarCurso(e){
    e.preventDefault()
    target = e.target.classList

    if(target.contains('agregar-carrito')){
        const cursoSeleccionado = e.target.parentElement.parentElement
        console.log(cursoSeleccionado)

        leerDatos(cursoSeleccionado)
    }

}

function eliminarCurso(e){
    if(e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id')

        productos = productos.filter( curso => curso.id !== cursoId)

        localStorage.removeItem('carrito')

        carritoHTML()
    }
}

function leerDatos(curso){
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        nombre: curso.querySelector('h4').textContent,
        autor: curso.querySelector('p').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1

    }

    //Agregando cursos

    const existe = productos.some( curso => curso.id === infoCurso.id);
    if(existe){
        const cursos = productos.map( curso => {
            if(curso.id === infoCurso.id){
                curso.cantidad++
                return curso;
            } else {
                return curso;
            }
        })
        productos = [...cursos]
    }else {
        productos = [...productos, infoCurso]
    }

    carritoHTML()

}

function carritoHTML() {

    //limpear el html
    limpiarHTML();

    //recirre el carrito y genera el html
    productos.forEach( curso => {
        //aplicando destructuring
        const { imagen, nombre, precio, id, cantidad } = curso;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${imagen}" width="100">
            </td>
            <td>
                ${nombre}
            </td>
            <td>
                ${precio}
            </td>
            <td>
                ${cantidad}
            </td>
            <td>
                <a href="#" class="borrar-curso" data-id="${id}"> X </a>
            </td>
        `;

        //agrega el html del carritto al tbody
        listaCarrito.appendChild(row);

    })

    //! Sincronizando Storage
    saveStorage()

}

function limpiarHTML(){
    while(listaCarrito.firstChild){
        listaCarrito.removeChild(listaCarrito.firstChild);
    }
}

function saveStorage(){
    localStorage.setItem('carrito', JSON.stringify(productos))
}