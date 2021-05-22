const encabezdo = document.querySelector('.contenido-hero h1').textContent;

console.log(encabezdo);

//console.log(encabezdo.innerText);   //Si en el CSS = visibility: hidden; no lo va a encontrar
//console.log(encabezdo.textContent); //En canvio de innerText, este si lo detecta
//console.log(encabezdo.innerHTML);   //Se trae el HTML

//const nuevoHeading = 'Nuevo Heading'
//document.querySelector('.contenido-hero h1').textContent = nuevoHeading;

const imagen = document.querySelector('.card img');
imagen.src = 'img/hacer2.jpg'