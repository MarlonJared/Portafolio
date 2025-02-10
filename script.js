

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

