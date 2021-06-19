
(function() {   //! Crando un IFFI
    
    let DB;

    document.addEventListener('DOMContentLoaded', () => {
        CrearDB() 
    })

    function CrearDB() {

        const crearDB = window.indexedDB.open('crm', 1);

        crearDB.onerror = function() {
            console.log('No se ha podido crear la DB')
        }
        crearDB.onsuccess = function() {
            DB = crearDB.result;

            CargarClientes()
        }
        crearDB.onupgradeneeded = function(e) {
            const db = e.target.result;

            const objectStore = db.createObjectStore('crm', { keyPath: 'id', autoIncrement: true});
            
            objectStore.createIndex('nombre', 'nombre', {unique: false})
            objectStore.createIndex('email', 'email', {unique: true})
            objectStore.createIndex('telefono', 'telefono', {unique: false})
            objectStore.createIndex('empresa', 'empresa', {unique: false})
            objectStore.createIndex('id', 'id', {unique: true})

            console.log('Base de datos creda y lista')
        }

        
    }
    const listadoCliente = document.querySelector('#listado-clientes');

    function CargarClientes() {
        const objectStore = DB.transaction('crm').objectStore('crm');

        limpiarHTML()

        const total = objectStore.count();
        total.onsuccess = function() {
            console.log(total.result)
        }

        objectStore.openCursor().onsuccess = function(e) {

            const cursor = e.target.result;


            if(cursor) {
                const { nombre, email, id, telefono, empresa } = cursor.value; 

                const tr = document.createElement('tr');

                //Nombre
                const tdNombre = document.createElement('td');
                tdNombre.classList.add('px-6', 'py-4', 'whitespace-no-wrap', 'border-b', 'border-gray-200' );
                const pNombre = document.createElement('p');
                const pEmail = document.createElement('p');
                pEmail.classList.add('text-sm', 'leading-10', 'text-gray-700')
                pNombre.classList.add('text-sm', 'leading-5', 'font-medium', 'text-gray-700', 'text-lg',  'font-bold')
                pNombre.textContent = nombre;
                pEmail.textContent = email;
                tdNombre.appendChild(pNombre)
                tdNombre.appendChild(pEmail)
                tr.appendChild(tdNombre)

                //Telefono
                const tdTelefono = document.createElement('td');
                tdTelefono.classList.add('px-6', 'py-4', 'whitespace-no-wrap', 'border-b', 'border-gray-200' );
                const pTelefono = document.createElement('p');
                pTelefono.classList.add('text-gray-700');
                pTelefono.textContent = telefono;
                tdTelefono.appendChild(pTelefono);
                tr.appendChild(tdTelefono);

                //Empresa
                const tdEmpresa = document.createElement('td');
                tdEmpresa.classList.add('px-6', 'py-4', 'whitespace-no-wrap', 'border-b', 'border-gray-200', 'leading-5', 'text-gray-700' );
                const pEmpresa = document.createElement('p');
                pEmpresa.classList.add('text-gray-600')
                pEmpresa.textContent = empresa;
                tdEmpresa.appendChild(pEmpresa)
                tr.appendChild(tdEmpresa)

                //Botones
                const tdBotones = document.createElement('td');
                tdBotones.classList.add('px-6', 'py-4', 'whitespace-no-wrap', 'border-b', 'border-gray-200', 'text-sm', 'leading-5');

                const pEditar = document.createElement('a');
                pEditar.classList.add('text-teal-600', 'hover:text-teal-900', 'mr-5')
                pEditar.href = `editar-cliente.html?id=${id}`;
                pEditar.textContent = 'Editar'
                pEditar.onclick = () => {
                    editarCliente(id)
                }

                const pEliminar = document.createElement('a');
                pEliminar.href = '#';
                pEliminar.textContent = 'Eliminar'
                pEliminar.onclick = () => {
                    eliminarCliente(id)
                }
                pEliminar.classList.add('text-red-600', 'hover:text-red-900')

                tdBotones.appendChild(pEditar);
                tdBotones.appendChild(pEliminar)
                
                
                tr.appendChild(tdBotones)

                listadoCliente.appendChild(tr)

                cursor.continue()

            }
        }
    }

    function eliminarCliente(id) {
        const transaccion = DB.transaction(['crm'], 'readwrite')
        const objectStore = transaccion.objectStore('crm')
        objectStore.delete(id)

        transaccion.oncomplete = function () {
            console.log('Eliminado correctamente')

            CargarClientes()
        }
    }

    function limpiarHTML() {
        while(listadoCliente.firstChild){
            listadoCliente.removeChild(listadoCliente.firstChild)
        }
    }

})();