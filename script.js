

const menuToggler = document.querySelector('.menu-toggler');
const sideBar = document.querySelector('.side-bar');

const navItemLinks = document.querySelectorAll('.nav li a');
const pages = document.querySelectorAll('.page');

const filterBtn = document.querySelectorAll('.filter-item');
const itemCategory = document.querySelectorAll('.item-category');

/*Slidebar Toggle*/ 

menuToggler.addEventListener('click', function(){
    sideBar.classList.toggle('active');
})

/* Page Navigation Functionality */

for(let i = 0; i < navItemLinks.length; i++){
    navItemLinks[i].addEventListener('click', function(){

        const itemLinkText = this.textContent.toLowerCase();

        for(let i = 0; i < pages.length; i++){
            if(pages[i].classList.contains(itemLinkText)){
                pages[i].classList.add('active');
                navItemLinks[i].classList.add('active');
            }else{
                pages[i].classList.remove('active');
                navItemLinks[i].classList.remove('active');
            }
        }
    });
}

/* Adding eventlistener in filter buttons */

for(let i = 0; i < filterBtn.length; i++){
    filterBtn[i].addEventListener('click', function(){
        for(let i = 0; i < filterBtn.length; i++){
            filterBtn[i].classList.remove('active');
        }
        this.classList.add('active');

        for(let i = 0; i < itemCategory.length; i++){
            const itemCategoryText = itemCategory[i].textContent;
            switch(this.textContent){
                case itemCategoryText:
                    itemCategory[i].parentElement.classList.add('active');
                    break;
                case 'All':
                    itemCategory[i].parentElement.classList.add('active');
                    break;
                default:
                    itemCategory[i].parentElement.classList.remove('active');
            }
        }
    });
}

//esta parte es para actualizaciones
//en este caso es para efecto rellenar de parrafo que puedo hacer
var words = [
    'ayudar',
    'contribuir',
    'resolver',
    'crear',
    'mejorar',
    'actuar',
    'aprender',
    'explorar',
    'innovar',
    'transformar',
    'decidir',
    'colaborar'
];

var letters = "abcdefghijklmnopqrstuvwxyz#%&^+=-",
    speed = 250,
    steps = 4,
    loader = document.querySelector('#loader'),
    dynamicWord = document.querySelector('#dynamic-word'); // Aquí seleccionamos el span

function getRandomWord() {
    var randomWord = words[Math.floor(Math.random() * words.length)];
    return randomWord;
}

function getRandomLetter() {
    var randomLetter = letters[Math.floor(Math.random() * letters.length)];
    return randomLetter;
}

function randomWordLoop() {
    var word = getRandomWord();
    var textLength = word.length;
    for(var i = 0; i < textLength; i++) {    
        (function(i, word){
            letterAppear(i, word);
        })(i, word);
    }

    function letterAppear(i, word) {
        setTimeout(function() {
            randomLetters(i, word);
        }, speed * i);  
    }

    function randomLetters(i, word) {
        for (var j = 0; j <= steps; j++) {
            charsAnim(i, word, j);
        }
    }

    function charsAnim(i, word, j) {
        setTimeout(function() {
            var count = j; 
            if (j < steps) {           
                randomChar(i, word, count, j);
            } else {
                goodChar(i, word, count, j);
            }
        }, ((speed / steps) * j) - (speed / steps));
    }

    function randomChar(i, word, count, j) {
        var letter = getRandomLetter();    
        if (j > 0) {
            var oldText = dynamicWord.textContent.slice(0, -1);
        } else {
            var oldText = dynamicWord.textContent;
        }
        dynamicWord.textContent = oldText + letter;    
    }

    function goodChar(i, word, count, j) {
        var oldText = dynamicWord.textContent.slice(0, -1);  
        dynamicWord.textContent = oldText + word[i];
        if (i == textLength - 1) {
            removeWord();
        }
    }

    function removeWord() {
        setTimeout(function() {
            for (var k = 0; k < textLength; k++) {
                removeLetters(k);
            }
        }, speed * 2);
    }

    function removeLetters(k) {
        setTimeout(function() {
            removeLetter(k);
        }, 75 * k);
    }

    function removeLetter(k) {
        var actualText = dynamicWord.textContent.slice(0, -1);
        dynamicWord.textContent = actualText;
        if (k == textLength - 1) {
            randomWordLoop();
        }
    }
}

