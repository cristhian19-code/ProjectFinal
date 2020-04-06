const typed = new Typed('.portada', {
    strings: [
        `<i class="title-portada text-warning"> FAMILY</i>`,
        `<i class="title-portada text-warning"> PETS</i>`,
        `<i class="title-portada text-warning"> MOMENTS</i>`,
        `<i class="title-portada text-warning"> LANDSPACE</i>`
    ],
    startDelay: 10, //tiempo de retraso para iniciar la animacion
    typeSpeed: 100, //velocidad en milisegundos para agregar una palabra
    backSpeed: 100, //velocidad en milisegundos para eliminar una palabra
    smartBackspace: true, //eliminar la palabra que sea nueva en la cadena de texto
    shuffle: false, //Alterar el orden para mostrar las palabras nuevas
    loop: true, //Repetir el array de strings
    backDelay: 10, //tiempo de espera al terminar de escribir una palabra
    loopCount: false, //cantidad de veces a repetir el array, false = infinito
    showCursor: true, //mostrar el curso palpitando
    cursorChar: '|', //cursos que seguira al momento de agregar palabras
    contentType: 'html' //que tiempo de contenido tiene el arreglo de string nul='mostrar los elementos como estan sin formato html'
});