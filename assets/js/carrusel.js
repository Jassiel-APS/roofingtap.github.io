// carrusel.js

import { carruselConfig, cargarImagenesDeCarpeta } from './carrusel-config.js';

document.addEventListener('DOMContentLoaded', async () => {
  // Inicializar carruseles
  await inicializarCarrusel('proyectos', carruselConfig.proyectos);
  await inicializarCarrusel('destacados', carruselConfig.destacados);

  // Función para inicializar cada carrusel
  async function inicializarCarrusel(tipo, config) {
    const carrusel = document.getElementById(`carrusel-${tipo}`);
    const contenedor = carrusel.querySelector('.carrusel-contenedor');

    // 1. Cargar imágenes
    let imagenes = [...config.defaultImages];

    if (config.useDynamic) {
      const imagenesAdicionales = cargarImagenesDeCarpeta(config.dynamicFolder);
      imagenes = [...imagenes, ...imagenesAdicionales];
    }

    // 2. Generar items del carrusel
    contenedor.innerHTML = '';
    imagenes.forEach((src, index) => {
      const item = document.createElement('div');
      item.className = 'carrusel-item';
      item.innerHTML = `
        <img src="${src}" alt="Proyecto ${index + 1}" class="img-fluid rounded">
      `;
      contenedor.appendChild(item);
    });

    // 3. Inicializar funcionalidad del carrusel
    inicializarFuncionalidadCarrusel(carrusel);
  }

  // Función para la funcionalidad del carrusel
  function inicializarFuncionalidadCarrusel(carrusel) {
    const contenedor = carrusel.querySelector('.carrusel-contenedor');
    const items = carrusel.querySelectorAll('.carrusel-item');
    const indicadoresContainer = carrusel.querySelector('.carrusel-indicadores');
    const botonAnterior = carrusel.querySelector('.carrusel-boton.anterior');
    const botonSiguiente = carrusel.querySelector('.carrusel-boton.siguiente');
    let indiceActual = 0;
    let intervalo;
    const itemsPorVista = 2;

    function generarIndicadores() {
      indicadoresContainer.innerHTML = '';
      for (let i = 0; i < items.length - itemsPorVista + 1; i++) {
        const punto = document.createElement('span');
        punto.classList.add('carrusel-punto');
        if (i === 0) punto.classList.add('activo');
        punto.addEventListener('click', () => {
          indiceActual = i;
          actualizarCarrusel();
          iniciarIntervalo();
        });
        indicadoresContainer.appendChild(punto);
      }
    }

    function actualizarCarrusel() {
      contenedor.style.transform = `translateX(-${indiceActual * 50}%)`;
      const puntos = carrusel.querySelectorAll('.carrusel-punto');
      puntos.forEach((p, i) => {
        p.classList.toggle('activo', i === indiceActual);
      });
    }

    function iniciarIntervalo() {
      detenerIntervalo();
      intervalo = setInterval(() => {
        indiceActual = (indiceActual + 1) % (items.length - itemsPorVista + 1);
        actualizarCarrusel();
      }, 5000);
    }

    function detenerIntervalo() {
      if (intervalo) {
        clearInterval(intervalo);
      }
    }

    botonAnterior.addEventListener('click', () => {
      indiceActual = (indiceActual - 1 + (items.length - itemsPorVista + 1)) % (items.length - itemsPorVista + 1);
      actualizarCarrusel();
      iniciarIntervalo();
    });

    botonSiguiente.addEventListener('click', () => {
      indiceActual = (indiceActual + 1) % (items.length - itemsPorVista + 1);
      actualizarCarrusel();
      iniciarIntervalo();
    });

    generarIndicadores();
    actualizarCarrusel();
    iniciarIntervalo();

    carrusel.addEventListener('mouseenter', detenerIntervalo);
    carrusel.addEventListener('mouseleave', iniciarIntervalo);
  }
});
