let paso = 1;
const pasoInicial = 1;
const pasoFinal = 3;
const cita = {
    nombre: '',
    fecha: '',
    hora: '',
    servicios: []
}
document.addEventListener('DOMContentLoaded', function () {
    iniciarApp();
})


function iniciarApp() {
    mostrarSeccion()
    tabs();//cambia la seccion cuando se presionan los tabs
    paginador();//agrega o quita los botones del paginador
    paginaSiguiente()
    paginaAnterior()
    consultarApi()
    nombreCliente()//añade el nombre del cliente al objeto de cita
    seleccionarFecha()//agrega la fecha de la cita al objeto de cita
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

//consulta la api 
async function consultarApi() {
    try {
        const url = 'http://localhost:3000/api/servicios'
        const resultado = await fetch(url)
        const servicios = await resultado.json()
        mostrarServicios(servicios)
    } catch (error) {
        console.log(error)
    }
}

function mostrarServicios(servicios) {
    servicios.forEach(servicio => {
        const { id, nombre, precio } = servicio;
        const nombreServicio = document.createElement('P');
        nombreServicio.classList.add('nombre-servicio')
        nombreServicio.textContent = nombre
        const precioServicio = document.createElement('P');
        precioServicio.classList.add('precio-servicio')
        precioServicio.textContent = `$${precio}`

        const servicioDiv = document.createElement('DIV');
        servicioDiv.classList.add('servicio')
        servicioDiv.dataset.idServicio = id;
        servicioDiv.onclick = function () {
            seleccionarServicio(servicio)
        };
        servicioDiv.appendChild(nombreServicio)
        servicioDiv.appendChild(precioServicio)

        document.querySelector('#servicios').appendChild(servicioDiv)
    });
}

function seleccionarServicio(servicio) {
    const { id } = servicio
    const { servicios } = cita
    //identificar el elemento al que se le da click
    const divServicio = document.querySelector(`[data-id-servicio="${id}"]`);
    //comprobar si un servicio ya fue agregado
    if (servicios.some(agregado => agregado.id === id)) {
        //eliminarlo
        cita.servicios = servicios.filter(agregado => agregado.id !== id)
        divServicio.classList.remove('seleccionado')

    } else {
        //agregarlo
        cita.servicios = [...servicios, servicio]
        divServicio.classList.add('seleccionado')


    }


    console.log(cita)


}

function nombreCliente() {
    cita.nombre = document.querySelector('#nombre').value;

}

function seleccionarFecha() {
    const inputFecha = document.querySelector('#fecha');
    inputFecha.addEventListener('input', function (e) {
        const dia = new Date(e.target.value).getUTCDay();
     
        if ([0, 6].includes(dia)) {
            e.target.value = '';
            e.target.value = '';
            console.log('Fines de semana no son permitidos');
        }else{
            cita.fecha = e.target.value;
        }
    })
}