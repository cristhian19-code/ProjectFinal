//CAMBIO DE UNA PALABRA EN UN STRING
var path = "Hola que tal Hola como estas :v";
//  /i->busca sin importar si esta en mayuscula
var i = path.replace(/hola/i, 'brother');
console.log(i);
//  /g->busca de manera global en todo el string
var g = path.replace(/Hola/g, 'brother');
console.log(g);
//  /m->coincidencia de lineas multipls
var m = path.replace(/Hola/m, 'brother');

console.log(m);

//-------------------------------------------------------------------------

//BUSCAN LA PALABRA DEVOLVIENDO UN TRUE O FALSE

var text = "Hola que tal como estas";
var patt = /hola/i; //busqueda sin importa mayuscula o minuscula 
console.log(patt.test(text));

//-------------------------------------------------------------------------

//Buqueda de la palabra devolviendo la posicion encontrada

var text1 = "Hola que tal como estas";

console.log(text1.search(/hola/i));