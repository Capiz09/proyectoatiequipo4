require('offline-plugin/runtime').install();
import barba from '@barba/core';
import anime from 'animejs/lib/anime.es.js';
import { avanzarCarrusel, retrocederCarrusel, solicitarDatos, videojuegos } from './js/auxiliar';
import { saliente, entrante } from './js/objetos-funciones';
import './styles.scss';

const contenedorMenu = document.querySelector('.container_menu');
const navLinks = document.querySelector('.nav_links');
const links = document.querySelectorAll('.nav_links li');
const etiqueta = document.querySelector('#etiqueta-usuario');
const loginElementos = document.querySelectorAll('.login');
const boton = document.querySelector('#solicitar');
const datoEmail = document.querySelector('#email');
const datoPass = document.querySelector('#password');

let token = [];

contenedorMenu.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

for (let l of links) {
  l.addEventListener('click', (e) => {
    e.preventDefault();
    navLinks.classList.remove('open');
  });
}

let datoLlave = sessionStorage.getItem('llave');

if (datoLlave) {
  for (let l of loginElementos) {
    l.classList.toggle('closed');
  }

  etiqueta.classList.toggle('open');
  etiqueta.textContent = `¡Bienvenido! ${sessionStorage.getItem('nombre')}`;

} else {
  boton.addEventListener('click', async (e) => {
    e.preventDefault();
    let t = await solicitarDatos(datoEmail, datoPass);
    token.push(t.token);
    if (token[ token.length - 1 ] !== undefined) {
      for (let l of loginElementos) {
        l.classList.toggle('closed');
      }
      etiqueta.classList.toggle('open');
      let llave = token[ token.length - 1 ];
      sessionStorage.setItem('llave', `${llave}`);
      sessionStorage.setItem('nombre', `${t.usuario}`);
      etiqueta.textContent = `¡Bienvenido! ${sessionStorage.getItem('nombre')}`;
    }
  });
}

barba.init({
  transitions: [ {
    name: 'transicion-por-defecto',
    from: {},
    to: {},
    sync: false,
    leave(data) { saliente(data) },
    enter(data) { entrante(data) }
  } ],

  // Inicio de las vistas

  views: [ {

    // Vista 'galeria'

    namespace: 'galeria',
    beforeEnter(data) {
      const botonAvanzar = data.next.container.querySelector('.btnNext');
      const botonRetroceder = data.next.container.querySelector('.btnBack');
      const carruselImagenes = data.next.container.querySelector('.carrusel_imagenes');
      // const elemento = data.next.container.querySelector('.carrusel_imagenes');

      botonAvanzar.addEventListener('click', () => { avanzarCarrusel(carruselImagenes) });
      botonRetroceder.addEventListener('click', () => { retrocederCarrusel(carruselImagenes) });
    },
  },

  // Vista 'home'

  {
    namespace: 'home',
    afterEnter(data) {
      const texto = [ 'Enjoy the page!!  ', 'Escribenos  ', 'Bienvenidos!!     ' ];
      const letrero = data.next.container.querySelector('.letrero');
      const divJuego = data.next.container.querySelector('.videojuegos-content');
      const botonJuego = data.next.container.querySelector('#mostrar-juego');
      const botonFormulario = data.next.container.querySelector('#item-contacto-button');
      const inputTexto = data.next.container.querySelector('#item-contacto-texto');
      const inputEmail = data.next.container.querySelector('#item-contacto-email');
      const inputTarea = data.next.container.querySelector('#item-contacto-tarea');
      const labelTexto = data.next.container.querySelector('.label-item-contacto-nombre');
      const labelEmail = data.next.container.querySelector('.label-item-contacto-email');
      const labelTarea = data.next.container.querySelector('.label-item-contacto-comentario');
      const label = data.next.container.querySelector('h3');

      let index = 0;
      let contador = 0;
      let i = 0;

      const typing = () => {
        let tex = texto[ contador ].slice(0, index);
        letrero.textContent = tex;
        index++;
        if (index > texto[ contador ].length) {
          index = 0;
          contador++;
        }
        if (contador === texto.length) {
          contador = 0;
        }
      };
      setInterval(typing, 200);

      botonJuego.addEventListener('click', async (e) => {
        e.preventDefault();

        let restriccion = await videojuegos(divJuego, i);
        (i > restriccion.length - 2) ? i = 0 : i++;
        botonJuego.textContent = `Siguiente Juego`;
      });


      botonFormulario.addEventListener('click', (e) => {
        e.preventDefault();
        if (inputEmail.value.includes('@') && inputTarea.value != "") {
          label.textContent = ' Gracias por tus comentarios';
          inputTexto.style.display = 'none';
          inputEmail.style.display = 'none';
          inputTarea.style.display = 'none';
          labelTexto.style.display = 'none';
          labelEmail.style.display = 'none';
          labelTarea.style.display = 'none';
          botonFormulario.style.display = 'none';
        }
      });
      inputTexto.addEventListener('focus', () => {
        labelTexto.classList.add('open');
      });
      inputTexto.addEventListener('blur', () => {
        if (inputTexto.value == "") {
          labelTexto.classList.remove('open');
        }
      });
      inputEmail.addEventListener('focus', () => {
        labelEmail.classList.add('open');
      });
      inputEmail.addEventListener('blur', () => {
        if (inputEmail.value == "") {
          labelEmail.classList.remove('open');
        }
      });
      inputTarea.addEventListener('focus', () => {
        labelTarea.classList.add('open');
      });
      inputTarea.addEventListener('blur', () => {
        if (inputTarea.value == "") {
          labelTarea.classList.remove('open');
        }
      });
    },
  },

  // Vista 'proyectos'

  {
    namespace: 'proyectos',
    afterEnter(data) {

    },
  } ],
});