randomWordLoop();

//para correo electronico funcional

document.addEventListener("DOMContentLoaded", function () {

    // Esta función se ejecuta cuando el usuario hace clic en "Enviar correo desde Gmail"
    document.getElementById('send-gmail').addEventListener('click', function(event) {
        event.preventDefault(); // Evitar que recargue la página o navegue al 'href'

        // Obtener los valores del formulario
        const fullName = document.getElementById('full_name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;

        // Codificar los valores para la URL (esto asegura que los caracteres especiales se manejen correctamente)
        const encodedFullName = encodeURIComponent(fullName);
        const encodedEmail = encodeURIComponent(email);
        const encodedSubject = encodeURIComponent(subject);
        const encodedMessage = encodeURIComponent(message);

        // Construir el enlace mailto con los valores del formulario
        const mailtoLink = `https://mail.google.com/mail/?view=cm&fs=1&to=jaredospina2013@gmail.com&su=${encodedSubject}&body=Nombre:%20${encodedFullName}%0ACorreo Origen:%20${encodedEmail}%0AMensaje:%20${encodedMessage}`;

        // Mostrar el enlace generado (para pruebas)
        console.log(mailtoLink);

        // Intentar abrir Gmail en una nueva pestaña
        window.open(mailtoLink, '_blank');
    });

    // Esta función se ejecuta cuando el usuario hace clic en "Otra acción"
    document.getElementById('another-action').addEventListener('click', function(event) {
        event.preventDefault(); // Evitar que recargue la página o navegue al 'href'

        // Aquí puedes agregar la lógica para la otra acción, como enviar el formulario a otro destino, hacer una llamada a una API, etc.
        console.log('Se realizó otra acción.'); // Ejemplo de otra acción, en este caso solo mostramos un mensaje en la consola.
    });

});

//parte de galeria portafolio

// Filtrar imágenes por categorías
// Filtrado de imágenes y videos
const filterButtons = document.querySelectorAll('.filter-buttons button');
const images = document.querySelectorAll('.img_gallery');
const videos = document.querySelectorAll('.video_gallery');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter');

        // Quitar la clase 'active' de todos los botones
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        // Filtrar imágenes
        images.forEach(image => {
            const categories = image.getAttribute('data-category')?.split(' ') || [];
            image.style.display = (filter === 'all' || categories.includes(filter)) ? '' : 'none';
        });

        // Filtrar videos
        videos.forEach(video => {
            const categories = video.getAttribute('data-category')?.split(' ') || [];
            video.style.display = (filter === 'all' || categories.includes(filter)) ? '' : 'none';
        });
    });
});


// Lightbox (ver imagen en grande)
const gallery = document.querySelector('.gallery_portafolio');
const lightbox = document.querySelector('.lightbox');
const lightboxImg = document.querySelector('.lightbox-img');
const closeBtn = document.querySelector('.close-btn');
const downloadBtn = document.querySelector('.download-btn');

let scale = 1;
let isDragging = false;
let startX = 0, startY = 0;
let translateX = 0, translateY = 0;

// Función para centrar la imagen
function centerImage() {
    lightboxImg.style.transform = `scale(${scale}) translate(0px, 0px)`;
    translateX = 0;
    translateY = 0;
}

// Mostrar imagen en el lightbox
gallery.addEventListener('click', (e) => {
    if (e.target.classList.contains('img_gallery')) {
        lightbox.style.display = 'flex';
        lightboxImg.src = e.target.src;
        downloadBtn.href = e.target.src;

        // Esperar a que la imagen cargue y centrarla
        lightboxImg.onload = () => {
            centerImage();
        };

        // Resetear transformaciones
        scale = 1;
    }
});

// Cerrar lightbox
closeBtn.addEventListener('click', () => {
    lightbox.style.display = 'none';
});

// Descargar imagen
downloadBtn.addEventListener('click', () => {
    const link = document.createElement('a');
    link.href = lightboxImg.src;
    link.download = 'image.jpg';
    link.click();
});

// Cerrar lightbox al hacer clic fuera de la imagen
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        lightbox.style.display = 'none';
    }
});

