(function() {
    let DB;
    let idCliente

    const nombreInput = document.querySelector('#nombre');
    const emailInput = document.querySelector('#email')
    const telefonoInput = document.querySelector('#telefono');
    const empresaInput = document.querySelector('#empresa');

    const btnEditar = document.querySelector('input[type="submit"]')

    document.addEventListener('DOMContentLoaded', () => {
        cargarDB()

        //Verificar el id de la url
        formulario.addEventListener('submit', actualizarCliente)

        const parametrosURL = new URLSearchParams(window.location.search)
        idCliente = parametrosURL.get('id');
        
        if(idCliente) {
            setTimeout(() => {
                obtenerCliente(idCliente)
            }, 1000);
        }
    })


    function cargarDB() {
        const conectarDB = window.indexedDB.open('crm', 1);
        
        conectarDB.onerror = function() {
            console.log('Ha ocurrido un error')
        }
        conectarDB.onsuccess = function(){
            DB = conectarDB.result;
        }

    }
    
    function obtenerCliente(id) {
        const transaccion = DB.transaction(['crm'], 'readonly');
        const objectStore = transaccion.objectStore('crm');

        objectStore.openCursor().onsuccess = function(e) {
            const cursor = e.target.result

            if(cursor) {
                if(cursor.value.id === Number(id)){
                    llenarFormulario(cursor.value)
                }

                cursor.continue()
            }
        }
    }

    function llenarFormulario(valores){
        const { nombre, empresa, email, telefono } = valores

        empresaInput.value = empresa;
        nombreInput.value = nombre;
        emailInput.value = email;
        telefonoInput.value = telefono;

        btnEditar.value = 'Editar Cliente'


    }

    function actualizarCliente(e) {
        e.preventDefault();

        if(nombreInput.value === '' || emailInput.value === '' || telefonoInput.values === '' || empresaInput.values === ''){
            mostrarMensaje('Todos los campos son obligatorios', 'error')

            return;
        }

        const clienteActualizado = {
            nombre: nombreInput.value,
            email: emailInput.value,
            empresa: empresaInput.value,
            telefono: telefonoInput.value,
            id: Number(idCliente)
        }

        const transaccion = DB.transaction(['crm'], 'readwrite');
        const objectStore = transaccion.objectStore('crm');

        objectStore.put(clienteActualizado)

        transaccion.oncomplete = function () {
            mostrarMensaje('Cliente actualizado')
        }
        transaccion.onerror = function() {
            console.log('error')
        }
    }

})();