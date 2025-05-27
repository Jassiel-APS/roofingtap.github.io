document.addEventListener('DOMContentLoaded', () => {
    const carruseles = document.querySelectorAll('.carrusel-personalizado');
    
    carruseles.forEach(carrusel => {
        const contenedor = carrusel.querySelector('.carrusel-contenedor');
        const items = carrusel.querySelectorAll('.carrusel-item');
        const indicadoresContainer = carrusel.querySelector('.carrusel-indicadores');
        const botonAnterior = carrusel.querySelector('.carrusel-boton.anterior');
        const botonSiguiente = carrusel.querySelector('.carrusel-boton.siguiente');
        let indiceActual = 0;
        let intervalo;
        const itemsPorVista = 2; // Número de imágenes a mostrar a la vez

        // Generar puntos indicadores dinámicamente
        function generarIndicadores() {
            indicadoresContainer.innerHTML = '';
            
            // Crear un indicador por cada par de items (ya que mostramos 2 a la vez)
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
            // Calculamos el desplazamiento basado en el índice actual
            // Como cada item ocupa 50%, movemos un 50% por cada paso
            contenedor.style.transform = `translateX(-${indiceActual * 50}%)`;
            
            // Actualizar puntos indicadores
            const puntos = carrusel.querySelectorAll('.carrusel-punto');
            puntos.forEach((p, i) => {
                p.classList.toggle('activo', i === indiceActual);
            });
        }

        function iniciarIntervalo() {
            detenerIntervalo();
            intervalo = setInterval(() => {
                // Avanzamos de uno en uno, pero mostrando 2 imágenes
                indiceActual = (indiceActual + 1) % (items.length - itemsPorVista + 1);
                actualizarCarrusel();
            }, 5000);
        }

        function detenerIntervalo() {
            if (intervalo) {
                clearInterval(intervalo);
            }
        }

        // Event listeners para botones
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

        // Generar los indicadores iniciales
        generarIndicadores();
        
        // Iniciar el carrusel
        actualizarCarrusel();
        iniciarIntervalo();

        // Pausar el carrusel cuando el mouse está sobre él
        carrusel.addEventListener('mouseenter', detenerIntervalo);
        carrusel.addEventListener('mouseleave', iniciarIntervalo);
    });
});