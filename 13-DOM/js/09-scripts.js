//  Eliminando elementos por si mismo
//const primerEnlace = document.querySelector('a');
//console.log(primerEnlace.remove())

//Eliminar desde el padre
const navegacion = document.querySelector('.navegacion');
navegacion.removeChild(navegacion.children[2]);

console.log(navegacion.children);