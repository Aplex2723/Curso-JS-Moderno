//* Variables
const formulario = document.querySelector('#formulario');
const lista = document.querySelector('#lista-tweets')

let tweets = [];

//* Eventos

eventListeners()
function eventListeners(){
    formulario.addEventListener('submit', agregarTweet);
    document.addEventListener('DOMContentLoaded', () => {
    tweets = JSON.parse( localStorage.getItem('tweet')) || [];

    crearHTML()
    })


}

//* Funciones
function agregarTweet(e) {
    e.preventDefault()
    const tweet = document.querySelector('#tweet').value;



    if(tweet === ''){
        mostrarError('No puede estar vacio')

        return;
    }
    const tweetObj = {
        id: Date.now(),
        tweet
    }

    tweets = [...tweets, tweetObj]

    //Creando el HTML
    crearHTML()

    //limpiando el formulario
    formulario.reset();
}

function mostrarError(mensaje){
    const error = document.createElement('p');
    error.classList.add('error');
    error.textContent = mensaje;

    const contenido = document.querySelector('#contenido');
    contenido.appendChild(error)

    setTimeout(() => {
        contenido.removeChild(error)
    }, 5000)
}

function crearHTML() {

    limpiarHTML()

    if(tweets.length > 0) {
        tweets.forEach( tweet => {

            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet')
            btnEliminar.textContent = 'X'

            //Funcion de eliminar
            btnEliminar.onclick = () => {
                borrarTweet(tweet.id)
            }

            const li = document.createElement('li');

            li.textContent = tweet.tweet;
            li.appendChild(btnEliminar)

            lista.appendChild(li)
    

        })
    }
    sincronizarStorage()
}

function sincronizarStorage() {
    localStorage.setItem('tweet', JSON.stringify(tweets))
}

function limpiarHTML() {
    while(lista.firstChild){
        lista.removeChild(lista.firstChild)
    }
}

//Borrando los tweets
function borrarTweet(id){
    tweets = tweets.filter( tweet => tweet.id != id)
    
    crearHTML()
}