const menuToggler = document.querySelector('.menu-toggler, .icono_menu_amburguesa');
const sideBar = document.querySelector('.side-bar');

const iconoHamburguesa = document.getElementById('iconoHamburguesa');
const iconoCerrar = document.getElementById('iconoCerrar');

const navItemLinks = document.querySelectorAll('.nav li a');
const pages = document.querySelectorAll('.page');

const filterBtn = document.querySelectorAll('.filter-item');
const itemCategory = document.querySelectorAll('.item-category');

const elemento = document.querySelector ('.icono_escala');

elemento.addEventListener('mouseenter', function() {
    elemento.style.transition = 'transform 0.2s ease, fill 0.3s ease';
    elemento.setAttribute('fill', '#fff');
    iconoHamburguesa.setAttribute('fill', '#fff');
    elemento.style.transform = 'scale(1.2)';  // Aumentamos un 10% el tamaño
});

// Cuando el mouse sale del área del elemento, volvemos al tamaño original
elemento.addEventListener('mouseleave', function() {
    elemento.style.transition = 'transform 0.2s ease, fill 0.3s ease';
    elemento.setAttribute('fill', '#d5d5d5');
    iconoHamburguesa.setAttribute('fill', '#d5d5d5');
    elemento.style.transform = 'scale(1)';  // Volvemos al tamaño original
});


let rotation = 0; // Variable para acumular grados de rotación

menuToggler.addEventListener('click', function () {
       // Alternamos el valor de rotación entre 0 y 180 grados
    rotation = rotation === 0 ? 180 : 0; 

    // Primero, hacemos más pequeño los íconos (efecto escala)
    iconoHamburguesa.style.transform = `scale(0.5) rotate(${rotation}deg)`;
    iconoCerrar.style.transform = `scale(0.5) rotate(${rotation}deg)`; // Rotamos 180 grados más para el ícono de cerrar

    // Añadimos un pequeño retraso para que la escala termine antes de rotar
    setTimeout(function () {
        // Alternamos el menú
        sideBar.classList.toggle('active');

        // Cuando el menú está activo (abierto), mostramos el ícono de cerrar y ocultamos el de hamburguesa
        if (sideBar.classList.contains('active')) {
            iconoHamburguesa.style.opacity = '0';
            iconoCerrar.style.opacity = '1';
        } else {
            iconoHamburguesa.style.opacity = '1';
            iconoCerrar.style.opacity = '0';
        }

        // Ahora, restauramos la escala a 1 para que se vea el ícono en su tamaño original
        iconoHamburguesa.style.transition = 'transform 0.2s ease';
        iconoCerrar.style.transition = 'transform 0.2s ease';
        iconoHamburguesa.style.transform = `rotate(${rotation + 180}deg) scale(1)`;
        iconoCerrar.style.transform = `rotate(${rotation - 180}deg) scale(1)`;
    }, 80); // El tiempo del retraso es el mismo que el de la animación de escala
});

/* Page Navigation Functionality (Arreglado para Traducciones) */
navItemLinks.forEach(link => {
    link.addEventListener('click', function () {
        navItemLinks.forEach(nav => nav.classList.remove('active'));
        this.classList.add('active');
    });
});

/* Adding event listener in filter buttons */
filterBtn.forEach(button => {
    button.addEventListener('click', function () {
        filterBtn.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');

        itemCategory.forEach(item => {
            const categories = item.textContent.trim().toLowerCase();
            if (this.textContent.toLowerCase() === "all" || categories.includes(this.textContent.toLowerCase())) {
                item.parentElement.classList.add('active');
            } else {
                item.parentElement.classList.remove('active');
            }
        });
    });
});

/* Efecto de palabras aleatorias en el loader */
var words = [
    'ayudar', 'contribuir', 'resolver', 'crear', 'mejorar', 'actuar',
    'aprender', 'explorar', 'innovar', 'transformar', 'decidir', 'colaborar'
];

var letters = "abcdefghijklmnopqrstuvwxyz#%&^+=-",
    speed = 250,
    steps = 4,
    loader = document.querySelector('#loader'),
    dynamicWord = document.querySelector('#dynamic-word');

function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)];
}

function getRandomLetter() {
    return letters[Math.floor(Math.random() * letters.length)];
}

function randomWordLoop() {
    var word = getRandomWord();
    var textLength = word.length;
    for (var i = 0; i < textLength; i++) {
        (function (i, word) {
            letterAppear(i, word);
        })(i, word);
    }

    function letterAppear(i, word) {
        setTimeout(function () {
            randomLetters(i, word);
        }, speed * i);
    }

    function randomLetters(i, word) {
        for (var j = 0; j <= steps; j++) {
            charsAnim(i, word, j);
        }
    }

    function charsAnim(i, word, j) {
        setTimeout(function () {
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
        var oldText = j > 0 ? dynamicWord.textContent.slice(0, -1) : dynamicWord.textContent;
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
        setTimeout(function () {
            for (var k = 0; k < textLength; k++) {
                removeLetters(k);
            }
        }, speed * 2);
    }

    function removeLetters(k) {
        setTimeout(function () {
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

/* Funcionalidad para enviar correo a Gmail */
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById('send-gmail')?.addEventListener('click', function (event) {
        event.preventDefault();
        const fullName = encodeURIComponent(document.getElementById('full_name').value);
        const email = encodeURIComponent(document.getElementById('email').value);
        const subject = encodeURIComponent(document.getElementById('subject').value);
        const message = encodeURIComponent(document.getElementById('message').value);
        const mailtoLink = `https://mail.google.com/mail/?view=cm&fs=1&to=jaredospina2013@gmail.com&su=${subject}&body=Nombre:%20${fullName}%0ACorreo Origen:%20${email}%0AMensaje:%20${message}`;
        window.open(mailtoLink, '_blank');
    });
});

/* Galería de Portafolio */
const filterButtons = document.querySelectorAll('.filter-buttons button');
const images = document.querySelectorAll('.img_gallery');
const videos = document.querySelectorAll('.video_gallery');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter');
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        images.forEach(image => {
            image.style.display = (filter === 'all' || image.getAttribute('data-category')?.includes(filter)) ? '' : 'none';
        });

        videos.forEach(video => {
            video.style.display = (filter === 'all' || video.getAttribute('data-category')?.includes(filter)) ? '' : 'none';
        });
    });
});

