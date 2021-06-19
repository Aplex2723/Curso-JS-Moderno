function mostrarMensaje(mensaje, tipo){
    const mostrarMensaje = document.createElement('div')
    mostrarMensaje.classList.add('px-4', 'py-3', 'rounded', 'max-w-lg', 'mx-auto', 'mt-6', 'text-center' )
    mostrarMensaje.textContent = mensaje

    if(tipo === 'error') {
        mostrarMensaje.classList.add('bg-red-100', 'border-red-400', 'text-red-700')
    } else {
        mostrarMensaje.classList.add('bg-green-100', 'border-green-400', 'text-green-700')
    }

    formulario.appendChild(mostrarMensaje);

    setTimeout(() => {
        mostrarMensaje.remove()

        formulario.reset()
        
        window.location.href = 'index.html'
    }, 5000)
}