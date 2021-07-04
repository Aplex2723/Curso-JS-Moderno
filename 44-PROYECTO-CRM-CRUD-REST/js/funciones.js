export function mostrarAlerta(msg){
    const alerta = document.querySelector('.alerta')

    if(!alerta) {
        const alertaDiv = document.createElement('p');

        alertaDiv.classList.add('alerta', 'bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded', 'max-w-lg', 'mx-auto', 'mt-6', 'text-center');
        alertaDiv.innerHTML = `
            <strong class="font-bold">Error! </strong>
            <span class="block sm:inline">${msg}</span>
        `;

        const formulario = document.querySelector('#formulario');
        formulario.appendChild(alertaDiv)

        setTimeout(() => {
            
            alertaDiv.remove()

        }, 3000);
    }

}

export function validar(obj) {
    return !Object.values(obj).every( input => input !== '');
}
