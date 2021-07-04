const url = 'http://localhost:4000/clientes'

export const nuevoCliente = async cliente => { 
    try {
        await fetch(url, {
            method: 'POST',  //* Siempre que quieras subir datos, se usa POST
            body: JSON.stringify( cliente ), //*Se convierte el objeto a string
            headers: {
                'Content-Type': 'application/json' //*Envia informacion adicional
            }
        });

        window.location.href = 'index.html'
    } catch (error) {
        console.error(error)
    }
}

export const obtenerClientes = async () => {
    try {
        const response = await fetch(url);
        const resultado = await response.json();

        return resultado
        
    } catch (error) {
        console.log(error)
        
    }
}

export const eliminarCliente = async id => {
    try {
        
        await fetch(`${url}/${id}`, {
            method: 'DELETE'
        });

    } catch (error) {
        console.log(error)
        
    }
}

export const obtenerCliente = async id => {
    try {
        const response = await fetch(`${url}/${id}`)
        const respuesta = await response.json()
        return respuesta
        
    } catch (error) {
        console.log(error)
        
    }
}

export const editarCliente = async cliente => {
    try {
        await fetch(`${url}/${cliente.id}`, {
            method: 'PUT',
            body: JSON.stringify( cliente ),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        window.location.href = 'index.html'
    } catch (error) {
        console.log(error)
        
    }
}