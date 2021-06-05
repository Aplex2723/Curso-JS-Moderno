//Varibales
const formulario = document.querySelector('#agregar-gasto');
const listaGastos = document.querySelector('#gastos ul');
const primario = document.querySelector('.primario')

const presupuestoDiv = document.querySelector('#presupuesto');
const totalDiv = document.querySelector('#total');
const restanteDiv = document.querySelector('span#restante');


//Eventos

eventListeners();
function eventListeners(){
    document.addEventListener('DOMContentLoaded', preguntarGastos);

    formulario.addEventListener('submit', agregarGasto)

    listaGastos.addEventListener('click', eliminarGastos)
}

//Clases
class Presupuestos {
    constructor(presupuesto) {
        this.presupuesto = Number(presupuesto)
        this.restante = Number(presupuesto);
        this.gastos = [];
    }

    guardarGastos(gasto) {
        this.gastos = [...this.gastos, gasto];
        this.clacularRestante()
    }

    clacularRestante() {
        const gastado = this.gastos.reduce( (total, gasto) => total + gasto.cantidad, 0);   //! Itera sobre todo el arreglo y nos entraga el total

        this.restante = this.presupuesto - gastado;
    }

    eliminarGastos(id) {
        this.gastos = this.gastos.filter( gasto => gasto.id.toString() !== id);
        this.clacularRestante()
    }

}

class UI {

    presupuestoHTML(cantidad){

        totalDiv.textContent = cantidad.presupuesto
        restanteDiv.textContent = cantidad.restante
        console.log(cantidad)
        
    }
    imprimirAlerta(mensaje, tipo) {
        const div = document.createElement('div');
        div.classList.add('text-center', 'alert');

        if(tipo === 'error'){

            div.classList.add('alert-danger')

        }else {

            div.classList.add('alert-success')

        }
        div.textContent = mensaje

        primario.insertBefore(div, formulario);

        setTimeout(() => {
            div.remove()
        }, 4000)
    }

    agregarListado(gastos) {
        /*      //!Forma lenta
        const { nombre, cantidad, id} = gasto;

        const li = document.createElement('li');
        li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
        li.setAttribute('data-id', id);

        li.innerHTML = `
            ${nombre}
            <span class="badge badge-primary badge-pill">$ ${cantidad}</span>
            <button class="btn btn-danger borrar-gasto">Borrar</button>
        
        `;

        listaGastos.appendChild(li);
        */

        //! Forma correcta y rapida
        //limpiando el HTML
        this.limpiarHTML();

        gastos.forEach( gasto => {
            //crenado un alista
            const { nombre, cantidad, id } = gasto;

            const li = document.createElement('li');
            li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
            li.dataset.id = id;

            li.innerHTML = `
                ${nombre}
                <span class="badge badge-primary badge-pill">$ ${cantidad}</span>
            `

            const btnBorrar = document.createElement('button');
            btnBorrar.classList.add('btn', 'btn-danger', 'borrar-gasto');
            btnBorrar.textContent = 'Borrar'
            li.appendChild(btnBorrar);
100
            listaGastos.appendChild(li);

        })

    }

    limpiarHTML() {
        while(listaGastos.firstChild) {
            listaGastos.removeChild(listaGastos.firstChild)
        }
    }

    actualizarRestante(restante) {
        restanteDiv.textContent = restante
        
    }

    comprobarPresupuesto(presupuestoObj) {
        const { presupuesto, restante } = presupuestoObj

        const restanteDivObj = document.querySelector('.restante');

        if((presupuesto / 4) > restante) {
            restanteDivObj.classList.remove('alert-success');
            restanteDivObj.classList.add('alert-danger');
        }else if((presupuesto / 2) > restante){
            restanteDivObj.classList.remove('alert-success');
            restanteDivObj.classList.add('alert-warning');
        }else {
            restanteDivObj.classList.remove('alert-danger', 'alert-warning');
            restanteDivObj.classList.add('alert-success');
        }

        if(restante <= 0){
            ui.imprimirAlerta('No hay mas presupuesto', 'error')
            formulario.querySelector('button[type="submit"]').disabled = true;
        }
    }

}

const ui = new UI();
let presupuesto;

//Funciones
function preguntarGastos() {
    const gastosUsuarios = Number(prompt('Cual es tu presupuesto?'));
    //Validacion de gastos
    if(gastosUsuarios === '' || gastosUsuarios === null || isNaN(gastosUsuarios) || gastosUsuarios <= 50){
        window.location.reload(); //Recargando la pagina
    }

    presupuesto = new Presupuestos(gastosUsuarios);
    ui.presupuestoHTML(presupuesto);
}

function agregarGasto(e) {
    e.preventDefault();

    const nombre = document.querySelector('#gasto').value;
    const cantidad = Number(document.querySelector('#cantidad').value);

    if(nombre === '' || isNaN(cantidad) || cantidad <= 0){
        
        ui.imprimirAlerta('Todos los campos son obligatorios', 'error')
        return;

    } else {

        ui.imprimirAlerta('Correcto', 'correcto')
        //agregarListado(nombre, cantidad);
        const gasto = { nombre, cantidad, id: Date.now() }

        presupuesto.guardarGastos(gasto);

        const { gastos, restante } = presupuesto
        ui.agregarListado(gastos)
        ui.actualizarRestante(restante);
        ui.comprobarPresupuesto(presupuesto)

        formulario.reset()
        return;
        
    }

}


function eliminarGastos(e) {
    if(e.target.classList.contains('borrar-gasto')){
        const { id } = e.target.parentElement.dataset;
        presupuesto.eliminarGastos(id);
        // Reembolsar
        ui.comprobarPresupuesto(presupuesto);
 
        // Pasar la cantidad restante para actualizar el DOM
        const { restante } = presupuesto;
        ui.actualizarRestante(restante);
 
        // Eliminar del DOM
        e.target.parentElement.remove();
    } 
}