// Zoom con scroll
lightboxImg.addEventListener('wheel', (e) => {
    e.preventDefault();

    let zoomSpeed = 0.1;
    let maxScale = 3;
    let minScale = 1;

    // Ajustar la escala
    scale += e.deltaY > 0 ? -zoomSpeed : zoomSpeed;
    scale = Math.min(maxScale, Math.max(minScale, scale));

    // Aplicar transformación
    lightboxImg.style.transform = `scale(${scale}) translate(${translateX}px, ${translateY}px)`;
});

// Detectar cuando se empieza a arrastrar
lightboxImg.addEventListener('mousedown', (e) => {
    if (scale > 1) {
        isDragging = true;
        startX = e.clientX - translateX;
        startY = e.clientY - translateY;
        lightboxImg.style.cursor = 'grabbing';
    }
});

// Detectar cuando se suelta el mouse
document.addEventListener('mouseup', () => {
    isDragging = false;
    lightboxImg.style.cursor = 'grab';

});

// Movimiento al arrastrar la imagen
document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;

    translateX = e.clientX - startX;
    translateY = e.clientY - startY;

    lightboxImg.style.transform = `scale(${scale}) translate(${translateX}px, ${translateY}px)`;
});

// Recalcular posición cuando se redimensiona la ventana
window.addEventListener('resize', () => {
    if (lightbox.style.display === 'flex') {
        centerImage();
    }
});

//------------------------------------------------------------
// 
// //ESTRUCTURA FUNCION DE SLIDER COMPARACIÓN DE IMAGEN

// Seleccionamos todos los sliders y sus líneas
const sliders = document.querySelectorAll(".slider");

sliders.forEach(slider => {
    slider.addEventListener("input", function () {
        const parent = slider.closest('.before-after'); // Buscamos el contenedor padre
        const frontImage = parent.querySelector(".front-img");
        const sliderLine = parent.querySelector(".slider-line");
        const value = this.value;

        // Cambia el clip-path de la imagen frontal
        frontImage.style.clipPath = `polygon(0 0, ${value}% 0, ${value}% 100%, 0% 100%)`;

        // Mueve la línea vertical
        sliderLine.style.left = `${value}%`;
    });
});

//------------------------------------------------------------------------------------
//ENCENDER EN GALERIA LOS DE EFECTO SLIDER PARA MOVILES, EVENTO DE CLICK
// Obtener todas las imágenes con la clase .lusido
const lusidoImages = document.querySelectorAll('.lusido');

// Función para cambiar el filtro de las imágenes
function applyFullColorFilter(image2) {
    console.log("Evento activado en:", image2); // Depuración
    image2.style.filter = 'grayscale(0%) brightness(1)';
}

// Función para restablecer los filtros
function resetFilters() {
    lusidoImages.forEach(image2 => {
        image2.style.filter = 'grayscale(100%) brightness(0.5)';
    });
}

// Aplicar eventos a cada imagen con la clase .lusido
lusidoImages.forEach(image2 => {
    // Evento para clic (desktop y móviles)
    image2.addEventListener('click', (e) => {
        e.stopPropagation(); // Evita que el evento se propague a otros elementos
        applyFullColorFilter(image2);
    });

    // Evento para touch (móviles)
    image2.addEventListener('touchstart', (e) => {
        e.stopPropagation(); // Evita que el evento se propague a otros elementos
        applyFullColorFilter(image2);
    });

    // Evento para mouseenter (hover)
    image2.addEventListener('mouseenter', () => {
        applyFullColorFilter(image2);
    });

    // Evento para mouseleave (salida del hover)
    image2.addEventListener('mouseleave', () => {
        resetFilters();
    });
});

// Escuchar clics en cualquier parte del documento
document.addEventListener('click', (e) => {
    // Verificar si el clic no ocurrió en una imagen con la clase .lusido
    if (!e.target.classList.contains('lusido')) {
        resetFilters(); // Restablecer los filtros
    }
});

// Escuchar toques en cualquier parte del documento (para dispositivos móviles)
document.addEventListener('touchstart', (e) => {
    // Verificar si el toque no ocurrió en una imagen con la clase .lusido
    if (!e.target.classList.contains('lusido')) {
        resetFilters(); // Restablecer los filtros
    }
});
