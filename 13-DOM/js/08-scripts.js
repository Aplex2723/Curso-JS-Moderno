//Traversing the DOM
const navegacion = document.querySelector('.navegacion');
console.log(navegacion.firstElementChild)
console.log(navegacion.lastElementChild)
//console.log(navegacion.childNodes)  //Los espacios en blanco son considerados elementos
//console.log(navegacion.children)

//console.log(navegacion.children[1].nodeName)
//console.log(navegacion.children[1].nodeType)

const card = document.querySelector('.card');
//card.children[1].children[1].textContent = 'Nuevo heading desde Traversing the DOM'

//console.log(card.children[1].children[1].textContent);

//const newCard = card.children[0].src = 'img/hacer3.jpg';

//console.log(newCard);
 
//  TRAVERSING DEL HIJO AL PADRE
//console.log(card.parentElement.parentElement)


console.log(card)
console.log(card.nextElementSibling.nextElementSibling)    //Selecciona el segundo elemento hijo(El hermano)


const ultimoCard = document.querySelector('.card:nth-child(4)');
console.log(ultimoCard.previousElementSibling)  //Recorre hacia atras