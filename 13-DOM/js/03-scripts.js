//  Elementos por id

const formulario = document.getElementById('formulario');
console.log(formulario)

//No existe
const noexiste = document.getElementById('no-existe');  //Retorna maximo el primer resultado que encuentra
console.log(noexiste)       //Marca 'null' por que no hay nniguna id