/* Lightbox para imágenes */
const gallery = document.querySelector('.gallery_portafolio');
const lightbox = document.querySelector('.lightbox');
const lightboxImg = document.querySelector('.lightbox-img');
const closeBtn = document.querySelector('.close-btn');
const downloadBtn = document.querySelector('.download-btn');

let scale = 1, isDragging = false, startX = 0, startY = 0, translateX = 0, translateY = 0;

gallery.addEventListener('click', (e) => {
    if (e.target.classList.contains('img_gallery')) {
        lightbox.style.display = 'flex';
        lightboxImg.src = e.target.src;
        downloadBtn.href = e.target.src;
        lightboxImg.onload = () => { centerImage(); };
        scale = 1;
    }
});

closeBtn.addEventListener('click', () => { lightbox.style.display = 'none'; });

downloadBtn.addEventListener('click', () => {
    const link = document.createElement('a');
    link.href = lightboxImg.src;
    link.download = 'image.jpg';
    link.click();
});

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        lightbox.style.display = 'none';
    }
});

lightboxImg.addEventListener('wheel', (e) => {
    e.preventDefault();
    scale += e.deltaY > 0 ? -0.1 : 0.1;
    scale = Math.min(3, Math.max(1, scale));
    lightboxImg.style.transform = `scale(${scale}) translate(${translateX}px, ${translateY}px)`;
});

lightboxImg.addEventListener('mousedown', (e) => {
    if (scale > 1) {
        isDragging = true;
        startX = e.clientX - translateX;
        startY = e.clientY - translateY;
        lightboxImg.style.cursor = 'grabbing';
    }
});

document.addEventListener('mouseup', () => {
    isDragging = false;
    lightboxImg.style.cursor = 'grab';
});

document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    translateX = e.clientX - startX;
    translateY = e.clientY - startY;
    lightboxImg.style.transform = `scale(${scale}) translate(${translateX}px, ${translateY}px)`;
});

window.addEventListener('resize', () => {
    if (lightbox.style.display === 'flex') {
        centerImage();
    }
});

function centerImage() {
    lightboxImg.style.transform = `scale(${scale}) translate(0px, 0px)`;
    translateX = 0;
    translateY = 0;
}

/* Slider de comparación de imágenes */
const sliders = document.querySelectorAll(".slider");

sliders.forEach(slider => {
    slider.addEventListener("input", function () {
        const parent = slider.closest('.before-after');
        const frontImage = parent.querySelector(".front-img");
        const sliderLine = parent.querySelector(".slider-line");
        const value = this.value;

        frontImage.style.clipPath = `polygon(0 0, ${value}% 0, ${value}% 100%, 0% 100%)`;
        sliderLine.style.left = `${value}%`;
    });
});
/* Modo Lusido para móviles */
const lusidoImages = document.querySelectorAll('.lusido');

function applyFullColorFilter(image) {
    console.log("Evento activado en:", image);
    image.style.filter = 'grayscale(0%) brightness(1)';
    image.style.transform = 'scale(1.1)'; // Escala la imagen al 110%
    image.style.zIndex = '1000'; // Asegura que la imagen esté por encima de otros elementos
}

function resetFilters() {
    lusidoImages.forEach(image => {
        image.style.filter = 'grayscale(100%) brightness(0.5)';
        image.style.transform = 'scale(1)'; // Restablece la escala a su tamaño original
        image.style.zIndex = '1'; // Restablece el z-index al valor inicial
    });
}

lusidoImages.forEach(image => {
    // Evento para clic (desktop)
    image.addEventListener('click', (e) => {
        e.stopPropagation();
        applyFullColorFilter(image);
    });

    // Evento para touch (móviles)
    image.addEventListener('touchstart', (e) => {
        e.stopPropagation();
        applyFullColorFilter(image);
    });

    // Evento para mouseenter (hover)
    image.addEventListener('mouseenter', () => {
        applyFullColorFilter(image);
    });

    // Evento para mouseleave (salida del hover)
    image.addEventListener('mouseleave', () => {
        resetFilters();
    });
});

// Escuchar clics en cualquier parte del documento
document.addEventListener('click', (e) => {
    if (!e.target.classList.contains('lusido')) {
        resetFilters();
    }
});

// Escuchar toques en cualquier parte del documento (para dispositivos móviles)
document.addEventListener('touchstart', (e) => {
    if (!e.target.classList.contains('lusido')) {
        resetFilters();
    }
});