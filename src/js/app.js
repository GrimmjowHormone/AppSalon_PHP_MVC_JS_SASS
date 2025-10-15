let paso = 1;
const pasoInicial = 1;
const pasoFinal = 3;
document.addEventListener('DOMContentLoaded', function () {
    iniciarApp();
})


function iniciarApp() {
    mostrarSeccion()
    tabs();//cambia la seccion cuando se presionan los tabs
    paginador();//agrega o quita los botones del paginador
    paginaSiguiente()
    paginaAnterior()
}

function mostrarSeccion() {
    //ocultar la seccion que tenga la clase d emostrar
    const seccionAnterior = document.querySelector('.mostrar');
    if (seccionAnterior) {
        seccionAnterior.classList.remove("mostrar");

    }
    //seleccionar la sección con el paso...
    const seccion = document.querySelector(`#paso-${paso}`);
    seccion.classList.add('mostrar')


    //tab anterior
    const tabAnterior = document.querySelector('.actual');
    if (tabAnterior) {
        tabAnterior.classList.remove('actual')
    }
    //Resalta el tab actual
    const tab = document.querySelector(`[data-paso="${paso}"]`);
    tab.classList.add('actual');

}

function tabs() {
    const botones = document.querySelectorAll('.tabs button');
    botones.forEach((boton) => {
        boton.addEventListener('click', function (e) {
            paso = parseInt(e.target.dataset.paso)
            mostrarSeccion()
            paginador();//agrega o quita los botones del paginador

        })
    })
}

function paginador() {
    const paginaAnterior = document.querySelector('#anterior');
    const paginaSiguiente = document.querySelector('#siguiente');

    if (paso === 1) {
        paginaAnterior.classList.add('ocultar')
        paginaSiguiente.classList.remove('ocultar')
    } else if (paso === 3) {
        paginaAnterior.classList.remove('ocultar')
        paginaSiguiente.classList.add('ocultar')


    } else {
        paginaSiguiente.classList.remove('ocultar')
        paginaAnterior.classList.remove('ocultar')

    }

}

function paginaAnterior() {
    const paginaAnterior = document.querySelector('#anterior');
    paginaAnterior.addEventListener('click', function () {
        if (paso <= pasoInicial) return;
        paso--
        paginador()
        mostrarSeccion()
    })
}
function paginaSiguiente() {
    const paginaSiguiente = document.querySelector('#siguiente');
    paginaSiguiente.addEventListener('click', function () {
        if (paso >= pasoFinal) return;
        paso++
        paginador()
        mostrarSeccion()
    })
}
