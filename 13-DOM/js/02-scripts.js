//  Seleccionando elementos por su clase

//Forma anterior o tradicionar

const header = document.getElementsByClassName('header');
console.log(header);

const hero = document.getElementsByClassName('hero');
console.log(hero);

//  Si las clases existen mas de 1 ves
const contenedores = document.getElementsByClassName('contenedor');
console.log(contenedores)

//Si una classe no exdiste
const noExiste = document.getElementsByClassName('Noexiste');
console.log(noExiste);      //Retorna nada por que no existe.