const carrito = document.querySelector('#carrito');
const listaCarrito = document.querySelector('#lista-carrito tbody');
const listaCursos = document.querySelector('#lista-cursos');
const vaciarCarrito = document.querySelector('#vaciar-carrito');
let articulosCarrito = [];

cargarEventListener();
function cargarEventListener() {
    listaCursos.addEventListener('click', agregarCurso);

    //Elimina cursos en el carrito
    carrito.addEventListener('click', eliminarCurso)

    //Eliminando todos los cursos
    vaciarCarrito.addEventListener('click', () => {
        articulosCarrito = [];

        carritoHTML();
    })
}


//* Funciones
function agregarCurso(e) {
    e.preventDefault();
    target = e.target.classList;

    if(target.contains('agregar-carrito')){
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatos(cursoSeleccionado);
    }

}

//Elimuna un curso de un carrito
function eliminarCurso(e) {
    if(e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id')

        //Elimina del arreglo
        articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId)
        carritoHTML();
    }
}


function leerDatos(curso) {
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        autor: curso.querySelector('p').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1,
    }
    //Agregando elementos al carrito

    //Revisa si un elemento ya existe en el cuadrito
    const existe = articulosCarrito.some( curso => curso.id === infoCurso.id );
    if(existe) {
        const cursos = articulosCarrito.map(curso => {
            if(curso.id === infoCurso.id){
                curso.cantidad++;
                return curso;   //Retorna el objeto actualizado
            }else {
                return curso;   //Retorna los objetos que no son duplicados
            }
        });
        articulosCarrito = [...cursos];
    }else {
        articulosCarrito = [...articulosCarrito, infoCurso];
    }

    carritoHTML()
}

//Muestra el carrito de compras en el html
function carritoHTML() {

    //limpear el html
    limpiarHTML();

    //recirre el carrito y genera el html
    articulosCarrito.forEach( curso => {
        //aplicando destructuring
        const { imagen, titulo, precio, id, cantidad } = curso;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${imagen}" width="100">
            </td>
            <td>
                ${titulo}
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
}

//Elimina los cursos del tbody
function limpiarHTML() {
    //forma lenta
    //listaCarrito.innerHTML = '';

    while(listaCarrito.firstChild) {
        listaCarrito.removeChild(listaCarrito.firstChild);
    }
}
