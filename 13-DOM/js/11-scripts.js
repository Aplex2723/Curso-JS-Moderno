const btnFlotante = document.querySelector('.btn-flotante');
const footer = document.querySelector('.footer');

//* Eventos
btnFlotante.addEventListener('click', mostrarOcultarFooter); //!: Tambien podemos usar una funcion anonima () => {};

function mostrarOcultarFooter() {   //Tambien se puede usar una funcion gobal
    console.log('Diste click en el boton')
    if(footer.classList.contains('activo') ) {
        footer.classList.remove('activo')
        this.classList.remove('activo') //TODO: El this manda a llamar al bntFlotante ya que esta dentro de la funcion
        this.textContent = 'Idioma y Moneda';
    }else {
        footer.classList.add('activo')
        this.classList.add('activo')
        this.textContent = 'Abierto';
    }
}
