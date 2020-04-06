// const file = document.getElementById('file');
// const form = document.querySelector('.form');
// const nombre = document.querySelector('.nombre');
// file.addEventListener('change', () => {
//     // const formData = new FormData(form);
//     // const image = formData.get('file');
//     // const img = URL.createObjectURL(image);
//     // console.log(img);
// });

// nombre.addEventListener('keyup', (e) => {
//     console.log(e.target.value);
// });



function getBase64Image(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    var dataURL = canvas.toDataURL();
    return dataURL;
}

const form = document.querySelector('.form');
const file = document.getElementById('file');

file.addEventListener('change', async() => {
    const formData = new FormData(form);
    const img = formData.get('file');
    const image = URL.createObjectURL(img);
    const imge = document.createElement('img');
    imge.className = 'img'
    imge.setAttribute('src', image);
    form.appendChild(imge);
    var base64 = await getBase64Image(document.querySelector(".img"));
    console.log(base64);
});