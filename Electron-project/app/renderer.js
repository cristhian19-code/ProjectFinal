//obteniendo los elementos mediante las clases
const LinksSection = document.querySelector('.links');
const errorMessage = document.querySelector('.error-message');
const newLinkForm = document.querySelector('.new-link-form');
const newLinkUrl = document.querySelector('.new-link-url');
const newLinkButton = document.querySelector('.new-link-button');
const clearStorageButton = document.querySelector('.clear-storage');

//DOM APIs
const parser = new DOMParser(); //instanciar el objeto para convertir de String a html
const { shell } = require('electron'); //requiendo el objeto para interactual con el SO
const findTitle = (nodes) => {
    return nodes.querySelector('title').innerText;
}

const clearForm = () => {
    newLinkUrl.value = '';
}

const storeLink = (title, url) => { //funcion para almacenar datos en el localStorage
    const datos = { title, url };
    localStorage.setItem(url, JSON.stringify(datos));
}

const createLinkElement = link => { //creando template para agregar elementos
    return `
    <div>
        <p class="text-white">${link.title}</p>
        <p>
            <a href="${link.url}">${link.url}</a>
        </p>
    </div>
    `;
}

const handleError = (url) => { //mostrando error
    errorMessage.innerHTML = `<div class="alert alert-danger" role="alert">
    <strong>Opss.. no se puedo encontrar ${url}</strong>
    </div>`
    setInterval(() => { //intervalo para borrar la alerta 
        errorMessage.innerHTML = null
    }, 5000);
}

const getLinks = () => { //obteniendo los keys del localStorage
    return Object.keys(localStorage).map(key => JSON.parse(localStorage.getItem(key))); //recorrido el localStrorage
}

const renderLinks = () => { //almacenando en un array y uniendolos para agregarlos en section con clase .links
    const linksElements = getLinks().map(createLinkElement).join();
    LinksSection.innerHTML = linksElements;
}

renderLinks(); //inicializando la funcion para cargar al momento de abrir el programa

const parserResponse = text => { //funcion para convertir de string a formato html
    const parser_text = parser.parseFromString(text, 'text/html'); //API de la conversion
    return parser_text;
}

//Events
newLinkUrl.addEventListener('keyup', () => {
    newLinkButton.disabled = !newLinkUrl.validity.valid; //validando el input
});

newLinkForm.addEventListener('submit', async(e) => {
    e.preventDefault();
    const url = newLinkUrl.value;
    await fetch(url)
        .then((result) => {
            return result; //retornando la respuesta
        })
        .then((response) => {
            return response.text(); //convirtiendo a string
        })
        .then((text) => {
            const html = parserResponse(text);
            const title = findTitle(html);
            storeLink(title, url);
            renderLinks();
            clearForm();
        })
        .catch((err) => {
            handleError(url);
            console.log('error: ', err); //imprimiendo errores
        });
});

clearStorageButton.addEventListener('click', () => {
    localStorage.clear(); //borrando los datos el localStorage
    LinksSection.innerHTML = ""; //limpiando el contenedor de links
})

LinksSection.addEventListener('click', (e) => {
    if (e.target.href) { //validando si se presiono un link 
        e.preventDefault();
        shell.openExternal(e.target.href); //abrir el navegador por defecto
    }
})